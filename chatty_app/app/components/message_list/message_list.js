'use strict'

angular.module('myApp.messageList', [])
.directive('messageList', function() {
    return {
        templateUrl: 'components/message_list/message_list.html',
    }
})
.controller('messageListCtrl', ['$scope', 'chatService', function($scope, chatService){
    chatService.getMessages();
    $scope.ws = chatService.ws;
}]);