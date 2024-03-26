import { redirect } from 'react-router-dom';

export function getAuthDuration() {
	const storedExpirationDate = localStorage.getItem('expiration');
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
}

export async function getAuthToken() {
	const response = await fetch(process.env.REACT_APP_API_URL + '/profile', {
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((data) => {
			redirect(data.redirect);
			if (data.err) {
				return null;
			}
			return data;
		});

	const tokenDuration = getAuthDuration();
	if (tokenDuration < 0) {
		return 'EXPIRED';
	}

	return response;
}

export function tokenLoader() {
	return getAuthToken();
}
