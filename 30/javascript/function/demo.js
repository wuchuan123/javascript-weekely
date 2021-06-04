// 对数组元素异步
// async 和 for或者(for...of...)相结合
const asyncUppercase = (item) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(item.toUpperCase()),
      Math.floor(Math.random() * 1000)
    )
  );
const uppercaseItems = async () => {
  const items = ["a", "b", "c"];
  for (item of items) {
    const uppercaseItem = await asyncUppercase(item);
    console.log(uppercaseItem);
  }
  console.log("Items processed");
};
uppercaseItems();

// 单例模式
// 一个类只能构建一个对象的设计模式，
// 许多时候整个系统只需要拥有一个的全局对象，这样有利于我们协调系统整体的行为
// 使用 proxy 实现

const singletonify = (className) => {
  return new Proxy(className.prototype.constructor, {
    instance: null,
    construct: (target, argumentsList) => {
      if (!this.instance) {
        this.instance = new target(...argumentsList);
      }
      return this.instance;
    },
  });
};
// test
class MyClass {
  constructor(msg) {
    this.msg = msg;
  }

  printMsg() {
    console.log(this.msg);
  }
}

MySingletonClass = singletonify(MyClass);

const myObj = new MySingletonClass("first");
myObj.printMsg(); // 'first'
const myObj2 = new MySingletonClass("second");
myObj2.printMsg(); // 'first'

// maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
// maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));

// shallow Clone 浅克隆只能克隆一层，深克隆可以克隆到对象里面n层
const shallowClone = (obj) => Object.assign({}, obj);
// 或者
const shallowClone = { ...obj };

//deepFreeze
// const myObj = {
//   a: 1,
//   b: 'hello',
//   c: [0, 1, 2],
//   d: { e: 1, f: 2 }
// };
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((item) =>{
    if(typeof obj[item]==='object'&& !Object.isFrozen(obj[item])) deepFreeze(obj[item])
  })
  return Object.freeze(obj)
};
