import { fetchQuote } from "./fetchService.js";


const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");



// rendering the actual data to the DOM.
export function renderQuote(quote,author) {
    quoteText.textContent = `"${quote}"`;
    quoteAuthor.textContent = `${author}`;
}

// render data to the DOM and update localStorage.
export function saveDisplayQuote(quote, author) {
    renderQuote(quote, author);
    
    localStorage.setItem("quote", quote);
    localStorage.setItem("author", author);
}

// This function validates returned Object data
// and updates DOM 
export async function fetchQuoteData() 
{
    console.log("Fetching new quote...");
    const data = await fetchQuote();
        
    if (data)
    {
        // Update DOM and localstorage
        saveDisplayQuote(data.quote, data.author);
        console.log("Saved new quote to LocalStorage");
    }
}
