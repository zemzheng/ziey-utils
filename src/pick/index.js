export default function( content, { openTag = '{%', closeTag = '%}', adjust = x => x } = {} ){

    let result     = [],
        map        = {};

    ( content + '' ).split( openTag ).forEach( function( one, index ){
        if( !index ) return; // ignore first one

        let rightList = one.split( closeTag );
        if( 2 != rightList.length ){
            let err = new Error( `closeTag did not match openTag at index ${ index } : ${ one }` );
            err.index   = index;
            err.content = one;
            throw err;
        }

        let from = rightList.shift(),
            to   = adjust( from );
        result.push( to );
        map[ index ] = { from, to }

        result = result.concat( rightList.filter( x => x ) );
    } );

    return { result, map };
}
