import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PRODUCT_QUERY = gql`
		{ products 
			{
  				name
  				image
  				image_alt
  				price
  				sku
  				price_sale
  			} 
  		}
  	`

const ProductDetail = (props) => {
	const handleClick = (e) => {
		e.preventDefault();
		props.handleClick(props.sku);
	}

	return (
			<div className="product-details">
				<div className="product-name">{props.product_details.name}</div>
				<img className="product-image" alt={props.product_details.image_alt} src={props.product_details.image} />
				<div className="product-price">{props.product_details.price}</div>
				<div className="buy-btn" onClick={handleClick}>Buy Now</div>
			</div>
	)
}

const ProductQuery = (props) => (

	<Query query={PRODUCT_QUERY}>
		{({ loading, error, data }) => {
			if (loading) return "Loading...";
			if (error) return `Error! ${error.message}`;
			let arr = [];
			data.products.map((product) => {
				arr.push(
	 			<ProductDetail
	 				product_details={product} 
	 				key={product.sku} 
	 				handleClick={props.handleClick}/>	
				);
			});
			return arr;
		}}
	</Query>
)


const Product = (props) => {
	const handleClick = (sku) => {
		let a = "Handle purchase of " + sku;
		console.log(a)
	}

	return(
		<div className="products">
			<ProductQuery 
				handleClick={handleClick}/>
		</div>
	)
}

export default Product;