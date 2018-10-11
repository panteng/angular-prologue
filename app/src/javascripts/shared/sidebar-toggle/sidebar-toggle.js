angular.module('homepage.sidebarToggle', [])
    .directive('sidebarToggle', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'shared/sidebar-toggle/sidebar-toggle.html',
            link: function ($scope, element, attrs) {
                $(element).on('click', function () {
                    $('.sidebar').toggleClass('expanded');
                })
            }
        };
    });