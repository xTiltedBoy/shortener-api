export interface UrlEntry {
    id: number
    date: string
    shortenUrl: string
    sourceUrl: string
}

export type newUrlEntry = Omit<UrlEntry, 'id', 'date'>