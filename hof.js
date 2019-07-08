function getData(onSend, success, error, other) {
	var res = {
		data: {
			success: true,
			msg: '假设返回的数据',
			GRID0: [
				'123|456|789',
				'abc|def|ghi'
			],
			KEY1INDEX: 0,
			KEY2INDEX: 1,
			KEY3INDEX: 2
		}
	};
	success(res);
}

/* 
*  定义高阶函数
*  param: Function
*/
function HOFgetData() {
	var args = [].slice.call(arguments); // function: getData
	var hofsuccess = function () {
		var tempFunc = [].slice.call(arguments); // 传入的success函数
		return function () {
			var temp = [].slice.call(arguments); // 得到success的参数，就是返回值
			var data = temp[0].data;
			// 处理数组GRID0
			var LIST0 = data.GRID0.map(value => {
				var item = value.split('|');
				return {
					KEY1: item[data.KEY1INDEX],
					KEY2: item[data.KEY2INDEX],
					KEY3: item[data.KEY3INDEX]
				}
			});
			var obj = {
				LIST0: LIST0,
				msg: data.msg
			};
			tempFunc[0](obj);
		}
	};
	var newFunc = function (obj, success) {
		args[0].call(null, obj, hofsuccess(success));
	}
	return newFunc;
}

var obj = {
	param: 'param'
};

/*
* 高阶函数赋值，得到的newGetData是个函数，并且这个函数的参数个getData一样
* 这里第二个参数在HOFgetData内部做了高阶函数处理，使得返回的结果是处理后的数据结构
*/
var newGetData = HOFgetData(getData);

newGetData(obj, function (data) {
	console.log(data);
});