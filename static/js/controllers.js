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
        
        this.is_wreckless = false;
        this.current_meme = {};     // unset
        this.user_memes = [];       // user has no memes at the start
        this.meme_id = 0;           // ghetto way to do this, but it's a demo


        //

        function add_to_user_memes( meme_object )
        {
            // assign an id to the meme we add for the user
            var id = _this.meme_id;
            meme_object.id = id;

            // add the object to our array
            _this.user_memes.push( meme_object );

            // move the id by one
            _this.meme_id++;
        }

        // 

        return {
        
            getProperty: function( property ){
                return _this[ property ];
            },

            setProperty: function( property , value ){
                _this[ property ] = value;
            },

            add_meme: function( meme_object ){
                add_to_user_memes( meme_object );
                console.log( _this.user_memes );
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
                 '$scope','$http','something',
        function( $scope , $http , something )
        {
            console.log("loading landing controller");

            /*
            CountryList.success( function( data ){
                $scope.country_list = data;
            })
            */

            // control the user's state

            $scope.is_wreckless = function(){
                return something.getProperty( 'is_wreckless' );
            }

            $scope.get_wreckless = function(){
                something.setProperty( 'is_wreckless' , true );
                console.log("oh, it's on now!");
            }

            $scope.chill_out = function(){
                something.setProperty( 'is_wreckless' , false );
                console.log("meh... ");
            }

            $scope.toggle_wreckless = function(){
                var is_wreckless = something.getProperty('is_wreckless');
                if( is_wreckless ){
                    $scope.chill_out();
                } else {
                    $scope.get_wreckless();
                }
            }

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
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {
            console.log("loading manage controller");

            // super fast and ghetto development

            // user memes
            $scope.user_memes = something.getProperty('user_memes');
            console.log("getting user memes:" , $scope.user );


            // memes from library
            $http({
                method: 'GET',
                url: '/assets/data/custom.json'
            })
            .success( function( data ){
                //console.log("meme data:", data );
                $scope.custom = data;
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
                //console.log("meme data:", data );
                $scope.premade = data;
            })
            .error( function( error ){
                console.log("something went wrong:", error);
            }); 


            // ---------------------------
            // visibility toggles
            
            $scope.which = 'premade';

            $scope.is_visible = function( which ) {
                if( $scope.which == which ){
                    return true;
                } 
                return false;
            }

            $scope.switch_to = function( which ){
                $scope.which = which;
            }


            // ---------------------------
            // select a meme for editing

            $scope.select_meme = function( array_name , index ) 
            {
                // set the current meme in the something service so we can carry it across views
                var selected = $scope[ array_name ][ index ];
                something.setProperty( 'current_meme' , selected ); 

                // redirect to the edit screen
                $location.path('/edit'); // path not hash
            }


            // ---------------------------
            // select a user meme for review / sharing

            $scope.review_meme = function( array_name , index ) 
            {
                // set the current meme in the something service so we can carry it across views
                var selected = $scope[ array_name ][ index ];
                something.setProperty( 'current_meme' , selected ); 

                // redirect to the edit screen
                $location.path('/review'); // path not hash
            }

        }
    ]);


    // edit
    appControllers.controller( 'EditController' , [
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {
            console.log("loading edit controller");

            // pull the selected meme
            $scope.current_meme = something.getProperty('current_meme');
            console.log( $scope.current_meme );

            // when the user saves the meme, add the current meme to their user_memes array
            $scope.save = function()
            {
                // call the function
                something.add_meme( $scope.current_meme );

                // redirect to the manage screen
                $location.path('/manage'); // path not hash
            };

            // TODO: make it pretty

        }
    ]);


    // review
    appControllers.controller( 'ReviewController' , [
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {
            console.log("loading review controller");

            // pull the selected meme
            $scope.current_meme = something.getProperty('current_meme');
            console.log( $scope.current_meme );
        }
    ]);


})(angular);

