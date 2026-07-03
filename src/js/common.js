export function updateNavigationBar(){
    const navLinks = document.querySelectorAll('header nav ul li a');    
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
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
