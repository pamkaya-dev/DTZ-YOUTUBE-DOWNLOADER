async function fetchVideo() {
  const yt = document.getElementById("yturl").value;
  if (!yt) return alert("Paste YouTube link");

  document.getElementById("title").innerText = "Loading...";
  document.getElementById("videoList").innerHTML = "";
  document.getElementById("audioList").innerHTML = "";

  /* 🔴 BK9 API */
  const API = `https://api.bk9.dev/download/youtube?url=${encodeURIComponent(yt)}`;

  try {
    const res = await fetch(API);
    const json = await res.json();

    if (!json.status) {
      document.getElementById("title").innerText = "Failed";
      return;
    }

    const data = json.BK9;
    const formats = data.formats;

    document.getElementById("title").innerText = data.title;

    /* VIDEO */
    const videos = formats.filter(f => f.type === "video");

    document.getElementById("videoList").innerHTML =
      videos.map(v => `
        <a class="download-btn" href="${v.url}" target="_blank">
          ${v.quality} | ${v.fps}fps | ${v.bitrate}
        </a>
      `).join("");

    /* AUDIO */
    const audios = formats.filter(f => f.type !== "video");

    document.getElementById("audioList").innerHTML =
      audios.length
        ? audios.map(a => `
            <a class="download-btn" href="${a.url}" target="_blank">
              Audio | ${a.bitrate || "Unknown"}
            </a>
          `).join("")
        : "<p>No audio formats</p>";
    const bubbleBg = document.querySelector('.bubble-bg');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Random size 5px – 12px
  const size = Math.random() *12;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';

  // Random horizontal position
  bubble.style.left = Math.random() * 100 + '%';

  // Random animation duration (fast bubbles)
  bubble.style.animationDuration = (Math.random() * 2+ 2) + 's';

  bubbleBg.appendChild(bubble);

  // Remove bubble after animation
  setTimeout(() => {
    bubble.remove();
  }, 3000); // slightly longer than max animation duration
}

// Create many bubbles continuously
setInterval(createBubble, 34); // every 0.1s a new bubble

  } catch (e) {
    document.getElementById("title").innerText = "Error fetching data";
  }
}
