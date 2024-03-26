import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import AdminSideHeader from './AdminSideHeader';
import AdminTopHeader from './AdminTopHeader';
import { useContext, useEffect, useState } from 'react';
import { getAdminAuthDuration } from '../../util/adminAuth';
import { AppContext } from '../../helper/context';

const AdminNavigationWrapper = () => {
	const navigate = useNavigate();
	const token = useLoaderData();
	const { setAdminUserInfo } = useContext(AppContext);
	const [reveal, setReveal] = useState(false);
	const revealMenuBarHandler = () => {
		setReveal((prevState) => !prevState);
	};

	async function logout() {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/adminlogout',
			{
				method: 'POST',
				credentials: 'include',
			}
		);

		if (!response.ok) {
			return;
		} else {
			setAdminUserInfo({
				image: '',
				name: '',
				email: '',
				id: '',
				position: '',
				department: '',
				phone: '',
				address: '',
				bio: '',
			});
			localStorage.removeItem('adminExpiration');
			navigate('/adminLogin');
		}
	}

	useEffect(() => {
		if (!token) {
			return null;
		}

		if (token === 'EXPIRED') {
			logout();
			navigate('/adminLogin');
			return;
		}

		const tokenDuration = getAdminAuthDuration();

		setTimeout(() => {
			logout();
		}, tokenDuration);
		// eslint-disable-next-line
	}, [token]);

	return (
		<div className='overall-admin--wrapper'>
			<div className='adminHeaderWrapper'>
				{reveal && (
					<div className='back--drop' onClick={revealMenuBarHandler}></div>
				)}
				<div className={`leftNav ${reveal ? 'reveal' : null}`}>
					<AdminSideHeader
						className='width--17'
						onCloseMenu={revealMenuBarHandler}
						getReveal={reveal}
						sendReveal={setReveal}
					/>
				</div>
				<div className='topNavContent'>
					<AdminTopHeader revealMenu={revealMenuBarHandler} />
					<div className='content'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminNavigationWrapper;
