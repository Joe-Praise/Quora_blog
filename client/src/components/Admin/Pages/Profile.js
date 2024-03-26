import { useContext, useEffect, useState } from 'react';
import Card from '../../UI/Card';
import { AppContext } from '../../../helper/context';
import FormBtn from '../../UI/FormBtn';
import { useNavigate } from 'react-router-dom';

function AdminProfile() {
	const { adminUserInfo, setAdminLogin, setAdminUserInfo } =
		useContext(AppContext);
	const navigate = useNavigate();
	const [update, setUpdate] = useState(false);
	const [edit, setEdit] = useState('');
	const [modal, setModal] = useState(false);
	const [existingImage, setExistingImage] = useState();
	const [files, setFiles] = useState({
		image: '',
	});

	// console.log(adminUserInfo)

	const handleLogout = async (e) => {
		e.preventDefault();
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/admin/adminlogout',
			{
				method: 'POST',
				credentials: 'include',
			}
		);

		const data = await response.json();

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
			navigate(data.redirect);
		}
	};
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
		formData.append('position', edit.position);
		formData.append('department', edit.department);
		formData.append('phone', edit.phone);
		formData.append('address', edit.address);
		formData.append('bio', edit.bio);
		formData.append('image', files.image === '' ? existingImage : files.image);
		formData.append('id', edit.id);
		fetch(process.env.REACT_APP_API_URL + `/admin/update-user`, {
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
	useEffect(() => {
		if (update) {
			setAdminLogin(true);
		} else {
			setAdminLogin(true);
		}
	}, [update, setAdminLogin]);

	return (
		<Card className='proflie--container'>
			<h1 className='fw-bold'>Admin Profile</h1>
			<div className='profile-flex w-100 gap-xl-4'>
				<div className='profile--img-container'>
					<figure className='m-0 p-0 w-100'>
						<img
							src={
								process.env.REACT_APP_API_URL +
								'/uploads/' +
								adminUserInfo.image
							}
							alt='Admin avi'
							className=''
						/>
					</figure>
				</div>
				<div className='profile-list-container ms-2'>
					<ul className='m-0 p-0'>
						<li className='fw-bold fs-5'>
							Name:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.name}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Email:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.email}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Department:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.department}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Position:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.position}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Phone:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.phone}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Address:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.address}
							</span>
						</li>
						<li className='fw-bold fs-5'>
							Bio:
							<span className='d-block fw-normal fs-6'>
								{adminUserInfo.bio}
							</span>
						</li>
						<li>
							<button
								className='btn btn-primary fw-bold'
								onClick={() => handleEditBtn(adminUserInfo)}
							>
								Edit profile
							</button>

							<button
								className='btn btn-primary fw-bold ms-5'
								onClick={handleLogout}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
			{modal ? (
				<div className='modal-editUser--wrapper'>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className=' position_fixed'>
						<h3 className='text-center fw-bold mx-auto'>Edit User Details</h3>
						<form>
							<div>
								<label htmlFor='fName'>Name</label>
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
								<label htmlFor='position'>Position</label>
								<input
									type='text'
									id='position'
									name='position'
									placeholder='Update your position'
									value={edit.position}
									onChange={handleUpdate}
								/>
							</div>

							<div>
								<label htmlFor='department'>Department</label>
								<input
									type='text'
									id='department'
									name='department'
									placeholder='Update your department'
									value={edit.department}
									onChange={handleUpdate}
								/>
							</div>

							<div>
								<label htmlFor='phone'>Phone</label>
								<input
									type='text'
									id='phone'
									name='phone'
									placeholder='Update your phone number'
									value={edit.phone}
									onChange={handleUpdate}
								/>
							</div>
							<div>
								<label htmlFor='address'>Address</label>
								<input
									type='text'
									id='address'
									name='address'
									placeholder='Update your address'
									value={edit.address}
									onChange={handleUpdate}
								/>
							</div>

							<div>
								<label htmlFor='bio'>Bio</label>
								<input
									type='text'
									id='bio'
									name='bio'
									placeholder='Update your bio'
									value={edit.bio}
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
		</Card>
	);
}

export default AdminProfile;
