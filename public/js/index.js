function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateScrollingElements() {
    const elements = document.querySelector('.animation').querySelectorAll('.spchbubble:nth-child(odd)')
    if (isElementInViewport(document.querySelector('.speech'))) {
        document.querySelector('.animation').style.display = 'block'
        elements.forEach((element) => {
            element.classList.add('anim1')
        })
    }
}
setTimeout(()=>{
    document.addEventListener('DOMContentLoaded', animateScrollingElements)
    window.addEventListener('scroll', ()=>{
        animateScrollingElements()
        console.log('l;l;l')
    })
}, 500)

