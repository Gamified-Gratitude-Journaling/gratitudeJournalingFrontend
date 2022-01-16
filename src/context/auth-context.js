import React from 'react';

export default React.createContext({
	token: null,
	userId: null,
	email: null,
	username: null,
	isTreatment: false,
	login: ( token, userId, tokenExpiration, email, username, isTreatment) => {},
	logout: () => {}
});