let photos = document.querySelectorAll('.picture')
let arrows = document.querySelectorAll('.arrow')

photos[0].style.backgroundImage='url(../img/past/1_3.jpg)'
photos[1].style.backgroundImage='url(../img/past/1_2.jpg)'
photos[2].style.backgroundImage='url(../img/past/1_1.jpg)'


arrows.forEach((arr, index)=>{
    arr.addEventListener('click', function(){
        photos.forEach((photo)=>{
            photo.style.backgroundImage=ChangePhoto(photo.style.backgroundImage, index)
            switch(photo.style.backgroundImage.substring(17,18)){
                case '1': document.getElementById('title').innerText = '«Сумеречный вечер»'
                break
                case '2': document.getElementById('title').innerText = '«Песнь пророка»'
                    break
                case '3': document.getElementById('title').innerText = '«Кошмарные обнимашки»'
                    break
                case '4': document.getElementById('title').innerText = '«Путешествие по секондбукам»'
                    break
            }
        })
    })
})

function ChangePhoto(path, i){
    switch(i){
        case 0:
            if(path.substring(19,20) == 1){
                if(path.substring(17,18) == 1){
                    return 'url(../img/past/4_3.jpg)'
                }
                else{
                    return `url(../img/past/${path.substring(17,18) - 1}_3.jpg`
                }
            }
            else{
                return `url(../img/past/${path.substring(17,18)}_${path.substring(19,20) - 1}.jpg`
            }
        case 1:
            if(path.substring(19,20) == 3){
                if(path.substring(17,18) == 4){
                    return 'url(../img/past/1_1.jpg)'
                }
                else{
                    return `url(../img/past/${parseInt(path.substring(17,18)) + 1}_1.jpg`
                }
            }
            else{
                return `url(../img/past/${path.substring(17,18)}_${parseInt(path.substring(19,20)) + 1}.jpg`
            }
    }
}