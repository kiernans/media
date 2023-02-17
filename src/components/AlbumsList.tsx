/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import { User } from '../store/slices/usersSlice';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

type AlbumsListProps = {
	user: User;
};

export type Album = {
	userId: number;
	title: string;
	id: number;
};

const AlbumsList = ({ user }: AlbumsListProps) => {
	const { data, error, isFetching } = useFetchAlbumsQuery(user);
	const [addAlbum, results] = useAddAlbumMutation();

	const handleAddAlbum = () => {
		addAlbum(user);
	};

	let content;
	if (isFetching) {
		content = <Skeleton times={3} className='h-10 w-full' />;
	} else if (error) {
		content = <div>There was an error fetching albums</div>;
	} else {
		content = data.map((album: Album) => {
			return <AlbumsListItem key={album.id} album={album} />;
		});
	}

	return (
		<div>
			<div className='m-2 flex flex-row items-center justify-between'>
				<h3 className='text-lg font-bold'>Albums for {user.name}</h3>
				<Button onClick={handleAddAlbum} loading={isFetching}>
					+ Add Album
				</Button>
			</div>
			<div>{content}</div>
		</div>
	);
};

export default AlbumsList;
