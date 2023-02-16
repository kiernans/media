import { User } from '../store/slices/usersSlice';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/useThunk';

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

	return (
		<div className='mb-2 border rounded'>
			<div className='flex p-2 justify-between items-center cursor-pointer'>
				<div className='flex flex-row items-center justify-between'>
					<Button loading={isLoading as boolean} onClick={handleClick}>
						<GoTrashcan />
					</Button>
					{error && <div>Error deleting user.</div>}
					{user.name}
				</div>
			</div>
		</div>
	);
};

export default UserListItem;
