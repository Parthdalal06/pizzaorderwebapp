var app = angular.module('PizzaOrder', []);
app.controller('pizzalistController', function($scope,$http) {
	$scope.orderlist=[];
	$scope.nettotalsum=0;
	var orderlistdata=[];
   $http.get('/pizza.json').
  then(function onSuccess(response) {
	 $scope.listpizza=response.data;
	 
  }).
  catch(function onError(response) {
   alert("Uh Oh!! Some error occured while fetching the pizza list");
  });
  $scope.addtoorder=function(data){
	 $scope.orderlist=$scope.orderlist.concat(data);
	 $scope.totalsum();
  }
  $scope.totalsum=function(){
	  var total=0;
	  angular.forEach($scope.orderlist, function(key, value) {
        total+= key.price
      });
	  $scope.nettotalsum=total;
  }
  $scope.confirmorder=function(){
	   $http.get('/order.json').
  then(function onSuccess(response) {
	  $scope.closeNav();
	  $scope.orderlist=[];
	  $scope.nettotalsum=0;
	 alert("Your order will be delivered in "+response.data.deliverytime+" minutes")
	 
  }).
  catch(function onError(response) {
  alert("Uh Oh!! Some error occured while placing the order");
  });
  }
 $scope.openNav=function () {
    document.getElementById("myNav").style.width = "100%";
}

$scope.closeNav=function() {
    document.getElementById("myNav").style.width = "0%";
}
});