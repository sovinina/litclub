async function getEventsAdmin(){
    let res = await fetch("api/events", {
        method: 'GET',
    });
    if (res.ok) {
        let json = await res.json()
        let dates = []
        console.log(json)
        json.rows.forEach((event)=>{
            let newDate = new Date(event.date)
            let dayOfWeek = ''
            switch(newDate.getDay()){
                case 0:
                    dayOfWeek = 'Вс';
                    break;
                case 1:
                    dayOfWeek = 'Пн';
                    break;
                case 2:
                    dayOfWeek = 'Вт';
                    break;
                case 3:
                    dayOfWeek = 'Ср';
                    break;
                case 4:
                    dayOfWeek = 'Чт';
                    break;
                case 5:
                    dayOfWeek = 'Пт';
                    break;
                case 6:
                    dayOfWeek = 'Сб';
                    break;
            }
            dates.push({
                id: event.id,
                name: event.name,
                day: dayOfWeek,
                date: newDate.getDate(),
                month: newDate.getMonth()+1,
                year: newDate.getFullYear(),
                time: event.time.toString().substring(0, event.time.toString().length-3),
                description: event.description,
                place: event.place,
                link: event.link,
                poster: event.poster
            })
        })
        dates.forEach((event)=>{
            let div = document.createElement('div')
            div.classList.add('card')
            div.id = event.id
            let name = document.createElement('p')
            let date = document.createElement('p')
            name.innerHTML = 'Название: ' + event.name
            date.innerHTML = `Дата: ${event.date}.${event.month}.${event.year}  ${event.day}`
            div.appendChild(name)
            div.appendChild(date)
            let time = document.createElement('p')
            time.innerHTML = 'Время: ' + event.time
            div.appendChild(time)
            let place = document.createElement('p')
            place.innerHTML = 'Место: ' + event.place
            div.appendChild(place)
            let poster = document.createElement('div')
            poster.classList.add('poster')
            poster.style.backgroundImage = `${event.poster}`
            div.appendChild(poster)
            let deleteBtn = document.createElement('div')
            deleteBtn.classList.add('btn')
            deleteBtn.innerHTML='<p>Удалить</p>'
            div.appendChild(deleteBtn)
            document.querySelector('.cards').appendChild(div)
        })
    } else {
        console.log(res.status);
    }
}

async function deleteEvent(id){

    let res = await fetch("api/events/"+id, {
        method: 'DELETE',
        headers:{'Authorization':localStorage.getItem('token')}
    })
    if(res.status ===200){
        location.reload()
    }
    else{
        alert(await res.json())
    }
}

getEventsAdmin().then(()=>{
    let btns = document.querySelectorAll('.btn')
    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>deleteEvent(btn.parentElement.id))
    })
})

const form = document.querySelector('form')
form.addEventListener('submit', async function(event){
    event.preventDefault()
    const formData = new FormData(form)
    console.log(formData)
    try{
        const res = await fetch('/api/events',{
            method:'POST',
            body:formData,
            enctype:"multipart/form-data",
            headers:{'Authorization':localStorage.getItem('token')}
        })
        if(res.status ===200){
            location.reload()
        }
        else{
            alert(await res.json())
        }
    }
    catch (e) {
        console.log(e)
    }
})


