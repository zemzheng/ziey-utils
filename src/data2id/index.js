import hashCode from "./hash";

function data2id( data, local = true ){
    let result;
    if( local && data && data.id ) return data.id;
    switch( typeof data ){
        case 'number':
        case 'string':
            result = data + '';
            break;

        case 'function':
        case 'boolean':
        case 'undefined':
            result = data + '';
            break;

        default:
            switch( true ){
                case Array.isArray( data ):
                    result = `[${ data.map( x => data2id( x, local ) ).join( '|' ) }]`;
                    break;
                case null === data:
                    result = data + '';
                    break;
                default:
                    let list = Object.keys( data );
                    list.sort();
                    result = list.map( key => `${key}=${ data2id( data[ key ], local ) }` ).join( '|' );
                    result = `{${ result }}`;
            }
    }

    return hashCode( result );
}

export default data2id;
