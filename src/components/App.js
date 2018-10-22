import React from "react";
import Header from './Header.js';
import Food from './Food.js';
import Restaurant from './Restaurant.js';
import EmptyStar from '../resources/graphics/star-empty.png';
import FillStar from '../resources/graphics/stars-plain.png';

var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
// var index = client.initIndex('Restaurants');
var helper = algoliasearchHelper(client, 'RestaurantsV2', {
	facets: ['food_type', 'price_range', 'stars_count', 'payment_options'],
});
client.setExtraHeader('X-Forwarded-For', '73.252.207.243');

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			hits: [],
			foodTypes: {},
			geolocation: {},
			aroundLatLngViaIP: true,
			results: '',
			times: ''
		};
		this.handleChange = this.handleChange;
		this.click = this.click;
		this.payment = this.payment;
		this.stars = this.stars;
		helper.search();
	}
	componentDidMount(){
		var that = this;
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(pos){
				console.log("I'm located at ",pos.coords.latitude,' and ',pos.coords.longitude);
				let geo = [pos.coords.latitude, ',' , pos.coords.longitude];
				geo = geo.join('');
				that.setState({geolocation: geo, aroundLatLngViaIP: false});
			});
		}
		helper.on('result', function(content){
			console.log(content);
			let facet = content.getFacetValues('food_type');
			let food = {}
			for(let i = 0; i < 10; i++){
				let item = facet[i];
				if(item){
					food[item.name] = { name: item.name, count: item.count, isExcluded: item.isExcluded, isRefined: item.isRefined };
				}
			}
			that.setState({search: content.query, hits: content.hits, foodTypes: food, results: content.nbHits, time: parseFloat(content.processingTimeMS/1000) });
			console.log(that.state);

 		});
	}
 	
    handleChange = (e) =>{
    	let value = e.currentTarget.value;

        if(!this.state.aroundLatLngViaIP){
        	helper.setQuery(value).setQueryParameter('aroundLatLng', this.state.geolocation).setQueryParameter('aroundLatLngViaIP', this.state.aroundLatLngViaIP).search();
        }else{
        	helper.setQuery(value).setQueryParameter('aroundLatLngViaIP', this.state.aroundLatLngViaIP).search();
       	}

    }
    click=(e) => {

    	let facet = e.currentTarget.getAttribute('facet');
    	let value = e.currentTarget.getAttribute('value');
    	
    	helper.toggleFacetRefinement(facet, value).search();
    	e.currentTarget.classList.toggle('active');
    }
    stars=(e) => {
    	let operator =e.currentTarget.getAttribute('operator');
    	let facet = e.currentTarget.getAttribute('facet');
    	let value = e.currentTarget.getAttribute('value');

    	helper.removeNumericRefinement(facet);
    	if(e.currentTarget.classList.contains('active')){
    	
    	    e.currentTarget.classList.remove('active');
    	}else{
    		e.currentTarget.parentNode.childNodes.forEach(function(node){
    			node.classList.remove('active');
    	    });
    	    e.currentTarget.classList.toggle('active');
    	    helper.addNumericRefinement(facet, operator, value)
    	}
    	helper.search();
    	
    }
    payment=(e) =>{
    	let facet = e.currentTarget.getAttribute('facet');
    	let value = e.currentTarget.getAttribute('value');
    	helper.clearRefinements(facet);
    	if(e.currentTarget.classList.contains('active')){
    		e.currentTarget.classList.remove('active');
    	}else{
    		e.currentTarget.parentNode.childNodes.forEach(function(node){
    			node.classList.remove('active');
    		});
    		if(value === 'Discover'){
	    		helper.addFacetRefinement(facet, 'Diners Club');
	    		helper.addFacetRefinement(facet, 'Carte Blanche');
	    	}
	    	helper.addFacetRefinement(facet, value);
	    	e.currentTarget.classList.toggle('active');
    	}
    	helper.search();
    }
	render(){
		return(
			<div class = "container">
				<br/>
				<br/>
				<div class="content">
					<Header
						handleChange = {this.handleChange}
					/>
					<div class = "results-list">
						<div class = "filter">
							<br/>
							<h3 class="heading"> Cuisine/Food Type </h3>
							<ul class ='food-type'>
								{Object.keys(this.state.foodTypes).
									map(key => 
										<Food key={key} 
										foodTypes={this.state.foodTypes[key]}
										click = {this.click}
										/>)}
							</ul>
							<div>
							<h3 class="heading">Rating</h3>
								<ul class='rating'>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '0'>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
									</li>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '1'>
										<img class="star" src={FillStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
									</li>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '2'>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>									
									</li>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '3'>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={EmptyStar}/>
										<img class="star" src={EmptyStar}/>	
									</li>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '4'>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={EmptyStar}/>	
									</li>
									<li class='rating-filter' onClick = {this.stars} facet='stars_count' operator='>=' value = '5'>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>
										<img class="star" src={FillStar}/>	
									</li>
								</ul>
							</div>
							<div>
							<h3 class="heading">Payment Options</h3>
								<ul class='payment'>
									<li class='payment-filter' onClick = {this.payment} facet='payment_options' value = 'AMEX'> AMEX/American Express</li>
									<li class='payment-filter' onClick = {this.payment} facet='payment_options' value = 'Visa'>Visa</li>
									<li class='payment-filter' onClick = {this.payment} facet='payment_options' value = 'Discover'>Discover</li>
									<li class='payment-filter' onClick = {this.payment} facet='payment_options' value = 'MasterCard'>MasterCard</li>
								</ul>
							</div>
						</div>
						<div class = "restaurants-list">
							<div class="ticker">
								<p id="res">{this.state.results} results found</p> 
								<p id="time">in {this.state.time} seconds</p>
							</div>
							<ul class = 'restaurants'>
								{Object.keys(this.state.hits).
									map(key => 
										<Restaurant key = {key} 
										restaurants={this.state.hits[key]}
										/>)}
							</ul>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

export default App;