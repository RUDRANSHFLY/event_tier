export interface Event {
    id : string
    title : string
    desc : string | null
    image_url : string | null
    tier : "gold" | "silver" | "platinum" | "free",
    event_date : string
}

export type tier = {
    tier : "free" | 'silver' | 'gold' | 'platinum'
}