'use strict';

angular.module('letsGetDrinksApp')
  .controller('MainCtrl', ['$scope', '$http', 'Yelp', function ($scope, $http, Yelp) {
    var yelp, callback;

    $scope.neighborhoods = [
      {name: 'Hells Kitchen', value: 'hells+kitchen'},
      {name: 'Lower East Side', value: 'lower+east+side'},
      {name: 'Upper West Side', value: 'upper+west+side'}
    ];

    $scope.testResponse = [];

    $scope.getResults = function() {
        console.log($scope.myNeighborhood);
        Yelp.getResults($scope.myNeighborhood.value);
    }

    window.test = function(response) {
        var decoded = (JSON.stringify(response));

        $scope.testResponse = [];

        for (var i = 0, num_businesses = response.businesses.length;
                i < num_businesses; i++) {
            $scope.testResponse.push(response.businesses[i]);
        }
    }

  }]);
