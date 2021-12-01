import React, { useState, useContext } from 'react';
import { useApolloClient, gql, useMutation, useQuery, } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import authContext from '../context/auth-context';

const CREATE_USER_MUTATION = gql`
	mutation CreateUser($email: String!, $password: String!) {
		createUser(email: $email, password: $password) {
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
		}
	}
`;

export default function Login() {
	const [isLogin, setIsLogin] = useState(true);
	const context = useContext(authContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
	const apolloClient = useApolloClient();
	const emailEl = React.createRef();
	const passwordEl = React.createRef();

	const switchModeHandler = () => {
		setIsLogin(!isLogin);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		const email = emailEl.current.value;
		const password = passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) { return; }

		try {
			if (!isLogin) {
				setIsLogin(true);
				await createUserMutation({ variables: { email, password } });
				return await submitHandler(event);
			}
			//const {loading, error, data} = useQuery(LOGIN_QUERY);
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
				);
				sessionStorage.setItem('token', data.login.token);
				navigate(from, { replace: true });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<p>You must log in to view the page at {from}</p>
			<form className="auth-form" onSubmit={submitHandler}>
				<div className="form-control">
					<label htmlFor="email">E-mail</label>
					<input type="email" id="email" ref={emailEl} />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" ref={passwordEl} />
				</div>
				<div className="form-actions">
					<button type="submit">Submit</button>
					<button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
				</div>
			</form>
		</div>
	);
}