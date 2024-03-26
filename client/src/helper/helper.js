export const getLocalStorage = (key) => {
	try {
		const jsonData = localStorage.getItem(key);
		if (!jsonData) return null;
		return JSON.parse(jsonData);
	} catch (error) {
		return null;
	}
};

export const saveLocalStorage = (key, data) => {
	try {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(key, jsonData);
		return true;
	} catch (error) {
		return false;
	}
};

export const removeLocalStorage = (key) => {
	try {
		localStorage.removeItem(key);
		return;
	} catch (error) {
		return false;
	}
};

export const checkToken = (key) => {
	const token = getLocalStorage(key);

	return !!token;
};

export const handleApiError = async (error) => {
	try {
		// console.log('handleApiError', error);
		const errorMessage =
			error.response?.data?.message || 'An unexpected error occurred.';
		return { error: errorMessage, data: [] };
	} catch (err) {
		throw new Error('An unexpected error occurred.');
	}
};
