var assert = require('assert');
import data2id from "..";
import { data2id as data2idAlias } from "../..";
import hashCode from "../hash";

describe( __filename, function(){
    it('pick alias', function(){
        assert.equal( data2id, data2idAlias );
    } );
    it( 'number', function(){
        assert.equal( data2id( 2 ), hashCode( '2' ) );
        assert.notEqual( data2id( 1 ), data2id( 2 ) );
        assert.notEqual( hashCode( `{mark=1}` ), hashCode( `{mark=2}` ) );
    } );

    it( 'string', function(){
        assert.equal( data2id( 'string' ), hashCode( 'string' ) );
    } );

    it( 'function', function(){
        function action(){
            return 123;
        }
        assert.equal( data2id( action ), hashCode( action.toString() ) );
    } );

    it( 'boolen', function(){
        assert.equal( data2id( true ),  hashCode( 'true' ) );
    } );

    it( 'undefined', function(){
        assert.equal( data2id( undefined ),  hashCode( 'undefined' ) );
    } );

    it( 'null', function(){
        assert.equal( data2id( null ),  hashCode( 'null' ) );
    } );

    it( 'array', function(){
        assert.notEqual( data2id( [ 2, 1, 3 ] ), data2id( [ 1, 2, 3 ] ) );
    } );

    it( 'object', function(){
        assert.equal( data2id( { a : 2, b : 1, c : 3 } ),  data2id( { a : 2, c : 3, b : 1 } ) );
        assert.notEqual( data2id( { a : 2, b : 1, c : 3 } ), data2id( { a : 2, c : 3, b : 1, d: 1 } ) );
    } );

    it( 'use id', function(){
        assert.equal( data2id({type: "discover/mv", id: 96}),  data2id({type: "discover/mv", id: 96, mark: 1}) );
    } );

    it( 'ignore id', function(){
        assert.notEqual( data2id({type: "discover/mv", id: 96}, false), data2id({type: "discover/mv", id: 96, mark: 1}, false) );
        assert.notEqual( data2id({type: "discover/mv", id: 96, mark : 2 }, false), data2id({type: "discover/mv", id: 96, mark: 1}, false) );
    } );
} );

