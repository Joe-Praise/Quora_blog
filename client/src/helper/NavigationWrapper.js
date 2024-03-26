import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from './context';
import { getAuthDuration } from '../util/auth';
import { useLocation } from 'react-router-dom';
import Header from '../components/Design/Home/Header';
import { removeLocalStorage } from './helper';
import config from '../util/config';

const NavigationWrapper = () => {
	const { setUserInfo } = useContext(AppContext);
	const navigate = useNavigate();
	const token = useLoaderData();

	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	function logout() {
		fetch(process.env.REACT_APP_API_URL + '/logout', {
			method: 'POST',
			credentials: 'include',
		}).then(() => {
			setUserInfo({
				image: null,
				name: null,
				email: null,
				id: null,
			});
			removeLocalStorage('expiration');
			removeLocalStorage(config.userToken);
			navigate('/login');
		});
	}

	useEffect(() => {
		if (!token) {
			return null;
		}

		if (token === 'EXPIRED') {
			logout();
			navigate('/login');
			return;
		}

		const tokenDuration = getAuthDuration();

		setTimeout(() => {
			logout();
		}, tokenDuration);
		// eslint-disable-next-line
	}, [token]);

	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default NavigationWrapper;
