import { updateNavigationBar } from './common.js';

// DOMContentLoad Event
document.addEventListener('DOMContentLoaded', () => {
    updateNavigationBar();
    console.log('DOM fully loaded and parsed');
});