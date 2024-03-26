import React, { useContext } from 'react';
import ReactDom from 'react-dom';
import Card from '../../UI/Card';
import { BsChevronRight } from 'react-icons/bs';
import DropDownLink from '../../UI/DropDownLink';
import { TiMessages } from 'react-icons/ti';
import { AiOutlineNotification } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoStatsChartOutline } from 'react-icons/io5';
import { BsBookmarks } from 'react-icons/bs';
import { FaQuora } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LoginBottomLinks from '../Login/LoginBottomLinks';
import { AppContext } from '../../../helper/context';

const ProfileDropdown = ({ userInfo }) => {
	const { setUserInfo } = useContext(AppContext);
	const navigate = useNavigate();
	const logoutHandler = () => {
		fetch(process.env.REACT_APP_API_URL + '/logout', {
			method: 'POST',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				localStorage.removeItem('expiration');
				navigate(data.redirect);
				setUserInfo({
					image: null,
					name: null,
					email: null,
					id: null,
				});
			});
	};

	const goToAdminHandler = () => {
		fetch(process.env.REACT_APP_API_URL + '/logout', {
			method: 'POST',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				localStorage.removeItem('expiration');
				navigate('/adminLogin');
				setUserInfo({
					image: '',
					name: '',
					email: '',
					id: '',
				});
			});
	};

	const Backdrop = () => {
		return <div className='back--drop'></div>;
	};
	return (
		<React.Fragment>
			<Card className='profile--dropdown bg-prpimary'>
				<Link
					to={`/profile/${userInfo._id}`}
					className='pb-3 p-3 border-bottom link--underline text-dark'
				>
					<figure className=''>
						<img
							className='img-fluid img--profile--thumbnail'
							src={process.env.REACT_APP_API_URL + '/uploads/' + userInfo.image}
							alt='default png'
						/>
					</figure>
					<div className='ps-1 ps-lg-2 d-flex'>
						<div className='fw-bold'>{userInfo.name}</div>
						<BsChevronRight className='ms-auto' />
					</div>
				</Link>

				<div className='border-bottom pb-2 px-3'>
					<DropDownLink value='Messages' to=''>
						<TiMessages className=' profile--dropdown-link-icon' />
					</DropDownLink>

					<DropDownLink value='Create Ads'>
						<AiOutlineNotification className=' profile--dropdown-link-icon' />
					</DropDownLink>

					<DropDownLink value='Monetization'>
						<BsCurrencyDollar className=' profile--dropdown-link-icon' />
					</DropDownLink>

					<DropDownLink value='Your content & stats'>
						<IoStatsChartOutline className=' profile--dropdown-link-icon' />
					</DropDownLink>

					<DropDownLink value='Bookmarks'>
						<BsBookmarks className=' profile--dropdown-link-icon' />
					</DropDownLink>

					<DropDownLink value='Try Quora+'>
						<FaQuora className=' profile--dropdown-link-icon' />
					</DropDownLink>
				</div>

				<div className='d-flex flex-column px-3'>
					{/* <Link
            to=""
            className="rounded createPost--btn p-1 py-2 link--underline"
            onClick={darkMoodHandler}
          >
            <span className="text-dark font-tiny ps-2">Dark mode</span>
            <span className="rounded bg-light px-1 float-end  text-dark fw-bold">
              off
            </span>
          </Link> */}
					<Link
						to=''
						className='rounded createPost--btn p-1 py-2 link--underline'
					>
						<span className='text-dark font-tiny ps-2 d-block'>Settings</span>
					</Link>
					<Link
						to=''
						className='rounded createPost--btn p-1 py-2 link--underline'
					>
						<span className='text-dark font-tiny ps-2 d-block'>Language</span>
					</Link>
					<Link
						to=''
						className='rounded createPost--btn p-1 py-2 link--underline'
					>
						<span className='text-dark font-tiny ps-2 d-block'>Help</span>
					</Link>
					<Link
						to=''
						className='rounded createPost--btn p-1 py-2 link--underline'
						onClick={goToAdminHandler}
					>
						<span className='text-dark font-tiny ps-2 d-block'>Admin</span>
					</Link>
					<div className='rounded createPost--btn p-1 py-2 link--underline cursor-pointer'>
						<span
							className='text-dark font-tiny ps-2 d-block'
							onClick={logoutHandler}
						>
							Logout
						</span>
					</div>
				</div>

				<div className='bg-light'>
					<ul className='row m-0 py-1'>
						<LoginBottomLinks
							text='About .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Careers .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Terms .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Privacy .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Acceptable Use .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Businesses .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Press .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
						<LoginBottomLinks
							text='Your Ad Choices .'
							className='font-tiny text-secondary'
							listClass='col-auto text-start m-0 p-0'
						/>
					</ul>
				</div>
			</Card>
			<React.Fragment>
				{ReactDom.createPortal(
					<Backdrop />,
					document.getElementById('backdrop--overlay')
				)}
			</React.Fragment>
		</React.Fragment>
	);
};

export default ProfileDropdown;
