const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get('/', async (req, res) => {
  try {
    // Forward Params
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    // Make Request
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    // Log Request in Dev Mode
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    // Response
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
