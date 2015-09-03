define( [], function () {
    return function ( defaultValue, precision, min, max ) {
        this.level = 0;
        this.precision = Math.pow( 10, precision );
        this.default = defaultValue * this.precision;
        this.min = min * this.precision;
        this.max = max * this.precision;

        this.add = function ( int, decimal ) {
            this.change( int, decimal );
        };
        this.sub = function ( int, decimal ) {
            this.change( -int, -decimal );
        };
        this.change = function ( int, decimal ) {
            this.level += int * this.precision + decimal;
            this.limit();
            this.save();
        };
        this.floor = function () {
            return Math.floor( this.level / this.precision );
        };
        this.limit = function () {
            if ( this.level < this.min ) {
                this.level = this.min;
            } else if ( this.level > this.max ) {
                this.level = this.max;
            }
        };
        this.load = function () {
            var item = parseInt( window.localStorage.getItem( "So7S_level" ) );
            if ( isNaN( item ) ) {
                this.level = this.default;
            } else {
                this.level = item;
                this.limit();
            }
        };
        this.save = function () {
            window.localStorage.setItem( "So7S_level", this.level );
        };

        // Load saved value or use default
        this.load();
    };
} );