import $ from 'puppeteer-domkit';

export default () => {
	it(`target(...)`, async () => {
		await $.expect.target('blank', true);
	});
};
