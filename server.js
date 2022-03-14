const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('api is running...');
});

app.get('/pdf', (req, res) => {
  const pdf_name = uuidv4();
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`./pdf/${pdf_name}.pdf`));

  doc.fontSize(27).text('This the article for GeeksforGeeks 2', 100, 100);

  doc
    // .addPage()
    .fontSize(15)
    .text('Generating PDF with the help of pdfkit', 100, 100);

  //  doc
  //   .scale(0.6)
  //   .translate(470, -380)
  //   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  //   .fill('red', 'even-odd')
  //   .restore();

  // Add some text with annotations
  // doc
  //   .addPage()
  //   .fillColor('blue')
  //   .text('The link for GeeksforGeeks website', 100, 100)

  // .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');

  // Finalize PDF file
  doc.end();

  res.send(pdf_name);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
