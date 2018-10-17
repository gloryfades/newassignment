import React from "react";
var algoliasearch = require('algoliasearch');
var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('Restaurants');
class Result extends React.Component{
	render(){
		return(
			<div class = "results-list">
				<div class = "filter">
					<br/>
					<h3> Cuisine/Food Type </h3>
					<ul class ='food-type'>
						<li>Temp</li>
					</ul>
					<h3> Rating </h3>
					<h3> Payment Options </h3>
				</div>
				<div class = "restaurants-list">
				</div>
			</div>
		);
	}
}

export default Result;