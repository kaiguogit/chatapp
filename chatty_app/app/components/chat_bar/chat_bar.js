'use strict';

angular.module('myApp.chatBar', [])
.directive('chatBar', function() {
    return {
        templateUrl: 'components/chat_bar/chat_bar.html'
    }
})
.controller('chatBarCtrl', [function() {
}]);