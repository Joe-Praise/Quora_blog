import React, { useCallback, useContext } from 'react';
import { useEffect, useState } from 'react';
import FormBtn from '../../UI/FormBtn';
import { AppContext } from '../../../helper/context';
import placeholder from '../../../Images/pop-art.jpg';
import Card from '../../UI/Card';
import { format } from 'date-fns';

const Posts = () => {
	const { setAdminLogin } = useContext(AppContext);
	const [update, setUpdate] = useState(false);
	const [edit, setEdit] = useState('');
	const [modal, setModal] = useState(false);
	const [commentsModal, setCommentsModal] = useState(false);
	const [filteredComments, setFilteredComments] = useState([]);
	const [files, setFiles] = useState({
		image: '',
	});

	const [posts, setPosts] = useState([]);
	const [existingImage, setExistingImage] = useState();

	const getPostsHandler = useCallback(async () => {
		await fetch(process.env.REACT_APP_API_URL + `/api/posts`).then((res) => {
			res.json().then((posts) => {
				setPosts(posts.data);
			});
		});
	}, []);

	useEffect(() => {
		getPostsHandler();
		if (update) {
			getPostsHandler();
		}
		setUpdate(false);
	}, [update, getPostsHandler]);

	const handleDeleteUser = (id) => {
		fetch(process.env.REACT_APP_API_URL + `/api/delete-post/${id}`, {
			method: 'DELETE',
		})
			.then((resp) => resp.json())
			.then((data) => {
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
		const formData = new FormData();
		formData.append('content', edit.content);
		formData.append('space', edit.space);
		formData.append('image', files.image === '' ? existingImage : files.image);
		formData.append('id', edit._id);
		fetch(process.env.REACT_APP_API_URL + `/api/update-post`, {
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
			});
		document.body.style.overflowY = 'auto';
	};

	const cancelEdit = () => {
		setModal(false);
		setCommentsModal(false);
		document.body.style.overflowY = 'auto';
	};
	const handleEditBtn = (post) => {
		setModal(true);
		setEdit(post);
		setExistingImage(post.image);
		document.body.style.overflowY = 'hidden';
	};

	const getCommentsHandler = useCallback(
		async (post) => {
			setCommentsModal(true);
			document.body.style.overflowY = 'hidden';
			const response = await fetch(
				process.env.REACT_APP_API_URL + `/api/post/${post._id}/comments`
			);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();
			setFilteredComments(data);
			setAdminLogin(true);
		},
		[setFilteredComments, setAdminLogin]
	);

	const deleteCommentHandler = async (id) => {
		await fetch(process.env.REACT_APP_API_URL + '/api/delete-comment/' + id, {
			method: 'DELETE',
		});
		const newList = filteredComments.filter((items) => items._id !== id);
		setFilteredComments(newList);
	};

	return (
		<div>
			<div>
				<h1>Users Display Cards</h1>
				<ul className='postCard--container'>
					{posts.map((post) => {
						return (
							<li className='post-list' key={post._id}>
								<div>
									<p className='mt-2'>
										A post by: <i className='fw-bold'>{post.authorId.name}</i>
									</p>
								</div>
								<article className='clearfix'>
									{post.image ? (
										<img
											className='post-img w-100'
											src={
												process.env.REACT_APP_API_URL + '/uploads/' + post.image
											}
											alt=''
										/>
									) : (
										<img className='post-img w-100' src={placeholder} alt='' />
									)}
									<p className='text--ellipsis'>{post.content}</p>
								</article>
								<div className='d-flex justify-content-center m-1'>
									<FormBtn
										width={'30%'}
										bg={'green'}
										value='Edit'
										onClick={() => handleEditBtn(post)}
									/>
									<FormBtn
										width={'30%'}
										bg={'ash'}
										value='Comments'
										onClick={() => {
											getCommentsHandler(post);
										}}
									/>
									<FormBtn
										width={'30%'}
										bg={'red'}
										value='Delete'
										onClick={() => handleDeleteUser(post._id)}
									/>
								</div>
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
								<label htmlFor='fName'>Post Content</label>

								<input
									type='text'
									id='name'
									name='content'
									placeholder='Update Name'
									value={edit.content}
									onChange={handleUpdate}
								/>
							</div>
							<div>
								<label htmlFor=''>Space</label>
								<select name='space' value={edit.space} onChange={handleUpdate}>
									<option value='Movies'>Movies</option>
									<option value='Cooking'>Cooking</option>
									<option value='Music'>Music</option>
									<option value='Fine art'>Fine art</option>
									<option value='Technology'>Technology</option>
									<option value='Couples'>Couples</option>
									<option value='Emergency'>Emergency</option>
									<option value='Tinubu'>Tinubu</option>
								</select>
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
							<div className='products_btn mx-auto'>
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
			{commentsModal && (
				<div className=''>
					<div className='back--drop' onClick={cancelEdit}></div>
					<div className='position_fixed pb-1'>
						<h3 className='text-center pt-1'>Post Comments</h3>
						<div className='max-height-overflow-auto'>
							{filteredComments.length < 1 ? (
								<p className='text-center fw-bold'>No Comment Found...</p>
							) : (
								filteredComments.map((comment, index) => {
									return (
										<Card
											className='p-2 p-lg-3 mb-1 border-0 rounded-0 border-bottom'
											key={comment.authorId + index + 'C'}
										>
											<div className='d-flex justify-content-between'>
												<div className='d-flex align-items-center'>
													<figure className='m-0'>
														<img
															className='img-fluid img--profile--thumbnail'
															src={
																process.env.REACT_APP_API_URL +
																'/uploads/' +
																comment.authorId.image
															}
															alt='default png'
														/>
													</figure>
													<div className='ps-1 ps-lg-2'>
														<div className='fw-bold'>
															{comment.authorId.name} •{' '}
															<span className='font-tiny fw-normal'>
																{format(
																	new Date(comment.createdAt),
																	'MMM d, HH:mm'
																)}
															</span>
														</div>
													</div>
												</div>
												<div>
													<button
														type='button'
														className='btn-close'
														aria-label='Close'
														onClick={() => deleteCommentHandler(comment._id)}
													></button>
												</div>
											</div>

											{/* this will be the body of the blog post and link */}
											<div>
												<article className='mt-2'>
													<p className='m-0 p-0'>{comment.content}</p>
												</article>
											</div>
										</Card>
									);
								})
							)}
						</div>
						<div className='text-center'>
							<FormBtn
								width={'45%'}
								value='Close Modal'
								bg={'#ea122a'}
								onClick={cancelEdit}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Posts;
