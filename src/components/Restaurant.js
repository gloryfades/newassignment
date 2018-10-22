import React from "react";
class Restaurant extends React.Component{
	render() {
		const { image_url, name, price_range, reviews_count, stars_count,food_type, area } = this.props.restaurants;
		
		return <li className="list-restaurant">
			<div class='details'>
				<img className="image" src={image_url} alt={name}/>
				<div class='story'>
					<h4 className="restaurant-name">{name}</h4>
					<p class='info'> {stars_count} stars ({reviews_count} reviews)</p>
					<p class='info'> {food_type} | {area} | {price_range} </p>
				</div>
			</div>
		</li>
	}
}

export default Restaurant;