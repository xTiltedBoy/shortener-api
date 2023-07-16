import express from 'express'
import * as urlServices from '../services/url'

const router = express.Router()

router.get('/:shortenUrl', (req, res) => {
    const url = urlServices.redirect(req.params.shortenUrl)
    return (url != null) ? res.send(url) : res.sendStatus(404)
})

router.get('/q/id/:id', (req, res) => {
    const url = urlServices.findById(Number(req.params.id))
    return (url != null) ? res.send(url) : res.sendStatus(404)
})

router.get('/q/shortenUrl/:shortenUrl', (req, res) => {
    const url = urlServices.findByShortenUrl(req.params.shortenUrl)
    return (url != null) ? res.send(url) : res.sendStatus(404)
})

router.post('/standard-entry', (req, res) => {
    const { sourceUrl } = req.body

    const newUrlEntry = urlServices.addStandardEntry({
        sourceUrl
    })

    res.json(newUrlEntry)
})

router.post('/custom-entry', (req, res) => {
    const { shortenUrl, sourceUrl } = req.body

    const newUrlEntry = urlServices.addCustomEntry({
        shortenUrl,
        sourceUrl
    })

    res.json(newUrlEntry)
})

export default router