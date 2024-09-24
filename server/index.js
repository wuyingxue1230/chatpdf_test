const express = require('express')
const multer = require('multer')
const path = require('path')
const { parsePDF, generateQuestions } = require('./ai')

const app = express()
const upload = multer({ dest: 'uploads/' })

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  try {
    const parsedData = await parsePDF(req.file.path)
    const questions = await generateQuestions({ data: parsedData, numQuestions: 10 })
    res.send({ message: 'File uploaded and processed successfully', questions })
  } catch (error) {
    console.error('Error processing file:', error)
    res.status(500).send('Error processing file.')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})