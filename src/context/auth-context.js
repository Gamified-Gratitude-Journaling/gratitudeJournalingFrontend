import React from 'react';

export default React.createContext({
	token: null,
	userId: null,
	email: null,
	username: null,
	login: ( token, userId, tokenExpiration, email, username) => {},
	logout: () => {}
});