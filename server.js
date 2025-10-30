const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { generateEmbed } = require('./utils/generateEmbed');

const app = express();
app.use(bodyParser.json());

// Serve static files from multiple directories
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/generate', (req, res) => {
  const { faqs } = req.body;
  if (!faqs) return res.status(400).json({ error: 'No FAQ data provided' });

  try {
    const embedCode = generateEmbed(faqs);
    res.json({ embedCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
