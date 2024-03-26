import React, { useContext, useEffect } from 'react';
import '../components/Design/Profile/profile.css';
import Dashboard from '../components/Design/Profile/Dashboard';
import Credentials from '../components/Design/Profile/Credentials';
import { AppContext } from '../helper/context';
import { json, useLoaderData } from 'react-router-dom';

const Profile = () => {
	const { setGetLogin } = useContext(AppContext);
	const data = useLoaderData();
	const user = data.data[0];

	useEffect(() => {
		setGetLogin(true);
	}, [setGetLogin]);
	return (
		<React.Fragment>
			<section className='profile body--width'>
				<div className='margin-top d-flex--row--wrap space-between px-2'>
					<Dashboard
						className='dashboard--flex-basis'
						onCurrentProfile={user}
					/>
					<Credentials className='credentials--flex-basis' />
				</div>
			</section>
		</React.Fragment>
	);
};

export default Profile;

export async function loader({ params }) {
	const id = params.id;
	const response = await fetch(
		process.env.REACT_APP_API_URL + '/api/v1/random-profile/' + id
	);

	if (!response.ok) {
		throw json({ message: 'Could not fetch user details' }, { status: 500 });
	} else {
		return response;
	}
}
