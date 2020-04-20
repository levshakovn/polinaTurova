window.addEventListener('DOMContentLoaded', (event)=> {
    console.log('hslkdgklsg');
    const download = document.querySelector('.pdf'),
            mobileMenu = document.querySelector('.menu'),
            lines = document.querySelector('.lines'),
            navBar = document.querySelector('nav');
    
    navBar.addEventListener('click', (event)=> {
        if (event.target && event.target == lines) {
            console.log(event.target);
            mobileMenu.classList.toggle('mobile');
            lines.classList.toggle('line_active');
        } else {
            mobileMenu.classList.toggle('mobile');
            lines.classList.toggle('line_active');
        }
    });
    // lines.addEventListener('click', function () {
    //     mobileMenu.classList.toggle('mobile');
    //     lines.classList.toggle('line_active');
    // })

    download.addEventListener('click', () => {
        location.href = 'CV.pdf';
    });
});
