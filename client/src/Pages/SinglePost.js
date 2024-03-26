import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../helper/context';
import SinglePostDetail from '../components/Design/Home/SinglePostDetail';
import SideBar from '../components/Design/Home/SideBar';
import Advertisment from '../components/Design/Home/Advertisment';

function SinglePost() {
	const { userInfo } = useContext(AppContext);
	const post = useRouteLoaderData('postDetail');
	return (
		<>
			<main className='main'>
				<section className='body--width home-flex'>
					<SideBar />
					<SinglePostDetail post={post} userInfo={userInfo} />
					<Advertisment />
				</section>
			</main>
		</>
	);
}

export default SinglePost;

export async function loader({ params }) {
	const id = params.id;

	const response = await fetch(
		process.env.REACT_APP_API_URL + '/api/v1/post/' + id
	);

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch details for selected post.' },
			{ status: 500 }
		);
	} else {
		return response;
	}
}

export async function action({ request, params }) {
	const id = params.id;
	const response = await fetch(
		process.env.REACT_APP_API_URL + '/api/v1/delete-post/' + id,
		{
			method: request.method,
		}
	);

	if (!response.ok) {
		throw json({ message: 'Could not delete selected post.' }, { status: 500 });
	}
	return redirect('/');
}
