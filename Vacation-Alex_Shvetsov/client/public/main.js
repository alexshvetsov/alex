let socket

function connect() {
    socket = io.connect()
    console.log('socket is on')
}