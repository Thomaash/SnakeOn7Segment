function Point( tl, tr, rt, rb, br, bl, lb, lt ) {
    this.tl = tl;
    this.tr = tr;
    this.rt = rt;
    this.rb = rb;
    this.br = br;
    this.bl = bl;
    this.lb = lb;
    this.lt = lt;
    this.blocked = {
        ht: null, hb: null, vl: null, vr: null
    };

    if ( this.lt != null ) {
        this.lt.BR.point = this;
        this.lt.BR.pos = "lt";
    }
    if ( this.tl != null ) {
        this.tl.BR.point = this;
        this.tl.BR.pos = "tl";
    }
    if ( this.tr != null ) {
        this.tr.BR.point = this;
        this.tr.BR.pos = "tr";
    }
    if ( this.lb != null ) {
        this.lb.BR.point = this;
        this.lb.BR.pos = "lb";
    }
    if ( this.rt != null ) {
        this.rt.TL.point = this;
        this.rt.TL.pos = "rt";
    }
    if ( this.rb != null ) {
        this.rb.TL.point = this;
        this.rb.TL.pos = "rb";
    }
    if ( this.br != null ) {
        this.br.TL.point = this;
        this.br.TL.pos = "br";
    }
    if ( this.bl != null ) {
        this.bl.TL.point = this;
        this.bl.TL.pos = "bl";
    }
}
Point.prototype = {
    block    : function ( from, to ) {
        var leds = { from: this[ from ], to: this[ to ] };
        if ( from.localeCompare( to ) > 0 ) {
            var tmp = from;
            from = to;
            to = tmp;
        }

        switch ( from + to ) {
            case "lbrb":
                this.blocked.hb = leds;
                break;
            case "ltrt":
                this.blocked.ht = leds;
                break;
            case "brtr":
                this.blocked.vl = leds;
                break;
            case "bltl":
                this.blocked.vr = leds;
                break;
        }
    },
    unblock  : function ( led ) {
        if ( this.blocked.hb != null && this.blocked.hb.from === led ) {
            this.blocked.hb = null;
        } else if ( this.blocked.ht != null && this.blocked.ht.from === led ) {
            this.blocked.ht = null;
        } else if ( this.blocked.vl != null && this.blocked.vl.from === led ) {
            this.blocked.vl = null;
        } else if ( this.blocked.vr != null && this.blocked.vr.from === led ) {
            this.blocked.vr = null;
        }
    },
    isBlocked: function ( direction ) {
        if (
            ( /^[tb]$/.exec( direction ) && ( this.blocked.hb != null || this.blocked.ht != null ) )
            ||
            ( /^[lr]$/.exec( direction ) && ( this.blocked.vl != null || this.blocked.vr != null ) )
        ) {
            console.log( "blocked" );
            return true;
        }
    }
};