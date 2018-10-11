'use strict';

angular.module('homepage.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'components/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', [function() {

    }]);