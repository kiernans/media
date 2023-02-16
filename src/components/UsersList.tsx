import { useEffect } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';
import UserListItem from './UserListItem';

const UsersList = () => {
	const [doFetchUsers, isLoadingUsers, loadingUsersError] =
		useThunk(fetchUsers);
	const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
	const { data } = useAppSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		if (typeof doFetchUsers === 'function') {
			doFetchUsers();
		}
	}, [doFetchUsers]);

	const handleUserAdd = () => {
		if (typeof doCreateUser === 'function') {
			doCreateUser();
		}
	};

	let content;

	if (isLoadingUsers) {
		content = <Skeleton times={6} className='h-10 w-full' />;
	} else if (loadingUsersError) {
		content = <div>Error fetching data...</div>;
	} else {
		content = data.map((user) => {
			return <UserListItem key={user.id} user={user} />;
		});
	}

	return (
		<div>
			<div className='flex flex-row justify-between items-center m-3'>
				<h1 className='m-2 text-xl'>Users</h1>

				<Button loading={isCreatingUser as boolean} onClick={handleUserAdd}>
					+ Add User
				</Button>

				{creatingUserError && 'Error creating user...'}
			</div>
			{content}
		</div>
	);
};

export default UsersList;
