import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

//Mutation for Product Creation. Resolver located in server.js
const ADD_PRODUCT = gql`
	mutation createProduct($name: String!, $image: String!, $image_alt: String!, $price: Float!, $sku: String!, $price_sale: Float!, $active: Boolean!) {
		createProduct(name: $name, image: $image, image_alt: $image_alt, price: $price, sku: $sku, price_sale: $price_sale, active: $active) {
			name
	  		image
	  		image_alt
	  		price
	  		sku
	  		price_sale
		}
	}
`

const AddAProduct = () => {

	//HTML node storage variables.
	let name;
	let image;
	let image_alt;
	let price;
	let sku;
	let price_sale;
	let active;

	//Builds products product and stores in database
	return (
		<Mutation mutation={ADD_PRODUCT}>
			{
				(createProduct, { data }) => (
					<div id="form-container">
						<form onSubmit={(e) => {
							e.preventDefault();
							createProduct({ variables: {name: name.value, image: image.value, image_alt: image_alt.value, price: price.value, sku: sku.value, price_sale: price_sale.value, active: active.checked}});
							name.value = '';
							image.value = '';
							image_alt.value = '';
							price.value = '';
							sku.value = '';
							price_sale.value = '';
							active.value = false;
						}}>
							<label><span className="form-label">Name</span><input ref={ node => {name = node;}} /></label>
							<label><span className="form-label">SKU</span><input ref={ node => {sku = node;}} /></label>
							<label><span className="form-label">Image URL</span><input ref={ node => {image = node;}} /></label>
							<label><span className="form-label">Image Alt</span><input ref={ node => {image_alt = node;}} /></label>
							<label><span className="form-label">Price</span><input ref={ node => {price = node;}} /></label>
							<label><span className="form-label">Sale Price</span><input ref={ node => {price_sale = node;}} /></label>
							<label><span className="form-label">Active?</span><input type="checkbox" ref={ node => {active = node}}/></label>
							<button type="submit" className="btn submit">Create Product</button>
						</form>
					</div>
				)
			}
		</Mutation>
	)
}

export default AddAProduct;