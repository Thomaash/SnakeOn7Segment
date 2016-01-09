//noinspection BadExpressionStatementJS
({
    baseUrl    : "www/js/",
    optimize   : "uglify2",
    name       : "main",
    out        : "www/script.js",
    wrap       : true, //(function() { + content + }());
    logLevel   : 0, //TRACE: 0, INFO: 1, WARN: 2, ERROR: 3, SILENT: 4; Default is 0.
    waitSeconds: 7,
    paths      : {
        Phaser: "empty:"
    }
});