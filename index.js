const express = require("express");
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
body{
margin:0;
padding:0;
font-family:Arial,sans-serif;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}
.container{
background:rgba(255,255,255,0.08);
padding:25px;
border-radius:18px;
width:90%;
max-width:500px;
box-shadow:0 0 20px rgba(0,0,0,0.4);
text-align:center;
}
h1{
margin-bottom:20px;
font-size:32px;
}
textarea{
width:100%;
height:130px;
border:none;
outline:none;
border-radius:12px;
padding:15px;
font-size:18px;
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
border:none;
border-radius:12px;
background:#00ff99;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}
button:hover{
background:#00cc77;
}
#output{
margin-top:20px;
padding:15px;
background:rgba(255,255,255,0.1);
border-radius:12px;
min-height:60px;
font-size:20px;
word-wrap:break-word;
}
small{
display:block;
margin-top:15px;
opacity:0.8;
}
</style>
</head>
<body>

<div class="container">
<h1>🌐 Translation AI</h1>

<textarea id="text" placeholder="Type your text here..."></textarea>

<select id="lang">
<option value="Hindi">Hindi</option>
<option value="English">English</option>
<option value="Spanish">Spanish</option>
<option value="French">French</option>
<option value="Urdu">Urdu</option>
</select>

<button onclick="translateText()">Translate</button>

<div id="output">Your translation will appear here...</div>

<small>Powered by AI 🚀</small>
</div>

<script>
function translateText(){
let text=document.getElementById("text").value;
let lang=document.getElementById("lang").value;

if(text.trim()==""){
document.getElementById("output").innerHTML="Please enter text.";
return;
}

document.getElementById("output").innerHTML="Translated to "+lang+": "+text;
}
</script>

</body>
</html>
`);
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server Started");
});
