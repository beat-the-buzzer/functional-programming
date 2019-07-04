['1', '2', '3'].map(parseInt);
const unary = (fn) => fn.length === 1 ? fn : (arg) => fn(arg);
['1', '2', '3'].map(unary(parseInt));

const curry = (fn) => {
	if (typeof fn !== 'function') {
		throw Error('No function Provided');
	}
	return function curriedFn(...args) {
		if (args.length < fn.length) {
			return function () {
				return curriedFn.apply(null, args.concat(
					[].slice.call(arguments)
				))
			}
		};
		return fn.apply(null, args);
	};
};
const add = (a, b, c) => a + b + c;
add(1, 2, 3);
curry(add)(1)(2)(3);
curry(add)(1)(2, 3);

const addMore = (...args) => args.reduce((x, y) => x + y);
addMore(1, 2, 3);
addMore(1, 2, 3, 4, 5);


function add3(a, b, c) { return a + b + c; }
add3(2, 4, 8); // 14

var add6 = add3.bind(this, 2, 4);
add6(8); // 14
var add6 = curry(add3)(2)(4);
add6(8); // 14