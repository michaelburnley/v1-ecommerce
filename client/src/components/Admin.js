import React, { Component } from 'react';
import products from './products.json'; 
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation addTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const AddAProduct = () => {
	<Mutation
		mutation={ADD_TODO}
		update={(cache, { data: { addTodo }}) => {
			const { todos } = cache.readQuery({ query: GET_TODOS });
			cache.writeQuery({
				query: GET_TODOS,
				data: { todos: todos.concat([addTodo])}
			})
		}}
	>
		{ addTodo => (
			<div>
				<form
					onSubmit={e => {
						e.preventDefault();
						addTodo({ variables: { type: input.value }});
						input.value = ""
					}}
				>
					<input
						ref={node => {
							input = node;
						}}
					/>
					<button type="submit">Add Todo</button>
				</form>
			</div>
		)}
	</Mutation>
};

class Admin extends Component {
	constructor() {
		super();
		this.state = {
			user: ""
		}
	}

	render() {
		return (
			<div className="admin-panel">

			</div>
		);
	}
}
