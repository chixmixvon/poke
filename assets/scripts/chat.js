$(function () {
    // When we're using HTTPS, use WSS too.
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat/" + channel);
    console.log(socket);
    socket.onmessage = function (message) {
        var data = JSON.parse(message.data);
        var chatbox = $('#messagelist');

        chatbox.append($('<li>').text(
            data.user + ": " + data.message + " [" + data.timestamp + "]"
        ));
    };

    $('#chatbox').on("submit", function (event) {
        socket.send(JSON.stringify({
            'message': $('#chat').val(),
            'user': loggeduser
        }));
        $('#chat').val("").focus();
        return false;
    });

});