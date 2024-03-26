import React from 'react';
import Logo from '../components/UI/Logo';
import Card from '../components/UI/Card';
// import AutoSignIn from '../components/Design/Login/AutoSignIn';
// import Google from '../components/UI/Google';
// import Facebook from '../components/UI/Facebook';
import LoginForm from '../components/Design/Login/LoginForm';
import { Link } from 'react-router-dom';
import LoginBottomLinks from '../components/Design/Login/LoginBottomLinks';
import { useState } from 'react';
import SignUp from '../components/Design/SIgnUp/SignUp';

const Login = () => {
	// const google = <Google />;
	// const facebook = <Facebook />;

	const [openModal, setOpenModal] = useState(false);

	const handleModal = () => {
		setOpenModal((prevState) => !prevState);
	};

	const bottomLinks = [
		{
			to: '',
			text: 'About',
		},
		{
			to: '',
			text: 'Careers',
		},
		{
			to: '',
			text: 'Privacy',
		},
		{
			to: '',
			text: 'Terms',
		},
		{
			to: '',
			text: 'Contact',
		},
		{
			to: '',
			text: 'Languages',
		},
		{
			to: '',
			text: 'Your Ad Choices',
		},
		{
			to: '',
			text: 'Press',
		},
		{
			to: '',
			text: '© Quora, Inc. 2023',
		},
	];
	return (
		<div className='login-page--bgImg d-flex flex-column justify-content-center'>
			<Card>
				<Logo className='text-center' />
				<p className='text-center fw-bold text-secondary p-2'>
					A place to share knowledge and better understand the world
				</p>

				<div className=' container-fluid login-container'>
					<div className='sign-up--container login-page-content'>
						<p className='text-secondary font-tiny'>
							By continuing you indicate that you agree to Quora’s{' '}
							<Link to='' className='link'>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link to='' className='link'>
								Privacy Policy
							</Link>
							.
						</p>
						{/* <AutoSignIn text='Continue with Google' svg={google} />

						<AutoSignIn text='Continue with Facebook' svg={facebook} /> */}

						<p
							onClick={handleModal}
							className='font-tiny text-center fw-bold text-secondary sign-up-text p-1 rounded-pill cursor-pointer'
						>
							sign up with email
						</p>
					</div>
					{openModal && <SignUp handleModal={handleModal} />}

					<LoginForm use={'users'} className='login-page-content px-2' />
				</div>

				<div className='border border-end-0 border-end-0 mt-4 p-3 font-tiny text-center '>
					New:{' '}
					<Link to='' className='link'>
						עברית
					</Link>
					,{' '}
					<Link to='' className='link'>
						العربية
					</Link>
					,{' '}
					<Link to='' className='link'>
						polski
					</Link>
					,{' '}
					<Link to='' className='link'>
						ગુજરાતી
					</Link>
					,{' '}
					<Link to='' className='link'>
						ಕನ್ನಡ
					</Link>
					,{' '}
					<Link to='' className='link'>
						മലയാളം
					</Link>{' '}
					and{' '}
					<Link to='' className='link'>
						తెలుగు
					</Link>
				</div>

				<div>
					<ul className='login-inline--list font-tiny'>
						{bottomLinks.map((link, index) => (
							<LoginBottomLinks
								key={index}
								to={link.to}
								text={link.text}
								className='text-dark'
							/>
						))}
					</ul>
				</div>
			</Card>
		</div>
	);
};

export default Login;
