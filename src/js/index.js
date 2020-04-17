window.addEventListener('DOMContentLoaded', (event)=> {
    console.log('2414');
    const download = document.querySelector('.pdf');
    
    download.addEventListener('click', () => {
        location.href = 'CV.docx';
    });
});
