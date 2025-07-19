// script.js
document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        fetch('save_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        }).then(() => {
            messageInput.value = '';
            loadMessages();
        });
    }
});

function loadMessages() {
    fetch('load_messages.php')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            data.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.textContent = msg.message;
                messagesDiv.appendChild(messageElement);
            });
        });
}

window.onload = loadMessages;
