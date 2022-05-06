const express = require("express");
const app = express();
const mysql = require("mysql");

app.listen("3001", () => {
  console.log("running");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "classroom",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/:roll_no", (req, res) => {
  const req_rollno = req.params.roll_no;
  db.query("select count(*) from student_name", (err, result) => {
    if (req_rollno <= result[0]["count(*)"]) {
      const query1 = `select address from student_add where roll_no=${req_rollno}`;
      const query2 = `select Name from student_name where roll_no=${req_rollno}`;
      let response1 = "";
      let response2 = "";

      db.query(query1, (err, result) => {
        response1 = result[0].address;

        db.query(query2, (err, result) => {
          response2 = result[0].Name;

          res.json({ Name: response2, address: response1 });
        });
      });
    } else {
      res.json({ Name: null, address: null });
    }
  });
});
