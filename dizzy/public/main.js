
var socket;
$(function() {
    socket = io();

    socket.on("message", (message) => {
        console.log(message)
        $("#notifications").append($(`<li>${message.message} (${message.node})</li>`));
    });

    socket.on("disconnect", () => {
        console.log("disconnect")
        $("#notifications").append($("<li>Thanks and bye!</li>"));
    });
});
