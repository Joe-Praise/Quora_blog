import { redirect } from 'react-router-dom';

export function getAdminAuthDuration() {
	const storedExpirationDate = localStorage.getItem('adminExpiration');
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
}

export async function getAdminAuthToken() {
	const response = fetch(
		process.env.REACT_APP_API_URL + '/admin/admin-profile',
		{
			credentials: 'include',
		}
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.err) {
				redirect(data.redirect);
				return null;
			}

			return data;
		});

	const tokenDuration = getAdminAuthDuration();
	if (tokenDuration < 0) {
		return 'EXPIRED';
	}

	return response;
}

export function adminTokenLoader() {
	return getAdminAuthToken();
}
