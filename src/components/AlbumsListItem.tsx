import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { Album } from './AlbumsList';
import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

type AlbumsListItemProps = {
	album: Album;
};

const AlbumsListItem = ({ album }: AlbumsListItemProps) => {
	const [removeAlbum, results] = useRemoveAlbumMutation();

	const handleClick = () => {
		removeAlbum(album);
	};

	const header = (
		<>
			<Button
				onClick={handleClick}
				loading={results.isLoading}
				className='mr-2'
			>
				<GoTrashcan />
			</Button>
			{album.title}
		</>
	);

	return (
		<ExpandablePanel key={album.id} header={header}>
			<PhotosList album={album} />
		</ExpandablePanel>
	);
};

export default AlbumsListItem;
