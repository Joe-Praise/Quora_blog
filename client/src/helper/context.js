import { createContext, useState, useEffect, useCallback, useRef } from 'react';

export const AppContext = createContext();
function DataContext({ children }) {
	const [userInfo, setUserInfo] = useState({
		image: '',
		name: '',
		email: '',
		id: '',
	});
	const [adminUserInfo, setAdminUserInfo] = useState({
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

	const [following, setFollowing] = useState([]);
	const [reload, setReload] = useState(false);
	const [posts, setPosts] = useState([]);
	const [getLogin, setGetLogin] = useState(false);
	const [adminLogin, setAdminLogin] = useState(false);
	const [filterSpace, setFilterSpace] = useState([]);
	const [users, setUsers] = useState([]);
	const [reloadAdmin, setReloadAdmin] = useState(false);
	const [reloadFollowing, setReloadFollowing] = useState(false);
	const [updatedPost, setUpdatedPost] = useState([]);
	const [getUsersForAdmin, setUsersForAdmin] = useState([]);
	const ref = useRef(true);
	const getProfile = useCallback(async () => {
		await fetch(process.env.REACT_APP_API_URL + '/profile', {
			credentials: 'include',
		}).then((res) => {
			res.json().then((userInfo) => {
				if (userInfo.err === 'Login to have access!') {
					return;
				} else {
					const { data } = userInfo;
					setUserInfo({
						email: data.email,
						image: data.image,
						name: data.name,
						id: data._id,
					});
				}
			});
		});
		// eslint-disable-next-line
	}, [setUserInfo, getLogin]);

	const getAdminProfile = useCallback(async () => {
		await fetch(process.env.REACT_APP_API_URL + '/admin/admin-profile', {
			credentials: 'include',
		}).then((res) => {
			res.json().then((adminInfo) => {
				if (adminInfo.err) {
					return;
				} else {
					setUsersForAdmin(true);
					setAdminUserInfo({
						email: adminInfo[0].email,
						image: adminInfo[0].image,
						name: adminInfo[0].name,
						id: adminInfo[0]._id,
						position: adminInfo[0].position,
						department: adminInfo[0].department,
						phone: adminInfo[0].phone,
						address: adminInfo[0].address,
						bio: adminInfo[0].bio,
					});
				}
			});
		});
		// eslint-disable-next-line
	}, [setAdminUserInfo, adminLogin]);

	const getPostsHandler = useCallback(async () => {
		if (!userInfo.id) return;
		else {
			await fetch(process.env.REACT_APP_API_URL + `/api/v1/posts`).then(
				(res) => {
					res.json().then((posts) => {
						setPosts(posts.data);
						setFilterSpace(posts.data);
						setReload(false);
					});
				}
			);
		}

		// eslint-disable-next-line
	}, [reload, userInfo.id]);

	const getUsers = useCallback(() => {
		fetch(process.env.REACT_APP_API_URL + '/api/v1/users').then((res) => {
			res.json().then((users) => {
				setUsers(users.data);
			});
		});
		setAdminLogin(false);
	}, [setAdminLogin]);

	const deleteHandler = async (id) => {
		await fetch(process.env.REACT_APP_API_URL + '/api/v1/delete-post/' + id, {
			method: 'DELETE',
		});
		getPostsHandler();
	};

	const getFollowing = useCallback(
		async (id) => {
			if (!id) return;
			else {
				const response = await fetch(
					process.env.REACT_APP_API_URL + `/api/v1/following/${id}`
				);
				const data = await response.json();
				setFollowing(data);
				setReloadFollowing(false);
			}
		},
		[setReloadFollowing]
	);

	function compile(post, following) {
		let copiedPost = [...post];
		for (let i = 0; i < following.length; i++) {
			const singleFollowed = following[i];
			for (let j = 0; j < post.length; j++) {
				if (singleFollowed.followee._id === post[j].authorId._id) {
					copiedPost[j].following = true;
				}
			}
		}
		setUpdatedPost(copiedPost);
		return copiedPost;
	}

	useEffect(() => {
		if (ref && ref.current === true) {
			getProfile();
			ref.current = false;
		}
		getPostsHandler();
		getFollowing(userInfo.id);
	}, [getPostsHandler, getUsers, getFollowing, userInfo.id, getProfile]);

	useEffect(() => {
		if (getLogin) {
			getProfile();
		}
	}, [getProfile, getLogin]);

	useEffect(() => {
		if (reloadFollowing) {
			compile(posts, following);
		}
		compile(posts, following);
	}, [posts, following, reloadFollowing]);

	useEffect(() => {
		if (adminLogin) {
			getAdminProfile();
			setAdminLogin(false);
			getUsers(adminUserInfo.id);
		}
	}, [getAdminProfile, adminLogin, getUsers, adminUserInfo, getUsersForAdmin]);

	return (
		<AppContext.Provider
			value={{
				userInfo,
				setUserInfo,
				reload,
				setReload,
				posts,
				setPosts,
				following,
				getLogin,
				setGetLogin,
				setFilterSpace,
				filterSpace,
				getPostsHandler,
				users,
				getUsers,
				reloadAdmin,
				setReloadAdmin,
				getProfile,
				adminUserInfo,
				getAdminProfile,
				setAdminLogin,
				setAdminUserInfo,
				deleteHandler,
				setReloadFollowing,
				updatedPost,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
export default DataContext;
