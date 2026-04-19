const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Translation AI</title>
<style>
body{
background:#0f172a;
font-family:Arial;
text-align:center;
padding:30px;
color:white;
}
.box{
max-width:500px;
margin:auto;
background:#1e293b;
padding:25px;
border-radius:20px;
}
textarea{
width:90%;
height:140px;
font-size:20px;
padding:15px;
border-radius:12px;
border:none;
outline:none;
}
select,button{
margin-top:15px;
padding:12px;
font-size:18px;
border:none;
border-radius:10px;
width:90%;
}
button{
background:#00ff99;
font-weight:bold;
cursor:pointer;
}
#output{
margin-top:20px;
background:#334155;
padding:20px;
border-radius:12px;
font-size:24px;
min-height:80px;
}
</style>
</head>
<body>

<div class="box">
<h1>🌐 Translation AI</h1>

<textarea id="text" placeholder="Type text here..."></textarea>

<select id="lang">
<option value="hi">Hindi</option>
<option value="fr">French</option>
<option value="es">Spanish</option>
<option value="de">German</option>
<option value="ar">Arabic</option>
</select>

<button onclick="translateText()">Translate</button>

<div id="output">Result will appear here</div>
</div>

<script>
async function translateText(){
let text=document.getElementById("text").value;
let lang=document.getElementById("lang").value;

let url="https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl="+lang+"&dt=t&q="+encodeURIComponent(text);

let res=await fetch(url);
let data=await res.json();

document.getElementById("output").innerHTML=data[0][0][0];
}
</script>

</body>
</html>
`);
});

app.listen(process.env.PORT || 3000);
