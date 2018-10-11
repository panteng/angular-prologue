'use strict';

angular.module('homepage.works', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/works', {
            templateUrl: 'components/works/works.html',
            controller: 'WorksCtrl'
        });
    }])

    .controller('WorksCtrl', [function() {

    }])

    .directive('masonry', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $(element).imagesLoaded().progress(function (instance, image) {
                    $(image.img).addClass('show');
                    $(element).masonry({
                        itemSelector: '.project',
                        gutter: 20,
                        percentPosition: true,
                        transitionDuration: 0
                    });
                });
            }
        }
    });