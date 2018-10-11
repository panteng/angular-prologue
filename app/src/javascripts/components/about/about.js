'use strict';

angular.module('homepage.about', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'components/about/about.html',
            controller: 'AboutCtrl'
        });
    }])

    .controller('AboutCtrl', [function () {

    }])

    .directive('editor', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $(element).typed({
                    strings: ['<!doctype html>' +
                    '\n<html lang="en">' +
                    '\n<head>' +
                    '\n\t<meta charset="UTF-8">' +
                    '\n\t<title>About Me</title>' +
                    '\n</head>' +
                    '\n<body>^2000' +
                    '\n<section class="who-i-am">' +
                    '\n\t<p>I\'m a front-end developer, who loves creating beautiful UIs for the web.</p>^1000' +
                    '\n\t<p>I design and build website templates, as well as some more technical projects,</p>^1000' +
                    '\n\t<p>like writing tools for Vue.js.</p>' +
                    '\n</section>^2000' +
                    '\n<section class="why-this-project">' +
                    '\n\t<p>This Smoothie template is one of my old projects.</p>^1000' +
                    '\n\t<p>I once used it as my personal website.</p>^1000' +
                    '\n\t<p>Now I want to share it.</p>' +
                    '\n</section>^2000' +
                    '\n<script>' +
                    '\n\talert("I hope it will help someone who needs a portfolio website ;-\)");' +
                    '\n</script>^2000' +
                    '\n</body>' +
                    '\n</html>'],
                    typeSpeed: 20,
                    contentType: 'text'
                });
            }
        }
    });
