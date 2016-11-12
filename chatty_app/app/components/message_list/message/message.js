'use strict'

angular.module('myApp.message', [])
.directive('message', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/message_list/message/message.html',
    }
})
