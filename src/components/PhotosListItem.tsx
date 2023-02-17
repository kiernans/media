import { useRemovePhotoMutation } from '../store';
import { GoTrashcan } from 'react-icons/go';
import { IconContext } from 'react-icons';

type PhotosListItemProps = {
	photo: any;
};

const PhotosListItem = ({ photo }: PhotosListItemProps) => {
	const [removePhoto, results] = useRemovePhotoMutation();

	const handleRemovePhoto = () => {
		removePhoto(photo);
	};

	return (
		<div onClick={handleRemovePhoto} className='relative m-2 cursor-pointer'>
			<img src={photo.url} alt='Random pic' className='h-20 w-20' />
			<div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
				<IconContext.Provider value={{ className: 'text-3xl' }}>
					<GoTrashcan />
				</IconContext.Provider>
			</div>
		</div>
	);
};

export default PhotosListItem;
