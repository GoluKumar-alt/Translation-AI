const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Translation AI</title>
<style>
body{
background:#111;
color:white;
font-family:Arial;
text-align:center;
padding:30px;
}
textarea{
width:90%;
height:120px;
font-size:18px;
padding:10px;
border-radius:10px;
}
button{
padding:12px 25px;
font-size:18px;
margin-top:15px;
border:none;
border-radius:10px;
background:#00ff88;
}
#output{
margin-top:20px;
