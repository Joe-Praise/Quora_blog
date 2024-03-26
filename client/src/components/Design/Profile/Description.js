import React, {
	Fragment,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { TbShare3 } from 'react-icons/tb';
import { AppContext } from '../../../helper/context';
import FormBtn from '../../UI/FormBtn';
import { Link } from 'react-router-dom';
import { followHandler } from '../Home/PostCard';

const Description = ({ onCurrentProfile }) => {
	const { userInfo, getProfile, setReloadFollowing, setReload } =
		useContext(AppContext);
	const initialRef = useRef(true);
	const [edit, setEdit] = useState('');
	const [modal, setModal] = useState(0);
	const [following, setFollowing] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [isFollowing, setIsFollowing] = useState([]);
	const [files, setFiles] = useState({
		image: '',
	});

	// handles input onchange events
	const handleUpdate = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === 'image') {
			let file = e.target.files[0];
			setFiles({ image: file });
		}
		setEdit({ ...edit, [name]: value });
	};

	const editUser = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', edit.name);
		formData.append('email', edit.email);
		formData.append('image', files.image === '' ? userInfo.image : files.image);
		formData.append('id', userInfo.id);
		fetch(process.env.REACT_APP_API_URL + `/api/v1/update-user`, {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData,
			processData: false,
			contentType: false,
		})
			.then((resp) => resp.json())
			.then((data) => {
				getProfile();
				setModal(0);
			});
		document.body.style.overflowY = 'auto';
	};

	const cancelEdit = () => {
		setModal(0);
		document.body.style.overflowY = 'auto';
	};

	const openModalHandler = () => {
		setModal(1);
		setEdit(userInfo);
		document.body.style.overflowY = 'hidden';
	};

	// handles display of the following modal
	const openFollowingHandler = () => {
		setModal(2);
		document.body.style.overflowY = 'hidden';
	};

	// handles display of the followers modal
	const openFollowersHandler = () => {
		setModal(3);
		document.body.style.overflowY = 'hidden';
	};

	// gets following(users)
	async function getFollowing(id) {
		const response = await fetch(
			process.env.REACT_APP_API_URL + `/api/v1/following/${id}`
		);
		const data = await response.json();
		setFollowing(data);
	}

	// gets followers(users)
	async function getFollowers(id) {
		const response = await fetch(
			process.env.REACT_APP_API_URL + `/api/v1/followers/${id}`
		);
		const data = await response.json();
		setFollowers(data);
	}

	// finds if the logged in user is following the currently visted user
	const getIfFollowing = useCallback(() => {
		let isFollowing;
		if (userInfo.id === onCurrentProfile._id) {
			return;
		} else {
			isFollowing =
				followers.find((user) => user.follower._id === userInfo.id) || null;
			setIsFollowing(isFollowing);
		}
	}, [onCurrentProfile._id, followers, userInfo.id]);

	useEffect(() => {
		if (initialRef.current === true) {
			getIfFollowing();
			getFollowing(onCurrentProfile._id);
			getFollowers(onCurrentProfile._id);
		}
		initialRef.current = false;
	}, [getIfFollowing, onCurrentProfile._id]);

	return (
		<Fragment>
			<div>
				<div className='d-flex justify-content-between'>
					<div className='d-flex'>
						<figure className=''>
							<img
								className='img-fluid Dashboard--profile--thumbnail'
								// decided to use the image gotten from userInfo context here to make changes to the profile picture in real time when edited.
								src={
									process.env.REACT_APP_API_URL + '/uploads/' + userInfo.image
								}
								alt='default png'
							/>
						</figure>
						<div className='ps-2 ps-lg-3'>
							<div className='fw-bold fs-2'>{onCurrentProfile.name}</div>
							<div className='text-secondary font-tiny'>
								{onCurrentProfile._id === userInfo.id ? (
									<span>Add profile credential</span>
								) : (
									<span
										className='font-tiny text-primary fw-normal cursor-pointer'
										onClick={() => {
											followHandler(
												userInfo.id,
												onCurrentProfile._id,
												setReloadFollowing,
												setReload
											);
										}}
									>
										{isFollowing ? 'following' : 'follow'}
									</span>
								)}
							</div>
							<div className='text-secondary font-tiny'>
								<span className='cursor-pointer' onClick={openFollowersHandler}>
									{followers.length} followers
								</span>{' '}
								•{' '}
								<span className='cursor-pointer' onClick={openFollowingHandler}>
									{following.length} following
								</span>
							</div>
							<div>{/* Design the buttons here */}</div>
						</div>
					</div>
					<div className=''>
						<TbShare3 className='dashboard-icon p-1 border rounded-pill cursor-pointer' />
					</div>
				</div>
				{onCurrentProfile._id === userInfo.id ? (
					<div className='link cursor-pointer' onClick={openModalHandler}>
						Edit profile
					</div>
				) : null}
			</div>

			{modal === 3 ? (
				<div className='modal-editUser--wrapper'>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className=' position_fixed left profileModalWidth'>
						<h3 className='text-center fw-bold mx-auto'>Followers</h3>
						{followers.length > 0 ? (
							followers.map((user) => {
								return (
									<li className='user-list ps-2 px-2' key={user.follower._id}>
										<Link
											to={`/profile/${user.follower._id}`}
											onClick={cancelEdit}
										>
											<img
												src={
													process.env.REACT_APP_API_URL +
													'/uploads/' +
													user.follower.image
												}
												alt={'user'}
											/>
											<ul className='user-container--info-container'>
												<li className='user-info--name'>
													{user.follower.name}
												</li>
												<li className='user-info--profile'>{user.email}</li>
											</ul>
										</Link>
									</li>
								);
							})
						) : (
							<li className='user-list ps-2 px-2 '>No user found!</li>
						)}
					</div>
				</div>
			) : null}

			{modal === 2 ? (
				<div className='modal-editUser--wrapper'>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className=' position_fixed left profileModalWidth'>
						<h3 className='text-center fw-bold mx-auto'>Following</h3>
						<ul className='user-container mx-auto'>
							{following.length > 0 ? (
								following.map((user) => {
									return (
										<li className='user-list ps-2 mx-2' key={user.followee._id}>
											<Link
												to={`/profile/${user.followee._id}`}
												onClick={cancelEdit}
											>
												<img
													src={
														process.env.REACT_APP_API_URL +
														'/uploads/' +
														user.followee.image
													}
													alt={'user'}
												/>
												<ul className='user-container--info-container'>
													<li className='user-info--name'>
														{user.followee.name}
													</li>
													<li className='user-info--profile'>{user.email}</li>
												</ul>
											</Link>
										</li>
									);
								})
							) : (
								<li className='user-list ps-2 mx-2 '>No user found!</li>
							)}
						</ul>
					</div>
				</div>
			) : null}

			{modal === 1 ? (
				<div className='modal-editUser--wrapper modal-profile--editUser--wrapper'>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className=' position_fixed left profileModalWidth'>
						<h3 className='text-center fw-bold mx-auto'>Edit User Details</h3>
						<form>
							<div>
								<label htmlFor='fName'>Full Name</label>
								<input
									type='text'
									id='name'
									name='name'
									placeholder='Update Name'
									value={edit.name}
									onChange={handleUpdate}
								/>
							</div>
							<div>
								<label htmlFor='email'>Email</label>
								<input
									type='text'
									id='email'
									name='email'
									placeholder='Update your email address'
									value={edit.email}
									onChange={handleUpdate}
								/>
							</div>
							<div>
								<label htmlFor='img'>Image</label>
								<input
									type='file'
									id='img'
									name='image'
									onChange={handleUpdate}
								/>
							</div>
							<div className='products_btn mx-auto w-75'>
								<FormBtn
									width={'45%'}
									value='Cancel'
									bg={'#ea122a'}
									onClick={cancelEdit}
								/>
								<FormBtn
									width={'45%'}
									value='Edit User'
									bg={'#b4cc51'}
									onClick={editUser}
								/>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default Description;
