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
                    '\n\t<p>Some text to oversell myself.</p>^1000' +
                    '\n\t<p>Some other text to oversell myself,</p>^1000' +
                    '\n\t<p>and more here.</p>' +
                    '\n</section>^2000' +
                    '\n<section class="what-i-can-do">' +
                    '\n\t<p>Some text to show off my skills.</p>^1000' +
                    '\n\t<p>Some other text to show off my skills.</p>^1000' +
                    '\n\t<p>And more here.</p>' +
                    '\n</section>^2000' +
                    '\n<script>' +
                    '\n\talert("In your face ;-\)");' +
                    '\n</script>^2000' +
                    '\n</body>' +
                    '\n</html>'],
                    typeSpeed: 20,
                    contentType: 'text'
                });
            }
        }
    });
