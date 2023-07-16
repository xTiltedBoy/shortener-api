import { UrlEntry, newUrlEntry } from '../types'

import fs from 'fs'

const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
const alphabet = 'a1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const getEntries = (): Array<UrlEntry> => urls

export const redirect = (shortenUrl: string): string | undefined => {
    const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
    const entry = urls.find(u => u.shortenUrl === shortenUrl)
    const redirect = '<html> <script type="text/javascript"> window.location="' + entry?.sourceUrl + '"; </script> </html>'
    
    return redirect
}

export const findById = (id: number): UrlEntry | undefined => {
    const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
    const entry = urls.find(u => u.id === id)
    return entry
}

export const findByShortenUrl = (shortenUrl: string): UrlEntry | undefined => {
    const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
    const entry = urls.find(u => u.shortenUrl === shortenUrl)
    return entry
}

export const addStandardEntry = (newUrlEntry: newUrlEntry): UrlEntry => {
    const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
    const currentDate = new Date().toLocaleDateString()
    var shortUrl = ''

    for (let i = 0; i < 6; i++) {
        shortUrl += alphabet.charAt(Math.random()*alphabet.length)
    }

    const newUrl = {
        id: Math.max(0,...urls.map(u => u.id)) + 1,
        date: currentDate,
        shortenUrl: shortUrl,
        ... newUrlEntry
    }
    urls.push(newUrl)

    const parsedUrls = JSON.stringify(urls)
    fs.writeFile('/content-api/urls.json', parsedUrls, (error) => {
        if (error) throw error
    })

    return newUrl
}

export const addCustomEntry = (newUrlEntry: newUrlEntry): UrlEntry => {
    const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))
    const currentDate = new Date().toLocaleDateString()

    const newUrl = {
        id: Math.max(0,...urls.map(u => u.id)) + 1,
        date: currentDate,
        ... newUrlEntry
    }
    urls.push(newUrl)

    const parsedUrls = JSON.stringify(urls)
    fs.writeFile('/content-api/urls.json', parsedUrls, (error) => {
        if (error) throw error
    })

    return newUrl
}