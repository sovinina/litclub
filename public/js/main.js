document.querySelector('.menu').addEventListener('click', function(){
    this.classList.add('menu-open')
    this.querySelector('svg').style.height='0px'
    document.querySelector('.close').style.width='40px'
    setTimeout(()=>{
        document.querySelector('.nav-mob').style.display='flex'
        document.querySelector('.nav-mob').style.opacity='100%'
    }, 500)
})

document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.nav-mob').style.opacity='0'
    setTimeout(()=>{
        document.querySelector('.nav-mob').style.display='none'
        document.querySelector('.menu').classList.remove('menu-open')
        document.querySelector('.menu').querySelector('svg').style.height='40px'
        this.style.width='0px'
    }, 200)
})