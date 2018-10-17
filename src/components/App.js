import React from "react";
import Header from './Header.js';
import Result from './Result.js';

var algoliasearch = require('algoliasearch');
var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('Restaurants');

class App extends React.Component{
	componentDidMount(){
		var browser = index.browseAll();
		var hits = [];
		browser.on('result', function onResult(content){
			hits = hits.concat(content.hits);
		});
		browser.on('end', function onEnd(){
			console.log('Finished!');
  			console.log('We got %d hits', hits.length);
		});
		browser.on('error', function onError(err){
			throw err;
		});
	}
	render(){
		return(
			<div class = "container">
				<br/>
				<br/>
				<div class="content">
				<Header/>
				<Result/>
					<p>App</p>
				</div>
			</div>
			);
	}
}

export default App;