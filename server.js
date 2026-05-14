const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Endpoint to save reviews
app.post('/save-review', (req, res) => {
  const { name, role, rating, reviewText } = req.body;
  const line = `Name: ${name}\nRole: ${role}\nRating: ${rating}\nReview: ${reviewText}\n---\n`;

  const filePath = path.join(__dirname, 'reviews.txt');
  fs.appendFile(filePath, line, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving review');
    }
    res.send('Review saved');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));