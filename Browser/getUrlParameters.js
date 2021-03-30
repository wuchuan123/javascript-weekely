/**
 * 使用 match 方法 利用正则表达式把 url 的请求参数变成数组，此时数组里值的类型是字符串
 * 使用reduce方法，配合 slice , indexOf 方法进行键名赋值
 * 创建几个新的键名，赋几个新的值
 * 小技巧，string 也可以用数组方法
 */

//返回url的请求参数对象
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

//Examples
getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith');// {name: 'Adam', surname: 'Smith'}