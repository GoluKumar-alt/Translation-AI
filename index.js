const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getVideoId(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }

    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>YouTube Subtitle Finder</title>
<style>
body{
background:#111;
color:white;
font-family:Arial;
text-align:center;
padding:30px;
}
input{
width:90%;
padding:14px;
font-size:18px;
border-radius:10px;
border:none;
}
button{
padding:12px 25px;
font-size:18px;
margin-top:15px;
border:none;
border-radius:10px;
background:#00ff88;
cursor:pointer;
}
#result{
margin-top:25px;
background:#222;
padding:20px;
border-radius:12px;
white-space:pre-wrap;
}
</style>
</head>
<body>

<h1>🎬 YouTube Subtitle Finder</h1>

<input id="url" placeholder="Paste YouTube URL here">

<br>

<button onclick="run()">Get Subtitles</button>

<div id="result"></div>

<script>
async function run(){
let url=document.getElementById("url").value;
document.getElementById("result").innerHTML="Loading...";

let r=await fetch("/subtitles",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({url})
});

let data=await r.text();
document.getElementById("result").innerHTML=data;
}
</script>

</body>
</html>
`);
});

app.post("/subtitles", async (req, res) => {
  try {
    const url = req.body.url;
    const id = getVideoId(url);

    if (!id) {
      return res.send("❌ Invalid YouTube URL");
    }

    const captionUrl =
      "https://www.youtube.com/api/timedtext?lang=en&v=" + id;

    const response = await fetch(captionUrl);
    const xml = await response.text();

    if (!xml || xml.trim() === "") {
      return res.send("❌ Subtitles not found");
    }

    const matches = [...xml.matchAll(/<text.+?>(.*?)<\/text>/g)];

    if (matches.length === 0) {
      return res.send("❌ No subtitle lines found");
    }

    let text = matches
      .slice(0, 50)
      .map(x =>
        x[1]
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
      )
      .join(" ");

    res.send(text);

  } catch (err) {
    res.send("❌ Error getting subtitles");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
