require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

async function vertifyPass(pass, hash) {
	return await bcrypt.compare(pass, hash);
}

app.listen(process.env.PORT, () => console.log(`Its alive on http://localhost:${process.env.PORT}`));

app.post("/auth/login", async (req, res) => {
	try {
		const { user_name, password } = req.body;

		const response_db = await fetch("http://localhost:6060/get_user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_name })
		});

		if (!response_db.ok) {
			return res.status(response_db.status).json({ error: "User service error" });
		}

		const user = await response_db.json();
		const user_pass = user[0].password;
		const hashTest = await vertifyPass(password, user_pass);

		if (hashTest) {
			const response_session = await fetch("http://localhost:7000/create_sessionKey", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user_name })
			});

			const session = await response_session.json();

			if (session.error) {
				return res.status(401).json({});
			}

			const session_key = session.key;

			res.cookie("session_key", session_key, {
				httpOnly: true,
				secure: false,
				sameSite: "strict",
				maxAge: 3600
			});

			return res.status(200).json({ status: "ok" });
		}
		else {
			return res.status(401).json({})
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.message });
	}
});

app.post("/auth/register", async (req, res) => {
	try {
		const { email, user_name, password } = req.body;

		const response = await fetch("http://localhost:6060/create_user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_name, password, email })
		});
		const resp = response.json();
		if (resp.error) {
			return res.status(500).json({ error: resp.error });
		}
		return res.status(201).json({ status: "ok", response: resp });
	} catch (err) {
		return res.status(500).json({ error: err });
	}

});
