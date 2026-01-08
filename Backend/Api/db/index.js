require('dotenv').config();
const { Client } = require('pg');
const espress = require('express');
const bcrypt = require('bcrypt');

const app = espress();

app.use(espress.json());

const conn = new Client({
	host: process.env.HOST,
	user: "login_api",
	port: process.env.PORT,
	password: process.env.PASSWORD,
	database: process.env.DATABASE

});

app.listen(6060, () => console.log(`Its alive on http://localhost:${6060}`));

async function hashPass(pass) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(pass, saltRounds);
	return hashedPassword;
}

conn.connect().then(() => console.log("Connection has been establish"));

app.post("/create_user", async (req, resp) => {
	const { user_name } = req.body;
	const { password } = req.body;
	const { email } = req.body;
	const hashedPassword = await hashPass(password);

	conn.query(`INSERT INTO users (email, name, password) VALUES ('${email}', '${user_name}', '${hashedPassword}')`, (err, res) => {
		if (err) {
			return resp.status(400).json({ error: err });
		}
		else {
			return resp.status(200).json({ status: "ok" });
		}
	});

});

app.post("/get_user", (req, resp) => {
	const { user_name } = req.body;

	conn.query(`SELECT * FROM users WHERE name LIKE '${user_name}'`, (err, res) => {
		if (err) {
			return resp.status(400).json({ error: err });
		}
		else {
			return resp.status(200).json(res.rows);
		}

	});

});





