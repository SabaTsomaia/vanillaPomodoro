export function updateNavigationBar(){
    const navLinks = document.querySelectorAll('header nav ul li a');    
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        console.log(navLinks,link.getAttribute('href'));
        

        const linkFile = link.pathname.split('/').pop() || 'index.html';
        if(currentPath === linkFile)
        {
            link.classList.add('active')
        }else {
            link.classList.remove('active')
        }
    })
}
