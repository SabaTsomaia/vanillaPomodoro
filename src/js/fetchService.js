import { API_KEY } from "./config.js";


export const fetchQuote = async function() {
    try {

        // Fetch Data from an api using API-key
        const response = await fetch("https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom,inspirational", {
        method: "GET",
        headers: {
            'X-Api-Key': API_KEY,
        } 
        })

        const result = await response.json();
        const {quote, author} = result[0];

        console.log(quote,author);
        return {quote,author}

    } catch (err){
        console.log(err)
    }
}