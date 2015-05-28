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

        function remove_from_user_memes( meme_object )
        {
            // find the item by its id
            var id = meme_object.id;
            console.log("the id is:", id);

            for( var i = 0 , len = _this.user_memes.length ; i < len ; i++ )
            {
                var current = _this.user_memes[i];
                if( id == current.id ){
                    // remove the item
                    _this.user_memes.splice( i , 1 );
                    return;
                }
            }

            // if we got here, we could not find the meme to remove it - i.e. an error
            console.log( "could not find meme in user_memes:", meme_object );
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
                console.log( "user_memes after adding:" , _this.user_memes );
            },

            remove_meme: function( meme_object ){
                remove_from_user_memes( meme_object );
                console.log( "user_memes after removing:" , _this.user_memes );
            }

        };

    });


    // -------------------------------
    // controllers


    // main navigation (in header)
    appControllers.controller( 'MainNavigationController' , [
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {
            // console.log( "loading main navigation controller - loaded on every page" );
            // console.log( "property is:" , something.getProperty() );

            $scope.$on('$routeChangeSuccess', function () 
            {

                // console.log( 'href:' , window.location.href );    
                
                var current = window.location.href.split('/').pop();
                // console.log( "current: ", current );

                if( current ){
                    $scope.current_section = current;
                } else {
                    $scope.current_section = 'TEXi';
                }


                // back button
                $scope.go_back = function(){

                    // back button does different things

                    var go_to = '';

                    switch( current )
                    {
                        case 'login':
                            go_to = '/';
                            break;
                        case 'register':
                            go_to = '/';
                            break;
                        case 'reset':
                            go_to = '/forgot';
                            break;
                        case 'forgot':
                            go_to = '/login';
                            break;
                        case 'manage':
                            go_to = '/home';
                            break;
                        case 'add':
                            go_to = '/manage';
                            break;
                        default: 
                            window.history.back();
                    }

                    // if not going back, redirect to the go_to var
                    $location.path( go_to ); // path not hash

                }

                console.log(current);

                // what's in the nav menu?

                $scope.nav_has_back = function()
                {
                    switch( current )
                    {
                        case 'home':
                            return false;
                            break;
                        case '':
                            return false;
                            break;
                        default: 
                            return true;
                    }
                }

                $scope.nav_has_menu = function()
                {
                    if( current == "" ||
                        current == 'login' ||
                        current == 'register' )
                    {
                        return false;
                    }
                    return true;
                }

                $scope.nav_has_notifications = function()
                {
                    if( current === 'home' ){
                        return true;
                    }
                    return false;
                }



                // overlay menu

                $scope.overlay_visibility = false;

                $scope.is_overlay_visible = function(){
                    return $scope.overlay_visibility;
                }

                $scope.show_overlay = function(){
                    $scope.overlay_visibility = true;
                }

                $scope.hide_overlay = function(){
                    $scope.overlay_visibility = false;
                }
                
                $scope.toggle_overlay = function(){
                    if( $scope.overlay_visibility ){
                        $scope.hide_overlay();
                        return;
                    }
                    $scope.show_overlay();
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


    // home page
    appControllers.controller( 'HomeController' , [
                 '$scope','$http','something',
        function( $scope , $http , something )
        {
            // console.log("loading home controller");

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


            // user memes

            $scope.user_memes = something.getProperty('user_memes');
            // console.log("getting user memes:" , $scope.user_memes );

            $scope.user_has_memes = function()
            {
                if( $scope.user_memes.length > 0 ){
                    return true;
                }
                return false;
            }

        }
    ]);


    //
    appControllers.controller( 'TestController' , [
        function()
        {
            // console.log("loading test controller");
        }
    ]);


    // manage
    appControllers.controller( 'ManageController' , [
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {
            // console.log("loading manage controller");

            // super fast and ghetto development

            // user memes
            $scope.user_memes = something.getProperty('user_memes');
            console.log("getting user memes:" , $scope.user_memes );


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
            // console.log("loading edit controller");

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
            // console.log("loading review controller");

            // pull the selected meme
            $scope.current_meme = something.getProperty('current_meme');
            console.log( $scope.current_meme );

            // when the user deletes the meme, remove it from their user_memes array
            $scope.remove = function()
            {
                something.remove_meme( $scope.current_meme );

                // redirect to the manage screen
                $location.path('/manage'); 
            };

        }
    ]);


    // leaderboard
    appControllers.controller( 'LeaderboardController' , [
                 '$scope','$http',
        function( $scope , $http )
        {
            // console.log("loading edit controller");

            $http({
                method: "GET",
                url: "/assets/data/leaderboard.json"
            })
            .success( function( data ){
                console.log("the data is:", data);
                $scope.leaderboard = data;
            })
            .error( function( error ){
                console.log("something went wrong:", error);
            });

        }
    ]);


    // points page
    appControllers.controller( 'PointsController' , [
                 '$scope','$http',
        function( $scope , $http )
        {

            // get the prize list
            $http({
                method: 'GET',
                url: '/assets/data/prizes.json'
            })
            .success( function( data ){

                console.log("Prize list:", data);
                $scope.prizes = data;

            })
            .error( function( error ){
                console.log("something went wrong:", error);
            });

        }
    ]);


    // camera page
    appControllers.controller( 'CameraController' , [
                 '$scope','$http','$location','something',
        function( $scope , $http , $location , something )
        {

            // camera meme (only one)
            $scope.camera = [
                {
                    "name" : "camera",
                    "url" : "/assets/img/camera-image-square.jpg",
                    "top" : "",
                    "bottom" : ""
                }
            ];

            // function to edit custom photo
            $scope.use_photo = function() 
            {
                // set the current meme in the something service so we can carry it across views
                var selected = $scope[ 'camera' ][ 0 ];
                something.setProperty( 'current_meme' , selected ); 

                // redirect to the edit screen
                $location.path('/edit'); // path not hash
            }

        }
    ]);


})(angular);

