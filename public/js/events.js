
const path =window.location.pathname.split('.')[0]
let curMonth = new Date()
curMonth = curMonth.getMonth()+1
document.querySelector('.month').innerText = getMonthName(curMonth)
let events =[]

function getMonthName(month){
    switch (month){
        case 1:
            return 'Январь';
        case 2:
            return 'Февраль';
        case 3:
            return 'Март';
        case 4:
            return 'Апрель';
        case 5:
            return 'Май';
        case 6:
            return 'Июнь';
        case 7:
            return 'Июль';
        case 8:
            return 'Август';
        case 9:
            return 'Сентябрь';
        case 10:
            return 'Октябрь';
        case 11:
            return 'Ноябрь';
        case 12:
            return 'Декабрь';
    }
}
async function getEvents(){
    let res = await fetch("api"+path, {
        method: 'GET',
    });
    if (res.ok) {
        let json = await res.json()
        /*let dates = []*/
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
            events.push({
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
        events.sort((a, b)=> a.date > b.date ? 1 : -1)
        events.forEach((event)=>{
            if (curMonth===event.month){
                let div = document.createElement('div')
                div.classList.add('date')
                div.id = event.id
                let date = document.createElement('p')
                let day = document.createElement('p')
                date.classList.add('number', 'caveat')
                day.classList.add('day', 'caveat')
                date.innerHTML = event.date
                day.innerHTML = event.day
                div.appendChild(date)
                div.appendChild(day)
                document.querySelector('.dates').appendChild(div)
            }

        })

    } else {
        console.log(res.status);
    }
}


function EventOpen(id){
    let modal = document.querySelector('.modal')
    modal.style.display='flex'
    modal.querySelector('.closeEvent').addEventListener('click', ()=>modal.style.display='none')
    let index = events.findIndex((element) => element.id == id)
    let date = modal.querySelector('#date')
    let day = modal.querySelector('#day')
    let time = modal.querySelector('#time')
    let poster = modal.querySelector('.poster')
    let description = modal.querySelector('.eventDscrptn')
    let place = modal.querySelector('.eventPlace')
    let booking = modal.querySelector('.eventBooking')

    date.textContent = `${events[index].date} ${getMonth(events[index].month)}`
    day.textContent = getDay(events[index].day)
    time.textContent = events[index].time
    poster.style.backgroundImage = events[index].poster
    description.textContent = events[index].description
    place.textContent = events[index].place
    booking.addEventListener('click', ()=>window.open(events[index].link))

}


function getMonth(month){
    switch(month){
        case 1:
            return 'января';
        case 2:
            return 'февраля';
        case 3:
            return 'марта';
        case 4:
            return 'апреля';
        case 5:
            return 'мая';
        case 6:
            return 'июня';
        case 7:
            return 'июля';
        case 8:
            return 'августа';
        case 9:
            return 'сентября';
        case 10:
            return 'октября';
        case 11:
            return 'ноября';
        case 12:
            return 'декабря';
    }
}

function getDay(day){
    switch (day) {
        case 'Пн':
            return 'Понедельник';
        case 'Вт':
            return 'Вторник';
        case 'Ср':
            return 'Среда';
        case 'Чт':
            return 'Четверг';
        case 'Пт':
            return 'Пятница';
        case 'Сб':
            return 'Суббота';
        case 'Вс':
            return 'Воскресенье';
    }
}

getEvents().then(()=>{
    let dates = document.querySelectorAll('.date')
    dates.forEach((date)=>{
        date.addEventListener('click', function (){
            let dateId = this.id
            EventOpen(dateId)
        })
    })
})


