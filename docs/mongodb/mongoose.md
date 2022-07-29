# Mongoose



### 文档采用v6.3.4。





以一个简单的demo，演示如何使用和基本概念。



```bash
mkdir mongoose-learn
cd mongoose-learn

pnpm init

pnpm add mongoose
```





```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });

kitty.save().then(() => console.log('meow'));
```





```js
const mongoose = require('mongoose')

// 连接到数据库
// 端口号默认为27017可以省略
mongoose.connect('mongodb://localhost/book') 

// 连接到需要认证的数据库
// 指定user和pass，并通过authSource指定用户属于哪个数据库
mongoose.connect('mongodb://admin:123456@localhost/book?authSource=admin') 

// 或者
// 语法：mongoose.connect(uri, options)
// connect 方法也接受 options 参数，这些参数会传入底层 MongoDB 驱动。
mongoose.connect('mongodb://localhost', {
    user: 'admin',
    pass: '123456',
    
    // 指定要连接的数据库名称（覆盖连接字符串）
    dbName: 'book',
    // 非mongoose特有，是mongodb node.js底层驱动的一个选项
    // 定义要进行身份验证的数据库
    authSource: 'admin',
    
    // 是否自动建立索引，默认为true
    autoIndex: false,
    
    // MongoDB保持的最大socket连接数。poolSize 的默认值是 5。
    // 注意，MongoDB 3.4 之前， MongoDB只允许每个 socket 同时进行一个操作，所以如果你有几个缓慢请求卡着后面快的请求，可以尝试增加连接数。
    poolSize: 10,
}) 

// 在以前，会提示设置 {useUnifiedTopology:true, useNewUrlParser:true}
// https://blog.csdn.net/Jack_lzx/article/details/109564138

// 创建Schema
const Schema = mongoose.Schema
const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    price: Number,
    tags: Array,
    author: {
        type: String,
        required: true
    },
    publishDate: Date,
    
    
    
}, {
    // 启用Mongoose自带的时间戳功能，将自动给集合添加两个字段
    timestamps: true, // 默认为false
    // 修改默认的时间戳字段，不修改则为默认名字
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    
    //
})

// 创建Model
// 第一个参数会成为数据库中集合的名字，默认会转为复数形式，当前的BookModel对应的集合名为books
const BookModel = mongoose.model('Book', bookSchema)
```



补充：

authSource：指定在哪个库验证用户。虽然 admin 库下存储所有账号的用户名和密码，但 authSource 参数不一定就是 admin 库。准确地说: 在哪个库下创建用户, authSource 就是那个库。





## 连接







## SchemaTypes 模式类型







## Schema的常用属性



mongoose 的所有合法 SchemaTypes：

- [String](http://www.mongoosejs.net/docs/api.html#schema-string-js)
- [Number](http://www.mongoosejs.net/docs/api.html#schema-number-js)
- [Date](http://www.mongoosejs.net/docs/api.html#schema-date-js)
- [Buffer](http://www.mongoosejs.net/docs/api.html#schema-buffer-js)
- Boolean
- Mixed
- [ObjectId](http://www.mongoosejs.net/docs/api.html#schema-objectid-js)
- Array
- Decimal128



demo：

```js
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  
  // 定义数组类型，形式多种多样
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
    
  // 
  ofArrays:   [[]],
  ofArrayOfNumbers: [[Number]],
    
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})

// example use

var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.save(callback);
```





### [SchemaType 选项](http://www.mongoosejs.net/docs/schematypes.html#schematype-options)

给字段设置一些属性。



```js
var schema2 = new Schema({
  test: {
    type: String,
    lowercase: true // 在存储时将值转为小写字母，仅对string类型有效
  }
});
```



有一些全部 type 可用的选项和一些限定部分 type 使用的选项。



##### 全部可用

- `required`: 布尔值或函数。如果值为真，为此属性添加 [required 验证器](http://www.mongoosejs.net/docs/validation.html#built-in-validators)
- `default`: 任何值或函数。设置此路径默认值。如果是函数，函数返回值为默认值
- `select`: 布尔值。 指定 query 的默认 [projections](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/)
- `validate`: 函数。 adds a [validator function](http://www.mongoosejs.net/docs/validation.html#built-in-validators) for this property
- `get`: 函数。 使用 [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 定义自定义 getter
- `set`: 函数。 使用 [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 定义自定义 setter
- `alias`: 字符串。 仅mongoose >= 4.10.0。 为该字段路径定义[虚拟值](http://www.mongoosejs.net/docs/guide.html#virtuals) gets/sets

```js
var numberSchema = new Schema({
  integerOnly: {
    type: Number,
      
    // 取值时，会返回经过get函数处理后的结果
    get: v => Math.round(v), 
    // 设置值时，存储经过set函数处理后的结果
    set: v => Math.round(v),
      
    // 猜测，crud时可以通过 i 来代理integerOnly
    alias: 'i'
  }
});

var Number = mongoose.model('Number', numberSchema);

var doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly; // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 3
```



##### 索引相关

你可以使用 schema type 选项定义[MongoDB indexes](https://docs.mongodb.com/manual/indexes/)。

- `index`: 布尔值。是否对这个属性创建[索引](https://docs.mongodb.com/manual/indexes/)   可以设为其他值吗，比如1，表示按升序，0表示按降序。
- `unique`: 布尔值。是否对这个属性创建[唯一索引](https://docs.mongodb.com/manual/core/index-unique/)
- `sparse`: 布尔值。是否对这个属性创建[稀疏索引](https://docs.mongodb.com/manual/core/index-sparse/)

```javascript
var schema2 = new Schema({
  test: {
    type: String,
    index: true, // 将test字段设为索引
    
    // 唯一性索引
    // 指定为唯一性索引后，该字段不能插入重复的值，会报错。
    // 如果一个字段已经有重复值了，再指定为唯一性索引，也会报错。
    unique: true // Unique index. If you specify `unique: true`
    // 如果指定“unique：true”，则指定“index:true”是可选的
    // specifying `index: true` is optional if you do `unique: true`
  }
});
```







一个猜测：

索引本身就具备唯一性。

MongoDB默认将_id设为索引。

设为索引的特点就是值得是唯一的？



unique是可独立设置给一个字段的。

test字段的值是唯一的。

```javascript
var schema2 = new Schema({
  test: {
    type: String,
    unique: true 
  }
});
```



test字段的值是唯一性索引，既是索引，又得是唯一值。

```javascript
var schema2 = new Schema({
  test: {
    type: String,
    index:true,
    unique: true 
  }
});
```





















##### String

- `lowercase`: 布尔值。是否在保存前对此值调用 `.toLowerCase()`
- `uppercase`: 布尔值。 是否在保存前对此值调用 `.toUpperCase()`
- `trim`: 布尔值。 是否在保存前对此值调用 `.trim()`
- `match`: 正则表达式。 创建[验证器](http://www.mongoosejs.net/docs/validation.html)检查这个值是否匹配给定正则表达式
- `enum`: 数组。 创建[验证器](http://www.mongoosejs.net/docs/validation.html)检查这个值是否包含于给定数组



##### Number

- `min`: 数值。 创建[验证器](http://www.mongoosejs.net/docs/validation.html)检查属性是否大于或等于该值
- `max`: 数值。 创建[验证器](http://www.mongoosejs.net/docs/validation.html)检查属性是否小于或等于该值



##### Date

- `min`: Date
- `max`: Date



### [使用注意](http://www.mongoosejs.net/docs/schematypes.html#usage-notes)

#### Dates

[内建 `Date` 方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [**不会**触发](https://github.com/Automattic/mongoose/issues/1598) mongoose 修改跟踪逻辑， 如果你对使用 `setMonth()` 修改文档里的 `Date`， mongoose在 `doc.save()` 的时候是察觉不到这个文档发生了变化的，因此保存不到数据库。 如果你一定要用内建 `Date` 方法， 请手动调用 `doc.markModified('pathToYourDate')` 告诉 mongoose 你修改了数据。

```javascript
var Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

  doc.markModified('dueDate');
  doc.save(callback); // works
})
```

#### Mixed

一个啥都可以放的 SchemaType ， 虽然便利，但也会让数据难以维护。 Mixed 可以通过 Schema.Types.Mixed 或 传入一个空对象定义。以下三种方法效果一致：

```javascript
var Any = new Schema({ any: {} });
var Any = new Schema({ any: Object });
var Any = new Schema({ any: Schema.Types.Mixed });
```

因为这是个 schema-less type， 所以你可以赋值为任意类型， 但是 mongoose 无法自动检测并保存你的修改。 要告诉 Mongoose 你修改了 Mixed type 的值，调用 文档的 `.markModified(path)` 方法， 传入你的 Mixed 字段路径。

```javascript
person.anything = { x: [3, 4, { y: "changed" }] };
person.markModified('anything');
person.save(); // anything will now get saved
```

#### ObjectIds

要指定类型为 ObjectId，在声明中使用 `Schema.Types.ObjectId`。

```javascript
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Car = new Schema({ driver: ObjectId });
// or just Schema.ObjectId for backwards compatibility with v2
```



#### Arrays

创造 [SchemaTypes](http://www.mongoosejs.net/docs/api.html#schema_Schema.Types) 或[子文档](http://www.mongoosejs.net/docs/subdocs.html)数组。

```javascript
var ToySchema = new Schema({ name: String });
var ToyBox = new Schema({
  toys: [ToySchema],
  buffers: [Buffer],
  string:  [String],
  numbers: [Number]
  // ... etc
});
```

注意：指定空数组相当于 `Mixed`。以下操作相当于创建 `Mixed` 数组：

```javascript
var Empty1 = new Schema({ any: [] });
var Empty2 = new Schema({ any: Array });
var Empty3 = new Schema({ any: [Schema.Types.Mixed] });
var Empty4 = new Schema({ any: [{}] });
```



数组的默认值是 `[]` （空数组）。

```javascript
var Toy = mongoose.model('Test', ToySchema);
console.log((new Toy()).toys); // []
```

要手动把默认值设置为 `undefined`，从而覆盖 `[]`。

```javascript
var ToySchema = new Schema({
  toys: {
    type: [ToySchema],
    default: undefined
  }
});
```

### [创建自定义 Type](http://www.mongoosejs.net/docs/schematypes.html#customtypes)

Mongoose 可以扩展自定义 SchemaTypes。搜索 [插件](http://plugins.mongoosejs.com/) 页面，查找类似[mongoose-long](https://github.com/aheckmann/mongoose-long), [mongoose-int32](https://github.com/vkarpov15/mongoose-int32)， [以及其他](https://github.com/aheckmann/mongoose-function) [types](https://github.com/OpenifyIt/mongoose-types) 的兼容 types。

### [`schema.path()` 函数](http://www.mongoosejs.net/docs/schematypes.html#path)

`schema.path()` 函数为给定字段路径返回实例化 schema type。

```javascript
var sampleSchema = new Schema({ name: { type: String, required: true } });
console.log(sampleSchema.path('name'));
// Output looks like:
/**
 * SchemaString {
 *   enumValues: [],
 *   regExp: null,
 *   path: 'name',
 *   instance: 'String',
 *   validators: ...
 */
```

这个函数可以检查给定字段路径的检验器和类型等信息。



### [下一步](http://www.mongoosejs.net/docs/schematypes.html#next)

这章我们介绍了 `SchemaTypes`，下一个章节将会介绍 [Connections](http://www.mongoosejs.net/docs/connections.html)。





## 插件

http://www.mongoosejs.net/docs/plugins.html



用来扩展Scheme的功能。



编写好插件，可以用于特定的Schema，或者使用mongoose全局注册，作用于所有的Schema。









## Model的API

Model是一个类，

类有实例方法/原型方法，也有静态方法。



实体的方法：







- [Model()](https://mongoosejs.com/docs/api/model.html#model_Model)
- [Model.aggregate()](https://mongoosejs.com/docs/api/model.html#model_Model.aggregate)
- [Model.buildBulkWriteOperations()](https://mongoosejs.com/docs/api/model.html#model_Model.buildBulkWriteOperations)
- [Model.bulkSave()](https://mongoosejs.com/docs/api/model.html#model_Model.bulkSave)
- [Model.bulkWrite()](https://mongoosejs.com/docs/api/model.html#model_Model.bulkWrite)
- [Model.cleanIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.cleanIndexes)
- [Model.count()](https://mongoosejs.com/docs/api/model.html#model_Model.count)
- [Model.countDocuments()](https://mongoosejs.com/docs/api/model.html#model_Model.countDocuments)
- [Model.create()](https://mongoosejs.com/docs/api/model.html#model_Model.create)
- [Model.createCollection()](https://mongoosejs.com/docs/api/model.html#model_Model.createCollection)
- [Model.createIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.createIndexes)
- [Model.deleteMany()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany)
- [Model.deleteOne()](https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)
- [Model.diffIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.diffIndexes)
- [Model.discriminator()](https://mongoosejs.com/docs/api/model.html#model_Model.discriminator)
- [Model.distinct()](https://mongoosejs.com/docs/api/model.html#model_Model.distinct)
- [Model.ensureIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.ensureIndexes)
- [Model.estimatedDocumentCount()](https://mongoosejs.com/docs/api/model.html#model_Model.estimatedDocumentCount)
- [Model.events](https://mongoosejs.com/docs/api/model.html#model_Model-events)
- [Model.exists()](https://mongoosejs.com/docs/api/model.html#model_Model.exists)
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
- [Model.init()](https://mongoosejs.com/docs/api/model.html#model_Model.init)
- [Model.insertMany()](https://mongoosejs.com/docs/api/model.html#model_Model.insertMany)
- [Model.inspect()](https://mongoosejs.com/docs/api/model.html#model_Model.inspect)
- [Model.listIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.listIndexes)
- [Model.mapReduce()](https://mongoosejs.com/docs/api/model.html#model_Model.mapReduce)
- [Model.populate()](https://mongoosejs.com/docs/api/model.html#model_Model.populate)
- [Model.prototype.$where](https://mongoosejs.com/docs/api/model.html#model_Model-$where)
- [Model.prototype.$where()](https://mongoosejs.com/docs/api/model.html#model_Model-$where)
- [Model.prototype.base](https://mongoosejs.com/docs/api/model.html#model_Model-base)
- [Model.prototype.baseModelName](https://mongoosejs.com/docs/api/model.html#model_Model-baseModelName)
- [Model.prototype.collection](https://mongoosejs.com/docs/api/model.html#model_Model-collection)
- [Model.prototype.db](https://mongoosejs.com/docs/api/model.html#model_Model-db)
- [Model.prototype.deleteOne()](https://mongoosejs.com/docs/api/model.html#model_Model-deleteOne)
- [Model.prototype.discriminators](https://mongoosejs.com/docs/api/model.html#model_Model-discriminators)
- [Model.prototype.model()](https://mongoosejs.com/docs/api/model.html#model_Model-model)
- [Model.prototype.modelName](https://mongoosejs.com/docs/api/model.html#model_Model-modelName)
- [Model.prototype.remove()](https://mongoosejs.com/docs/api/model.html#model_Model-remove)
- [Model.prototype.save()](https://mongoosejs.com/docs/api/model.html#model_Model-save)
- [Model.prototype.schema](https://mongoosejs.com/docs/api/model.html#model_Model-schema)
- [Model.remove()](https://mongoosejs.com/docs/api/model.html#model_Model.remove)
- [Model.replaceOne()](https://mongoosejs.com/docs/api/model.html#model_Model.replaceOne)
- [Model.startSession()](https://mongoosejs.com/docs/api/model.html#model_Model.startSession)
- [Model.syncIndexes()](https://mongoosejs.com/docs/api/model.html#model_Model.syncIndexes)
- [Model.translateAliases()](https://mongoosejs.com/docs/api/model.html#model_Model.translateAliases)
- [Model.update()](https://mongoosejs.com/docs/api/model.html#model_Model.update)
- [Model.updateMany()](https://mongoosejs.com/docs/api/model.html#model_Model.updateMany)
- [Model.updateOne()](https://mongoosejs.com/docs/api/model.html#model_Model.updateOne)
- [Model.validate()](https://mongoosejs.com/docs/api/model.html#model_Model.validate)
- [Model.watch()](https://mongoosejs.com/docs/api/model.html#model_Model.watch)
- [Model.where()](https://mongoosejs.com/docs/api/model.html#model_Model.where)
- [function Object() { [native code\] }.prototype.$model()](https://mongoosejs.com/docs/api/model.html#$model_$model)
- [increment()](https://mongoosejs.com/docs/api/model.html#increment_increment)





模型的方法：

这个用的多。

find



# Mongoose的弃用通知



https://mongoosejs.com/docs/deprecations.html



# [弃用警告](https://mongoosejs.com/docs/deprecations.html#deprecation-warnings)

Mongoose 用户应该注意[MongoDB Node.js 驱动程序](http://npmjs.com/package/mongodb)中有几个弃用的地方。Mongoose 提供了解决这些弃用警告的选项，但您需要测试这些选项是否会给您的应用程序带来任何问题。请[在 GitHub 上报告任何问题](https://github.com/Automattic/mongoose/issues/new)。

## [概括](https://mongoosejs.com/docs/deprecations.html#summary)

要修复所有弃用警告，请按照以下步骤操作：

- 替换`update()`为`updateOne()`, `updateMany()`, 或`replaceOne()`
- 替换`remove()`为`deleteOne()`或`deleteMany()`。
- 替换`count()`为`countDocuments()`，除非您想计算整个集合中有多少文档（无过滤器）。在后一种情况下，使用`estimatedDocumentCount()`.



请阅读以下内容以获取有关每个弃用警告的更详细说明。

## [`remove()`](https://mongoosejs.com/docs/deprecations.html#remove)

MongoDB 驱动程序的[`remove()`函数](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#remove)已被弃用，取而代之的是`deleteOne()`和`deleteMany()`。这是为了遵守[MongoDB CRUD 规范](https://github.com/mongodb/specifications/blob/master/source/crud/crud.rst)，该规范旨在为所有 MongoDB 驱动程序的 CRUD 操作提供一致的 API。

```
DeprecationWarning: collection.remove is deprecated. Use deleteOne,
deleteMany, or bulkWrite instead.
```

要删除此弃用警告，请将 的任何用法替换为`remove()`， `deleteMany()`除非*您*将[`single`选项指定为`remove()`](https://mongoosejs.com/docs/api.html#model_Model.remove)。该`single` 选项仅限`remove()`于删除最多一个文档，因此您应该替换`remove(filter, { single: true })`为`deleteOne(filter)`.

```javascript
// Replace this:
MyModel.remove({ foo: 'bar' });
// With this:
MyModel.deleteMany({ foo: 'bar' });

// Replace this:
MyModel.remove({ answer: 42 }, { single: true });
// With this:
MyModel.deleteOne({ answer: 42 });
```

## [`update()`](https://mongoosejs.com/docs/deprecations.html#update)

与 一样`remove()`，该[`update()`函数](https://mongoosejs.com/docs/api.html#model_Model.update)已被弃用，取而代之的是更明确[`updateOne()`](https://mongoosejs.com/docs/api.html#model_Model.updateOne)的[`updateMany()`](https://mongoosejs.com/docs/api.html#model_Model.updateMany)、 和[`replaceOne()`](https://mongoosejs.com/docs/api.html#model_Model.replaceOne)函数。您应该替换 `update()`为`updateOne()`，除非您使用[`multi`or`overwrite`选项](https://mongoosejs.com/docs/api.html#model_Model.update)。

```
collection.update is deprecated. Use updateOne, updateMany, or bulkWrite
instead.
// Replace this:
MyModel.update({ foo: 'bar' }, { answer: 42 });
// With this:
MyModel.updateOne({ foo: 'bar' }, { answer: 42 });

// If you use `overwrite: true`, you should use `replaceOne()` instead:
MyModel.update(filter, update, { overwrite: true });
// Replace with this:
MyModel.replaceOne(filter, update);

// If you use `multi: true`, you should use `updateMany()` instead:
MyModel.update(filter, update, { multi: true });
// Replace with this:
MyModel.updateMany(filter, update);
```

## [`count()`](https://mongoosejs.com/docs/deprecations.html#count)

MongoDB 服务器已弃用该`count()`函数，取而代之的是两个单独的函数，[`countDocuments()`](https://mongoosejs.com/docs/deprecations.html#query_Query-countDocuments)以及 [`estimatedDocumentCount()`](https://mongoosejs.com/docs/deprecations.html#query_Query-estimatedDocumentCount).

```
DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
```

两者的区别在于`countDocuments()`可以接受一个过滤器参数，比如[`find()`](https://mongoosejs.com/docs/deprecations.html#query_Query-find). 该`estimatedDocumentCount()` 函数速度更快，但只能告诉您集合中的文档总数。您不能将 a 传递`filter`给`estimatedDocumentCount()`。

要迁移，请替换`count()`为，`countDocuments()` *除非*您没有将任何参数传递给`count()`. 如果您使用`count()`计数集合中的所有文档而不是计数匹配查询的文档，请使用 `estimatedDocumentCount()`代替`countDocuments()`.

```javascript
// Replace this:
MyModel.count({ answer: 42 });
// With this:
MyModel.countDocuments({ answer: 42 });

// If you're counting all documents in the collection, use
// `estimatedDocumentCount()` instead.
MyModel.count();
// Replace with:
MyModel.estimatedDocumentCount();

// Replace this:
MyModel.find({ answer: 42 }).count().exec();
// With this:
MyModel.find({ answer: 42 }).countDocuments().exec();

// Replace this:
MyModel.find().count().exec();
// With this, since there's no filter
MyModel.find().estimatedDocumentCount().exec();
```

















