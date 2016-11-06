
var assert = require('assert');
import pick from "..";

describe( __filename, function() {
    it('pick hello world', function() {
        assert.equal( 
            pick( '{% hello world %}' ).result.join(''),
            'hello world'
        );
    });

    it( 'pick 2 hello world', function(){
        var pick_result = pick( 'hello1 {% hello2 %} hello3 {% hello4 %}' );
        assert.equal( pick_result.result.join(''), 'hello1 hello2 hello3 hello4' );

        assert.equal( pick_result.map[1].from , 'hello2' );
        assert.equal( pick_result.map[1].to   , 'hello2' );
        assert.equal( pick_result.map[2].from , 'hello4' );
        assert.equal( pick_result.map[2].to   , 'hello4' );
    } );

    it( 'custom adjust', function(){
        let pick_result = pick( '{% hello world %}', { outputAdjust : x => `we say : ${x}` } );
        assert.equal( pick_result.result.join( '' ), 'we say : hello world' );
    } );
});
