require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postModel = require('./models/post.model')

const app = express()

app.get('/', async (req, res) => {
	try {
		const allPosts = await postModel.find()
		res.status(200).json(allPosts)
	} catch (error) {
		res.status(500).json(error)
	}
	res.send('Hello Sammi')
})

app.post('/', async (req, res) => {
	try {
		const { title, body } = req.body
		const newPost = await postModel.create({ title, body })
		res.status(201).json(newPost)
	} catch (error) {
		res.status(500).json(error)
	}
})

app.get('/post', (req, res) => {
	res.json({ message: 'Hello Port' })
})

const PORT = process.env.PORT

const bootstrap = async () => {
	try {
		await mongoose
			.connect(process.env.DB_URL)
			.then(() => console.log('Connected DB'))
		app.listen(PORT, () =>
			console.log(`Listening on - http://localhost:${PORT}`)
		)
	} catch (error) {
		console.log(`Error connecting with DB: ${error}`)
	}
}

bootstrap()
