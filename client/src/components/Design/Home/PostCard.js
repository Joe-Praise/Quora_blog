import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import Card from '../../UI/Card';
import { Link, useRouteLoaderData } from 'react-router-dom';
import LikeAndUnlikeBtn from '../../UI/LikeAndUnlikeBtn';
import CommentAndRepost from '../../UI/CommentAndRepost';
import { FaRegComment } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import Button from '../../UI/Button';
import { format } from 'date-fns';
import { AppContext } from '../../../helper/context';

export function followHandler(
	loggedInuserId,
	authorId,
	reloadFollowing,
	reloadPost
) {
	const followPayload = {
		follower: loggedInuserId,
	};

	fetch(process.env.REACT_APP_API_URL + '/api/v1/follow/profile/' + authorId, {
		method: 'POST',
		body: JSON.stringify(followPayload),
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});
	reloadFollowing(true);
	reloadPost(true);
}

const PostCard = (props) => {
	const data = useRouteLoaderData('userProfile');
	const initialRef = useRef(true);
	const userInfo = data;
	const { setGetLogin, setReloadFollowing, setReload } = useContext(AppContext);
	const [filteredComments, setFilteredComments] = useState([]);
	const [commentValue, setCommentValue] = useState('');
	const [reaction, setReaction] = useState(false);
	const [isCommentActive, setIsCommentActive] = useState(false);
	const [loader, setLoader] = useState(false);
	const [postedComment, setPostedComment] = useState(false);
	const [selected, setSelected] = useState('');
	const [like, setLike] = useState(props.post.like || 0);
	const [unlike, setUnlike] = useState(props.post.dislike || 0);
	const [loading, setLoading] = useState(false);

	const postReaction = (input, id) => {
		fetch(process.env.REACT_APP_API_URL + `/api/v1/post/${id}/reaction`, {
			method: 'POST',
			body: JSON.stringify(input),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
	};

	const likeHandler = () => {
		getLikesHandler();
		setReaction(true);
		const reaction = {
			like: true,
			dislike: false,
		};
		postReaction(reaction, props.post._id);
	};

	const unlikeHandler = () => {
		getUnlikeHandler();
		setReaction(true);
		const reaction = {
			like: false,
			dislike: true,
		};
		postReaction(reaction, props.post._id);
	};

	const getLikesHandler = () => {
		if (selected === '') {
			setLike((prevState) => prevState + 1);
			setSelected('like');
		} else if (selected === 'like') {
			setLike((prevState) => prevState - 1);
			setSelected('');
		} else if (selected === 'dislike') {
			setLike((prevState) => prevState + 1);
			setUnlike((prevState) => prevState - 1);
			setSelected('like');
		}
	};

	const getUnlikeHandler = () => {
		if (selected === '') {
			setUnlike((prevState) => prevState + 1);
			setSelected('dislike');
		} else if (selected === 'dislike') {
			setUnlike((prevState) => prevState - 1);
			setSelected('');
		} else if (selected === 'like') {
			setUnlike((prevState) => prevState + 1);
			setLike((prevState) => prevState - 1);
			setSelected('dislike');
		}
	};

	const commentRevealHandler = async () => {
		setLoading(true);
		setLoader(true);
		const response = await fetch(
			process.env.REACT_APP_API_URL + `/api/v1/post/${props.post._id}/comments`
		);
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}
		const data = await response.json();
		setIsCommentActive((prevState) => !prevState);
		setGetLogin((prevState) => !prevState);
		setLoader(false);
		setFilteredComments(data.data);
		setLoading(false);
	};

	const getCommentsHandler = useCallback(async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + `/api/v1/post/${props.post._id}/comments`
		);
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}
		const data = await response.json();
		setFilteredComments(data.data);
		setGetLogin((prevState) => !prevState);
	}, [props.post._id, setFilteredComments, setGetLogin]);

	const postCommentHandler = async () => {
		const comment = {
			content: commentValue,
		};

		const response = await fetch(
			process.env.REACT_APP_API_URL + `/api/v1/posts/${props.post._id}/comment`,
			{
				method: 'POST',
				body: JSON.stringify(comment),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			}
		);

		const data = await response.json();

		if (data.success) {
			setCommentValue('');
			setPostedComment(true);
			setGetLogin((prevState) => !prevState);
			const tweakedData = {
				...data.data,
				authorId: userInfo.data,
			};
			setFilteredComments((prevState) => [tweakedData, ...prevState]);
		} else {
			return;
		}
	};

	// console.log(userInfo.data);
	const deleteCommentHandler = async (id) => {
		setGetLogin((prevState) => !prevState);
		await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/delete-comment/' + id,
			{
				method: 'DELETE',
			}
		);
		const deletedComment = filteredComments.filter(
			(comment) => comment._id !== id
		);
		setFilteredComments(deletedComment);
	};

	useEffect(() => {
		if (initialRef.current) {
			return;
		}

		if (postedComment) {
			getCommentsHandler();
			setPostedComment(false);
		}
	}, [postedComment, reaction, props.post._id, getCommentsHandler]);

	console.log(filteredComments);

	let displayComment;
	if (isCommentActive) {
		displayComment = (
			<React.Fragment>
				<>
					{!loader && (
						<div className='d-flex py-1 px-lg-2 px-1 pt-2 align-items-center justify-content-center'>
							<figure className='me-lg-3 pt-3 me-1 w-auto'>
								<img
									src={
										process.env.REACT_APP_API_URL +
										'/uploads/' +
										props.post.authorId.image
									}
									alt='logo'
									className='img--nav'
								/>
							</figure>
							<form className='flex-basis--70'>
								<input
									className='text-secondary bg-light rounded-pill border p-lg-2 p-1 cursor-pointer w-100 outline--blue'
									type='text'
									placeholder='Add a comment...'
									value={commentValue}
									onChange={(e) => {
										setCommentValue(e.target.value);
									}}
								/>
							</form>

							<Button
								onClick={postCommentHandler}
								className='rounded-pill p-1 p-lg-2 ms-2 border-0 bg-primary text-white w-auto font-tiny'
							>
								Add comment
							</Button>
						</div>
					)}
					{loader && (
						<div className='dots-container'>
							<span className='dot'></span>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
					)}

					{filteredComments.length === 0 && !loading ? (
						<p className='text-center fw-bold fs-xl-5'>No comment found!</p>
					) : (
						filteredComments?.map((comment, index) => {
							return (
								<Card
									className='p-2 p-lg-3 mb-0 border-0 rounded-0 border-bottom'
									key={comment.authorId + index + 'C'}
								>
									<div className='d-flex justify-content-between'>
										<div className='d-flex'>
											<figure className=''>
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
											{comment.authorId._id === userInfo.data._id && (
												<button
													type='button'
													className='btn-close'
													aria-label='Close'
													onClick={() => deleteCommentHandler(comment._id)}
												></button>
											)}
										</div>
									</div>

									{/* this will be the body of the blog post and link */}
									<div>
										<article className='clearfix'>
											<p className='p-0 m-0'>{comment.content}</p>
										</article>
									</div>

									{/* where the like, unlike & comment */}
									<div className='d-flex justify-content-between align-items-center mt-0'>
										<div className=' d-flex justify-content-start  align-items-center'></div>

										<div className='cursor-pointer'>
											<BsThreeDots className='post--icon' />
										</div>
									</div>
								</Card>
							);
						})
					)}
				</>
			</React.Fragment>
		);
	}

	return (
		<Card className='p-2 p-lg-3 mb-2 position-relative'>
			<div className='d-flex justify-content-between'>
				<div className='d-flex align-items-center'>
					<Link to={`/profile/${props.post.authorId._id}`}>
						<figure className='m-0'>
							<img
								className='img-fluid img--profile--thumbnail'
								src={
									process.env.REACT_APP_API_URL +
									'/uploads/' +
									props.post.authorId.image
								}
								alt='default png'
							/>
						</figure>
					</Link>
					<div className='ps-1 ps-lg-2'>
						<div className='fw-bold'>
							<Link
								to={`/profile/${props.post.authorId._id}`}
								className='link--underline'
							>
								{props.post.authorId.name}
							</Link>
							{userInfo._id === props.post.authorId._id ? null : (
								<>
									{' '}
									•{' '}
									<span
										className='font-tiny text-primary fw-normal cursor-pointer'
										onClick={() =>
											followHandler(
												userInfo._id,
												props.post.authorId._id,
												setReloadFollowing,
												setReload
											)
										}
									>
										{props.post.following === true ? 'Following' : 'Follow'}
									</span>
								</>
							)}
						</div>
						<span className='text-secondary'>
							{props.post.occupation} since {props.post.accCreatedYear} •{' '}
							<span>
								{format(new Date(props.post.createdAt), 'MMM d, HH:mm')}
							</span>
						</span>
					</div>
				</div>
			</div>

			{/* the body of the blog post and link */}
			<article className='mt-2 position-relative'>
				<Link to={`/post/${props.post._id}`} className='link_backdrop'>
					<div>
						<p className='cutoff--text'>{props.post.content}</p>
						<span className='viewMore'>(More)</span>
					</div>
					{/* if there is an image uplaod this will take the file */}
					{props.post.image && (
						<img
							className='post-img w-100'
							src={
								process.env.REACT_APP_API_URL + '/uploads/' + props.post.image
							}
							alt=''
						/>
					)}
				</Link>
			</article>

			{/* where the like, unlike, comment and repost buttons dwells */}
			<div className='d-flex justify-content-between align-items-center mt-2'>
				<div className=' d-flex justify-content-start  align-items-center'>
					<LikeAndUnlikeBtn
						onLike={likeHandler}
						onUnlike={unlikeHandler}
						like={like}
						dislike={unlike}
					/>
					<CommentAndRepost value={''} onAction={commentRevealHandler}>
						<FaRegComment className='post--icon' />
					</CommentAndRepost>

					<CommentAndRepost value=''>
						<TbRefresh className='post--icon' />
					</CommentAndRepost>
				</div>

				<div className='cursor-pointer'>
					<BsThreeDots className='post--icon' />
				</div>
			</div>
			<div>{displayComment}</div>
			{loader === true && (
				<div className='like--bg mt-2 p-2'>
					{filteredComments.length
						? `${filteredComments.length} comments`
						: `Loading comments...`}
				</div>
			)}
		</Card>
	);
};

export default PostCard;
