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
            // console.log( "loading main navigation controller - loaded on every page" );
            // console.log( "property is:" , something.getProperty() );

            $scope.$on('$routeChangeSuccess', function () 
            {

                console.log( 'href:' , window.location.href );    
                
                var current = window.location.href.split('/').pop();
                console.log( "current: ", current );

                if( current ){
                    $scope.current_section = current;
                } else {
                    $scope.current_section = 'wreckless';
                }

                return;

                // hide the dropdown menu
                $scope.hide_menu();
    
                // scroll the window to the top of the page (people complained about this)
                window.scrollTo(0,0);

                // reset the mega phone margin
                var mega_phone = document.getElementById("mega-phone");
                if( mega_phone ){
                    //console.log("RESETTING");
                    mega_phone.style.marginTop = "1px";

                }

            });
                        

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

            // super fast and ghetto development

            // user memes
            $http({
                method: 'GET',
                url: '/assets/data/user.json'
            })
            .success( function( data ){
                console.log("meme data:", data );
                $scope.user = data;
            })
            .error( function( error ){
                console.log("something went wrong:", error);
            }); 


            // memes from library
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


            // premade memes
            $http({
                method: 'GET',
                url: '/assets/data/premade.json'
            })
            .success( function( data ){
                console.log("meme data:", data );
                $scope.premade = data;
            })
            .error( function( error ){
                console.log("something went wrong:", error);
            }); 


            // ---------------------------
            // visibility toggles
            

            $scope.which = 'custom';

            $scope.is_visible = function( which ) {
                if( $scope.which == which ){
                    return true;
                } 
                return false;
            }

            $scope.switch_to = function( which ){
                $scope.which = which;
            }

        }
    ]);

})(angular);

