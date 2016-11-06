function inputAdjustDefault( str ){
    return str.trim();
}

function outputAdjustDefault( str ){
    return str;
}

export default function( content, { openTag = '{%', closeTag = '%}', inputAdjust = inputAdjustDefault, outputAdjust = outputAdjustDefault } = {} ){

    let result     = [],
        map        = {};

    ( content + '' ).split( openTag ).forEach( function( one, index ){
        if( !index ){
            result.push( one );
            return; // ignore first one
        }

        let rightList = one.split( closeTag );
        if( 2 != rightList.length ){
            let err = new Error( `closeTag did not match openTag at index ${ index } : ${ one }` );
            err.index   = index;
            err.content = one;
            throw err;
        }

        let from = inputAdjust( rightList.shift() ),
            to   = outputAdjust( from );
        result.push( to );
        map[ index ] = { from, to }

        result = result.concat( rightList );
    } );

    result = result.filter( x => x );

    return { result, map };
}
