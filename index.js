const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Real Translation AI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{
margin:0;
padding:0;
font-family:Arial,sans-serif;
background:linear-gradient(135deg,#141e30,#243b55);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}
.container{
width:90%;
max-width:500px;
background:rgba(255,255,255,0.08);
padding:25px;
border-radius:18px;
text-align:center;
box-shadow:0 0 20px rgba(0,0,0,0.4);
}
h1{
margin-bottom:20px;
}
textarea{
width:100%;
height:120px;
padding:12px;
font-size:18px;
border:none;
border-radius:10px;
resize:none;
margin-bottom:15px;
}
select{
width:100%;
padding:12px;
font-size:17px;
border:none;
border-radius:10px;
margin-bottom:15px;
}
button{
width:100%;
padding:14px;
font-size:18px;
font-weight:bold;
border:none;
border-radius:10px;
background:#00ff99;
cursor:pointer;
}
#output{
margin-top:20px;
padding:15px;
background:rgba(255,255,255,0.08);
border-radius:10px;
min-height:60px;
font-size:20px;
}
</style>
</head>
<body>

<div class="container">
<h1>🌐 Real Translation AI</h1>

<textarea id="text" placeholder="Enter text..."></textarea>

<select id="lang">
<option value="hi">Hindi</option>
<option value="en">English</option>
<option value="fr">French</option>
<option value="es">Spanish</option>
<option value="ur">Urdu</option>
</select>

<button onclick="translateNow()">Translate</button>

<div id="output">Translation appears here...</div>
</div>

<script>
async function translateNow(){
let text=document.getElementById("text").value;
let lang=document.getElementById("lang").value;

if(text.trim()==""){
document.getElementById("output").innerHTML="Please enter text";
return;
}

document.getElementById("output").innerHTML="Translating...";

try{
let res = await fetch("https://libretranslate.de/translate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
q:text,
source:"auto",
target:lang,
format:"text"
})
});

let data = await res.json();

document.getElementById("output").innerHTML=data.translatedText;

}catch(err){
document.getElementById("output").innerHTML="Translation failed";
}
}
</script>

</body>
</html>
`);
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server Started");
});
