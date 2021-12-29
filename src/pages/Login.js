import React, { useState, useContext } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
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
	const usernameEl = React.createRef();
	const toggleIsLogin = (event) => {
		event.preventDefault();
		setIsLogin(!isLogin);
	}

	const registerHandler = async (event) => {
		event.preventDefault();
		const email = emailEl.current.value;
		const password = passwordEl.current.value;
		const username = usernameEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) { return; }

		try {
			await createUserMutation({ variables: { email, password, username } });
			return await loginHandler(event, email, password);
		} catch (err) {
			console.log(err);
		}
	};

	const loginHandler = async (event, email, password) => {
		event.preventDefault();
		if (!email) email = emailEl.current.value;
		if (!password) password = passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) { return; }

		try {
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
				);
				navigate(from, { replace: true });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (

		<div className = 'max-h-screen min-h-screen'>
				<div className = 'grid-cols-1 mx-auto pt-5 w-2/6 h-3/6'>
					<img className = 'logo mx-auto' src = {logo} alt='logo' class = 'responsive'/>
					<br/>
				</div>

				<div className = 'grid-cols-3'>

					<form className = 'form grid gap-4'>
						<h1 className='text-center title'> Gratitude Journal</h1>

						{!isLogin && (<div className = 'text-center'>
							<input className = 'login' placeholder = 'Username' type="username" id="username" ref={usernameEl} />
						</div>)}

						<div className = 'text-center'>
							<input className = 'login' placeholder = 'Email' type = 'email' id = 'email' ref = {emailEl}/>
						</div>

						<div className = 'text-center'>
							<input className = 'login' placeholder = 'Password' type="password" id="password" ref={passwordEl} />
						</div>
						
						<a className = 'text-center' href = 'www.google.com'> <u> Forgot Password? </u> </a>
						
						
						<button className = 'text-white bg-black w-2/5' onClick={isLogin ? loginHandler : registerHandler}>{isLogin ? "Sign in" : "Register"}</button>

						<button className='w-2/5' onClick={toggleIsLogin}> {isLogin ? "New User? Register!" : "Switch to login" } </button>

						

						
					</form>
					
				</div>
				

		</div>
	);
}