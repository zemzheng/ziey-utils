var prompt = require('prompt');
var fs   = require( 'fs' ),
    path = require( 'path' );

function isFileExists( input ){
    return fs.existsSync( input )
};
var paramsList = [
    {
        name     : 'pkg',
        default  : 'package.json',
        message  : 'The path to get package.json',
        conform  : isFileExists,
        required : true,
    },
    {
        name     : 'readme',
        default  : 'readme.md',
        message  : 'The path to get readme',
        conform  : isFileExists,
        required : true
    }
];
prompt.start();

function go(){
    prompt.get( paramsList, function (err, result) {
        if( err ) throw err;
        var pkg    = result.pkg,
            readme = result.readme;

        var content = fs.readFileSync( pkg,    'utf8' ).toString(),
            readme  = fs.readFileSync( readme, 'utf8' ).toString(),
        content = JSON.parse( content );
        content.readme = readme;
        var version = content.version,
            nextParamsList = [
                {
                    name     : 'version',
                    default  : version,
                    required : true,
                }
            ];
        prompt.get(nextParamsList, function( err, result ){
            if( err ) throw err;
            content.version = result.version;
            console.log( content );

            prompt.get([ "ok" ], function( err, result ){
                if( err ) throw err;
                if( result.ok ){
                    content = JSON.stringify( content, null, 4 );
                    fs.writeFileSync( pkg, content );
                    console.log( 'Updated!' );
                } else {
                    go();
                }
            } );
        } )

    });
}

go();

