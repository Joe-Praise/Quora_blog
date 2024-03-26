import React, {
	Fragment,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import PopUp from '../../../helper/PopUp';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { AppContext } from '../../../helper/context';
import Card from '../../UI/Card';
function containsSpecialChars(str) {
	// eslint-disable-next-line
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(str);
}

const isEmail = (str) => {
	// eslint-disable-next-line
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		str
	);
};

const isPasswordStrong = (str) => {
	let strongPassword = new RegExp(
		// eslint-disable-next-line
		'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
	);
	return strongPassword.test(str);
};

const nameReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.value,
			isValid:
				!containsSpecialChars(action.value) && action.value.trim().length >= 3,
		};
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid:
				!containsSpecialChars(state.value) && state.value.trim().length >= 3,
		};
	}
	return { value: '', isValid: '' };
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

const CreateUser = () => {
	const { getUsers, setReloadAdmin } = useContext(AppContext);
	const nameInputRef = useRef();
	const registerEmailRef = useRef();
	const registerPasswordRef = useRef();

	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const [FormValid, setFormValid] = useState(false);
	const [resData, setResData] = useState(false);
	const [dataMsg, setDataMsg] = useState('');
	const { isValid: nameIsValid } = nameState;
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const emailfocus = setTimeout(() => {
			if (!nameIsValid) {
				nameInputRef.current.focus();
			}
		}, 200);

		return () => {
			clearTimeout(emailfocus);
		};
	}, [nameIsValid]);

	const nameChangeHandler = (event) => {
		dispatchName({ type: 'USER_INPUT', value: event.target.value });
		setFormValid(
			!containsSpecialChars(event.target.value) &&
				emailState.isValid &&
				passwordState.isValid
		);
	};

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
		setFormValid(
			nameState.isValid &&
				isEmail(event.target.value) &&
				isPasswordStrong(event.target.value)
		);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
		setFormValid(
			nameState.isValid &&
				emailState.isValid &&
				isPasswordStrong(event.target.value)
		);
	};

	const validateNameHandler = () => {
		dispatchName({ type: 'INPUT_BLUR' });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const closeMessageHandler = () => {
		setResData(false);
	};

	const submitFormHandler = async (event) => {
		event.preventDefault();

		let inputs = {
			name: nameState.value,
			email: emailState.value,
			password: passwordState.value,
		};

		const response = await fetch(
			process.env.REACT_APP_API_URL + '/api/create-user',
			{
				method: 'POST',
				body: JSON.stringify(inputs),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		const data = await response.json();
		if (data.error) {
			setDataMsg(data.message);
			setResData(true);
		} else {
			setDataMsg(data.message);
			setResData(true);
		}
		getUsers();
		setReloadAdmin(true);
		nameState.value = '';
		emailState.value = '';
		passwordState.value = '';
	};

	return (
		<div>
			{resData && (
				<Fragment>
					<div className='back--drop' onClick={closeMessageHandler}></div>;
					<PopUp message={dataMsg} btnAction={closeMessageHandler} />
				</Fragment>
			)}
			<Card className='mt-xxl-5 create-User-Container-wrapper'>
				<div className='create-User-Container'>
					<h1>CREATE ACCOUNT</h1>
					<legend className='text-center fs-6'>
						Hey there! <br /> Let's get started
					</legend>
					<form className='sign_up_form' onSubmit={submitFormHandler}>
						<div>
							<Input
								label='Name'
								id='name'
								placeholder='What would you like to be called?'
								name='name'
								ref={nameInputRef}
								type='text'
								isValid={nameIsValid}
								value={nameState.value}
								onBlur={validateNameHandler}
								onChange={nameChangeHandler}
							/>
							{nameIsValid === false && (
								<p className='font-tiny text-danger'>
									Field should'nt contain special characters or Empty
								</p>
							)}

							<Input
								label='Email'
								id='email'
								placeholder='Enter Your email'
								name='email'
								ref={registerEmailRef}
								type='email'
								isValid={emailIsValid}
								value={emailState.value}
								onBlur={validateEmailHandler}
								onChange={emailChangeHandler}
							/>
							{emailIsValid === false && (
								<p className='font-tiny text-danger'>
									Enter valid email address
								</p>
							)}

							<Input
								label='Password'
								id='pwd'
								placeholder='Your password'
								name='password'
								ref={registerPasswordRef}
								type='password'
								isValid={passwordIsValid}
								value={passwordState.value}
								onBlur={validatePasswordHandler}
								onChange={passwordChangeHandler}
							/>
							{passwordIsValid === false && (
								<p className='font-tiny text-danger'>
									Requires special character, capital letter, number and min of
									8 characters{' '}
								</p>
							)}
						</div>
						<div className='border-top text-align--right p-2 start-0 end-0'>
							<Button
								className='btn btn-primary rounded-pill btn-color'
								disable={!FormValid}
								type={'submit'}
							>
								{'Create'}
							</Button>
						</div>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default CreateUser;
