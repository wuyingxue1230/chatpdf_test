const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const jwt = require('jsonwebtoken')
const API_KEY = '3ab08a72928145a27263acb709857719.i9lQFxNdJnkhG8Gr'
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

function generateToken(apikey, expSeconds) {
  const [id, secret] = apikey.split('.')
  const payload = {
    api_key: id,
    exp: Date.now() + expSeconds * 1000,
    timestamp: Date.now(),
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256', header: { alg: 'HS256', sign_type: 'SIGN' } })
}

async function parsePDF(filePath) {
  const form = new FormData()
  form.append('file', fs.createReadStream(filePath))

  const token = generateToken(API_KEY, 3600) // 1 hour expiration

  const response = await axios.post(API_URL, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

async function generateQuestions(params) {
  const token = generateToken(API_KEY, 3600) // 1 hour expiration

  const response = await axios.post(API_URL, params, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

module.exports = { parsePDF, generateQuestions }