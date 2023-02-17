import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album } from '../../components/AlbumsList';
import { User } from '../slices/usersSlice';

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

const albumsApi = createApi({
	reducerPath: 'albums',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005',
		fetchFn: async (...args) => {
			// REMOVE FOR PRODUCTION
			await pause(1000);
			return fetch(...args);
		},
	}),
	tagTypes: ['Album', 'UsersAlbums'],
	endpoints(builder) {
		return {
			removeAlbum: builder.mutation({
				invalidatesTags: (result, error, album) => {
					return [{ type: 'Album', id: album.id }];
				},
				query: (album: Album) => {
					return {
						url: `/albums/${album.id}`,
						method: 'DELETE',
					};
				},
			}),
			addAlbum: builder.mutation({
				invalidatesTags: (result, error, user) => {
					return [{ type: 'UsersAlbums', id: user.id }];
				},
				query: (user: User) => {
					return {
						url: '/albums',
						body: {
							userId: user.id,
							title: faker.commerce.productName(),
						},
						method: 'POST',
					};
				},
			}),
			fetchAlbums: builder.query({
				providesTags: (result, error, user) => {
					const tags = result.map((album: Album) => {
						return { type: 'Album', id: album.id };
					});
					tags.push({ type: 'UsersAlbums', id: user.id });
					return tags;
				},
				query: (user: User) => {
					return {
						url: '/albums',
						params: {
							userId: user.id,
						},
						method: 'GET',
					};
				},
			}),
		};
	},
});

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
