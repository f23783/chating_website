require('dotenv').config();
const { createClient } = require("redis");
const express = require('express');
const app = express();
const crypto = require('crypto');

const port = process.env.PORT;

app.use(express.json());

const client = createClient({
	url: process.env.URL
});

async function start() {
	try {
		if (!client.isOpen) await client.connect();
		await client.ping();
		app.listen(port, () => console.log(`Its alive on http://localhost:${port}`));
	}
	catch (e) {
		console.error(e);
		process.exit(1);
	}
}

start();

function generateHexKey(bytes = 32) {
	return crypto.randomBytes(bytes).toString('base64url');
}

app.get('/create_sessionKey', async (req, res) => {
	const { user_name } = req.body;

	if (!user_name) {
		return res.status(400).json({ error: "Need a username" });
	}

	if (await client.get(user_name) != null) {
		return res.status(400).json({ error: "Already have a session_key" });
	}

	const session_key = generateHexKey();
	await client.setEx(user_name, Number(process.env.DEFAULT_EXPIRATION), session_key);
	res.status(200).json({
		key: session_key
	});
});

app.post('/check_sessionKey/:user_name', async (req, res) => {
	const { user_name } = req.params;
	const { session_key } = req.body;

	if (session_key == await client.get(user_name)) {
		return res.status(200).json({ status: "ok" });
	}

});

