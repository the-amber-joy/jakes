const transcriptEl = document.getElementById("chatTranscript");
const themeSelectEl = document.getElementById("themeSelect");

const speakers = ["Jake Senior", "Jake Junior"];

let currentSpeakerIndex = 0;

function randomDelayMs() {
  const min = 1000;
  const max = 10000;
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
  const speaker = speakers[currentSpeakerIndex];
  const messageText = speakers[(currentSpeakerIndex + 1) % speakers.length];

  appendMessage(speaker, messageText);
  currentSpeakerIndex = (currentSpeakerIndex + 1) % speakers.length;

  const nextDelay = randomDelayMs();
  window.setTimeout(postNextMessage, nextDelay);
}

themeSelectEl.addEventListener("change", (event) => {
  document.body.dataset.theme = event.target.value;
});

document.body.dataset.theme = themeSelectEl.value;
postNextMessage();
