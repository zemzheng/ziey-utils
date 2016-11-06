
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
        "1" : { from : "hello world", to : "hello world" }
    }
*/

// custom tag
pick( '{[ hello world #}', { openTag : '{[', closeTag : '#}' } );

// custom adjust
pick( '{% hello world %}', { outputAdjust : x => `we say : ${x}` } );
/* ==> {
    result : [ 'we say : hello world' ],
    map : {
        "1" : { from : "hello world", to : "we say : hello world" }
    }
}
*/

```
