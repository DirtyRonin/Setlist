// Web Api
export const WEB_API_URL = "http://localhost:5000/api"

export const ACCESS_CONTROL_ALLOW_ORIGIN_HEADER = { "Access-Control-Allow-Origin": "*" }

export enum Endpoints {
    Songs = "Songs",
    Setlists = "Setlists",
    Bands = "Bands"
}

export const GetEndpointURL = (endpoint: Endpoints): string => `${WEB_API_URL}/${endpoint}`
