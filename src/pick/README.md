
# pick

## Description

将输入的文本按照预定好的标签来提取内容，可以对将提取的内容做转化

## Usage

```javascript
import pick from "ziey-utils/pick";
// or import { pick } from "ziey-utils";

// pick( content, { openTag = '{%', closeTag = '%}', inputAdjust = trimInput, outputAdjust = x => x } = {} );

pick( '{% hello world %}' ) /* ==>
    result : [ 'hello world' ],
    map : {
        "0" : { from : "hello world", to : "hello world" }
    }
*/

// ignore range
//         | {% hello world %} {-ignore area-} {% hello world2 %} {% hello world3 %}
// area    | ------------------               --------------------------------------
//  .index |         0                                 1
// range   | -----------------                 ------------------ ------------------
//  .index |         0                                 0                  1
// sum     |      map.0.0                          map.1.0            map.1.1
//
pick( '{% hello world %} {-ignore area-} {% hello world2 %} {% hello world3 %}', { ignoreStart : '{-', ignoreEnd : '-}' } ) /* ==>
    result : [ 'hello world ', 'ignore area', ' hello world2 hello world3' ],
    map : {
        "0" : {
            "0" : { from : "hello world", to : "hello world" },
        },
        "1" : {
            "0" : { from : "hello world2", to : "hello world2" },
            "1" : { from : "hello world3", to : "hello world3" },
        },
    }
*/


// custom tag
pick( '{[ hello world #}', { openTag : '{[', closeTag : '#}' } );

// custom adjust
pick( '{% hello world %}', { outputAdjust : x => `we say : ${x}` } );
/* ==> {
    result : [ 'we say : hello world' ],
    map : {
        "0" : { from : "hello world", to : "we say : hello world" }
    }
}
*/

```
