import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USER_QUERY = gql`
	{
		users {
			username
			password
			logged_in
		}
	}
`

const LoginForm = (props) => {
	return(
		<form onSubmit={
			e.preventDefault()
		}>
			<input type="text" />
			<input type="text" />
			<button type="submit">Login</button>
		</form>
	)
}

// const UserQuery = (props) => {
// 	<Query query={USER_QUERY}>
// 		{
// 			({loading, error, data} => {
// 				if (loading) return "Loading...";
// 				if (error) return `Error! ${error.message}`;

// 			})
// 		}
// 	</Query>
// }