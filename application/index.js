const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const database_connection = async () => {
  const config = {
    host: "database",
    user: "root",
    password: "root",
    database: "nodedb",
  };

  const createdConnection = await mysql.createConnection(config);

  return createdConnection;
};

const get_people = async (connection) => {
  const SELECT_QUERY = "SELECT * FROM people";
  const [rows] = await connection.query(SELECT_QUERY);
  return rows;
};

const insert_people = async (connection) => {
  const INSERT_QUERY = `INSERT INTO people(name) values('Carlos')`;
  const peopleList = await get_people(connection);

  if (peopleList.length === 0) {
    await connection.query(INSERT_QUERY);
  }
};

app.get("/", async (req, res) => {
  const connection = await database_connection();

  await insert_people(connection);
  const rows = await get_people(connection);

  const TEMPLATE = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${rows.map((item) => `<li>${item.name}</li>`)}
    </ul>
  `;

  res.send(TEMPLATE);
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
