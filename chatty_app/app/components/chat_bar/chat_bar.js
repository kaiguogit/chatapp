'use strict';

angular.module('myApp.chatBar', [])
.directive('chatBar', function() {
    return {
        templateUrl: 'components/chat_bar/chat_bar.html',
    }
})
.controller('chatBarCtrl', ['$scope', 'chatService', function($scope, chatService) {
    $scope.sendMessage = chatService.sendMessage;
    console.log("chatBar scope is", $scope);
}]);