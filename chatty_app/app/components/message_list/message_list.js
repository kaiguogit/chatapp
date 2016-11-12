'use strict'

angular.module('myApp.messageList', [])
.directive('messageList', function() {
    return {
        templateUrl: 'components/message_list/message_list.html',
        controller: 'messageListCtrl'
    }
})
.controller('messageListCtrl', ['$scope', function($scope){
    $scope.messages = [
        {
            username: "user1",
            content: "content1"
        },
        {
            username: "user2",
            content: "content2"
        },
        {
            username: "user3",
            content: "content3"
        },
        {
            username: "user4",
            content: "content4"
        }
    ];
}]);