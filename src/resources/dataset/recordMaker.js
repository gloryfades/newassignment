'use strict';
var algoliasearch = require('algoliasearch');
var fs = require('fs');
var csv = require("fast-csv");
const chunk = require('lodash.chunk');

var client = algoliasearch('EVO3VV6L3P', '18d475c031dcc6b49bd53ecfb3751f6e');
var index = client.initIndex('RestaurantsV2');


let objectToCuisine = {};
let inputJSON = fs.readFileSync('restaurants_list.json');
let records = JSON.parse(inputJSON);

	csv
	 .fromPath("restaurants_info.csv")
	 .on("data", function(data){
	 	let objectDetails = data[0].split(';');
	 	let objectId = objectDetails[0];
	 	objectToCuisine[objectId] = [];
	 	for(let i = 1; i < objectDetails.length; i++){
	 		objectToCuisine[objectId].push(objectDetails[i]);
	 	}
	 	objectToCuisine[objectDetails[0]];
	 })
	 .on("end", function(){
	     console.log("done");
	     for(let i = 0; i < records.length; i++){
	     	let objectId = records[i].objectID;
			let objectDetails = objectToCuisine[objectId];
			if(objectDetails){
				for(let j = 0; j < 7; j++){
					switch(j){
						case 0:
							records[i]['food_type'] = objectDetails[0];
							break;
						case 1:
							records[i]['stars_count'] = parseFloat(objectDetails[1]);
							break;
						case 2: 
							records[i]['reviews_count'] = parseInt(objectDetails[2]);
							break;
						case 3:
							records[i]['neighborhood'] = objectDetails[3];
							break;
						case 4:
							records[i]['phone_number'] = objectDetails[4];
							break;
						case 5:
							records[i]['price_range'] = objectDetails[5];
							break;
						case 6:
							records[i]['dining_style'] = objectDetails[6];
					}
				}
			}
		}
		//Push records to Algolia Index
		const chunks = chunk(records, 1000);
		chunks.map(function(batch){
			return index.addObjects(batch);
		});
		//The lines below will create a local copy of the records in updatedRecords.json
		fs.writeFile("updatedRecords.json", JSON.stringify(records), (error) => {
			if(error){
				console.log(error);
			}
		});
	 });

