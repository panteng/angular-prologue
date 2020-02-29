angular.module('homepage.sidebar', [])
    .directive('sidebar', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'shared/sidebar/sidebar.html',
            controller: ['$scope', '$location', function ($scope, $location) {
                $scope.isActive = function (viewLocation) {
                    return viewLocation === $location.path();
                };
            }],
            link: function ($scope, element, attrs) {
                var $window = $(window);
                var $sidebar = $('.sidebar');

                $('.menu ul li').on('click', function () {
                    $sidebar.removeClass('expanded');
                });

                $window.on('resize', function () {
                    if ($window.width() >= 1024 && $sidebar.hasClass('expanded')) {
                        $sidebar.removeClass('expanded');
                    }
                });
            }
        };
    });