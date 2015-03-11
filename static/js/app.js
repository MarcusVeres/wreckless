/* global angular */
(function(angular) {

    'use strict';

    // Define the angular module for the application
    var module = angular.module('app', [
        'ngRoute',          // used for app routing
        'ngSanitize',       // parse html from data into views
        'ui.bootstrap',     // angular js for bootstrap
        'appControllers',   // module containing controller files
        'directives',       // custom directives and html components
    ]);

    module.config([ '$routeProvider' , '$locationProvider' ,
        function( $routeProvider , $locationProvider )
        {
            var prefix = '/static/partials/';

            $routeProvider
                .when('/', {
                    templateUrl: prefix + 'landing.html',
                    controller: 'LandingController',
                    controllerAs: 'lc'
                })
                .when('/landing', {
                    templateUrl: prefix + 'landing.html',
                    controller: 'LandingController',
                    controllerAs: 'lc'
                })
                .when('/manage', {
                    templateUrl: prefix + 'manage.html',
                    controller: 'ManageController',
                    controllerAs: 'mc'
                })
                .when('/add', {
                    templateUrl: prefix + 'add.html',
                    controller: 'ManageController',
                    controllerAs: 'mc'
                })
                .when('/test', {
                    templateUrl: prefix + 'test.html',
                    controller: 'TestController',
                    controllerAs: 'tc'
                })
                .otherwise({
                    redirectTo: '/'
                });

            // get rid of the hashes in the url
            // $locationProvider.html5Mode( true );
            // console.log( "GGG", $locationProvider );
        }
    ]);

})(angular);

                /*
                .when('/countries', {
                    templateUrl: prefix + 'countries.html',
                    controller: 'LandingController',
                    controllerAs: 'lc'
                })
                .when('/country/', {
                    templateUrl: prefix + 'country.html',
                    controller: 'CountryController',
                    controllerAs: 'cc'
                })
                .when('/country/:countryId', {
                    templateUrl: prefix + 'country.html',
                    controller: 'CountryController',
                    controllerAs: 'cc'
                })
                */

