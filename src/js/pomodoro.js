import { updateNavigationBar } from './common.js';
import {renderQuote,saveDisplayQuote,fetchQuoteData} from './helper.js'
import { API_KEY } from './config.js';

const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const inspireBtn = document.querySelector('#inspire-quote-btn');

updateNavigationBar(); // Function for Handling Navigation CSS.

const fetchQuote = async function() {
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


document.addEventListener("DOMContentLoaded", () => {
    // Define quote and author variables for the
    // DRY principle
    const quote = localStorage.getItem("quote")
    const author = localStorage.getItem("author")

    if (quote && author)
    {
        // if exists, render from storage
        renderQuote(quote, author);
        console.log("Loaded quote from LocalStorage");
    } else 
    {
        // fetch new quote using Fetch and check for data function. 
        fetchQuoteData()
    }
})

inspireBtn.addEventListener("click",fetchQuoteData)