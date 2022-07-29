# Nodejs中使用Redis



## 连接redis服务



```bash
mkdir redis-demo
cd redis-demo
pnpm init
pnpm add ioredis
```



vim ndex.js

```js
const Redis = require("ioredis");

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
}); 

// ioredis支持回调函数和promise风格的处理方式

redis.set('name', 'lee' function (err, result) {
  if (err) {
    console.error(err)
  } else {
    console.log(result)
  }
});

redis.get("name", function (err, result) {
  if (err) {
    console.error(err)
  } else {
    console.log(result);
  }
});


redis.get("name").then(function (result) {
  console.log(result); 
}).catch(err => {
     console.error(err)
    
});

// 使用async函数
async function main() {
    try {
        let result = await redis.get('name')
        console.log(result)
    } catch(err) {
         console.error(err)
    }
}

main()
```



运行代码：

```bash
node index.js
```



## API



redis存储的都是string，如果要存储数字，

需要在取值后进行手动转换。



不知道ioredis库有没有实现自动转换数据类型的功能？？？

