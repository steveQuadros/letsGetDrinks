'use strict';

angular
  .module('letsGetDrinksApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });