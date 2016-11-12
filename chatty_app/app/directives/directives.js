angular.module('myApp')
.directive('onEnter', function() {
    return function(scope, element, attrs) {
        console.log("directive onEnter is called");
        element.bind("keydown keypress", function(event) {
            console.log("event is", event);
            console.log("scope is", scope);
            console.log("attrs is", attrs);
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.onEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    }
});