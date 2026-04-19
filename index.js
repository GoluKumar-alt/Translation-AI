const express = require("express");
const app = express();

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Translation AI</title>
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
h1{margin-bottom:20px;}
textarea{
width:100%;
height:130px;
padding:12px;
font-size:18px;
border:none;
border-radius:10px;
resize:none;
margin-bottom:15px;
}
select,button{
width:100%;
padding:12px;
font-size:18px;
border:none;
border-radius:10px;
margin-bottom:15px;
}
button{
background:#00ff99;
font-weight:bold;
cursor:pointer;
}
</style>
</head>
<body>

<div class="container">
<h1>🌐 Translation AI</h1>

<textarea id="text" placeholder="Type text here..."></textarea>

<select id="lang">
<option value="hi">Hindi</option>
<option value="en">English</option>
<option value="fr">French</option>
<option value="es">Spanish</option>
<option value="ur">Urdu</option>
</select>

<button onclick="goTranslate()">Translate</button>
</div>

<script>
function goTranslate(){
let text=document.getElementById("text").value.trim();
let lang=document.getElementById("lang").value;

if(text==""){
alert("Please enter text");
return;
}

let url="https://translate.google.com/?sl=auto&tl="+lang+"&text="+encodeURIComponent(text)+"&op=translate";

window.open(url,"_blank");
}
</script>

</body>
</html>
`);
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server Started");
});
