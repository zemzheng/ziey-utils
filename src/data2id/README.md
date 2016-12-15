# data2id

## Description

将输入的数据转为 hash-string， 用以简化对比或者做 key 来标识

## Usage

```javascript
import data2id from "ziey-utils/data2id":
// or import { data2id } from "ziey-utils";

// data2id( data, pickIdDirectly = true );
data2id({ a : 1, b : 2 });
data2id({ c : 1, id : 1 } ) == data2id({ c : 1, id : 1 }, true )
data2id({ c : 1, id : 1 } ) != data2id({ c : 1, id : 1 }, true )
```
