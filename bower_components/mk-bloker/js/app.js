var app = angular.module('app', ['mkBlock']);
app.controller('testCtrl', function($scope, mkBlocker){
	$scope.block = function(){
		mkBlocker.blockUI();
		console.log('block: ' + mkBlocker.isBlocked);
	};

	$scope.unblock = function(){
		mkBlocker.unblockUI();
		console.log('unblock: ' + mkBlocker.isBlocked);
	};

	$scope.toggleBlock = function(){
		mkBlocker.toggleUI();
		console.log('toggle block: ' + mkBlocker.isBlocked);
	};
});