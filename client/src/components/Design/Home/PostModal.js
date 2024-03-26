import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	Fragment,
} from 'react';
import ReactDom from 'react-dom';
import Card from '../../UI/Card';
import { CiGlobe } from 'react-icons/ci';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { IoImagesOutline } from 'react-icons/io5';
import Button from '../../UI/Button';
import { AppContext } from '../../../helper/context';
import PopUp from '../../../helper/PopUp';
import { makeRequest } from '../../../helper/FetchFunction';

const PostModal = (props) => {
	const { setReload } = useContext(AppContext);
	const [resData, setResData] = useState(false);
	const [dataMsg, setDataMsg] = useState('');
	const [currActive, setCurrentActive] = useState('create post');
	const [preview, setPreview] = useState();
	const [previewFile, setPreviewFile] = useState();
	const [file, setFile] = useState({
		image: '',
	});
	const contentref = useRef();
	const [space, setSpace] = useState('Movies');

	if (props.onOpen) document.body.style.overflowY = 'hidden';
	else document.body.style.overflowY = 'auto';

	useEffect(() => {
		if (!previewFile) return;
		let tmp = [];

		for (let i = 0; i < previewFile.length; i++) {
			tmp.push(URL.createObjectURL(previewFile[i]));
		}
		const objecturls = tmp;
		setPreview(objecturls);

		for (let i = 0; i < objecturls.length; i++) {
			return () => {
				URL.revokeObjectURL(objecturls[i]);
			};
		}
	}, [file, previewFile]);

	const addQuestionHandler = () => {
		setCurrentActive('add question');
	};

	const createPostHandler = () => {
		setCurrentActive('create post');
	};

	const getValuesHandler = (event) => {
		setPreviewFile(event.target.files);
		let name = event.target.name;
		if (name === 'image') {
			let file = event.target.files[0];
			setFile({ image: file });
		}
	};

	const postHandler = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('image', file.image);
		formData.append('content', contentref.current.value);
		formData.append('space', space);
		// formData.append("authorId", userInfo.id )

		// const response = await fetch(
		// 	process.env.REACT_APP_API_URL + '/api/v1/create-post',
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 		credentials: 'include',
		// 		headers: {
		// 			// 'Content-Type': 'application/json',
		// 			// 'Accept': 'application/json',
		// 			// 'Authorization': 'Bearer ' + token,
		// 		}
		// 	}
		// );

		const response = await makeRequest('POST', 'create-post', formData, true);

		const data = await response.json();
		if (data.error) {
			setDataMsg(data.message);
			setResData(true);
			setReload(false);
		} else {
			setDataMsg(data.message);
			setResData(true);
			setReload(true);
		}

		// props.onConfirm();
		document.body.style.overflowY = 'auto';
	};

	const Backdrop = () => {
		return <div className='back--drop' onClick={props.onConfirm}></div>;
	};

	let display;
	// layout for add question
	if (currActive === 'add question') {
		display = (
			<div className='balance--grid'>
				<div>working</div>
				<div className='border-top border-secondary d-flex align-items-center py-2 px-3 mt-auto'>
					<div>
						<RxLetterCaseCapitalize className='icons d-inline me-3 cursor-pointer' />
						<IoImagesOutline className='icons d-inline cursor-pointer' />
					</div>
					<Button className='rounded-pill px-3 py-1 ms-auto bg-primary fw-bold text-white border-0'>
						Post
					</Button>
				</div>
			</div>
		);
	}

	// layout for create post
	if (currActive === 'create post') {
		display = (
			<form className='balance--grid' onSubmit={postHandler}>
				<div>
					<div className='h-100'>
						<textarea
							className='border-0 text-area'
							placeholder='say something...'
							name='content'
							ref={contentref}
						></textarea>
						{preview &&
							preview.map((pic, i) => {
								return <img src={pic} alt='' className='previewImg' key={i} />;
							})}
					</div>
				</div>
				<div className='border-top border-secondary d-flex align-items-center py-2 px-3 mt-auto'>
					<div>
						<RxLetterCaseCapitalize className='icons d-inline me-3 cursor-pointer' />
						<span>
							<label htmlFor='image'>
								<IoImagesOutline className='icons d-inline cursor-pointer' />
							</label>
							<input
								type='file'
								id='image'
								onChange={getValuesHandler}
								name='image'
							/>
						</span>
					</div>
					<button className='rounded-pill px-3 py-1 ms-auto bg-primary fw-bold text-white border-0'>
						Post
					</button>
				</div>
			</form>
		);
	}

	let displayModal = (
		<Card className='post--Modal container-fluid'>
			<div>
				<div className='d-flex align-items-center my-3 px-3'>
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={props.onConfirm}
					></button>

					<div className='mx-auto cursor-pointer'>
						<CiGlobe className='d-inline icons' />
						{/* <span className="mx-1 text-secondary fw-bold">Everyone</span> */}
						<select
							name='space'
							value={space}
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
						{/* <TfiAngleDown className="d-inline" /> */}
					</div>
				</div>

				<div className='d-flex align-items-center justify-content-center text-center border-bottom border-1 border-secondary mt-3 fw-bold'>
					<p
						className={`w-50 m-0 hoverLinks py-3 ${
							currActive === 'add question' ? 'modal--active' : ''
						}`}
						onClick={addQuestionHandler}
					>
						Add Question
					</p>
					<p
						className={`w-50 m-0 hoverLinks py-3 ${
							currActive === 'create post' ? 'modal--active' : ''
						}`}
						onClick={createPostHandler}
					>
						Create Post
					</p>
				</div>
			</div>
			<div>{display}</div>
			{resData && (
				<Fragment>
					<PopUp message={dataMsg} btnAction={props.onConfirm} />
				</Fragment>
			)}
		</Card>
	);

	return (
		<React.Fragment>
			<div>{displayModal}</div>

			{ReactDom.createPortal(
				<Backdrop />,
				document.getElementById('backdrop--overlay')
			)}
		</React.Fragment>
	);
};

export default PostModal;
