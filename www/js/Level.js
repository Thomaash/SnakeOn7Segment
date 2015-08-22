function Level( value, precision, min, max ) {
    this.precision = Math.pow( 10, precision );
    this.level = value * this.precision;
    this.min = min * this.precision;
    this.max = max * this.precision;

    this.add = function ( int, decimal ) {
        this.level += int * this.precision + decimal;
        this.limit();
    };
    this.sub = function ( int, decimal ) {
        this.level -= int * this.precision + decimal;
        this.limit();
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
}