function add() {
	var _args = [].slice.call(arguments);
	var adder = function() {
		// 将参数用闭包捕获 _args
		var _adder = function() {
			_args.push(...arguments);
			return _adder;
		};
		_adder.toString = function() {
			return _args.reduce(function(a, b) {
				return a + b;
			});
		}
		return _adder;
	}
	return adder(..._args);
}

// add方法必须返回一个函数，但是我们的目标是计算累加的值
// 因此，重写toString方法，用于计算累加值

var a = add(1, 2, 3, 4);
var b = add(1)(2)(3)(4);
var c = add(1, 2)(3, 4);

console.log(+a);
console.log(b.toString());
console.log(`${c}`);