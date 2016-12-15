
var assert = require('assert');
import pick from "..";
import { pick as pickAlias } from "../..";

describe( __filename, function() {
    it('pick alias', function(){
        assert.equal( pick, pickAlias );
    } );
    it('pick hello world', function() {
        assert.equal( 
            pick( '{% hello world %}' ).result.join(''),
            'hello world'
        );
    });

    it( 'pick 2 hello world', function(){
        var pick_result = pick( 'hello1 {% hello2 %} hello3 {% hello4 %}' );
        assert.equal( pick_result.result.join(''), 'hello1 hello2 hello3 hello4' );

        assert.equal( pick_result.map[0].from , 'hello2' );
        assert.equal( pick_result.map[0].to   , 'hello2' );
        assert.equal( pick_result.map[1].from , 'hello4' );
        assert.equal( pick_result.map[1].to   , 'hello4' );
    } );

    it( 'custom adjust', function(){
        let pick_result = pick( '{% hello world %}', { outputAdjust : x => `we say : ${x}` } );
        assert.equal( pick_result.result.join( '' ), 'we say : hello world' );
    } );

    it( 'ignore range', function(){
        let pick_result = pick(
                '{-{% hello world %}-}',
                {
                    ignoreStart : '{-',
                    ignoreEnd   : '-}',
                }
            );
        assert.equal( pick_result.result.join( '' ), '{% hello world %}' );
    } );

    it( 'pick 2 hello world with ignore range', function(){
        console.log();
        console.log( '      |            #  hello1 {-hey-} {% hello2 %} 3 {% hello2.5 %} hello3 {-judy-} {% hello4 %}' );
        console.log( '      | area       #  -------       --------------------------------------        -------------' );
        console.log( '      |      index #      0                            1                                  2    ' );
        console.log( '      | range      #                 ------------   --------------                 ------------' );
        console.log( '      |      index #                      0               1                               0    ' );
        console.log( '      | mix        #                      .1.0          .1.1                            .2.0   ' );
        var pick_result = pick(
                'hello1 {-hey-} {% hello2 %} 3 {% hello2.5 %} hello3 {-judy-} {% hello4 %}',
                {
                    ignoreStart : '{-',
                    ignoreEnd   : '-}',
                }
            );
        assert.equal( pick_result.result.join(''), 'hello1 hey hello2 3 hello2.5 hello3 judy hello4' );

        assert.equal( pick_result.map[1][0].from , 'hello2' );
        assert.equal( pick_result.map[1][0].to   , 'hello2' );
        assert.equal( pick_result.map[2][0].from , 'hello4' );
        assert.equal( pick_result.map[2][0].to   , 'hello4' );
    } );
    it( 'pick ignore range case 2', function(){
        console.log();
        console.log( '               | {% hello world %} {-ignore area-} {% hello world2 %} {% hello world3 %} ' );
        console.log( '       area    | ------------------               -------------------------------------- ' );
        console.log( '        .index |         0                                 1 '                             );
        console.log( '       range   | -----------------                 ------------------ ------------------ ' );
        console.log( '        .index |         0                                 0                  1 '          );
        console.log( '       sum     |      map.0.0                          map.1.0            map.1.1 '        );

        var pick_result = pick(
                '{% hello world %} {-ignore area-} {% hello world2 %} {% hello world3 %}',
                {
                    ignoreStart : '{-',
                    ignoreEnd   : '-}',
                }
            );
        assert.equal( pick_result.result.join(''), 'hello world ignore area hello world2 hello world3' );

        assert.equal( pick_result.map[0][0].from , 'hello world' );
        assert.equal( pick_result.map[0][0].to   , 'hello world' );
        assert.equal( pick_result.map[1][0].from , 'hello world2' );
        assert.equal( pick_result.map[1][0].from , 'hello world2' );
        assert.equal( pick_result.map[1][1].from , 'hello world3' );
        assert.equal( pick_result.map[1][1].from , 'hello world3' );
    } );
});
