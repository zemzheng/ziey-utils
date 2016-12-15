function inputAdjustDefault( str ){
    return str.trim();
}

function outputAdjustDefault( str ){
    return str;
}

const same = x => x;

function splitMe({ content = '', openTag, closeTag, makeErr, handler_outside = same, handler_inside = same } = {} ){
    let result = [];
    ( content + '' ).split( openTag ).forEach( function( one, index ){
        if( !index ){
            result.push( handler_outside( one, index, one ) );
            return; // ignore first one
        }
        let rightList = one.split( closeTag );
        if( 2 != rightList.length ) throw makeErr( one, index );
        result.push( handler_inside( rightList.shift(), index, one ) );
        result.push( handler_outside( rightList.shift(), index, one ) );
    } );
    return result.filter( x => x );
}

function handleTargetRange( content, { openTag = '{%', closeTag = '%}', inputAdjust = inputAdjustDefault, outputAdjust = outputAdjustDefault } = {}, range_index = 0 ){

    let map = [],
        makeErr = ( one, index ) => {
            index = index - 1;
            let err = new Error( `closeTag did not match openTag at index ${ range_index } - ${ index } : ${ one }` );
            err.range_index = range_index;
            err.index       = index;
            err.content     = one;
            throw err;
        },
        handler_inside  = ( content, index, one ) => {
            index = index - 1;
            let from = inputAdjust( content ),
                to   = outputAdjust( from );
            map.push( { from, to } );
            return to;
        };

    let result = splitMe({ content, openTag, closeTag, makeErr, handler_inside });
    return { result, map };
}

export default function( content, options = {} ){
    let map = [],
        { ignoreStart : openTag, ignoreEnd : closeTag } = options,
        makeErr = ( one, index ) => {
            let err = new Error( `closeTag did not match openTag at index ${ index } : ${ one }` );
            err.index   = index;
            err.content = one;
            throw err;
        },
        handler_outside = ( content, index, one ) => {
            let { result : _result, map : _map } = handleTargetRange( content, options, index );
            map.push( _map );
            return _result.join( '' );
        }

    let result;
    if( openTag && closeTag ){
        result = splitMe({ content, openTag, closeTag, makeErr, handler_outside, })
    } else {
        result = [ handler_outside( content, 0, content ) ];
    }
    return {
        result,
        map : 1 == map.length ? map[0] : map,
    };
}
