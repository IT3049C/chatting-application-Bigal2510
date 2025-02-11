const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

const serverURL = `https://it3049c-chat.fly.dev/messages`;

async function fetchMessages() {
  const response = await fetch(serverURL);
  // if (!response.ok) throw new Error("Failed to fetch messages");
  const messages = await response.json();
  return messages;
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}




async function updateMessages() {
  const messages = await fetchMessages();
  //if (!messages || messages.length === 0) {
   // chatBox.innerHTML = "<p>No messages available.</p>"; // Debugging
   // return;
 // }

  chatBox.innerHTML = messages.map(msg => formatMessage(msg, nameInput.value)).join("");
}

sendButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const sender = nameInput.value.trim();
  const message = myMessage.value.trim();

  if (!message.trim()) return;

  await sendMessages(sender, message);
  myMessage.value = "";

  updateMessages();
});


async function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date().toISOString(),
  };

  await fetch(serverURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMessage),
  });

  await updateMessages();
}

setInterval(updateMessages, 10000);

updateMessages();