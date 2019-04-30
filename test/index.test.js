const {load} = require('../index.js');

const fakeRequire = dispatch => ({name}) => {
    const module = require(name);
    return dispatch(module);
};
const lazyload = load(fakeRequire);
test('load test to be lazy', () => {
	const f = lazyload('./test');
	expect(f.name).toBe('jack');
});
