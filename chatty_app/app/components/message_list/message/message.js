'use strict'

angular.module('myApp.message', [])
.directive('message', function() {
    return {
        restrict: 'E',
        scope: {
            message: '='
        },
        templateUrl: 'components/message_list/message/message.html',
        link: function(scope) {
            console.log("message component scope is", scope);
        }
    }
})
