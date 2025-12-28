async function fetchVideo() {
  const yt = document.getElementById("yturl").value.trim();
  const status = document.getElementById("status");

  document.getElementById("videoList").innerHTML = "";
  document.getElementById("audioList").innerHTML = "";
  document.getElementById("title").innerText = "";

  if (!yt) {
    status.innerText = "❌ Paste a YouTube link";
    return;
  }

  status.innerText = "⏳ Fetching qualities...";

  const API = `https://api.bk9.dev/download/yt?url=${encodeURIComponent(yt)}`;

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("API error");

    const json = await res.json();
    if (!json.status) throw new Error("Invalid response");

    const data = json.BK9;
    const formats = data.formats;

    document.getElementById("title").innerText = data.title;
    status.innerText = "✅ Select quality to download";

    /* VIDEO */
    const videos = formats.filter(f => f.type === "video");
    document.getElementById("videoList").innerHTML =
      videos.map(v => `
        <div class="download-btn"
          onclick="forceDownload('${v.url}','${cleanName(data.title)}_${v.quality}.mp4')">
          ${v.quality} | ${v.fps || ""}fps | ${v.bitrate || ""}
        </div>
      `).join("");

    /* AUDIO */
    const audios = formats.filter(f => f.type !== "video");
    document.getElementById("audioList").innerHTML =
      audios.length
        ? audios.map(a => `
            <div class="download-btn"
              onclick="forceDownload('${a.url}','${cleanName(data.title)}.mp3')">
              Audio | ${a.bitrate || "Unknown"}
            </div>
          `).join("")
        : "<p>No audio formats</p>";

  } catch (e) {
    console.error(e);
    status.innerText = "❌ Error loading qualities";
  }
}

/* 🔽 FORCE DOWNLOAD (NO PLAY, NO NEW PAGE) */
function forceDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* File name clean */
function cleanName(name) {
  return name.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
}
