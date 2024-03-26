import { useContext, useEffect, useState } from 'react';
import PostCard from '../components/Design/Home/PostCard';
import Invites from '../components/Design/Space/Invites';
import { AppContext } from '../helper/context';

const { useParams, json, useLoaderData, Link } = require('react-router-dom');

function SpaceCategory() {
	const { following } = useContext(AppContext);
	const [updatedPost, setUpdatedPost] = useState([]);
	const { category } = useParams();
	const posts = useLoaderData();

	function compile(post, following) {
		let copiedPost = [...post];
		for (let i = 0; i < following.length; i++) {
			const singleFollowed = following[i];
			for (let j = 0; j < post.length; j++) {
				if (singleFollowed.followee._id === post[j].authorId._id) {
					copiedPost[j].following = true;
				} else copiedPost[j].following = false;
			}
		}

		setUpdatedPost(copiedPost);
		return copiedPost;
	}
	useEffect(() => {
		compile(posts.data, following);
	}, [posts, following]);
	return (
		<>
			<main className='main'>
				<section className='body--width home-flex'>
					<div className='spaceCategory'>
						<h1>Space Category</h1>
						<div className='p-1'>
							{updatedPost && updatedPost.length > 0 ? (
								updatedPost.map((post, index) => {
									return <PostCard post={post} key={index} />;
								})
							) : (
								<div className='w-100'>
									<p className='fs-5 text-center mt-5'>
										No post found for this Space:{' '}
										<span className='fw-bolder'>{category}</span>
									</p>
									<p className='fs-5 text-center'>
										Try another <Link to='/space'>Space</Link> or return to{' '}
										<Link to='/'>Home page</Link>
									</p>
								</div>
							)}
						</div>
					</div>
					<Invites />
				</section>
			</main>
		</>
	);
}

export default SpaceCategory;

export async function loader({ params }) {
	const category = params.category;
	const response = await fetch(
		process.env.REACT_APP_API_URL + '/api/v1/space/' + category
	);

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch posts for selected space.' },
			{ status: 500 }
		);
	} else {
		return response;
	}
}
