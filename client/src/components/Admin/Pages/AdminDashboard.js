import React, { useCallback, useContext } from 'react';
import { useState, useEffect } from 'react';
import DisplayCard from '../DisplayCard';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../helper/context';

const AdminDashboard = () => {
	const { reloadAdmin, setReloadAdmin } = useContext(AppContext);
	const url = process.env.REACT_APP_API_URL + '/api/users';
	const [users, setUsers] = useState([]);
	const [post, setPost] = useState({});
	const [postName, setPostName] = useState('');
	const [likes, setLikes] = useState({
		count: '',
		header: '',
	});
	const [dislike, setDislike] = useState({
		count: '',
		header: '',
	});

	const [usersCount, setUsersCount] = useState({
		count: '',
		header: '',
	});

	const [postsCount, setPostsCount] = useState({
		count: '',
		header: '',
	});

	const usersTableHandler = useCallback(async () => {
		const response = await fetch(url);
		const usersData = await response.json();
		setUsers(usersData.data);
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin, url]);

	const getSinglePost = useCallback(async () => {
		const response = await fetch(process.env.REACT_APP_API_URL + '/api/posts');
		if (!response.ok) {
			throw new console.error();
		}

		const data = await response.json();
		const index = Math.floor(Math.random() * data.data.length);
		setPost(data.data[index]);
		setPostName(data.data[0].authorId.name);
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin]);

	const getLikesCount = useCallback(async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/likes-count'
		);
		if (!response.ok) {
			throw new console.error();
		}
		const data = await response.json();
		setLikes({
			count: data.data,
			header: data.message,
		});
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin]);

	const getDislikesCount = useCallback(async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/dislikes-count'
		);
		if (!response.ok) {
			throw new console.error();
		}
		const data = await response.json();
		setDislike({
			count: data.data,
			header: data.message,
		});
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin]);

	const getUserCount = useCallback(async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/user-count'
		);
		if (!response.ok) {
			throw new console.error();
		}
		const data = await response.json();
		setUsersCount({
			count: data.data,
			header: data.message,
		});
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin]);

	const getPostsCount = useCallback(async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/post-count'
		);
		if (!response.ok) {
			throw new console.error();
		}
		const data = await response.json();
		setPostsCount({
			count: data.data,
			header: data.message,
		});
		if (reloadAdmin) {
			setReloadAdmin(false);
		}
	}, [reloadAdmin, setReloadAdmin]);

	useEffect(() => {
		usersTableHandler();
		getSinglePost();
		getLikesCount();
		getDislikesCount();
		getUserCount();
		getPostsCount();
	}, [
		getSinglePost,
		getLikesCount,
		getDislikesCount,
		getUserCount,
		getPostsCount,
		usersTableHandler,
	]);

	return (
		<div className='dashboard-content-Wrapper'>
			<div className=' bg-white p-2 tableBg overflow--y-auto'>
				<h1>Users</h1>
				<ul className='user-container mx-auto'>
					{users.map((user) => {
						return (
							<li className='user-list' key={user._id}>
								<Link to={'/admin/users'}>
									<img
										src={
											process.env.REACT_APP_API_URL + '/uploads/' + user.image
										}
										alt={'user'}
									/>
									<ul className='user-container--info-container'>
										<li className='user-info--name'>{user.name}</li>
										<li className='user-info--profile'>{user.email}</li>
									</ul>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='rightSideContainer'>
				<div className='displayCardContainer'>
					<DisplayCard header={postsCount.header} value={postsCount.count} />
					<DisplayCard header={usersCount.header} value={usersCount.count} />
					<DisplayCard header={likes.header} value={likes.count} />
					<DisplayCard header={dislike.header} value={dislike.count} />
				</div>
				{post ? (
					<div className='flex-basis--100 displayCard doubleDisplayCard'>
						{post.image && (
							<figure>
								<img
									src={process.env.REACT_APP_API_URL + '/uploads/' + post.image}
									alt=''
								/>
							</figure>
						)}
						<div className='p-container'>
							<h2 className='text-center'>{postName}</h2>
							<p className='text-center text--ellipsis text--ellipsis-8lines'>
								{post.content}
							</p>
						</div>
					</div>
				) : (
					<div className='flex-basis--100 displayCard doubleDisplayCard'>
						<h4 className='text-center'>NO POST FOUND</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
