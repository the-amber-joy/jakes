const transcriptEl = document.getElementById("chatTranscript");
const themeSelectEl = document.getElementById("themeSelect");

const users = {
  "Jake Senior": "Jake Junior",
  "Jake Junior": "Jake Senior",
};

let currentSpeaker = "Jake Senior";

function randomDelayMs() {
  const min = 1000;
  const max = 15000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function appendMessage(speaker, text) {
  const li = document.createElement("li");
  li.className = `message ${speaker === "Jake Senior" ? "jake-senior" : "jake-junior"}`;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${speaker} • ${timestamp()}`;

  const content = document.createElement("div");
  content.className = "content";
  content.textContent = text;

  li.append(meta, content);
  transcriptEl.appendChild(li);
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

function postNextMessage() {
  const messageText = users[currentSpeaker];
  appendMessage(currentSpeaker, messageText);
  currentSpeaker =
    currentSpeaker === "Jake Senior" ? "Jake Junior" : "Jake Senior";

  const nextDelay = randomDelayMs();
  window.setTimeout(postNextMessage, nextDelay);
}

function applyTheme(themeName) {
  document.body.dataset.theme = themeName;
}

themeSelectEl.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

applyTheme(themeSelectEl.value);
postNextMessage();
