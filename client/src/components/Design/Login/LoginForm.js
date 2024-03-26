import React, { useContext } from 'react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { useRef } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../helper/context';

const isEmail = (str) => {
	// eslint-disable-next-line
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		str
	);
};

const isPasswordStrong = (str) => {
	let strongPassword = new RegExp(
		'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'
		// "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
	);
	return strongPassword.test(str);
};

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: isEmail(action.value) };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: isEmail(state.value) };
	}
	return { value: '', isValid: '' };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: isPasswordStrong(action.value) };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: isPasswordStrong(state.value) };
	}
	return { value: '', isValid: '' };
};

const LoginForm = (props) => {
	const { getPostsHandler, getProfile, getAdminProfile } =
		useContext(AppContext);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const [formIsValid, setFormIsValid] = useState(false);
	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState(null);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;
	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 600);

		return () => {
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
		setFormIsValid(isEmail(event.target.value) && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
		setFormIsValid(emailState.isValid && isPasswordStrong(event.target.value));
		setErrMsg('');
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	// LOGIN FUNCTION
	const submitHandler = async (event) => {
		event.preventDefault();
		let url = process.env.REACT_APP_API_URL + '/login';
		if (props.use === 'admin') {
			url = process.env.REACT_APP_API_URL + '/admin/adminlogin';
		}

		let inputs = {
			email: emailState.value,
			password: passwordState.value,
		};

		if (formIsValid) {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(inputs),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			});

			const data = await response.json();
			if (data.message === 'Admin credentials ok') {
				const expiration = new Date();
				expiration.setHours(expiration.getHours() + 1);
				localStorage.setItem('adminExpiration', expiration.toISOString());
				getAdminProfile();
				navigate(data.redirect);
			} else if (data.message === 'User credentials ok') {
				const expiration = new Date();
				expiration.setHours(expiration.getHours() + 1);
				localStorage.setItem('expiration', expiration.toISOString());
				navigate(data.redirect);
				getProfile();
				getPostsHandler();
			} else {
				setErrMsg(data.message);
			}
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else if (!passwordIsValid) {
			passwordInputRef.current.focus();
		}
	};

	return (
		<div className={props.className}>
			<form onSubmit={submitHandler}>
				<legend className={`border-bottom fs-6 pb-2 mb-3 ${props.legend}`}>
					Login
				</legend>
				<Input
					label='Email'
					id='email'
					placeholder='Your email'
					ref={emailInputRef}
					name='email'
					type='email'
					isValid={emailIsValid}
					value={emailState.value}
					onBlur={validateEmailHandler}
					onChange={emailChangeHandler}
				/>

				{emailIsValid === false && (
					<p className='font-tiny text-danger'>
						No account found for this email. Retry, or Sign up for Quora.
					</p>
				)}

				<Input
					label='Password'
					id='password'
					placeholder='Your password'
					ref={passwordInputRef}
					name='password'
					type='password'
					isValid={passwordIsValid}
					value={passwordState.value}
					onBlur={validatePasswordHandler}
					onChange={passwordChangeHandler}
				/>
				{passwordIsValid === false && (
					<p className='font-tiny text-danger'>
						No account found for this password. Retry, or Sign up for Quora.
					</p>
				)}
				{errMsg !== '' && <p className='font-tiny text-danger'>{errMsg}</p>}

				<div className='display-flex align-items space-between'>
					<p className='text-secondary cursor-pointer pt-2 font-tiny text-decoration'>
						Forgot password?
					</p>
					<Button type='submit' className='btn btn-primary rounded-pill'>
						Login
					</Button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
