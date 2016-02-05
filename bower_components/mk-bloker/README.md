# mk-blocker
Angular Loader, Blocker, Unblocker

##### Install with bower	
```
    $ bower install mk-blocker
```

##### Add dependency to your applicaiton
```javascript
	angular.module('yourModule', ['mkBlock']);
```

##### Add mkBlocker service to your controller
```javascript
	.controller('yourCtrl', function($scope, mkBlocker){
		mkBlocker.blockUI(); // to block the UI
		mkBlocker.unblockUI(); // to unblock the UI
		mkBlocker.toggleUI(); // to toggle the UI blocking
	});
```
