import { UrlEntry, newUrlEntry } from '../types'

import fs from 'fs'

const urls: UrlEntry[] = JSON.parse(fs.readFileSync('/content-api/urls.json', 'utf-8'))

export const getEntries = (): Array<UrlEntry> => urls

export const findById = (id: number): UrlEntry | undefined => {
    const entry = urls.find(u => u.id === id)
    return entry
}

export const findByShortenUrl = (shortenUrl: string): UrlEntry | undefined => {
    const entry = urls.find(u => u.shortenUrl === shortenUrl)
    return entry
}

export const addEntry = (newUrlEntry: newUrlEntry): UrlEntry => {
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