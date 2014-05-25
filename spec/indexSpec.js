describe('App', function() {
	beforeEach(function() {
		module('app');
	});
	it('exists', function() {
		expect(angular.module('app')).toBeDefined();
	});
});
