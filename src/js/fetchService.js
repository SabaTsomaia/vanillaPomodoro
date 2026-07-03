import { API_KEY } from "./config.js";


/*

this function fetches data from the api-ninjas API using the private API_KEY.


*/ 

export const fetchQuote = async function() {
    try {

        // Fetch Data from an api using an API-key
        const response = await fetch("https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom,inspirational", {
        method: "GET",
        headers: {
            'X-Api-Key': API_KEY,
        } 
        })

        const result = await response.json();
        // destructure and return the result 
        /*
        categories parameter includes keywords separated by a comma 
        that filters quotes.

        Data comes in this format:
        [
            {
            quote:"Always remember, success leaves clues.",
            author:"John Patrick Hickey",
            work:"On The Journey To Achievement",
                categories:[
                    "success",
                    "wisdom",
                    "inspirational"
                    ]
            }
        ] 
        */

        const {quote, author} = result[0];

        console.log(quote,author);
        return {quote,author}
    } catch (err){
        console.log(err)
    }
}