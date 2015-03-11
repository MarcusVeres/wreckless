(function(){

    var directives = angular.module('directives', []);
    var prefix = '/static/partials/';

    directives.directive('mainNavigation' , function()
    {
        return {
            restrict: 'E',
            templateUrl: prefix + 'main-navigation.html',
            controller: 'MainNavigationController',
            controllerAs: 'mnc'
        };
    });

    directives.directive('footer' , function()
    {
        return {
            restrict: 'E',
            templateUrl: prefix + 'footer.html'
        };
    });

})(angular);

