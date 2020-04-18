window.addEventListener('DOMContentLoaded', (event)=> {
    console.log('hslkdgklsg');
    const download = document.querySelector('.pdf'),
            mobileMenu = document.querySelector('.menu'),
            lines = document.querySelector('.lines');
    
    lines.addEventListener('click', function () {
        mobileMenu.classList.toggle('mobile');
        lines.classList.toggle('line_active');
    })

    download.addEventListener('click', () => {
        location.href = 'CV.pdf';
    });
});
