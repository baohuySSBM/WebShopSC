const express = require("express");
const app = express();
const mysql = require("mysql2");
const fs = require("fs/promises");

var con = mysql.createConnection({
	host: "192.168.0.101", user: "admin",
	password: "admin", database: "DIBCC25"
});
con.connect();
app.get("/", async function (req,res){
	let page = await fs.readFile("index.html", {encoding: "utf8"});
 	con.query("SELECT * FROM Students", function(error,students){	
		let boxes = "";
		students.forEach(function(stu) {
			boxes += `<div class="box">${stu}</div>`;
		});

		let html = page.replace("$PH$", boxes);   
		res.send(html);
	});
});

app.listen(80);
console.log("App listening on port 80");
