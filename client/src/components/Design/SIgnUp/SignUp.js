import React, {
	useState,
	useReducer,
	useRef,
	useEffect,
	Fragment,
} from 'react';
import ReactDom from 'react-dom';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { GrFormClose } from 'react-icons/gr';
import Card from '../../UI/Card';
import PopUp from '../../../helper/PopUp';

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

const confirmEmailReducer = (state, action) => {
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

const SignUp = (props) => {
	const nameInputRef = useRef();
	const registerEmailRef = useRef();
	const registerPasswordRef = useRef();
	const confirmEmaiRef = useRef();

	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [confirmEmailState, dispatchConfirmEmail] = useReducer(
		confirmEmailReducer,
		{
			value: '',
			isValid: null,
		}
	);

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const [resData, setResData] = useState(false);
	const [dataMsg, setDataMsg] = useState('');
	const [showModal, setShowModal] = useState(0);
	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [modal3, setModal3] = useState(false);
	const { isValid: nameIsValid } = nameState;
	const { isValid: emailIsValid } = emailState;
	const { isValid: confrimEmailIsValid } = confirmEmailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const emailfocus = setTimeout(() => {
			if (!nameIsValid) {
				nameInputRef.current.focus();
			}
		}, 200);

		const confirmFocus = setTimeout(() => {
			if (showModal === 1) {
				confirmEmaiRef.current.focus();
			}
		}, 200);

		const passwordFocus = setTimeout(() => {
			if (showModal === 2) {
				registerPasswordRef.current.focus();
			}
		}, 200);

		return () => {
			clearTimeout(emailfocus, confirmFocus, passwordFocus);
		};
	}, [showModal, nameIsValid]);

	const nameChangeHandler = (event) => {
		dispatchName({ type: 'USER_INPUT', value: event.target.value });
		setModal1(!containsSpecialChars(event.target.value) && emailState.isValid);
	};

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
		setModal1(nameState.isValid && isEmail(event.target.value));
	};

	const confirmEmailChangeHandler = (event) => {
		dispatchConfirmEmail({ type: 'USER_INPUT', value: event.target.value });
		setModal2(event.target.value === emailState.value);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
		setModal3(isPasswordStrong(event.target.value));
	};

	const validateNameHandler = () => {
		dispatchName({ type: 'INPUT_BLUR' });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const confirmEmailHandler = () => {
		dispatchConfirmEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const nextFormHandler = () => {
		setShowModal((prevState) => prevState + 1);
	};

	const Backdrop = () => {
		return <div className='back--drop'></div>;
	};

	const submitFormHandler = async (event) => {
		event.preventDefault();

		let inputs = {
			name: nameState.value,
			email: emailState.value,
			password: passwordState.value,
		};

		const response = await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/create-user',
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
	};

	return (
		<div>
			{resData && (
				<Fragment>
					<PopUp message={dataMsg} btnAction={props.handleModal} />
				</Fragment>
			)}
			<Card className='modal-things border-radius10'>
				<GrFormClose onClick={props.handleModal} className='text-left icon' />
				<form onSubmit={submitFormHandler}>
					{showModal === 0 && (
						<React.Fragment>
							<div>
								<legend className='fs-5 pt-2 mb-3 fw-bold'>Sign up</legend>

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
									placeholder='Your email'
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
							</div>

							<div className='border-top text-align--right p-2 position-absolute bottom-0 start-0 end-0'>
								<Button
									onClick={nextFormHandler}
									className='btn btn-primary rounded-pill btn-color'
									disable={!modal1}
								>
									{'Next'}
								</Button>
							</div>
						</React.Fragment>
					)}
					{showModal === 1 && (
						<React.Fragment>
							<div>
								<legend className='fs-5 pt-2 mb-3 fw-bold'>
									Confirm your email
								</legend>

								<p className='fs-6 m-0'>
									please enter this email {emailState.value}{' '}
								</p>

								<Input
									id='ConfirmEmail'
									placeholder='Enter your email here'
									ref={confirmEmaiRef}
									type='code'
									isValid={confrimEmailIsValid}
									value={confirmEmailState.value}
									onBlur={confirmEmailHandler}
									onChange={confirmEmailChangeHandler}
								/>
								{confrimEmailIsValid === false && (
									<p className='font-tiny text-danger'>
										Enter valid email address
									</p>
								)}

								<p className='font-tiny py-2 text-secondary'>
									Didn't receive an email or something went wrong? Resend code
								</p>
							</div>

							<div className='border-top text-align--right p-2 position-absolute bottom-0 start-0 end-0'>
								<Button
									onClick={nextFormHandler}
									className='btn btn-primary rounded-pill btn-color'
									disable={!modal2}
								>
									{'Next'}
								</Button>
							</div>
						</React.Fragment>
					)}
					{showModal === 2 && (
						<React.Fragment>
							<div>
								<legend className='fs-5 pt-2 mb-3 fw-bold'>Sign up</legend>
								<Input
									label='Password'
									id='password'
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
										Requires special character, capital letter, number and min
										of 8 characters{' '}
									</p>
								)}
							</div>
							<div className='border-top text-align--right p-2 position-absolute bottom-0 start-0 end-0'>
								<Button
									className='btn btn-primary rounded-pill btn-color'
									disable={!modal3}
									type={'submit'}
								>
									{'Finish'}
								</Button>
							</div>
						</React.Fragment>
					)}
				</form>
			</Card>

			<React.Fragment>
				{ReactDom.createPortal(
					<Backdrop />,
					document.getElementById('backdrop--overlay')
				)}
			</React.Fragment>
		</div>
	);
};

export default SignUp;
