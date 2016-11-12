angular.module('myApp')
.factory('chatService', ['$q', '$rootScope', function($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};

    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://localhost:4000/");

    // Messages in chat room.
    Service.ws = {messages: []};

    ws.onopen = function(){
        console.log("Socket has been opened!");
    };

    ws.onmessage = function(message) {
        listener(JSON.parse(message.data));
    };

    // Make the function wait until the connection is made...
    function waitForSocketConnection(socket, callback){
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if(callback != null){
                        callback();
                    }
                    return;
                } else {
                    console.log("wait for connection...")
                    waitForSocketConnection(socket, callback);
                }
            }, 5); // wait 5 milisecond for the connection...
    }

    function sendRequest(request) {
        var defer = $q.defer();
        waitForSocketConnection(ws, function() {
            ws.send(JSON.stringify(request));
        });
        return defer.promise;
    }

    function listener(data) {
        var messageObj = data;
        switch(messageObj.type) {
            case "get_messages":
                //call $rootScope.$apply to trigger updating scopes.
                $rootScope.$apply(Service.ws.messages =messageObj.data);
                break;
            default:
                console.log("Cannot find action " + messageObj.type);
        }
    }

    // Define a "getter" for getting message data
    Service.getMessages = function() {
      var request = {
        type: "get_messages"
      }
      // Storing in a variable for clarity on what sendRequest returns
      sendRequest(request);
    }

    // Define sendMEssage
    Service.sendMessage  = function(message) {
        var request = {
            type: "send_message"
        }
        request.data = message;
        sendRequest(request);
    }

    return Service;
}]);