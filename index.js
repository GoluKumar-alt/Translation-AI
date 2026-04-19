const express = require("express");
const { getSubtitles } = require("youtube-captions-scraper");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>YouTube Subtitle Tool</title>
<style>
body{background:#111;color:#fff;font-family:Arial;text-align:center;padding:30px;}
.box{max-width:600px;margin:auto;background:#222;padding:25px;border-radius:20px;}
input,button{width:90%;padding:14px;margin-top:12px;font-size:18px;border:none;border-radius:10px;}
button{background:#00ff99;font-weight:bold;}
#result{margin-top:20px;background:#333;padding:20px;border-radius:12px;white-space:pre-wrap;text-align:left;}
</style>
</head>
<body>
<div class="box">
<h1>🎬 YouTube Subtitle Translator</h1>
<input id="url" placeholder="Paste YouTube link">
<button onclick="run()">Get Subtitles</button>
<div id="result">Result here...</div>
</div>

<script>
async function run(){
let url=document.getElementById("url").value;

let res=await fetch("/subs",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({url})
});

let data=await res.text();
document.getElementById("result").innerText=data;
}
</script>
</body>
</html>
`);
});

function getId(url){
let m = url.match(/(?:v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11})/);
return m ? m[1] : url;
}

app.post("/subs", async (req,res)=>{
try{
let id = getId(req.body.url);

const captions = await getSubtitles({
videoID:id,
lang:"en"
});

let text = captions.map(x => x.text).join(" ");
res.send(text);

}catch(e){
res.send("❌ Subtitles not found.");
}
});

app.listen(process.env.PORT || 3000);
