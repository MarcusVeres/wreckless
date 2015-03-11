(function(){

    "use strict";


    // module used for controllers
    var appControllers = angular.module('appControllers' , [
        'results'   // the graph builder stuff
    ]);


    // -------------------------------
    // services

    appControllers.service( 'something' , function() 
    {

        var _this = this;
        
        this.property = 'value';        

        return {
        
            getProperty: function(){
                return _this.property;
            }

        };

    });


    // -------------------------------
    // controllers


    // main navigation (in header)
    appControllers.controller( 'MainNavigationController' , [
                 '$scope','$http','something',
        function( $scope , $http , something )
        {
            console.log( "loading main navigation controller - loaded on every page" );
            console.log( "property is:" , something.getProperty() );
        }
    ]);


    // landing page
    appControllers.controller( 'LandingController' , [
                 '$scope','$http',/*'CountryList',*/
        function( $scope , $http /*, CountryList*/ )
        {
            console.log("loading landing controller");

            /*
            CountryList.success( function( data ){
                $scope.country_list = data;
            })
            */

            console.log($scope);
        }
    ]);


    //
    appControllers.controller( 'TestController' , [
        function()
        {
            console.log("loading test controller");
        }
    ]);


    // manage
    appControllers.controller( 'ManageController' , [
                 '$scope','$http','something',
        function( $scope , $http , something )
        {
            console.log("loading manage controller");

            $http({
                method: 'GET',
                url: '/assets/data/memes.json'
            })
            .success( function( data ){
                console.log("meme data:", data );
                $scope.memes = data;
            })
            .error( function( error ){
                console.log("something went wrong:", error);
            }); 

        }
    ]);

})(angular);

