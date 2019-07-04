function add() {
	var args = [].slice.call(arguments);
	var adder = function () {
		// 将参数用闭包捕获 args
		var adder_temp = function () {
			args.push(...arguments);
			return adder_temp;
		};
		adder_temp.toString = function () {
			return args.reduce(function (a, b) {
				return a + b;
			});
		}
		return adder_temp;
	}
	return adder(...args);
}

// add方法必须返回一个函数，但是我们的目标是计算累加的值
// 因此，重写toString方法，用于计算累加值

var a = add(1, 2, 3, 4);
var b = add(1)(2)(3)(4);
var c = add(1, 2)(3, 4);

console.log(+a);
console.log(b.toString());
console.log(`${c}`);