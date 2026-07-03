import { updateNavigationBar } from './common.js';
import {renderQuote,saveDisplayQuote,fetchQuoteData} from './helper.js'
import { fetchQuote } from './fetchService.js';

const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const inspireBtn = document.querySelector('#inspire-quote-btn');

updateNavigationBar(); // Function for Handling Navigation CSS.


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