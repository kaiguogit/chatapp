'use strict';

angular.module('myApp.chatBar', [])
.directive('chatBar', function() {
    return {
        templateUrl: 'components/chat_bar/chat_bar.html',
        controller: 'chatBarCtrl'
    }
})
.controller('chatBarCtrl', ['$scope', 'chatService', function($scope, chatService) {
    console.log("chat_bar is called");
    $scope.sendMessage = chatService.sendMessage.bind(this, {username:'user3', content:'test'});
}]);