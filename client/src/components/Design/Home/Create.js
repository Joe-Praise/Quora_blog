import React, { useContext, useState } from 'react';
import Card from '../../UI/Card';
import CreateOptionBtn from '../../UI/CreateOptionBtn';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { SlNote } from 'react-icons/sl';
import { BiPencil } from 'react-icons/bi';
import PostCard from './PostCard';
import PostModal from './PostModal';
import { AppContext } from '../../../helper/context';

const Create = ({ userInfo }) => {
	const { updatedPost } = useContext(AppContext);
	const [popModal, setPopModal] = useState(false);

	const openOptionHandler = () => {
		setPopModal((prevState) => !prevState);
		document.body.style.overflowY = 'auto';
	};

	// function compile(post, following) {
	//   let copiedPost = [...post];
	//   for(let i = 0; i < following.length; i++){
	//     const singleFollowed = following[i]
	//     for(let j = 0; j < post.length; j++ ){
	//       if(singleFollowed.followee._id === post[j].authorId._id){
	//         copiedPost[j].following = true;
	//       }
	//     }
	//   }

	// //   let copiedPostAuthorId = {};
	// //   let copiedFollowingAuthorId = {};
	// //   let counter = 0;

	// //   for (let i = 0; i < copiedPost.length; i++) {
	// //     if (copiedPostAuthorId[copiedPost[i].authorId._id] === true) {
	// //       continue;
	// //     }
	// //     counter++;
	// //     copiedPostAuthorId[copiedPost[i].authorId._id] = true;
	// //   }

	// //   for (let i = 0; i < following.length; i++) {

	// //     // copiedFollowingAuthorId[following[i].followee._id] = true;
	// //   }

	// //   // for(let i = 0;  i < copiedPostAuthorId.length; i++){

	// //   // }

	// //   console.log(copiedFollowingAuthorId);
	// //   console.log(copiedPostAuthorId);
	//   setUpdatedPost(copiedPost);
	//   return copiedPost;
	// }

	// console.log(test)

	// useEffect(() => {
	//   if(reloadFollowing){
	//     compile(posts, following);
	//   }
	//   compile(posts, following);

	// }, [posts, following, reloadFollowing]);

	return (
		<div className='indexContent'>
			<Card className={`create--btn`}>
				<div className='d-flex py-1 px-lg-2 px-1 align-items-center'>
					<figure className='me-lg-3 me-1 pt-2'>
						<img
							src={process.env.REACT_APP_API_URL + '/uploads/' + userInfo.image}
							alt='logo'
							className='img--nav'
						/>
					</figure>
					<div
						className='text-secondary bg-light rounded-pill border p-lg-2 p-1 cursor-pointer w-100'
						onClick={openOptionHandler}
					>
						What do you want to ask or share?
					</div>
				</div>

				<div className='w-100 mx-auto d-flex justify-content-between align-item-center'>
					<CreateOptionBtn value='Ask'>
						<RiQuestionnaireLine className='post--icon' />
					</CreateOptionBtn>
					|
					<CreateOptionBtn value='Answer'>
						<SlNote className='post--icon' />
					</CreateOptionBtn>
					|
					<CreateOptionBtn onClick={openOptionHandler} value='Post'>
						<BiPencil className='post--icon' />
					</CreateOptionBtn>
				</div>
			</Card>

			<div className='mt-3'>
				{updatedPost.map((post, index) => {
					return (
						<PostCard
							post={post}
							key={index}
							// onDelete={deleteHandler}
						/>
					);
				})}
			</div>
			{popModal && (
				<PostModal
					onConfirm={openOptionHandler}
					onOpen={popModal}
					resetModal={setPopModal}
				/>
			)}
		</div>
	);
};

export default Create;
