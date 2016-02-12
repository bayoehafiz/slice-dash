app.provider('PusherService', function() {
    var apiKey = 'b7b402b4f6325e3561ed';
    var initOptions = {};

    this.setOptions = function(options) {
        initOptions = options || initOptions;
        return this;
    };

    this.setToken = function(token) {
        apiKey = token || apiKey;
        return this;
    };

    this.$get = ['$window', '$rootScope',
        function($window, $rootScope) {
            var pusher = new $window.Pusher(apiKey, initOptions),
                oldTrigger = pusher.trigger; // <-- save off the old pusher.trigger

            pusher.trigger = function decoratedTrigger() {
                // here we redefine the pusher.trigger to:

                // 1. run the old trigger and save off the result
                var result = oldTrigger.apply(pusher, arguments);

                // 2. kick off the $digest cycle
                $rootScope.$digest();

                // 3. return the result from the the original pusher.trigger
                return result;
            };

            return pusher;
        }
    ];
});