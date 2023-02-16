import { User } from '../store/slices/usersSlice';

type AlbumsListProps = {
	user: User;
};

const AlbumsList = ({ user }: AlbumsListProps) => {
	return <div>Albums for {user.name}</div>;
};

export default AlbumsList;
