export function updateNavigationBar(){
    const navLinks = document.querySelectorAll('header nav ul li a');
    let currentPath = window.location.pathname;
    
    // Let Default path be index.html and not /
    if (currentPath === '/') {
        currentPath = '/index.html';
    }

    navLinks.forEach(link => {
        console.log(navLinks,link.getAttribute('href'));
        if(currentPath.includes(link.getAttribute('href')))
        {
            link.classList.add('active')
        }else {
            link.classList.remove('active')
        }
    })
}
