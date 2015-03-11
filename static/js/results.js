(function(){

    var results = angular.module('results', []);

    // Returns the number of days in a month ; used to label columns
    results.factory('DaysInMonth', function()
        {
            return function(month,year) {
                return ct(new Date(year, month, 0)).getDate();
            }
        }
    );

    // Service for processing the data
    results.factory('ResultsData', function( $http )
        {
            return $http({
                method: 'GET',
                url: 'static/data/results.json'
            });
        }
    );

    results.service('ParseResults', function()
        {

            // select a date range : start and stop date
            // round start and stop date
            // create an object, with keys for each rounded day
            
            // loop through all of the events
            // filter events based on date range
            // round each event to nearest day
            // push each rounded event to object
             
            // convert the object to an array of arrays
                // if empty, then empty array

            var _this = this;
            this.subset = [];       // stores all events within a given date range

            // date range functions

            this.date_range = {
                stop: 'unset',
                start: 'unset'
            }

            this.calibrate_date_range = function( range_object )
            {
                //console.log( "range_object:" , range_object );

                this.date_range.stop = range_object.stop 
                    ? range_object.stop 
                    : ct(new Date()).getTime();

                // set a default date range if one is not specified
                if( range_object.start ){
                    this.date_range.start = range_object.start;
                } else {
                    var date = ct(new Date());
                    date.setDate( date.getDate() - 7 );
                    this.date_range.start = date.getTime();
                }
            };

            // -------------------------------------------
            
            this.generate_results = function(){

                var iterator = round_to_day( _this.date_range.start );
                iterator = ct(new Date( iterator ));

                // create an entry for each date inside the date range
                // each entry will be an empty array to contain events
                for( var i = start ; i <= stop ; i += day_length )
                {
                    //console.log("looping through");
                    // _this.events_by_day[i] = [];

                    // insert empty array at location
                    _this.events_by_day[ iterator.getTime() ] = [];

                    // increment the day by one
                    iterator.setDate( iterator.getDate() + 1);

                }  

            }

            // -------------------------------------------

            this.round_to_day = function( raw )
            {
                // check if we have been given a date object or a timestamp
                var date = ( typeof raw === 'number' ) ? new Date( raw ) : raw;

                // round everything 
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                return date;
            };

            // clearing and reset functions

            // efficiently wipe an array of arrays
            var clear_array_of_arrays = function( array_of_arrays )
            {
                while( array_of_arrays.length ){
                    array_of_arrays.pop();
                }
            }

            var clear_object_of_properties = function( some_object )
            {
                // empties all entries in the events_by_day array
                for (var member in some_object){ 
                    delete some_object[member] 
                };
            }

            // navigating the weeks and time ranges

            this.jump = function( options )
            {
                if( !options ){
                    var options = {};
                }

                var direction   = options['direction'] == 'backward' ? -1 : 1;
                var measure     = options['measure'] ? options['measure'] : 'week';
                var increment   = options['increment'] ? options['increment'] : 7;  // custom range

                var current_start = _this.date_range.start;
                var current_stop = _this.date_range.stop; 

                var new_start = ct(new Date( current_start ));
                var new_stop = ct(new Date( current_stop ));

                if( measure === 'month' ) {
                    new_start.setMonth( new_start.getMonth() + direction );
                    new_stop.setMonth( new_stop.getMonth() + direction );
                }
                else if( measure === 'week' ) {
                    new_start.setDate( new_start.getDate() + direction * 7 );
                    new_stop.setDate( new_stop.getDate() + direction * 7 );    
                }

                // apply the new values to the date_range object
                _this.date_range.start = new_start;
                _this.date_range.stop = new_stop;
            };

            // initial setup
            this.init = function(){
                this.calibrate_date_range({});
            }
            this.init();

        }
    );

})(angular);

