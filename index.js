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
body{font-family:Arial;background:#111;color:#fff;text-align:center;padding:30px}
textarea{width:90%;height:120px;padding:10px;font-size:18px;border-radius:10px}
button{padding:12
