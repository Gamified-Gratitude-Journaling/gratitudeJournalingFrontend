import React, { useState, useContext } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authContext from '../context/auth-context';
import logo from './images/gratitude symbol.png';
import '../index.css';

const CREATE_USER_MUTATION = gql`
	mutation CreateUser($email: String!, $password: String!, $username: String!) {
		createUser(email: $email, password: $password, username: $username) {
			_id
			email
		}
	}
`;

const LOGIN_QUERY = gql`
	query Login($email: String!, $password: String!) {
		login(email: $email, password: $password){
			userId
			token
			username
		}
	}
`;

const treatmentEmails = [
	"2022157@appleby.on.ca",
	"2024178@appleby.on.ca",
	"2023008@appleby.on.ca",
	"2023026@appleby.on.ca",
	"2025137@appleby.on.ca",
	"2025073@appleby.on.ca",
	"2022172@appleby.on.ca",
	"2022079@appleby.on.ca",
	"2024184@appleby.on.ca",
	"2025165@appleby.on.ca",
	"2024070@appleby.on.ca",
	"2024009@appleby.on.ca",
	"2024032@appleby.on.ca",
	//"raywang999@gmail.com",
];

const isTreatment = (email) => {
	let res = false;
	treatmentEmails.forEach(treat => { if (email.localeCompare(treat) === 0) res = true; });
	return res;
}

export default function Login() {
	const context = useContext(authContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
	const [isLogin, setIsLogin] = useState(true);
	const apolloClient = useApolloClient();
	const emailEl = React.createRef();
	const passwordEl = React.createRef();
	const confirmPasswordEl = React.createRef();
	const usernameEl = React.createRef();
	const toggleIsLogin = (event) => {
		event.preventDefault();
		setIsLogin(!isLogin);
	}

	const registerHandler = async (event) => {
		event.preventDefault();
		const email = emailEl.current.value;
		const password = passwordEl.current.value;
		const confirmPassword = confirmPasswordEl.current.value;
		const username = usernameEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) { return; }
		if (password.localeCompare(confirmPassword) !== 0) {
			throw new Error("Passwords don't match");
		}

		await createUserMutation({ variables: { email, password, username } });
		return loginHandler(event, email, password);
	};

	const loginHandler = async (event, email, password) => {
		event.preventDefault();
		if (!email) email = emailEl.current.value;
		if (!password) password = passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) { return; }

		const data = (await apolloClient.query({
			query: LOGIN_QUERY,
			variables: { email, password }
		})).data;
		if (data.login.token) {
			context.login(
				data.login.token,
				data.login.userId,
				data.login.tokenExpiration,
				email,
				data.login.username,
				isTreatment(email),
			);
			navigate(from, { replace: true });
		}
	};

	const handleSubmit = (event) => {
		let promise = loginHandler;
		if (!isLogin) promise = registerHandler;
		toast.promise(() => promise(event), {
			pending: 'loading',
			success: 'Success!',
			error: { render({ data }) { console.log(data); return <p>Error: {data.message}</p> } },
		})
	}

	return (

		<div className='min-h-screen'>
			<div className='h-screen-2/6'>
				<img class='max-h-full object-scale-down mx-auto' src={logo} alt='logo' />
			</div>

			<div className='grid-cols-3'>

				<form className='form grid gap-4' onSubmit={handleSubmit}>
					<h1 className='text-center title'> Gratitude Journal</h1>

					{!isLogin && (<div className='text-center'>
						<input className='login' placeholder='Username' type="username" id="username" ref={usernameEl} required='required' />
					</div>)}

					<div className='text-center'>
						<input className='login' placeholder='Email' type='email' id='email' ref={emailEl} required='required' />
					</div>

					<div className='text-center'>
						<input className='login' placeholder='Password' type="password" id="password" ref={passwordEl} required='required' />
					</div>

					{!isLogin && (<div className='text-center'>
						<input className='login' placeholder='Confirm password' type="password" id="password" ref={confirmPasswordEl} required='required' />
					</div>)}

					<a className='text-center' href='www.google.com'> <u> Forgot Password? </u> </a>

					<input className='rounded-full py-1 text-white place-self-center bg-black w-2/5 text-center hover:text-yellow-500' type='submit' text={isLogin ? "Sign in" : "Register"} />

					<button className='w-2/5 hover:text-yellow-500' onClick={toggleIsLogin}> {isLogin ? "New User? Register!" : "Switch to login"} </button>




				</form>

			</div>

		</div>
	);
}
