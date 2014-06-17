'use strict';

angular.module('letsGetDrinksApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    var CONSUMER_KEY = 'txtHW4obsTJiCDnSaIMzhw',
        CONSUMER_SECRET = 'hapbgj5rVbND2ojjWg8TL3w7Yuw',
        TOKEN = 'nY9VMnSOowRNtZoFb5T9m4HrorQsEeVg',
        TOKEN_SECRET = 'r6J8X2q6d4GdKPYgs_6tmNZ_RYs',
        SEARCH_URL = 'http://api.yelp.com/v2/search',
        BUS_URL = 'http://api.yelp.com/v2/business/yelp-sanfranciso'

    $scope.neighborhoods = [
      {name: 'Hells Kitchen', value: '1'},
      {name: 'Lower East Side', value: '2'},
      {name: 'Upper West Side', value: '3'}
    ];

    $scope.MyNeighborhood = $scope.neighborhoods[0];

    var httpMethod = 'GET',
        nonce = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        timestamp = new Date().getTime(),
        parameters = {
            callback: "test",
            location: "hells+kitchen",
            category_filter: "bars",
            oauth_consumer_key: CONSUMER_KEY,
            oauth_token: TOKEN,
            oauth_nonce: nonce,
            oauth_timestamp: timestamp,
            oauth_signature_method: "HMAC-SHA1",
            oauth_version: '1.0'
        },
        encodedSignature = oauthSignature.generate(httpMethod, SEARCH_URL, parameters, CONSUMER_SECRET, TOKEN_SECRET);


    $http.jsonp(SEARCH_URL , {
        params: {
            callback: "test",
            location: "hells+kitchen",
            category_filter: "bars",
            oauth_consumer_key: CONSUMER_KEY,
            oauth_token: TOKEN,
            oauth_nonce: nonce,
            oauth_timestamp: timestamp,
            oauth_signature_method: "HMAC-SHA1",
            oauth_signature: encodedSignature,
            oauth_version: '1.0'
        }
    }).
        success(function(data, status, headers, config) {
        }).
        error(function(data, status, headers, config) {
        });

    function randomString(length, chars) {
        var result = '',
            i = 0,
            sizeOfChars = chars.length;

        for(i; i < length; i++) {
            result += chars[Math.round( Math.random() * sizeOfChars - 1)]
        }

        return result;
    }


    window.test = function(response) {
        console.log(response);
    }
    // var YelpApi = function()

  }]);
