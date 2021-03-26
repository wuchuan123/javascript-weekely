//删除数组中的falsy值
const compact = (arr) => arr.filter(Boolean);
//use
compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]);

//数组去重ES6
const unique = (arr) => [...new Set(arr)];

//检查数组中是否有一个元素通过测试就返回true
const any = (arr, fn = Boolean) => arr.some(fn);
//use
any([0, 1, 2, 0], (x) => x >= 2); // true
any([0, 0, 1, 0]); // true

//检查数组中是否全部元素都能通过测试，全部通过就返回true
const all = (arr, fn = Boolean) => arr.every(fn);
//examples
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true

//检查所有数组中的元素都没有通过测试
const none = (arr, fn = Boolean) => !arr.some(fn);
//examples
none([0, 1, 3, 0], (x) => x == 2); // true
none([0, 0, 0]); // true

//返回数组a不在数组b中的数组
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
//examples
difference([1, 2, 3, 3], [1, 2, 4]);

//并集
const union = (a, b) => {
  return [...new Set([...a, ...b])];
};
//examples
union([1, 2, 3], [4, 3, 2]);

//交集
const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter((x) => s.has(x));
};

//剔除数组中的第一个元素，返回剩余元素，如果只有一个元素，则返回整个数组
const tail = (arr) => {
  if (!Array.isArray(arr)) return;
  return arr.length > 1 ? arr.slice(1) : arr;
};
//examples
tail([1, 2, 3]);
tail([1]);

//返回数组的第一个元素
const head = (arr) => (arr?.length ? arr[0] : undefined);

//返回数组的最后一个
const last = (arr) => (arr?.length ? arr[arr.length - 1] : undefined);

//数组扁平化
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );
