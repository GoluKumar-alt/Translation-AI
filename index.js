const express = require("express");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>YouTube Subtitle Translator</title>
<style>
body{
background:#0f172a;
color:white;
font-family:Arial;
text-align:center;
padding:30px;
}
.box{
max-width:600px;
margin:auto;
background:#1e293b;
padding:25px;
border-radius:20px;
}
input,button{
width:90%;
padding:14px;
margin-top:12px;
font-size:18px;
border:none;
border-radius:10px;
}
button{
background:#00ff99;
font-weight:bold;
cursor:pointer;
}
#result{
margin-top:20px;
background:#334155;
padding:20px;
border-radius:12px;
white-space:pre-wrap;
text-align:left;
}
</style>
</head>
<body>

<div class="box">
<h1>🎬 YouTube Subtitle Translator</h1>

<input id="url" placeholder="Paste YouTube Video Link">

<button onclick="run()">Get Subtitles</button>

<div id="result">Result will appear here...</div>

</div>

<script>
async function run(){

let url = document.getElementById("url").value;

let res = await fetch("/subs",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({url})
});

let data = await res.text();

document.getElementById("result").innerText = data;
}
</script>

</body>
</html>
`);
});

app.post("/subs", async (req,res)=>{

try{

const transcript = await YoutubeTranscript.fetchTranscript(req.body.url);

let text = transcript.map(x => x.text).join(" ");

res.send(text);

}catch(err){

res.send("❌ Subtitle not found or invalid YouTube link.");

}

});

app.listen(process.env.PORT || 3000);
