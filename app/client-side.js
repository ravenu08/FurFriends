const loginPage = document.getElementById("loginPage");
const mainChatContainer = document.getElementById("mainChatContainer");
const gettingStarted = document.getElementById("gettingStarted");
const mainChat = document.getElementById("mainChat");
const signUpBtn = document.getElementById("submit");
const roomButtons = document.querySelectorAll(".content-messages-list a");
const userField = document.getElementById("fullNameField");
const userProfile = document.getElementById("userProfile");
const emailField = document.getElementById("emailField");
const messageContainer = document.getElementById("messageContainer");
const chatInput = document.getElementById("chatInput");
const chatForm = document.getElementById("chatForm");
const titleElement = document.getElementById("titleElement");
const glassContent = document.querySelector(".glassContent")

let userName;
let email;
let ws;
let currentRoomButton = null;
let currentRoom = null;

const chats = { server1: [], server2: [] };

const getName = () => {
    userName = userField.value.trim();
    email = emailField.value.trim();
    if (userName === "") {
        alert("Name cannot be empty");
        return;
    }
    if (email === "") {
        alert("Email cannot be empty");
        return;
    }

    loginPage.style.display = "none";
    mainChatContainer.style.display = "block";
    gettingStarted.style.display = "block";
    userProfile.innerHTML = userName;
};

const displayMessage = (isOwnMsg, message, sender, dateTime) => {
    const formattedTime = moment(dateTime).format("D MMMM hh:mm");
    const element = document.createElement("li");
    element.className = isOwnMsg ? "message-right" : "message-left";
    element.innerHTML = `
                <p class="message">
                    ${message}
                    <span>${sender} ● ${formattedTime}</span>
                </p>
            `;
    messageContainer.appendChild(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

const handleSendMessage = (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (message === "") {
        alert("Message cannot be empty");
        return;
    }
    if (ws.readyState !== WebSocket.OPEN) {
        console.error("WebSocket is not open. Message cannot be sent.");
        return;
    }
    const dateTime = new Date().toISOString();
    chatInput.value = "";
    ws.send(JSON.stringify({ name: userName, message, dateTime }));
};

const loadChatsForRoom = () => {
    messageContainer.innerHTML = "";
    chats[currentRoom].forEach((chat) => {
        const isOwnMsg = chat.name === userName;
        displayMessage(isOwnMsg, chat.message, chat.name, chat.dateTime);
    });
};

const connectToServer = (port) => {
    if (ws) {
        ws.close();
    }
    ws = new WebSocket(`ws://localhost:${port}`);
    ws.addEventListener("open", () => {
        // Connection established
    });
    ws.addEventListener("message", (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.name && data.message && data.dateTime) {
                const isOwnMsg = data.name === userName;
                displayMessage(isOwnMsg, data.message, data.name, data.dateTime);
                chats[currentRoom].push({
                    name: data.name,
                    message: data.message,
                    dateTime: data.dateTime,
                });
            } else {
                console.error("Received message does not contain 'name', 'message', and 'dateTime' properties:", data);
            }
        } catch (error) {
            console.error("Failed to parse message as JSON:", event.data);
        }
    });
    loadChatsForRoom();
};

signUpBtn.addEventListener("click", getName);
chatForm.addEventListener("submit", handleSendMessage);

roomButtons.forEach((button) => {
    button.addEventListener("click", function () {
        currentRoom = this.id;
        const port = currentRoom === "server1" ? 8080 : currentRoom === "server2" ? 8081 : null;
        connectToServer(port);
        titleElement.innerHTML = `${this.querySelector('.content-message-name').textContent}`;
        document.title = `${this.querySelector('.content-message-name').textContent} Chat`;
        mainChatContainer.style.display = "block";
        mainChat.style.display = "block";
        gettingStarted.style.display = "none";
    });
});