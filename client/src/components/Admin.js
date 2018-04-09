import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Product from './Product';

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

const DELETE_PRODUCT = gql`
	mutation deleteProduct($sku: String!) {
		deleteProduct(sku: $sku) {
			sku
			image
			name
		}
	}
`

// const DeleteProduct = () => {
// 	let delete;

// 	return (
// 		<Mutation mutation={DELETE_PRODUCT}>
// 			{
// 				(deleteProduct, { data }) => {
// 					<Product />
// 					<input type="checkbox" onClick={(e) => {
// 						deleteProduct({ variables: { }});
// 					}}/>
// 				}
// 			}
// 		</Mutation>
// 	)
// }

const AddAProduct = () => {

	let name;
	let image;
	let image_alt;
	let price;
	let sku;
	let price_sale;
	let active;
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
							<label>Name<input ref={ node => {name = node;}} /></label>
							<label>SKU<input ref={ node => {sku = node;}} /></label>
							<label>Image URL<input ref={ node => {image = node;}} /></label>
							<label>Image Alt<input ref={ node => {image_alt = node;}} /></label>
							<label>Price<input ref={ node => {price = node;}} /></label>
							<label>Sale Price<input ref={ node => {price_sale = node;}} /></label>
							<label>Active?<input type="checkbox" ref={ node => {active = node}}/></label>
							<button type="submit">Create Product</button>
						</form>
					</div>
				)
			}
		</Mutation>
	)
}

export default AddAProduct;