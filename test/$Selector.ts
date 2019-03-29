import $ from 'puppeteer-domkit';

// 没参数
const props0 = [
	'text',
	'html',
	'height',
	'width',
	'offset',
	'offsetParent',
	'position',
	'val',
	'index',
	'scrollTop',
	'visible',
	'exist'
];
// // 有参数
const props1 = {
	css: 'position',
	attr: 'id',
	prop: 'nodeName',
	data: 'null',
	is: 'div',
	hasClass: 'login_box'
};
// // 选择器
const selectors = [
	'has',
	'not',
	'parents',
	'parent',
	'children',
	'siblings',
	'prev',
	'next',
	'find',
	'eq',
	'first',
	'last'
];
// 没时间，只好这样简单校验下
export default () => {
	props0.filter((item) => [ 'val' ].indexOf(item) === -1).forEach((method) => {
		it(`$selector.${method}()`, async () => {
			console.log(await $('#for-ppt-test')[method]());
		});
	});

	Object.keys(props1).forEach((method) => {
		it(`$selector.${method}(${props1[method]})`, async () => {
			console.log(await $('#for-ppt-test')[method](props1[method]));
		});
	});

	selectors.forEach((method) => {
		it(`$selector.${method}(div)`, async () => {
			const res = await $('#for-ppt-test')[method]('div');
			console.log(res.selectors[1].type);
		});
	});
};
