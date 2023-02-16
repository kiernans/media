import { useState, useCallback } from 'react';
import { useAppDispatch } from './hooks';

export function useThunk(arg: any) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useAppDispatch();

	const runThunk = useCallback(() => {
		setIsLoading(true);
		dispatch(arg())
			.unwrap()
			.catch((err: any) => setError(err))
			.finally(() => setIsLoading(false));
	}, [dispatch, arg]);

	return [runThunk, isLoading, error];
}
