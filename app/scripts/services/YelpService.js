'use strict';

var app = angular.module('letsGetDrinksApp');

app.factory('Yelp', ['$http', 'YELP_API', function($http, YELP_API) {

    // PUBLIC API
    this.getResults = function(neighborhood) {
        var httpMethod = 'GET',
            nonce = randomString(32,
                '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            timestamp = new Date().getTime(),
            parameters = {
                callback: "test",
                location: neighborhood,
                category_filter: "bars",
                oauth_consumer_key: YELP_API.CONSUMER_KEY,
                oauth_token: YELP_API.TOKEN,
                oauth_nonce: nonce,
                oauth_timestamp: timestamp,
                oauth_signature_method: "HMAC-SHA1",
                oauth_version: '1.0'
            },
            encodedSignature = oauthSignature.generate(
                httpMethod, YELP_API.SEARCH_URL, parameters,
                YELP_API.CONSUMER_SECRET, YELP_API.TOKEN_SECRET);

        $http.jsonp(YELP_API.SEARCH_URL , {
            params: {
                callback: "test",
                location: neighborhood,
                category_filter: "bars",
                oauth_consumer_key: YELP_API.CONSUMER_KEY,
                oauth_token: YELP_API.TOKEN,
                oauth_nonce: nonce,
                oauth_timestamp: timestamp,
                oauth_signature_method: "HMAC-SHA1",
                oauth_signature: encodedSignature,
                oauth_version: '1.0'
            }
        })
    };

    // PRIVATE HELPERS
    function parseResults(response) {
        var i = 0,
            businesses = response.businesses,
            num_results = businesses.length,
            results = [];

        for(i; i < num_results; i++) {
            results.push(businesses[i]);
        }
        console.log(results);
        return results;
    }

    function randomString(length, chars) {
        var result = '',
            i = 0,
            sizeOfChars = chars.length;

        for(i; i < length; i++) {
            result += chars[Math.round( Math.random() * sizeOfChars - 1)]
        }

        return result;
    }

    return {
        getResults: this.getResults
    }
}]);