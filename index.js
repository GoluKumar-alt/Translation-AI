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

h1{
margin-bottom:20px;
}

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

button{
width:100%;
padding:12px;
font-size:18px;
border:none;
border-radius:10px;
background:#00ff99;
font-weight:bold;
cursor:pointer;
margin-bottom:15px;
}

#result{
margin-top:20px;
padding:15px;
background:rgba(255,255,255,0.08);
border-radius:10px;
font-size:20px;
min-height:60px;
}

#google_translate_element{
margin-top:15px;
}
</style>
</head>

<body>

<div class="container">
<h1>🌐 Translation AI</h1>

<textarea id="text" placeholder="Type your text here..."></textarea>

<button onclick="showText()">Show Text</button>

<div id="result">Your text will appear here...</div>

<div id="google_translate_element"></div>

</div>

<script>
function showText(){
let text=document.getElementById("text").value;
document.getElementById("result").innerHTML=text;
}

function googleTranslateElementInit() {
new google.translate.TranslateElement(
{pageLanguage: 'en'},
'google_translate_element'
);
}
</script>

<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

</body>
</html>
`);
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server Started");
});
