var data = 0; // 模拟数据
function postData(date) {
  // ... 省略逻辑
  console.log('发送请求，得到数据');
  var result = (++data) + ':' + date; // 模拟数据
  return result;
}

// 定义的高阶函数，传入的参数是一个函数，返回一个新的函数
function superPostData(fn) {
  var cache = {}; // 缓存的对象
  return function() {
    var args = [].slice.call(arguments);
    var cachedItem = cache[args[0]];
    if(cachedItem) {
      console.log('从缓存中取数据');
      return cachedItem;
    } else {
      cache[args[0]] = fn.apply(fn, args); // 缓存结果
      return cache[args[0]];
    }
  }
}

var newPostData = superPostData(postData); // 使用高阶函数，产生一个新的函数
newPostData('20190101'); // 发送请求，得到数据
newPostData('20190102'); // 发送请求，得到数据
newPostData('20190101'); // 从缓存中取数据
