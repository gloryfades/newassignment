import React from "react";
import Header from './Header.js';
import Result from './Result.js';

var algoliasearch = require('algoliasearch');
var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('Restaurants');
var helper = algoliasearchHelper(client,'Restaurants')
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			hits: []
		};
//		this.handleInputChange = this.keyUpHandler.bind(this, 'searchInput');
		this.handleChange = this.handleChange;
	}
	componentDidMount(){
		var browser = index.browseAll();
		var hits = [];
		// browser.on('result', function onResult(content){
		// 	hits = hits.concat(content.hits);
		// });
		// browser.on('end', function onEnd(){
		// 	console.log('Finished!');
  // 			console.log('We got %d hits', hits.length);
		// });
		// browser.on('error', function onError(err){
		// 	throw err;
		// });
	}

	// keyUpHandler(refName, e) {
	// 	console.log(e.currentTarget.value);
 //        //console.log(this.refName);
 //        var value = e.currentTarget.value;
 //        index.search(value, function(err, content){
 //        	console.log(content.hits);
 //        });
 //        console.log(value);
 //        this.setState({ search: e.currentTarget.value});
 //        console.log(this.state);
 //        console.log('state =' + JSON.stringify(this.state));
 //    }
    handleChange = (e) =>{
    	// this.setState({ search: e.target.value});
    	var value = e.currentTarget.value;
    	console.log(this.state.hits);
        index.search(value,  function(err, content, this.state.hits){
        	console.log(value);
        	console.log(content.hits);

        	return content.hits;

        });
        return this.setState({ search: e.currentTarget.value}, function(){
        	console.log(this.state);
        });
    }
	render(){
		return(
			<div class = "container">
				<br/>
				<br/>
				<div class="content">
					<Header
						//handleInputChange ={this.handleInputChange}
						handleChange = {this.handleChange}
						search={this.state.search}
					/>
					<Result/>
					<p>App</p>
				</div>
			</div>
			);
	}
}

export default App;