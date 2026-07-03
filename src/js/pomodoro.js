import { updateNavigationBar } from './common.js';
import {renderQuote,saveDisplayQuote,fetchQuoteData} from './helper.js'
import { fetchQuote } from './fetchService.js';


updateNavigationBar(); // Function for Handling Navigation class CSS.


// Quote section 
const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const inspireBtn = document.querySelector('#inspire-quote-btn');

// Clock-timer section
const switchButtons = document.querySelectorAll('.clock-container .switch-btn')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')

const subtitle = document.getElementById('focus-subtitle') // text below the clock 

const startStopBtn = document.getElementById('tgl-start-stop-btn')
const resetBtn = document.getElementById('reset-btn')
const skipBtn = document.getElementById('skip-btn')  

const completedSessions = document.getElementById('todays-Sessions')

document.addEventListener("DOMContentLoaded", () => {
    const indexMode = ['WORK', 'SHORTBREAK','LONGBREAK']

    const time = {
        WORK: { duration: 25 * 60, label: "STAY FOCUSED" },
        SHORTBREAK: { duration: 5 * 60, label: "SHORT REST" },
        LONGBREAK: { duration: 15 * 60, label: "LONG REST" }
    }

    // creating state object with default values.
    const state = {
        breakType: 'WORK',
        isRunning: false,
        remainingTime: 25 * 60,
        intervalId: null,
        completedSessions: 0
    }


    // if the user clicks on the any of the 3 buttons in the clock container
    // update current UI
    // re-render timer
    const stateChange = function()
    {
        // update UI for default indexMode 
        render()
        switchButtons.forEach((el,i) => {
            el.addEventListener('click',(e) => {

                // Disabble any running interval fully before switching UI and break type state.
                if (state.intervalId !== null) {
                    clearInterval(state.intervalId)
                    state.intervalId = null
                }   

                // change current break type state
                state.breakType = indexMode[i]
                // match time duration to new selected mode
                state.remainingTime = time[state.breakType].duration
                state.isRunning = false

                render()
            })
        })
    }
        
    // Render ui by state
    const render = function() 
    {
        switchButtons.forEach((el,i) => {
            // If current Index === Type of brake
            // Add Render UI and update timers.
            if(indexMode[i] === state.breakType)
                {
                    el.classList.add('activeClock')
                } else
                {
                    el.classList.remove('activeClock')
                }
        })   
        
        subtitle.textContent = time[state.breakType].label;
        startStopBtn.textContent = state.isRunning ? 'STOP' : 'START';

        
        // splitting time from normal seconds  to Minutes and Seconds
        const mins = Math.floor(state.remainingTime / 60);
        const secs = state.remainingTime % 60;
        
        // (5 becomes "05") 
        minutes.textContent = String(mins).padStart(2, '0');
        seconds.textContent = String(secs).padStart(2, '0');
        
        
        completedSessions.textContent = state.completedSessions 
    }

    
    stateChange()
    
    const timer = function()
    {
        // revert boolean value of isRunning key
        state.isRunning = !state.isRunning;
        
        // render changed state
        render()

        if (state.isRunning){
        // We will initialize the setInterval hardware loop here next
        console.log("Timer started");
        
        // Assign process ID to the interval object
        // this can be passed to clearInterval to stop the execution.
        state.intervalId = setInterval(() => {
            state.remainingTime--;

            render()

            // if the timer runs out
            // disable timer completely and re-render everything.
            if (state.remainingTime <= 0) {
                // Clear interval & update intervalId process
                clearInterval(state.intervalId);
                state.intervalId = null

                // change state and re-render UI
                state.isRunning = false;

                state.completedSessions++;

                render();

                console.log("Cycle complete")
            }
        }, 1000);
        } else 
        {
        console.log("timer Paused")
        // We will execute clearInterval here next
        clearInterval(state.intervalId);
        state.intervalId = null;
        }
    }

    /* 
    function storeSessionsToLocalStorage() 
    {
        localStorage.setItem("myCat", "Tom");
    }
    */

    startStopBtn.addEventListener("click", timer);

    // Helper function for skip and Reset buttons that
    // changes timer
    // revert's back to default breakType duration
    // render's UI 
    function updateStateObjBtn() {
        state.remainingTime = time[state.breakType].duration;
        state.isRunning = false;

        render()
    }

    resetBtn.addEventListener('click', (e) => {
        // Disable active intervalID process if it exists (not null)  
        if (state.intervalId !== null) {
            clearInterval(state.intervalId);
            state.intervalId = null;
        }
        updateStateObjBtn()
    })

    skipBtn.addEventListener('click', (e) => {
        // Disable active intervalID process if it exists (not null)  
        if (state.intervalId !== null) {
            clearInterval(state.intervalId);
            state.intervalId = null;
        }


        // if the current state is work, change it to break. 
        if (state.breakType == 'WORK' && state.completedSessions % 4 == 0)
        {
            state.completedSessions++;
            state.breakType = 'LONGBREAK';
        } else if(state.breakType == 'WORK')
        {
            state.completedSessions++;
            state.breakType = 'SHORTBREAK'
        }
        else {
            state.breakType = 'WORK';
        }

        updateStateObjBtn()
    })






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