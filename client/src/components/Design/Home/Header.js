import React, { useContext, useState } from 'react';
import NavItem from '../../UI/NavItem';
import { AiFillHome } from 'react-icons/ai';
import { CgList } from 'react-icons/cg';
import { SlNote } from 'react-icons/sl';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { VscGlobe } from 'react-icons/vsc';
import { VscChevronDown } from 'react-icons/vsc';
import { CiSearch } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Logo from '../../UI/Logo';
import Button from '../../UI/Button';
import ProfileDropdown from './ProfileDropdown';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { AppContext } from '../../../helper/context';

const Header = () => {
	const userInfo = useRouteLoaderData('userProfile');
	const { posts, setFilterSpace } = useContext(AppContext);
	const [result, setResult] = useState();
	const [showPopup, setShowPopup] = useState(false);

	const searchHandler = (event) => {
		// Todo: filter from the api end point
		setResult();
	};

	const resetPosts = () => {
		setFilterSpace(posts);
	};

	const showPopUpHandler = () => {
		setShowPopup((prevState) => !prevState);
	};

	return (
		<nav className='w-100 bg-light shadow-sm z--index'>
			<div className='navbar mx-auto p-0 px-lg-3 max--width'>
				<ul className='container-fluid row p-0 m-0 g-0 align-items-center link--bg'>
					<li className=' logo--link col-12 col-sm-12 col-lg-1 text-center header header--color'>
						<Link to='/' onClick={resetPosts}>
							<Logo
								width='100px'
								height='50px'
								className='p-0 color--white d-none d-lg-block'
								fill='#b92b27'
							/>
						</Link>

						{/* NAV for the mobile screen */}
						<ul className='d-flex justify-content-between px-sm-3 px-2 m-0 col-12 g-0 align-items-center d-lg-none'>
							<NavItem
								className='nav--links col w-auto'
								linkClassName={'link--underline'}
							>
								<CiSearch className=' fill--icons' />
								<span className='font-tiny text-light '>Search</span>
							</NavItem>
							<NavItem className='nav--links col w-auto' onClick={resetPosts}>
								<Logo
									width='75px'
									height='50px'
									className='p-0 color--white col w-auto'
									fill='white'
								/>
							</NavItem>

							<NavItem
								className='nav--links col w-auto'
								linkClassName={'link--underline'}
							>
								<IoIosAddCircleOutline className='w-auto fill--icons' />{' '}
								<span className='font-tiny text-light'>Add</span>
							</NavItem>
						</ul>
					</li>

					<NavItem
						className='nav--links nav-li hoverLinks navLinksWidth'
						title='Home'
						to='/'
						onClick={resetPosts}
						linkClassName={({ isActive }) =>
							isActive ? 'activeNavLink link--underline' : 'link--underline'
						}
						end
					>
						<AiFillHome className='icons' />
					</NavItem>

					<NavItem
						className='nav--links nav-li hoverLinks navLinksWidth'
						title='Following'
					>
						<CgList className='icons' />
					</NavItem>

					<NavItem
						className='nav--links nav-li hoverLinks navLinksWidth position-relative'
						title='Answer'
					>
						<SlNote className='icons' />
						<span className='badge rounded-pill bg-danger Link--absolute'>
							9<span className='visually-hidden'>unread messages</span>
						</span>
					</NavItem>

					<NavItem
						to='space'
						className='nav--links nav-li hoverLinks navLinksWidth'
						title='Spaces'
						linkClassName={({ isActive }) =>
							isActive ? 'activeNavLink link--underline' : 'link--underline'
						}
					>
						<HiOutlineUserGroup className='icons' />
					</NavItem>

					<NavItem
						className='nav--links nav-li hoverLinks navLinksWidth position-relative'
						title='Notifications'
					>
						<IoNotificationsOutline className='icons' />
						<span className='badge rounded-pill bg-danger Link--absolute'>
							9<span className='visually-hidden'>unread messages</span>
						</span>
					</NavItem>

					<li className='nav--links search d-none d-lg-block w-25'>
						<form>
							<input
								placeholder='Search Quora'
								type='search'
								id='searchBar'
								value={result}
								onChange={searchHandler}
								className='form-control input-outline'
							/>
						</form>
					</li>

					<NavItem className='d-none d-xl-block'>
						<Button className=' nav--links hoverLinks rounded-pill p-1 font-tiny'>
							Try Quora+
						</Button>
					</NavItem>

					<li
						className={`col-1 text-center g-0 py-2 py-xl-2 m-0 col-lg-auto nav--links hoverLinks navLinksWidth position-relative cursor-pointer`}
						onClick={showPopUpHandler}
					>
						<img
							src={
								process.env.REACT_APP_API_URL +
								'/uploads/' +
								userInfo?.data?.image
							}
							alt='logo'
							className='img--nav'
						/>
						{showPopup && <ProfileDropdown userInfo={userInfo?.data} />}
					</li>

					<NavItem className='nav--links nav-li hoverLinks navLinksWidth'>
						<VscGlobe className='icons' />
					</NavItem>

					<li className='cursor-pointer nav--links d-none d-xl-block col-sm-1 text-center w-auto g-0 '>
						<span className='btn--pill p-1 font-tiny'>Add question</span>
						<span className='btn--pill-dropdown'>
							<VscChevronDown />
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
