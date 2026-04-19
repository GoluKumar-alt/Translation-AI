const express = require("express");
const translate = require("@vitalets/google-translate-api");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Translation AI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{font-family:Arial;background:#111;color:#fff;text-align:center;padding:30px}
textarea,select,button{width:90%;max-width:500px;padding:12px;margin:10px;font-size:18px;border:none;border-radius:10px}
button{background:#00ff88;font-weight:bold}
#output{margin-top:20px;font-size:22px;color:#00ff88}
</style>
</head>
<body>
<h1>🌐 Translation AI</h1>
<textarea id="text" placeholder="Type text here"></textarea><br>
<select id="lang">
<option value="hi">Hindi</option>
<option value="en">English</option>
<option value="fr">French</option>
<option value="es">Spanish</option>
</select><br>
<button onclick="go()">Translate</button>
<div id="output"></div>

<script>
async function go(){
const text=document.getElementById("text").value;
const lang=document.getElementById("lang").value;
document.getElementById("output").innerHTML="Translating...";
const res=await fetch("/translate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({text,lang})
});
const data=await res.json();
document.getElementById("output").innerHTML=data.result;
}
</script>
</body>
</html>
`);
});

app.post("/translate", async (req,res)=>{
try{
const {text, lang} = req.body;
const result = await translate(text,{to:lang});
res.json({result: result.text});
}catch(e){
res.json({result:"Translation failed"});
}
});

app.listen(process.env.PORT || 3000);
