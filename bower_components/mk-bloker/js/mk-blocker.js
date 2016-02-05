var mkBlock = angular.module('mkBlock',[]);

mkBlock.service('mkBlocker', function() {
	this.isBlocked = true;
	this.blockUI = function(){
		this.isBlocked = true;
		return this.isBlocked;
	};
	this.unblockUI = function(){
		this.isBlocked = false;
		return this.isBlocked;
	};
	this.toggleUI = function(){
		this.isBlocked = !this.isBlocked;
		return this.isBlocked;
	};
});

mkBlock.controller('mkBlockCtrl', function($scope, mkBlocker){
	$scope.$watch(function(){
		return mkBlocker.isBlocked;
	}, function(){
		$scope.isBlocked = mkBlocker.isBlocked;
	});
});

mkBlock.directive('mkBlockerElem', function(mkBlocker){
	return{
		restrict: 'E',
		replace: true,
		controller: 'mkBlockCtrl',
		template: '<div data-ng-if="isBlocked" class="mk-overlay-wrap"><div class="mk-overlay"><p>loading....</p><span class="mk-spin"></span></div></div>'
	};
});