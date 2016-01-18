(function() {
	'use strict'

	angular
	.module('CatalogApp')
	.controller('CatalogCtrl', CatalogCtrl);

	function CatalogCtrl($scope, $http, Upload) {
		$scope.addNote = addNote;
		$scope.clear = clear;
		$scope.editNote = editNote;
		$scope.refresh = refresh;
		$scope.removeNote = removeNote;
		$scope.upload = upload;
		$scope.update = update;
		$scope.updateNote = updateNote;

		$scope.refresh();

		function upload(file) {
			Upload.upload({
				url: '/add',
				method: 'POST',
				data: $scope.catalog,
				file: file
			}).progress(function(event) {
				console.log("OK!");
			}).success(function() {
				refresh();
			}).error(function(err) {
				console.log(err);
			});
		};

		function update(file) {
			Upload.upload({
				url: '/update/' + $scope._id,
				method: 'POST',
				data: $scope.catalog,
				file: file
			}).progress(function(event) {
				console.log("OK!");
			}).success(function() {
				refresh();
			}).error(function(err) {
				console.log(err);
			});
		};

		function refresh() {
			$http.get('/catalog').
			success(function(data, status, headers, config) {
				$scope.list = data;
				$scope.clear();
			});
		};

		function addNote() {
			console.log($scope.catalog);
			if($scope.catalog !== undefined && $scope.catalog !== '') {
				if(!$scope.catalog._id) {
					$scope.upload($scope.file);
				} else {
					$scope.catalog._id = '';
					$scope.upload($scope.file);
				}
			} else  {alert('Fields are empty!');}
		};

		function removeNote(id) {
			$http.delete('/catalog/' + id)
			.success(function(response) {
				if(response.ok === 200) refresh();
				else alert("Service is not available...");
			});
		};

		function editNote(id) {
			$http.get('/catalog/' + id).success(function(response) {
				$scope.catalog = response.data;
				$scope._id = response._id;
			});
		};

		function updateNote() {
			if($scope.catalog !== undefined && $scope.catalog !== '') {
				$scope.update($scope.file);
			} else  {alert('Fields are empty!');}
		};

		function clear() {
			$scope.catalog = '';
			$scope.file = '';
		};
	}
})();