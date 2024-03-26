import config from '../util/config';
import { getLocalStorage } from './helper';

export const makeRequest = async (
	method,
	endpoint,
	data = {}
	// formdata = false
) => {
	try {
		const token = getLocalStorage(config.userToken);
		const version = 'api/v1';
		const url = `${process.env.REACT_APP_API_URL}/${version}/${endpoint}`;
		const response = await fetch(url, {
			method: method,
			body: data,
			headers: {
				// 'Content-Type': `${
				// 	formdata === true ? 'multipart/form-data' : 'application/json'
				// }`,
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			// credentials: 'include',
		});
		return response;
	} catch (error) {
		return error.message;
	}
};

export const handleError = (response) => {
	if (!response.ok) {
		throw new Error(response.error);
	} else {
		return response.json();
	}
};
