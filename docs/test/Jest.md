# jest

[Jest](https://jestjs.io/)  是 Facebook 出品的一个 JavaScript 开源测试框架。

相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如零配置、自带断言、测试覆盖率工具等功能，实现了开箱即用。



Jest 适用但不局限于使用以下技术的项目：Babel,、TypeScript、 Node、 React、Angular、Vue 等。



Jest 主要特点：

- 零配置
- 自带断言
- 而作为一个面向前端的测试框架， Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见前端框架的自动测试。
- 此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度。
- 测试覆盖率
- Mock 模拟



## 一个极简demo

#### 创建项目和安装



```bash
mkdir jest-demo
cd jest-demo
pnpm init
pnpm add jest -D
```



先体验一下Jest的零配置。



编写一个工具方法：



```js
// src/math.js
function add(a, b) {
  return a + b
}
```



新建测试用例



在项目根目录新建test目录，里面存放所有的测试用例，文件名都以.test.js结尾。



Jest向全局暴露了一些方法：

- describe：用于组织多个测试用例

- test：用于执行一个测试用例

- it：是test方法的别名

- expect：断言，用来检测我们编写的程序的运行结果能否和用例一致

  

这些方法可以先导入再使用，也可以直接使用。

我们这里就直接使用了。



```js
// test/index.test.js


```



执行测试：

```bash
npx jest
```

jest 命令会自动检测并运行项目中所有以` .test.js `结尾的文件。





## 一个网络请求的demo



参考：

https://www.bilibili.com/video/BV19b4y1a7Mg?p=4



```bash
pnpm add supertest
```













## 基本配置

在项目根目录，初始化一个jest配置文件：

```bash
npx jest --init
```



详细配置信息参考：https://jestjs.io/docs/zh-Hans/configuration。









# Jest API

在测试文件中，Jest 将所有这些方法和对象放入全局环境中。您无需要求或导入任何内容即可使用它们。但是，如果您喜欢显式导入，则可以：

```
import { describe, expect, test } from '@jest/globals'
```



## describe 函数



describe 创建一个将几个相关测试组合在一起的块。



```js
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

```

- `describe(name, fn)`
- `describe.each(table)(name, fn, timeout)`
- `describe.only(name, fn)`
- `describe.only.each(table)(name, fn)`
- `describe.skip(name, fn)`
- `describe.skip.each(table)(name, fn)`



## Test 函数

test 函数别名： `it(name, fn, timeout)`。

- `test(name, fn, timeout)`
- `test.concurrent(name, fn, timeout)`
- `test.concurrent.each(table)(name, fn, timeout)`
- `test.concurrent.only.each(table)(name, fn)`
- `test.concurrent.skip.each(table)(name, fn)`
- `test.each(table)(name, fn, timeout)`
- `test.only(name, fn, timeout)`
- `test.only.each(table)(name, fn)`
- `test.skip(name, fn)`
- `test.skip.each(table)(name, fn)`
- `test.todo(name)`



## Expect 匹配器

在编写测试时，通常需要检查值是否满足某些条件。 Expect 使您可以访问许多“匹配器”，以使您可以验证不同的内容。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
  
  expect({ name: 'jack' }).toEqual({ name: 'jack' })
  
  expect('Christoph').toMatch(/stop/)
  
  expect(4).toBeGreaterThan(3)
  
  expect(4).toBeLessThan(5)
})

```



完整的匹配器列表查看：https://jestjs.io/docs/expect。





## 生命周期钩子

- `afterAll(fn, timeout)`
- `afterEach(fn, timeout)`
- `beforeAll(fn, timeout)`
- `beforeEach(fn, timeout)`



## Jest 对象



Jest 对象自动位于每个测试文件中的范围内。 jest 对象中的方法有助于创建模拟，并让您控制 Jest 的整体行为。也可以通过从 `import {jest} from '@jest/globals'` 导入。





















## VS Code插件：Jest Runner

帮助我们随时运行测试用例。



![image-20220514150045598](https://cdn.jsdelivr.net/gh/hsyq/assets/imgs/2022-05/202205141500677.png)



在某个测试用例文件中，
