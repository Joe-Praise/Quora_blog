import React, { useContext, useState } from 'react';
import img from '../../../Images/head.webp';
import PostCard from '../Home/PostCard';
import { Link } from 'react-router-dom';
import { SlNote } from 'react-icons/sl';
import { BsThreeDots } from 'react-icons/bs';
import { RxThickArrowDown } from 'react-icons/rx';
import LikeAndUnlikeBtn from '../../UI/LikeAndUnlikeBtn';
import CommentAndRepost from '../../UI/CommentAndRepost';
import { FaRegComment } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import fireboy from '../../../Images/spotify1.jfif';
import Card from '../../UI/Card';
import { RiChatFollowUpLine } from 'react-icons/ri';
import { AppContext } from '../../../helper/context';

const Activities = ({ onCurrentProfile }) => {
	const [activities, setActivities] = useState('profile');
	const [currentActive, setCurrentActive] = useState('profile');
	const [profile] = useState([
		{
			id: 1,
			img: img,
			title: 'The Software Engineering Story',
			followers: '45',
			advice: 'Ask questions, learn from the best, and succeed in your field!',
		},
		{
			id: 2,
			img: img,
			title: 'The Spaceship Engineering Story',
			followers: '700',
			advice: 'Ask questions, learn from the best, and succeed in your field!',
		},
	]);
	const { updatedPost } = useContext(AppContext);
	const filteredPost = updatedPost.filter(
		(post) => post.authorId._id === onCurrentProfile._id
	);

	let FilteredActivity;
	const profileHandler = () => {
		setCurrentActive('profile');
		setActivities('profile');
	};
	const answerHandler = () => {
		setCurrentActive('answer');
		setActivities('answer');
	};
	const questionHandler = () => {
		setCurrentActive('question');
		setActivities('question');
	};
	const postHandler = () => {
		setCurrentActive('post');
		setActivities('post');
	};
	const followersHandler = () => {
		setCurrentActive('followers');
		setActivities('followers');
	};
	const followingHandler = () => {
		setCurrentActive('following');
		setActivities('following');
	};
	const editHandler = () => {
		setCurrentActive('edit');
		setActivities('edit');
	};
	const activityHandler = () => {
		setCurrentActive('activity');
		setActivities('activity');
	};

	if (activities === 'profile') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex alig'>
					<div className='fw-bold'>{filteredPost.length} Profile</div>
					<div className='text-secondary ms-auto'>Most recent ∇</div>
				</div>
				{filteredPost.map((post, index) => {
					return <PostCard post={post} key={index} />;
				})}
			</React.Fragment>
		);
	}

	if (activities === 'answer') {
		FilteredActivity = (
			<div className=''>
				<div className='border-top border-bottom py-2 d-flex alig'>
					<div className='fw-bold'>Answer</div>
					<div className='text-secondary ms-auto'>Most recent ∇</div>
				</div>
				{profile.map((item) => {
					return (
						<div
							className='d-flex justify-content-between border-top border-bottom py-2'
							key={item.id}
						>
							<div className='d-flex'>
								<figure className=''>
									<img
										className='img-fluid img--profile--thumbnail'
										src={item.img}
										alt='default png'
									/>
								</figure>
								<div className='ps-2 ps-lg-3'>
									<div className='fw-bold fs-5'>{item.title}</div>
									<div className='text-secondary font-tiny'>
										{item.followers} followers
									</div>
									<div className='text-secondary font-tiny'>{item.advice}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	if (activities === 'question') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex'>
					<div className='fw-bold'>0 Question</div>
					<div className='text-secondary ms-auto'>Most recent ∇</div>
				</div>
				<div className='border-top border-bottom py-1'>
					<Link to='' className='fw-bold link my-1 text-dark'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quae
						nam nesciunt cum porro a molestias eveniet obcaecati non voluptate!
					</Link>
					<p className='text-secondary fw-bold'>
						11 answer ·
						<span className='font-tiny fw-normal'>Last followed Nov 2</span>
					</p>
					<div className='d-flex align-items-center'>
						<div className='border d-inline rounded-pill createPost--btn p-2 px-3 cursor-pointer'>
							<SlNote className='icons d-inline' />
							<span className='text-secondary ps-1'>Answer</span>
						</div>
						<div className='ms-auto'>
							<span className='rounded-pill p-2 cursor-pointer mx-1 createPost--btn'>
								<RxThickArrowDown className='icons d-inline' />
							</span>
							<span className='p-2 rounded-pill cursor-pointer createPost--btn'>
								<BsThreeDots className='icons d-inline' />
							</span>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	if (activities === 'post') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex'>
					<div className='fw-bold'>0 Post</div>
					<div className='text-secondary ms-auto'>Most recent ∇</div>
				</div>

				<div className='py-2 border-top border-bottom'>
					<div className=''>
						<div className='d-flex'>
							<figure className=''>
								<img
									className='img-fluid img--profile--thumbnail'
									src={img}
									alt='default png'
								/>
							</figure>
							<div className='ps-1 ps-lg-2'>
								<div className='fw-bold'>
									Nelson John •{' '}
									<span className='font-tiny text-primary fw-normal cursor-pointer'>
										Follow
									</span>
								</div>
								<span className='text-secondary'>
									Small Business owner since 1994 • 2y
								</span>
							</div>
						</div>
						<article>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
								soluta.
							</p>
						</article>
					</div>
					<div className=' mx-auto'>
						<Card className='p-2 p-lg-3 mb-2 '>
							<div className=''>
								<div className='d-flex'>
									<figure className=''>
										<img
											className='img-fluid img--profile--thumbnail'
											src={img}
											alt='default png'
										/>
									</figure>
									<div className='ps-1 ps-lg-2'>
										<div className='fw-bold'>
											Nelson John ·{' '}
											<span className='font-tiny text-primary fw-normal'>
												Follow
											</span>
										</div>
										<span className='text-secondary'>
											Small Business owner since 1994 · 2y
										</span>
									</div>
								</div>
							</div>

							{/* this will be the body of the blog post and link */}

							<div>
								<Link to='' className='fs-5 fw-bold link--underline text-dark'>
									What is your best small business advice?
								</Link>
								<article className='clearfix'>
									<div className='cutoff--text'>
										This will be whatever is gotten from the create post input
										field... but since i want to practice the reveal text thingy
										i'm going to type alot here and also add lorem text for the
										sake of it. Here we go... Lorem ipsum dolor sit amet
										consectetur adipisicing elit. Doloribus laboriosam
										aspernatur dolore commodi, sed voluptates eligendi. Aliquam
										voluptatem excepturi id! Lorem ipsum dolor sit amet
										consectetur adipisicing elit. Illum voluptas, est dolores ea
										earum unde quaerat odio dolorem! Impedit esse officiis
										doloribus amet consequuntur. Alias suscipit temporibus ipsam
										corporis labore, culpa perferendis maxime exercitationem
										molestiae error sequi molestias, excepturi eum.
										{/* if there is an image uplaod this will take the file */}
										<img className=' post-img w-100' src={fireboy} alt='' />
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Itaque illum earum necessitatibus iste totam nihil fugiat
										aut repellendus vero error!
									</div>
									<input type='checkbox' className='viewMore' />
								</article>
							</div>
						</Card>
					</div>
					<div className='d-flex justify-content-between align-items-center mt-1'>
						<div className=' d-flex justify-content-start  align-items-center'>
							<LikeAndUnlikeBtn />
							<CommentAndRepost value='61' className>
								<FaRegComment className='post--icon' />
							</CommentAndRepost>

							<CommentAndRepost value='159'>
								<TbRefresh className='post--icon' />
							</CommentAndRepost>
						</div>

						<div className='cursor-pointer'>
							<BsThreeDots className='post--icon' />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	if (activities === 'followers') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex'>
					<div className='fw-bold'>0 Followers</div>
				</div>

				<div className='d-flex justify-content-between align-items-center py-2 border-top border-bottom'>
					<div className='d-flex'>
						<figure className=''>
							<img
								className='img-fluid img--profile--thumbnail'
								src={img}
								alt='default png'
							/>
						</figure>
						<div className='ps-1 ps-lg-2'>
							<div className='fw-bold'>Nelson John</div>
							<span className='text-secondary'>5 followers</span>
						</div>
					</div>
					<div className='border border-primary d-inline rounded-pill createPost--btn p-2 px-3 cursor-pointer h-75'>
						<RiChatFollowUpLine className='icons d-inline fill--follow-icon' />
						<span className='text-primary ps-1'>Follow</span>
					</div>
				</div>
			</React.Fragment>
		);
	}

	if (activities === 'following') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex'>
					<div className='fw-bold'>0 Following</div>
					<div className='text-secondary ms-auto'>Space ∇</div>
				</div>
				{profile.map((item) => {
					return (
						<div
							className='d-flex justify-content-between border-top border-bottom py-2'
							key={item.id}
						>
							<div className='d-flex align-items-center'>
								<figure className=''>
									<img
										className='img-fluid img--profile--thumbnail'
										src={item.img}
										alt='default png'
									/>
								</figure>
								<div className='ps-2 ps-lg-3'>
									<div className='fw-bold fs-6'>{item.title}</div>
									<div className='text-secondary font-tiny'>
										{item.followers} followers
									</div>
									<div className='text-secondary font-tiny'>{item.advice}</div>
								</div>
							</div>
						</div>
					);
				})}
			</React.Fragment>
		);

		if (activities === 'activity') {
			FilteredActivity = (
				<React.Fragment>
					<div className='py-2 border-top border-bottom'>
						<div className=''>
							<div className='d-flex'>
								<figure className=''>
									<img
										className='img-fluid img--profile--thumbnail'
										src={img}
										alt='default png'
									/>
								</figure>
								<div className='ps-1 ps-lg-2'>
									<div className='fw-bold'>
										Nelson John •{' '}
										<span className='font-tiny text-primary fw-normal cursor-pointer'>
											Follow
										</span>
									</div>
									<span className='text-secondary'>
										Small Business owner since 1994 • 2y
									</span>
								</div>
							</div>
							<article>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
									soluta.
								</p>
							</article>
						</div>
						<div className=' mx-auto'>
							<Card className='p-2 p-lg-3 mb-2 '>
								<div className=''>
									<div className='d-flex'>
										<figure className=''>
											<img
												className='img-fluid img--profile--thumbnail'
												src={img}
												alt='default png'
											/>
										</figure>
										<div className='ps-1 ps-lg-2'>
											<div className='fw-bold'>
												Nelson John •{' '}
												<span className='font-tiny text-primary fw-normal'>
													Follow
												</span>
											</div>
											<span className='text-secondary'>
												Small Business owner since 1994 • 2y
											</span>
										</div>
									</div>
								</div>

								{/* this will be the body of the blog post and link */}

								<div>
									<Link
										to=''
										className='fs-5 fw-bold link--underline text-dark'
									>
										What is your best small business advice?
									</Link>
									<article className='clearfix'>
										<p className='cutoff--text'>
											This will be whatever is gotten from the create post input
											field... but since i want to practice the reveal text
											thingy i'm going to type alot here and also add lorem text
											for the sake of it. Here we go... Lorem ipsum dolor sit
											amet consectetur adipisicing elit. Doloribus laboriosam
											aspernatur dolore commodi, sed voluptates eligendi.
											Aliquam voluptatem excepturi id! Lorem ipsum dolor sit
											amet consectetur adipisicing elit. Illum voluptas, est
											dolores ea earum unde quaerat odio dolorem! Impedit esse
											officiis doloribus amet consequuntur. Alias suscipit
											temporibus ipsam corporis labore, culpa perferendis maxime
											exercitationem molestiae error sequi molestias, excepturi
											eum.
											{/* if there is an image uplaod this will take the file */}
											<figure className='w-100 pt-2'>
												<img className=' post-img w-100' src={fireboy} alt='' />
											</figure>
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Itaque illum earum necessitatibus iste totam nihil fugiat
											aut repellendus vero error!
											{/* where the like, unlike, comment and repost buttons dwells */}
											<div className='d-flex justify-content-between align-items-center mt-1'>
												<div className=' d-flex justify-content-start  align-items-center'>
													<LikeAndUnlikeBtn />
													<CommentAndRepost value='61' className>
														<FaRegComment className='post--icon' />
													</CommentAndRepost>

													<CommentAndRepost value='159'>
														<TbRefresh className='post--icon' />
													</CommentAndRepost>
												</div>

												<div className='cursor-pointer'>
													<BsThreeDots className='post--icon' />
												</div>
											</div>
										</p>
										<input type='checkbox' className='viewMore' />
									</article>
								</div>
							</Card>
						</div>
						<div className='d-flex justify-content-between align-items-center mt-1'>
							<div className=' d-flex justify-content-start  align-items-center'>
								<LikeAndUnlikeBtn />
								<CommentAndRepost value='61' className>
									<FaRegComment className='post--icon' />
								</CommentAndRepost>

								<CommentAndRepost value='159'>
									<TbRefresh className='post--icon' />
								</CommentAndRepost>
							</div>

							<div className='cursor-pointer'>
								<BsThreeDots className='post--icon' />
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}

	if (activities === 'activity') {
		FilteredActivity = (
			<React.Fragment>
				<div className='border-top border-bottom py-2 d-flex alig'>
					<div className='fw-bold'>Profile</div>
				</div>
				<Card className='p-2 p-lg-3 mb-2 border-start-0 borderend-0'>
					<div className='d-flex justify-content-between'>
						<div className='d-flex'>
							<figure className=''>
								<img
									className='img-fluid img--profile--thumbnail'
									src={img}
									alt='default png'
								/>
							</figure>
							<div className='ps-1 ps-lg-2'>
								<div className='fw-bold'>
									Nelson John •{' '}
									<span className='font-tiny text-primary fw-normal'>
										Follow
									</span>
								</div>
								<span className='text-secondary'>
									Small Business owner since 1994 • 2y
								</span>
							</div>
						</div>
					</div>

					{/* this will be the body of the blog post and link */}

					<div>
						<Link to='' className='fs-5 fw-bold link--underline text-dark'>
							What is your best small business advice?
						</Link>
						<article className='clearfix'>
							<p className='cutoff--text'>
								This will be whatever is gotten from the create post input
								field... but since i want to practice the reveal text thingy i'm
								going to type alot here and also add lorem text for the sake of
								it. Here we go... Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Doloribus laboriosam aspernatur dolore
								commodi, sed voluptates eligendi. Aliquam voluptatem excepturi
								id! Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Illum voluptas, est dolores ea earum unde quaerat odio dolorem!
								Impedit esse officiis doloribus amet consequuntur. Alias
								suscipit temporibus ipsam corporis labore, culpa perferendis
								maxime exercitationem molestiae error sequi molestias, excepturi
								eum.
								{/* if there is an image uplaod this will take the file */}
								<img className=' post-img w-100' src={fireboy} alt='' />
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
								illum earum necessitatibus iste totam nihil fugiat aut
								repellendus vero error!
							</p>
							<input type='checkbox' className='viewMore' />
						</article>
					</div>

					{/* where the like, unlike, comment and repost buttons dwells */}
					<div className='d-flex justify-content-between align-items-center mt-1'>
						<div className=' d-flex justify-content-start  align-items-center'>
							<LikeAndUnlikeBtn />
							<CommentAndRepost value='61' className>
								<FaRegComment className='post--icon' />
							</CommentAndRepost>

							<CommentAndRepost value='159'>
								<TbRefresh className='post--icon' />
							</CommentAndRepost>
						</div>

						<div className='cursor-pointer'>
							<BsThreeDots className='post--icon' />
						</div>
					</div>

					{/* <div className="like--bg mt-2 p-2">
        82 comments from Darshan Veershetty and morer
      </div> */}
				</Card>
			</React.Fragment>
		);
	}
	return (
		<div>
			<ul className=' unordered-list text-secondary cursor-pointer mt-2'>
				<li
					onClick={profileHandler}
					className={currentActive === 'profile' ? 'active-activity' : null}
				>
					Profile
				</li>
				<li
					onClick={answerHandler}
					className={currentActive === 'answer' ? 'active-activity' : null}
				>
					Answers
				</li>
				<li
					onClick={questionHandler}
					className={currentActive === 'question' ? 'active-activity' : null}
				>
					Questions
				</li>
				<li
					onClick={postHandler}
					className={currentActive === 'post' ? 'active-activity' : null}
				>
					Posts
				</li>
				<li
					onClick={followersHandler}
					className={currentActive === 'followers' ? 'active-activity' : null}
				>
					Followers
				</li>
				<li
					onClick={followingHandler}
					className={currentActive === 'following' ? 'active-activity' : null}
				>
					Following
				</li>
				<li
					onClick={editHandler}
					className={currentActive === 'edit' ? 'active-activity' : null}
				>
					Edits
				</li>
				<li
					onClick={activityHandler}
					className={currentActive === 'activity' ? 'active-activity' : null}
				>
					Activity
				</li>
			</ul>
			{profile.length < 1 ? (
				<div className='border-top border-bottom py-2'>0 Result found</div>
			) : (
				<div>{FilteredActivity}</div>
			)}
		</div>
	);
};

export default Activities;
