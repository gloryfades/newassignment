import React from "react";
var algoliasearch = require('algoliasearch');
var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('Restaurants');
class Header extends React.Component{
	constructor() {
		super();

		this.handleInputChange = this.keyUpHandler.bind(this, 'SearchInput');
	}

	keyUpHandler(refName, e) {
        console.log(this.refs.SearchInput.value);
        var value = this.refs.SearchInput.value;
        index.search(value, function(err, content){
        	console.log(content.hits);
        })
    }
	render(){
		return(
			<div class = "header">
				<div class="wrap">
					<div class = "search">
				       <input class = "searchbar"
				         placeholder="Search for Restaurants by Name, Cuisine, Location"
				         ref= "SearchInput"
				         onKeyUp={this.handleInputChange}
				       />
				     </div>
				</div>
			</div>
			);
	}
}

export default Header;