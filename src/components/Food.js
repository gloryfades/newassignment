import React from "react";
class Food extends React.Component{
	constructor(props){
		super(props);

	}
	render() {
		const { name, count, isExcluded, isRefined } = this.props.foodTypes;
		return <li className="click-filter" onClick = {this.props.click.bind(this)} facet = "food_type" value= {name}>
					<p class="start">{name}</p> 
					<p class="end"> {count}</p>
				</li>
	}
}

export default Food;
