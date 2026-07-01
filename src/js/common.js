export function updateNavigationBar(){
    const navLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        console.log(navLinks,link.getAttribute('href'));
        if(link.getAttribute('href') === currentPath)
        {
            link.classList.add('active')
        }else {
            link.classList.remove('active')
        }
    })
}
