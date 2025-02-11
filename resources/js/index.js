const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

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

// function fetchMessages() {
//   return [
//     {
//       id: 1,
//       text: "One message",
//       sender: "Alex Jones",
//       timestamp: 1537410673072
//     },
//     {
//       id: 2,
//       text: "Another message",
//       sender: "Alex Jones",
//       timestamp: 1537410673072
//     },
//     {
//       id: 3,
//       text: "This is a message from someone else",
//       sender: "Someone Else",
//       timestamp: 1537410673072
//     }
//   ];
// }
const serverURL = `https://it3049c-chat.fly.dev/messages`;

function fetchMessages() {
  return fetch(serverURL)
    .then(response => response.json());
}

async function updateMessages() {
  const messages = await fetchMessages();
  if (!messages) return;

  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });

  chatBox.innerHTML = formattedMessages;
}

sendButton.addEventListener("click", async function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  if (!message.trim()) return;

  await sendMessages(sender, message);
  myMessage.value = "";
});


async function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date().toISOString()
  };



async function updateMessages() {
  const messages = await fetchMessages();
}

fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

