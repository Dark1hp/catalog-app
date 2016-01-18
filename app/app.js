(function() {
	angular
	.module('CatalogApp', [
		'ngFileUpload',
		'ngRoute',
		'ngAnimate'
		])
	.config(config);

	function config($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/catalog/catalog.html',
			controller: 'CatalogCtrl'
		})
		.when('/page2', {
			templateUrl: 'app/page2/page2.html',
			controller: 'Page2Ctrl'
		})
		.when('/page3', {
			templateUrl: 'app/page3/page3.html',
			controller: 'Page3Ctrl'
		})
		.otherwise({
			redirectTo: 'app/catalog/catalog.html'
		});
	}
})();