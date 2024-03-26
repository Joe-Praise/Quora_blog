import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import FormBtn from '../../UI/FormBtn';
import { AppContext } from '../../../helper/context';

const Users = () => {
	const { users, getUsers, setAdminLogin } = useContext(AppContext);
	const [update, setUpdate] = useState(false);
	const [edit, setEdit] = useState('');
	const [modal, setModal] = useState(false);
	const [files, setFiles] = useState({
		image: '',
	});
	const [existingImage, setExistingImage] = useState();

	useEffect(() => {
		getUsers();
		if (update) {
			getUsers();
			setUpdate(false);
		}
	}, [update, getUsers]);

	const handleDeleteUser = (id) => {
		fetch(process.env.REACT_APP_API_URL + `/api/delete-user/${id}`, {
			method: 'DELETE',
		})
			.then((resp) => resp.json())
			.then((data) => {
				setAdminLogin(true);
				setUpdate(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

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
		setAdminLogin(true);
		const formData = new FormData();
		formData.append('name', edit.name);
		formData.append('email', edit.email);
		formData.append('image', files.image === '' ? existingImage : files.image);
		// formData.append("password", edit.password);
		formData.append('id', edit._id);
		fetch(process.env.REACT_APP_API_URL + `/api/update-user`, {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData,
			processData: false,
			contentType: false,
		})
			.then((resp) => resp.json())
			.then((data) => {
				setModal(false);
				setUpdate(true);
				document.body.style.overflowY = 'auto';
			});
	};

	const cancelEdit = () => {
		setModal(false);
		document.body.style.overflowY = 'auto';
	};
	const handleEditBtn = (user) => {
		setModal(true);
		setEdit(user);
		setExistingImage(user.image);
		document.body.style.overflowY = 'hidden';
	};

	return (
		<div className='cardUserWrapper'>
			<div className='flex-basis--45 p-2'>
				<h1>Users Display Cards</h1>
				<ul className='userCard--container'>
					{users.map((user) => {
						return (
							<li className='user-list mb-4 mb-xl-0' key={user._id}>
								<ul className='usercard'>
									<li className='userInfo-userPage'>
										<figure className='m-0 p-0'>
											<img
												src={
													process.env.REACT_APP_API_URL +
													'/uploads/' +
													user.image
												}
												alt={'user'}
											/>
										</figure>
										<ul className='user-container--info-container ms-2'>
											<li className='user-info--name'>{user.name}</li>
											<li className='user-info--profile'>{user.email}</li>
										</ul>
									</li>
									<li className='user_btn d-flex text-center p-2 mobile-user-btn'>
										<FormBtn
											bg={'green'}
											value='Edit'
											onClick={() => handleEditBtn(user)}
										/>
										<FormBtn
											bg={'red'}
											value='Delete'
											onClick={() => handleDeleteUser(user._id)}
										/>
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
			</div>
			{modal ? (
				<div className='modal-editUser--wrapper'>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className=' position_fixed'>
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
							<div className='products_btn'>
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
		</div>
	);
};

export default Users;
