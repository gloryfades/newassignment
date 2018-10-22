import React from "react";
var algoliasearch = require('algoliasearch');
var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('Restaurants');
class Header extends React.Component{
	constructor(props) {
		super(props);
		this.state = {search : this.props.search};
		// this.searchInput = React.createRef();
	}


	render(){
		return(
			<div class = "header">
				<div class="wrap">
					<div class = "search">
				       <input class = "searchbar"
				         placeholder="Search for Restaurants by Name, Cuisine, Location"
				         // ref= {(searchInput) => {this.searchInput = searchInput}}
				         onInput ={this.props.handleChange.bind(this)}
				       />
				     </div>
				</div>
			</div>
			);
	}
}

export default Header;