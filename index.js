let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//fix
//config connect db
let mysql = require('mysql');
let mysqlConnection = mysql.createConnection({
  host: "erxv1bzckceve5lh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "xdv2njteqk9ela2g",
  password: "qw8wdp440z83fz5j",
  database: "p9arvb7u51dr12xv",
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if(!err) console.log('DB connection successfully')
  else console.log('DB connection failed \n Error : '+ JSON.stringify(err, undefined, 2));
})

app.get('/', (req,res)=>{
     return res.send('Student api');
});

//get all student
app.get('/api/students', (req,res)=>{
    let sql = "SELECT * FROM student"
    mysqlConnection.query(sql,(err,results, fields) => {
        if (err) throw err  ;
        // else 
        return res.send(results);
    })
});

//get detail student with id
app.get('/api/student/:id', (req,res) => {
	let id = req.params.id ;
	let sql = 'SELECT * FROM student WHERE mssv= ?';
	mysqlConnection.query(sql,[id],(err, results, fields) =>{
    if (err) throw err;
    return res.send(results);
  });
});

//update student with id
app.put('/api/student/:id', (req,res) => {
  let student = req.body;
  let id = req.params.id ;
  let sql = "UPDATE student SET hoten = ?, gioitinh= ?, diemtb = ?, username = ?, password = ? WHERE mssv = ?";
	mysqlConnection.query(sql,[student.hoten,student.gioitinh,student.diemtb,student.username,student.password,id], function(err, results, fields) {
    if (err) throw err;
    return res.send({
      message :'Update student successfully'
    })
  });
});

app.listen(port, ()=>{
    console.log("Server started at: 127.0.0.1:3000");
})