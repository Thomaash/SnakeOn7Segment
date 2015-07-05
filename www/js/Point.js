function Point( tl, tr, rt, rb, br, bl, lb, lt ) {
    this.tl = tl;
    this.tr = tr;
    this.rt = rt;
    this.rb = rb;
    this.br = br;
    this.bl = bl;
    this.lb = lb;
    this.lt = lt;
    this.clearBlocking();

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
    block        : function ( from, to ) {
        this.blocked[ this.getCrossing( from, to ) ] = { from: this[ from ], to: this[ to ] };
    },
    unblock      : function ( led ) {
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
    isBlocked    : function ( from, to ) {
        var paths = [];
        switch ( this.getCrossing( from, to ) ) {
            case "ht":
                paths = [ "vl", "vr", "ht" ];
                break;
            case "hb":
                paths = [ "vl", "vr", "hb" ];
                break;
            case "vl":
                paths = [ "hb", "ht", "vl" ];
                break;
            case "vr":
                paths = [ "hb", "ht", "vr" ];
                break;
        }

        for ( var i = 0; i < paths.length; ++i ) {
            if ( this.blocked[ paths[ i ] ] != null ) {
                return true;
            }
        }
    },
    clearBlocking: function () {
        this.blocked = {
            ht: null, hb: null, vl: null, vr: null
        };
    },
    getCrossing  : function ( from, to ) {
        if ( from.localeCompare( to ) > 0 ) {
            var tmp = from;
            from = to;
            to = tmp;
        }

        switch ( from + to ) {
            case "ltrt":
            case "rttl":
            case "lttr":
                return "ht";
            case "lbrb":
            case "blrb":
            case "brlb":
                return "hb";
            case "bltl":
            case "lbtl":
            case "bllt":
                return "vl";
            case "brtr":
            case "rbtr":
            case "brrt":
                return "vr";
            default:
                return null;
        }
    }
};