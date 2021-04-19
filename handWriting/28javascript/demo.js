// 判断对象的数据类型 返回boolean
const isType = (type) => (target) =>
  `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType("Array");
console.log(isArray([]));

// Array.prototype.map
const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let mappedArr = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue;
    mappedArr[i] = fn.call(context, arr[i], i, this);
  }
  return mappedArr;
};
Array.prototype.selfMap = selfMap;
[1, 2, 3].selfMap((x) => x * 2);

// Array.prototype.filter
const selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let filteredArr = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue;
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i]);
  }
  return filteredArr;
};
