'use strict';

// declare app level module which depends on shared and components
angular.module('homepage', [
    'ngRoute',
    'ngAnimate',
    'homepage.sidebar',
    'homepage.sidebarToggle',
    'homepage.home',
    'homepage.works',
    'homepage.about',
    'templates'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/home' });
    }])

    .directive('scrollbar', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                var $element = $(element);
                $element.addClass(attrs.scrollbar).scrollbar({
                    onUpdate: function () {
                        if (attrs.autoScroll === 'true') {
                            setTimeout(function () {
                                $element.scrollTop($element[0].scrollHeight);
                            }, 0);
                        }
                    }
                });
            }
        };
    });

window.onload = function () {
    $('.loader').slideUp(800);
};
