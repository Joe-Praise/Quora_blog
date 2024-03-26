import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from '../../../helper/PopUp';
import { AppContext } from '../../../helper/context';

function EditPostForm({ method, post }) {
	const { getPostsHandler, setGetLogin } = useContext(AppContext);
	const navigate = useNavigate();
	const contentref = useRef();
	const [resData, setResData] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [space, setSpace] = useState('');
	const [dataMsg, setDataMsg] = useState('');
	const [file, setFile] = useState({
		image: '',
	});

	const getValuesHandler = (event) => {
		let name = event.target.name;
		if (name === 'image') {
			let file = event.target.files[0];
			setFile({ image: file });
		}
	};

	useEffect(() => {
		setGetLogin(true);
	}, [setGetLogin]);

	const hidePopUp = () => {
		resData(false);
	};

	const postHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		let formData = new FormData();
		formData.append('image', file.image === '' ? post.image : file.image);
		formData.append('content', contentref.current.value);
		formData.append('space', space === '' ? post.space : space);
		formData.append('id', post.postId);

		const response = await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/update-post',
			{
				method: method,
				body: formData,
				credentials: 'include',
			}
		);

		const data = await response.json();
		if (data.error) {
			setDataMsg(data.message);
			setResData(true);
		} else {
			getPostsHandler();
			navigate('/');
		}
	};

	function cancelHandler() {
		navigate('/');
	}

	return (
		<div className='editPostForm'>
			<div>
				{resData && (
					<Fragment>
						<PopUp message={dataMsg} btnAction={hidePopUp} />
					</Fragment>
				)}
			</div>
			<h1>Edit Post</h1>
			<form className='EditFormWrapper' onSubmit={postHandler}>
				<div>
					<label htmlFor='content'>Content</label>
					<textarea
						id='content'
						name='content'
						className='EditTextArea'
						defaultValue={post ? post.content : ''}
						ref={contentref}
					></textarea>
				</div>
				<div className='mx-auto cursor-pointer'>
					<label htmlFor='space'>Space</label>
					<select
						name='space'
						id='space'
						defaultValue={post ? post.space : ''}
						onChange={(e) => setSpace(e.target.value)}
					>
						<option value='Movies'>Movies</option>
						<option value='Cooking'>Cooking</option>
						<option value='Music'>Music</option>
						<option value='Fineart'>Fine art</option>
						<option value='Technology'>Technology</option>
						<option value='Couples'>Couples</option>
						<option value='Emergency'>Emergency</option>
						<option value='Tinubu'>Tinubu</option>
					</select>
				</div>
				<div>
					<label htmlFor='avi'>Image</label>
					<input
						type='file'
						name='image'
						id='avi'
						onChange={getValuesHandler}
					/>
				</div>
				<div className=' d-flex justify-content-center'>
					<button
						onClick={cancelHandler}
						disabled={isLoading}
						className='btn btn-primary me-3'
					>
						Cancel
					</button>
					<button disabled={isLoading} className='btn btn-primary ms-3'>
						{isLoading ? 'Submitting...' : 'Save'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditPostForm;
