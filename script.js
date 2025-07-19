// script.js
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        saveMessageToDatabase(message);
        messageInput.value = '';
    }
});

function saveMessageToDatabase(message) {
    fetch('/save-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadMessages();
        }
    });
}

function loadMessages() {
    fetch('/get-messages')
    .then(response => response.json())
    .then(data => {
        messagesDiv.innerHTML = '';
        data.messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = msg;
            messagesDiv.appendChild(messageElement);
        });
    });
}

loadMessages();
