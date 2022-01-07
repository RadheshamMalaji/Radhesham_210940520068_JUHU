const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wptexam",
};

const checkConnection = async () => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("sucessful");
  await connection.endAsync();
};

const addMessage = async (user) => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("sucessful");
  const sql = `insert into user (msg) values(?)`;
  connection.queryAsync(sql, [user.msg]);
  await connection.endAsync();
  console.log("user added");
};

const selectAllMessage = async () => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("sucessful");
  const sql = `select * from user`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  console.log(list);
  return list;
};
//checkConnection();
const user = {
  msg: "Hiii",
};
//addMessage(user);
//selectAllMessage();

module.exports = { selectAllMessage, addMessage };
