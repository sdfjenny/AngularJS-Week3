(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service ('MenuSearchService', MenuSearchService)
.directive('foundItemsCheck',FoundItemsCheck);


function FoundItemsCheck(){
	var ddo = {
		templateUrl: 'listItem.html',
		scope:{
			searcher: '<',
			onRemove: '='
		},
	//controller: NarrowItDownDirectiveController,
	//controllerAs: 'list',
	//bindToController: true
	}; 
	return ddo;
}


//function NarrowItDownDirectiveController(){
	//var list = this;
	
	//list.emptycheck = function(){
		//if (list.items.length === 0){
			//return true;
		//} else {
			//return false;
		//}
	//};
	
	
	
//}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
	var Searcher = this;
	Searcher.name= "search term";
	
	
	Searcher.click = false;
	Searcher.check = function (name){
		var promise = MenuSearchService.getMatchedMenuItems(); 
		promise.then(function(response){
			var result=response.data;
			var resultItems = result.menu_items
			var foundItems = [];
			// process result and only keep items that match
			var i;
			var n=0;
			for (i=0; i<resultItems.length; i++){
				
				var des = resultItems[n].description;
				if (Searcher.name === ''){
					foundItems = [];
					break;
				}
				else if (des.indexOf(Searcher.name) >= 0){
					foundItems.push(resultItems[n]);
					n=n+1;
				} else {
					n=n+1
					continue;}
				
				
				
				
				
			}
			Searcher.items = foundItems;
			Searcher.click = true;
			
			
		})
	};
	
	
	Searcher.remove = function(index){
		Searcher.items.splice(index, 1);
		console.log ('removed');
		console.log(this);
	};
	
	
	
}



MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
	var service = this;
	service.getMatchedMenuItems = function(){
		var response = $http({
			method: "GET",
			url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
			
			
		});
		
		return response;
		
		
		
		
		
	};
		
	
	
	
	
	
	
}



})();


