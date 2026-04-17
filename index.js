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
font-family:Arial;
background:#111;
color:white;
text-align:center;
padding:30px;
}
textarea{
width:90%;
height:120px;
padding:10px;
font-size:18px;
border-radius:10px;
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
#output{
margin-top:20px;
font-size:22px;
color:#00ff88;
}
</style>
</head>
<body>
<h1>Translation AI 🌐</h1>
<textarea id="text" placeholder="Type text here"></textarea><br>
<button onclick="translateText()">Translate</button>
<div id="output"></div>

<script>
function translateText(){
let text=document.getElementById("text").value;
document.getElementById("output").innerHTML="Translated: "+text;
}
</script>
</body>
</html>
`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
