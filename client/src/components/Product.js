import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PRODUCT_QUERY = gql`
		{ product(active: true)
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
		props.handleClick(props.product_details.sku);
	}

	return (
			<div className="product-container">
				<div className="product-details">
					<div className="product-name">{props.product_details.name}</div>
					<img className="product-image" alt={props.product_details.image_alt} src={props.product_details.image} />
					<div className="product-price">{props.product_details.price}</div>
					{
						props.product_details.price_sale > 0.0 ? <div className="sale-price">{props.product_details.price_sale}</div> : null
					}
					<div className="buy-btn" onClick={handleClick}>Buy Now</div>
				</div>
			</div>
	)
}

const ProductQuery = (props) => (

	<Query query={PRODUCT_QUERY}>
		{({ loading, error, data }) => {
			if (loading) return "Loading...";
			if (error) return `Error! ${error.message}`;
			let arr = [];
			if (data.product.length > 0) {
				data.product.map((p) => {
					arr.push(
		 			<ProductDetail
		 				product_details={p} 
		 				key={p.sku} 
		 				handleClick={props.handleClick}/>	
					);
				});
			} else {
				return <div>No products available.</div>
			}
			return arr;
		}}
	</Query>
)

const Header = (props) => {
	return(
		<div id="header">
			<h1>V1 E-Commerce Code Test</h1>
		</div>
	)
}

const Footer = (props) => {
	return (
		<div id="footer">
			Feel free to <a id="email" href="mailto:about@michaelburnley.com">email me</a> or give me a call at <a id="phone" href="tel:909-287-9906">(909) 287-9906</a>
		</div>
	)
}

const Product = (props) => {
	const handleClick = (sku) => {
		let a = "Handle purchase of " + sku;
		console.log(a)
	}

	return(
		<div id="container">
			<Header />
			<div className="products">
				<ProductQuery 
					handleClick={handleClick}/>
			</div>
			<Footer />
		</div>
	)
}

export default Product;