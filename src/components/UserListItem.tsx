import { User } from '../store/slices/usersSlice';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

type UserListItemProps = {
	user: User;
};

const UserListItem = ({ user }: UserListItemProps) => {
	const [doRemoveUser, isLoading, error] = useThunk(deleteUser);

	const handleClick = () => {
		if (typeof doRemoveUser === 'function') {
			doRemoveUser(user);
		}
	};

	const header = (
		<>
			<Button loading={isLoading as boolean} onClick={handleClick}>
				<GoTrashcan />
			</Button>
			{error && <div>Error deleting user.</div>}
			{user.name}
		</>
	);

	return (
		<ExpandablePanel header={header}>
			<AlbumsList user={user} />
		</ExpandablePanel>
	);
};

export default UserListItem;
