# 经典CRUD

## 查询



### API



- [Model.find()](https://mongoosejs.com/docs/api/model.html#model_Model.find)
- [Model.findById()](https://mongoosejs.com/docs/api/model.html#model_Model.findById)
- [Model.findByIdAndDelete()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete)
- [Model.findByIdAndRemove()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndRemove)
- [Model.findByIdAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)
- [Model.findOne()](https://mongoosejs.com/docs/api/model.html#model_Model.findOne)
- [Model.findOneAndDelete()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndDelete)
- [Model.findOneAndRemove()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndRemove)
- [Model.findOneAndReplace()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndReplace)
- [Model.findOneAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate)
- [Model.hydrate()](https://mongoosejs.com/docs/api/model.html#model_Model.hydrate)

- [Model.populate()](https://mongoosejs.com/docs/api/model.html#model_Model.populate)



### [Model.findByIdAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)

##### Parameters

- id

   

  «Object|Number|String»

   

  value of

   

  ```
  _id
  ```

   

  to query by

  

- [update] «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- - [options.returnDocument='before']

     

    «String»

     

    Has two possible values,

     

    ```
    'before'
    ```

     

    and

     

    ```
    'after'
    ```

    . By default, it will return the document before the update was applied.

    

- - [options.lean]

     

    «Object»

     

    if truthy, mongoose will return the document as a plain JavaScript object rather than a mongoose document. See

     

    `Query.lean()`

     

    and

     

    the Mongoose lean tutorial

    .

    

- - [options.session=null]

     

    «ClientSession»

     

    The session associated with this query. See

     

    transactions docs

    .

    

- - [options.strict]

     

    «Boolean|String»

     

    overwrites the schema's

     

    strict mode option

    

- - [options.timestamps=null]

     

    «Boolean»

     

    If set to

     

    ```
    false
    ```

     

    and

     

    schema-level timestamps

     

    are enabled, skip timestamps for this update. Note that this allows you to overwrite timestamps. Does nothing if schema-level timestamps are not set.

    

- - [options.overwrite=false]

     

    «Boolean»

     

    By default, if you don't include any

     

    update operators

     

    in

     

    ```
    update
    ```

    , Mongoose will wrap

     

    ```
    update
    ```

     

    in

     

    ```
    $set
    ```

     

    for you. This prevents you from accidentally overwriting the document. This option tells Mongoose to skip adding

     

    ```
    $set
    ```

    . An alternative to this would be using

     

    Model.findOneAndReplace({ _id: id }, update, options, callback)

    .

    

- [callback] «Function»

##### Returns:

- «Query»

通过文档的 _id 字段，发起一个mongodb的查询更新命令。 `findByIdAndUpdate(id, ...)` 等同于 `findOneAndUpdate({ _id: id }, ...)`。



Issues a mongodb findAndModify update command by a document's _id field. `findByIdAndUpdate(id, ...)` is equivalent to `findOneAndUpdate({ _id: id }, ...)`.

Finds a matching document, updates it according to the `update` arg, passing any `options`, and returns the found document (if any) to the callback. The query executes if `callback` is passed.

This function triggers the following middleware.

- `findOneAndUpdate()`

#### [Options:](https://mongoosejs.com/docs/api/model.html#options)

- `new`: bool - true to return the modified document rather than the original. defaults to false
- `upsert`: bool - creates the object if it doesn't exist. defaults to false.
- `runValidators`: if true, runs [update validators](https://mongoosejs.com/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema.
- `setDefaultsOnInsert`: `true` by default. If `setDefaultsOnInsert` and `upsert` are true, mongoose will apply the [defaults](https://mongoosejs.com/docs/defaults.html) specified in the model's schema if a new document is created.
- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `select`: sets the document fields to return
- `rawResult`: if true, returns the [raw result from the MongoDB driver](https://mongodb.github.io/node-mongodb-native/4.3/interfaces/ModifyResult.html)
- `strict`: overwrites the schema's [strict mode option](https://mongoosejs.com/docs/guide.html#strict) for this update

#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
A.findByIdAndUpdate(id, update, options, callback) // executes
A.findByIdAndUpdate(id, update, options)  // returns Query
A.findByIdAndUpdate(id, update, callback) // executes
A.findByIdAndUpdate(id, update)           // returns Query
A.findByIdAndUpdate()                     // returns Query
```

#### [Note:](https://mongoosejs.com/docs/api/model.html#note)

All top level update keys which are not `atomic` operation names are treated as set operations:

#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)

// is sent as
Model.findByIdAndUpdate(id, { $set: { name: 'jason bourne' }}, options, callback)
```

This helps prevent accidentally overwriting your document with `{ name: 'jason bourne' }`.

#### [Note:](https://mongoosejs.com/docs/api/model.html#note-1)

`findOneAndX` and `findByIdAndX` functions support limited validation. You can enable validation by setting the `runValidators` option.

If you need full-fledged validation, use the traditional approach of first retrieving the document.

```
Model.findById(id, function (err, doc) {
  if (err) ..
  doc.name = 'jason bourne';
  doc.save(callback);
});
```

------

### [Model.findOne()](https://mongoosejs.com/docs/api/model.html#model_Model.findOne)

##### Parameters

- [conditions] «Object»

- [projection]

   

  «Object|String|Array<String>»

   

  optional fields to return, see

   

  `Query.prototype.select()`

  

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- [callback] «Function»

##### Returns:

- «Query»

Finds one document.

The `conditions` are cast to their respective SchemaTypes before the command is sent.

*Note:* `conditions` is optional, and if `conditions` is null or undefined, mongoose will send an empty `findOne` command to MongoDB, which will return an arbitrary document. If you're querying by `_id`, use `findById()` instead.

#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
// Find one adventure whose `country` is 'Croatia', otherwise `null`
await Adventure.findOne({ country: 'Croatia' }).exec();

// using callback
Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});

// select only the adventures name and length
await Adventure.findOne({ country: 'Croatia' }, 'name length').exec();
```

------

### [Model.findOneAndDelete()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndDelete)

##### Parameters

- conditions «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- - [options.strict]

     

    «Boolean|String»

     

    overwrites the schema's

     

    strict mode option

    

- - [options.projection=null]

     

    «Object|String|Array<String>»

     

    optional fields to return, see

     

    `Query.prototype.select()`

    

- - [options.session=null]

     

    «ClientSession»

     

    The session associated with this query. See

     

    transactions docs

    .

    

- [callback] «Function»

##### Returns:

- «Query»

Issue a MongoDB `findOneAndDelete()` command.

Finds a matching document, removes it, and passes the found document (if any) to the callback.

Executes the query if `callback` is passed.

This function triggers the following middleware.

- `findOneAndDelete()`

This function differs slightly from `Model.findOneAndRemove()` in that `findOneAndRemove()` becomes a [MongoDB `findAndModify()` command](https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/), as opposed to a `findOneAndDelete()` command. For most mongoose use cases, this distinction is purely pedantic. You should use `findOneAndDelete()` unless you have a good reason not to.

#### [Options:](https://mongoosejs.com/docs/api/model.html#options)

- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `select`: sets the document fields to return, ex. `{ projection: { _id: 0 } }`
- `projection`: equivalent to `select`
- `rawResult`: if true, returns the [raw result from the MongoDB driver](https://mongodb.github.io/node-mongodb-native/4.3/interfaces/ModifyResult.html)
- `strict`: overwrites the schema's [strict mode option](https://mongoosejs.com/docs/guide.html#strict) for this update

#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
A.findOneAndDelete(conditions, options, callback) // executes
A.findOneAndDelete(conditions, options)  // return Query
A.findOneAndDelete(conditions, callback) // executes
A.findOneAndDelete(conditions) // returns Query
A.findOneAndDelete()           // returns Query
```

`findOneAndX` and `findByIdAndX` functions support limited validation. You can enable validation by setting the `runValidators` option.

If you need full-fledged validation, use the traditional approach of first retrieving the document.

```
Model.findById(id, function (err, doc) {
  if (err) ..
  doc.name = 'jason bourne';
  doc.save(callback);
});
```

------

### [Model.findOneAndRemove()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndRemove)

##### Parameters

- conditions «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- - [options.session=null]

     

    «ClientSession»

     

    The session associated with this query. See

     

    transactions docs

    .

    

- - [options.strict]

     

    «Boolean|String»

     

    overwrites the schema's

     

    strict mode option

    

- - [options.projection=null]

     

    «Object|String|Array<String>»

     

    optional fields to return, see

     

    `Query.prototype.select()`

    

- [callback] «Function»

##### Returns:

- «Query»

Issue a mongodb findAndModify remove command.

Finds a matching document, removes it, passing the found document (if any) to the callback.

Executes the query if `callback` is passed.

This function triggers the following middleware.

- `findOneAndRemove()`

#### [Options:](https://mongoosejs.com/docs/api/model.html#options)

- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `select`: sets the document fields to return
- `projection`: like select, it determines which fields to return, ex. `{ projection: { _id: 0 } }`
- `rawResult`: if true, returns the [raw result from the MongoDB driver](https://mongodb.github.io/node-mongodb-native/4.3/interfaces/ModifyResult.html)
- `strict`: overwrites the schema's [strict mode option](https://mongoosejs.com/docs/guide.html#strict) for this update

#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
A.findOneAndRemove(conditions, options, callback) // executes
A.findOneAndRemove(conditions, options)  // return Query
A.findOneAndRemove(conditions, callback) // executes
A.findOneAndRemove(conditions) // returns Query
A.findOneAndRemove()           // returns Query
```

`findOneAndX` and `findByIdAndX` functions support limited validation. You can enable validation by setting the `runValidators` option.

If you need full-fledged validation, use the traditional approach of first retrieving the document.

```
Model.findById(id, function (err, doc) {
  if (err) ..
  doc.name = 'jason bourne';
  doc.save(callback);
});
```

------

### [Model.findOneAndReplace()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndReplace)

##### Parameters

- filter

   

  «Object»

   

  Replace the first document that matches this filter

  

- [replacement]

   

  «Object»

   

  Replace with this document

  

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- - [options.returnDocument='before']

     

    «String»

     

    Has two possible values,

     

    ```
    'before'
    ```

     

    and

     

    ```
    'after'
    ```

    . By default, it will return the document before the update was applied.

    

- - [options.lean]

     

    «Object»

     

    if truthy, mongoose will return the document as a plain JavaScript object rather than a mongoose document. See

     

    `Query.lean()`

     

    and

     

    the Mongoose lean tutorial

    .

    

- - [options.session=null]

     

    «ClientSession»

     

    The session associated with this query. See

     

    transactions docs

    .

    

- - [options.strict]

     

    «Boolean|String»

     

    overwrites the schema's

     

    strict mode option

    

- - [options.timestamps=null]

     

    «Boolean»

     

    If set to

     

    ```
    false
    ```

     

    and

     

    schema-level timestamps

     

    are enabled, skip timestamps for this update. Note that this allows you to overwrite timestamps. Does nothing if schema-level timestamps are not set.

    

- - [options.projection=null]

     

    «Object|String|Array<String>»

     

    optional fields to return, see

     

    `Query.prototype.select()`

    

- [callback] «Function»

##### Returns:

- «Query»

Issue a MongoDB `findOneAndReplace()` command.

Finds a matching document, replaces it with the provided doc, and passes the returned doc to the callback.

Executes the query if `callback` is passed.

This function triggers the following query middleware.

- `findOneAndReplace()`

#### [Options:](https://mongoosejs.com/docs/api/model.html#options)

- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `select`: sets the document fields to return
- `projection`: like select, it determines which fields to return, ex. `{ projection: { _id: 0 } }`
- `rawResult`: if true, returns the [raw result from the MongoDB driver](https://mongodb.github.io/node-mongodb-native/4.3/interfaces/ModifyResult.html)
- `strict`: overwrites the schema's [strict mode option](https://mongoosejs.com/docs/guide.html#strict) for this update

#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
A.findOneAndReplace(filter, replacement, options, callback) // executes
A.findOneAndReplace(filter, replacement, options)  // return Query
A.findOneAndReplace(filter, replacement, callback) // executes
A.findOneAndReplace(filter, replacement) // returns Query
A.findOneAndReplace()                    // returns Query
```

------

### [Model.findOneAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate)

##### Parameters

- [conditions] «Object»

- [update] «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- - [options.returnDocument='before']

     

    «String»

     

    Has two possible values,

     

    ```
    'before'
    ```

     

    and

     

    ```
    'after'
    ```

    . By default, it will return the document before the update was applied.

    

- - [options.lean]

     

    «Object»

     

    if truthy, mongoose will return the document as a plain JavaScript object rather than a mongoose document. See

     

    `Query.lean()`

     

    and

     

    the Mongoose lean tutorial

    .

    

- - [options.session=null]

     

    «ClientSession»

     

    The session associated with this query. See

     

    transactions docs

    .

    

- - [options.strict]

     

    «Boolean|String»

     

    overwrites the schema's

     

    strict mode option

    

- - [options.timestamps=null]

     

    «Boolean»

     

    If set to

     

    ```
    false
    ```

     

    and

     

    schema-level timestamps

     

    are enabled, skip timestamps for this update. Note that this allows you to overwrite timestamps. Does nothing if schema-level timestamps are not set.

    

- - [options.overwrite=false]

     

    «Boolean»

     

    By default, if you don't include any

     

    update operators

     

    in

     

    ```
    update
    ```

    , Mongoose will wrap

     

    ```
    update
    ```

     

    in

     

    ```
    $set
    ```

     

    for you. This prevents you from accidentally overwriting the document. This option tells Mongoose to skip adding

     

    ```
    $set
    ```

    . An alternative to this would be using

     

    Model.findOneAndReplace(conditions, update, options, callback)

    .

    

- - [options.upsert=false]

     

    «Boolean»

     

    if true, and no documents found, insert a new document

    

- - [options.projection=null]

     

    «Object|String|Array<String>»

     

    optional fields to return, see

     

    `Query.prototype.select()`

    

- [callback] «Function»

##### Returns:

- «Query»

Issues a mongodb findAndModify update command.

Finds a matching document, updates it according to the `update` arg, passing any `options`, and returns the found document (if any) to the callback. The query executes if `callback` is passed else a Query object is returned.

注意，findOneAndUpdate默认返回旧的文档，即查询到的、更新前的文档，

通过options.new为true，可以返回更新后的文档。



#### [Options:](https://mongoosejs.com/docs/api/model.html#options)

- `new`: bool - 如果为true，则返回更新后的文档，否则返回原始文档。默认值为false，在4.0版本变更。（是4.0改为false了还是4.0改为true了？？） defaults to false (changed in 4.0)
- `upsert`: bool - creates the object if it doesn't exist. defaults to false.
- `overwrite`: bool - if true, replace the entire document.
- `fields`: {Object|String} - Field selection. Equivalent to `.select(fields).findOneAndUpdate()`
- `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
- `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
- `runValidators`: if true, runs [update validators](https://mongoosejs.com/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema.
- `setDefaultsOnInsert`: `true` by default. If `setDefaultsOnInsert` and `upsert` are true, mongoose will apply the [defaults](https://mongoosejs.com/docs/defaults.html) specified in the model's schema if a new document is created.
- `rawResult`: if true, returns the [raw result from the MongoDB driver](https://mongodb.github.io/node-mongodb-native/4.3/interfaces/ModifyResult.html)
- `strict`: overwrites the schema's [strict mode option](https://mongoosejs.com/docs/guide.html#strict) for this update

#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
A.findOneAndUpdate(conditions, update, options, callback) // executes
A.findOneAndUpdate(conditions, update, options)  // returns Query
A.findOneAndUpdate(conditions, update, callback) // executes
A.findOneAndUpdate(conditions, update)           // returns Query
A.findOneAndUpdate()                             // returns Query
```

#### [Note:](https://mongoosejs.com/docs/api/model.html#note)

All top level update keys which are not `atomic` operation names are treated as set operations:

#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
const query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

// is sent as
Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
```

This helps prevent accidentally overwriting your document with `{ name: 'jason bourne' }`.

#### [Note:](https://mongoosejs.com/docs/api/model.html#note-1)

`findOneAndX` and `findByIdAndX` functions support limited validation that you can enable by setting the `runValidators` option.

If you need full-fledged validation, use the traditional approach of first retrieving the document.

```
const doc = await Model.findById(id);
doc.name = 'jason bourne';
await doc.save();
```







通过Model查询，得到的结果是一个Query。

Model.find()
Parameters：
conditions «Object»
[projection] «Object» optional fields to return (http://bit.ly/1HotzBo)
[options] «Object» optional see Query.prototype.setOptions()
[callback] «Function»

Returns: «Query»

我们先查询：

model.find()  

再做分页查询：

model.find().skip(20).limit(10)

再做个排序：

model.find().skip(20).limit(10).sort({

  name: 1

})



说明，skip，limit，sort方法，是Query的原型方法。













**Model.find(conditions, [fields], [options], [callback])**

查询就是返回一个**集合中的文档的子集**，是一个数组。

数组的每个元素就是一条文档。

conditions <Object> //查询条件

[fields] <Object> //要查询的字段

[options] <Object> //查询配置参数

[callback] <Function> //回调

 这是18年的叫法。

现在文档改了，分别叫做：



filter
[projection] optional fields to return, see Query.prototype.select()
[options] «Object» optional see Query.prototype.setOptions()
[callback] «Function»







Mongoose Model提供了find，findOne，findBy方法用于文档查询。

Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()



### filter

«Object|ObjectId»

查询条件。是一个对象或者ObjectId。



```js
userModel.find({name: 'Lee'})

userModel.find({name: 'Lee', age: 18})


userModel.find({age: {$gt: 18, $lt: 30}})


userModel.find({name: 'Lee', age: {$in: [18, 26, 28]}})
```







### 范围查询

　  $or　　　　或关系

　　$nor　　　 或关系取反

　　$gt　　　　大于

　　$gte　　　 大于等于

　　$lt　　　　 小于

　　$lte　　　  小于等于

　　$ne       不等于

　　$in       在**多个值**范围内（只有一个值时就直接用 {age:10}）

　　$nin      不在多个值范围内

　　$all       匹配数组中多个值

　　

　　$size　　　匹配数组大小

　　$maxDistance　　范围查询，距离（基于LBS）

　　$mod　　  取模运算

　　$near　　　邻域查询，查询附近的位置（基于LBS）

　　$exists　　  字段是否存在

　　$elemMatch　　匹配内数组内的元素

　　$within　　范围查询（基于LBS）

　　$box　　　 范围查询，矩形范围（基于LBS）

　　$center    范围醒询，圆形范围（基于LBS）

　　$centerSphere　　范围查询，球形范围（基于LBS）

　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）

 

*User.find({userage: {$gte: 21, $lte: 65}}, callback);*  

 //这表示查询年龄大于等21而且小于等于65岁

 

查询所有等于6或者7岁或者8的小朋友

model.find({age:{$in:[6,7,8]}},function(err,result));

$in 和 $ne 除了条件判断不同，用法很相似。

 

 









### projection 投射

参数： «对象|字符串|数组<字符串>»

«Object|String|Array<String>» 

optional fields to return, see [Query.prototype.select()](https://mongoosejs.com/docs/api/query.html#query_Query-select)



几个demo：

find（conditons，projection ，callback）

projection 省略或者为null，查询所有字段。

 

Model.find({},{name:1,age:1,_id:0},function(err,result))

返回只包含name,age两个字段的所有记录。

1表示查询输出该字段，0表示不输出。



默认都会显示 _id，设置为0可以不显示。

其他非_id的字段，若设置为0会报错。



















[Query.prototype.select()](https://mongoosejs.com/docs/api/query.html#query_Query-select)



指定**要包含或排除的文档字段**（也称为查询“**投影**”）

使用字符串语法时，为路径添加前缀`-`会将该路径标记为已排除。

当路径没有`-`前缀时，它被包括在内。

最后，如果路径以 为前缀`+`，它会强制包含该路径，这对于在[架构级别](https://mongoosejs.com/docs/api.html#schematype_SchemaType-select)排除的路径很有用。



投影*必须*是**包含性的或排除性**的。

换句话说，您必须要么列出要包含的字段（排除所有其他字段），要么列出要排除的字段（这意味着包含所有其他字段）。该[`_id`字段是唯一的例外，因为 MongoDB 默认包含它](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#suppress-id-field)。

#### [例子](https://mongoosejs.com/docs/api/query.html#example)

```
// 只查询a和b字段，其他字段被排除
query.select('a b');

// 等同于下面的语法
query.select(['a', 'b']);
query.select({ a: 1, b: 1 });

// 排除c和d字段，只查询其他字段
query.select('-c -d');

// Use `+` to override schema-level `select: false` without making the
// projection inclusive.
const schema = new Schema({
  foo: { type: String, select: false },
  bar: String
});

// ...
query.select('+foo'); // Override foo's `select: false` without excluding `bar`

// or you may use object notation, useful when
// you have keys already prefixed with a "-"
query.select({ a: 1, b: 1 });
query.select({ c: 0, d: 0 });

Additional calls to select can override the previous selection:
query.select({ a: 1, b: 1 }).select({ b: 0 }); // selection is now { a: 1 }
query.select({ a: 0, b: 0 }).select({ b: 1 }); // selection is now { a: 0 }
```







### options

 «Object» 

optional see [Query.prototype.setOptions()](https://mongoosejs.com/docs/api/query.html#query_Query-setOptions)



Query.prototype.setOptions()

##### Parameters

- options «Object»

##### Returns:

- «Query» this

Sets query options. Some options only make sense for certain operations.

#### [Options:](https://mongoosejs.com/docs/api/query.html#options)

The following options are only for `find()`:

- [tailable](https://www.mongodb.org/display/DOCS/Tailable+Cursors)
- [sort](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-{{sort()}})
- [limit](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-{{limit()}})
- [skip](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-{{skip()}})
- [allowDiskUse](https://docs.mongodb.com/manual/reference/method/cursor.allowDiskUse/)
- [batchSize](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-{{batchSize()}})
- [readPreference](https://docs.mongodb.org/manual/applications/replication/#read-preference)
- [hint](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-%24hint)
- [comment](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-%24comment)
- [snapshot](https://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-{{snapshot()}})
- [maxscan](https://docs.mongodb.org/v3.2/reference/operator/meta/maxScan/#metaOp._S_maxScan)

The following options are only for write operations: `update()`, `updateOne()`, `updateMany()`, `replaceOne()`, `findOneAndUpdate()`, and `findByIdAndUpdate()`:

- [upsert](https://docs.mongodb.com/manual/reference/method/db.collection.update/)
- [writeConcern](https://docs.mongodb.com/manual/reference/method/db.collection.update/)
- [timestamps](https://mongoosejs.com/docs/guide.html#timestamps): If `timestamps` is set in the schema, set this option to `false` to skip timestamps for that particular update. Has no effect if `timestamps` is not enabled in the schema options.
- overwriteDiscriminatorKey: allow setting the discriminator key in the update. Will use the correct discriminator schema if the update changes the discriminator key.

The following options are only for `find()`, `findOne()`, `findById()`, `findOneAndUpdate()`, and `findByIdAndUpdate()`:

- [lean](https://mongoosejs.com/docs/api/api.html#query_Query-lean)
- [populate](https://mongoosejs.com/docs/populate.html)
- [projection](https://mongoosejs.com/docs/api/query.html#query_Query-projection)
- sanitizeProjection

The following options are only for all operations **except** `update()`, `updateOne()`, `updateMany()`, `remove()`, `deleteOne()`, and `deleteMany()`:

- [maxTimeMS](https://docs.mongodb.com/manual/reference/operator/meta/maxTimeMS/)

The following options are for `findOneAndUpdate()` and `findOneAndRemove()`

- rawResult

## [The following options are for all operations](https://mongoosejs.com/docs/api/query.html#the-following-options-are-for-all-operations)

- [strict](https://mongoosejs.com/docs/guide.html#strict)
- [collation](https://docs.mongodb.com/manual/reference/collation/)
- [session](https://docs.mongodb.com/manual/reference/server-sessions/)
- [explain](https://docs.mongodb.com/manual/reference/method/cursor.explain/)



### callback

«Function»





#### [Examples:](https://mongoosejs.com/docs/api/model.html#examples)

```
// 查询所有文档
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```







聚合查询

联表查询 连表查询



















### 数量查询

替换`count()`为`countDocuments()`，

```js
count(filter)

countDocuments(filter)
```













### populate关联查询

populate

用于查看关联文档内容, 也就是查询 **设置了** `**ref**` **的字段** 关联的 文档的 相关字段

 

Model.***populate\***(docs, options, [cb(err,doc)])

 

例子：

// User

```
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
  });
 
```

// Articel

const *ObjectId* = *mongoose*.Schema.Types.ObjectId;
 const *articleSchema* = new *mongoose*.Schema({
   title:{type:String,required:true},
   content:{type:String,required:true},
   create_on:{type:Date,default:Date.now},
   user:{type:*ObjectId*,ref:'User'}
 });

 

以上，Article集合的user字段，类型为ObjectId，通过存放User集合中记录的_id字段的值，就关联了User集合。就可以使用populate关联查询到User集合中的数据。

 

//示例

*Article*.find({}).populate('user').exec(function(*err*,*result*){
  console.log(*result*[0].user); // 此时user成为了一个对象，对应User集合中的一条记录
  console.log(*result*[0].user.username);
  console.log(*result*[0].user.password);

 });

 

 

//多个关联表需要使用数组

 

yield Article.findOne({

​    _id: id

  }, {

​    title: 1,

​    author: 1

  })

  .populate([{

​    path: 'comments', //文章的comments字段

​    select: {

​      _id: 1,

​      user: 1,

​      text: 1,

​    },

  }, {

​    path: 'category' //文章的category字段,

​    select: {

​      fields...

​    }

  }])















## 创建













- [Model.create()](https://mongoosejs.com/docs/api/model.html#model_Model.create)



### [Model.create()](https://mongoosejs.com/docs/api/model.html#model_Model.create)

##### Parameters

- docs

  «Array|Object»

  Documents to insert, as a spread or array

- [options]

  «Object»

  Options passed down tosave(). To specify options, docs must be an array, not a spread.

- [callback]

  «Function»

  callback

  

##### Returns:

- «Promise»

Shortcut for saving one or more documents to the database. `MyModel.create(docs)` does `new MyModel(doc).save()` for every doc in docs.

将一个或多个文档保存到数据库的快捷方式。 `MyModel.create(docs)`为文档中`new MyModel(doc).save()`的每个文档做。

此函数触发以下中间件。

This function triggers the following middleware.

- `save()`



#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
// Insert one new `Character` document
await Character.create({ name: 'Jean-Luc Picard' });

// Insert multiple new `Character` documents
await Character.create([{ name: 'Will Riker' }, { name: 'Geordi LaForge' }]);

// Create a new character within a transaction. Note that you **must**
// pass an array as the first parameter to `create()` if you want to
// specify options.
await Character.create([{ name: 'Jean-Luc Picard' }], { session });
```





## 更新



语法：

```js
// 使用doc更新匹配到的第一个文档。已弃用。
update(filter, doc, options)

// 推荐使用
// 使用doc更新匹配到的所有文档。不管multi选项的值如何。
// updateMany不会触发更新中间件。使用pre('updateMany') andpost('updateMany')代替。
updateMany(filter, doc, options)

// 使用doc更新匹配到的第一个文档。
// 不支持multi和overwrite选项。
// 好像会触发更新中间件。
updateOne(filter, doc, options)

replaceOne()
```





- [Model.update()](https://mongoosejs.com/docs/api/model.html#model_Model.update)
- [Model.updateMany()](https://mongoosejs.com/docs/api/model.html#model_Model.updateMany)
- [Model.updateOne()](https://mongoosejs.com/docs/api/model.html#model_Model.updateOne)

















## 删除

替换`remove()`为`deleteOne()`或`deleteMany()`。



```js
// 删除符合查询条件的所有文档。若只删除一个，设置options.single为true。
// 已弃用。
remove(filter, options)

// 删除符合查询条件的第一个文档。返回一个对象，包含一个deleteCount属性，表示删除的文档数量。
deleteOne()

// 删除符合查询条件的所有文档，返回一个对象，包含一个deleteCount属性，表示删除的文档数量。
deleteMany()
```





- [Model.deleteMany()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany)
- [Model.deleteOne()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)

- [Model.remove()](https://mongoosejs.com/docs/api/model.html#model_Model.remove)



### [Model.deleteMany()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany)

##### Parameters

- conditions «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- [callback] «Function»

##### Returns:

- «Query»

Deletes all of the documents that match `conditions` from the collection. It returns an object with the property `deletedCount` containing the number of documents deleted. Behaves like `remove()`, but deletes all documents that match `conditions` regardless of the `single` option.

#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }); // returns {deletedCount: x} where x is the number of documents deleted.
```

#### [Note:](https://mongoosejs.com/docs/api/model.html#note)

This function triggers `deleteMany` query hooks. Read the [middleware docs](https://mongoosejs.com/docs/middleware.html#naming) to learn more.

------

### [Model.deleteOne()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)

##### Parameters

- conditions «Object»

- [options]

   

  «Object»

   

  optional see

   

  `Query.prototype.setOptions()`

  

- [callback] «Function»

##### Returns:

- «Query»

Deletes the first document that matches `conditions` from the collection. It returns an object with the property `deletedCount` indicating how many documents were deleted. Behaves like `remove()`, but deletes at most one document regardless of the `single` option.

#### [Example:](https://mongoosejs.com/docs/api/model.html#example)

```
await Character.deleteOne({ name: 'Eddard Stark' }); // returns {deletedCount: 1}
```

#### [Note:](https://mongoosejs.com/docs/api/model.html#note)

This function triggers `deleteOne` query hooks. Read the [middleware docs](https://mongoosejs.com/docs/middleware.html#naming) to learn more.





## 分页

分页查询，需要用到两个api，skip和limit。



### [Query.prototype.limit()](https://mongoosejs.com/docs/api/query.html#query_Query-limit)

##### Parameters

- val «Number»

指定查询返回的最大文档数目。即限制查询的条数。

Specifies the maximum number of documents the query will return.

#### [Example](https://mongoosejs.com/docs/api/query.html#example)

```
query.limit(20);
```

#### [Note](https://mongoosejs.com/docs/api/query.html#note)

Cannot be used with `distinct()`





### [Query.prototype.skip()](https://mongoosejs.com/docs/api/query.html#query_Query-skip)

##### Parameters

- val «Number»

指定略过的文档数目。即略过一定的条数，再进行查询。

Specifies the number of documents to skip.

#### [Example](https://mongoosejs.com/docs/api/query.html#example)

```
query.skip(100).limit(20);
```

#### [Note](https://mongoosejs.com/docs/api/query.html#note)

Cannot be used with `distinct()`







## 排序



asc：升序

desc：降序

ascending：

descending：





### [Query.prototype.sort()](https://mongoosejs.com/docs/api/query.html#query_Query-sort)

##### Parameters

- arg «Object|String»

##### Returns:

- «Query» this

Sets the sort order

如果传递的参数是一个对象，值可以设为 `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`。

If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`.

如果传递的参数是一个字符串，

If a string is passed, it must be a space delimited list of path names. The sort order of each path is ascending unless the path name is prefixed with `-` which will be treated as descending.

#### [Example](https://mongoosejs.com/docs/api/query.html#example)

```
// sort by "field" ascending and "test" descending
query.sort({ field: 'asc', test: -1 });

// equivalent
query.sort('field -test');
```

#### [Note](https://mongoosejs.com/docs/api/query.html#note)

Cannot be used with `distinct()`











