import models from "../models/models.js"
const {Events} = models

class EventsController{
    async create(req, res){
        try {
            const {name, date, time, place, link, description} = req.body
            const curDate = await Events.findOne({where:{date}})
            if(!name){
                return res.status(401).json('Введите название')
            }
            if(curDate){
                return res.status(409).json('Мероприятие с такой датой уже существует')
            }
            let poster = req.file
            if(!poster)
                return res.send("Ошибка при загрузке файла");
            else{
                let path = `url('../data/poster/${poster.filename}')`
                await Events.create({name, date, poster:path, time, place, link, description})
                res.json('Мероприятие добавлено')
            }
        }
        catch (e){
            res.json(e)
        }
    }

    async get(req, res){
        try{
            const {name} = req.query
            if(!name){
                const events = await Events.findAndCountAll()
                return res.json(events)
            }
            const events = await Events.findAndCountAll({where:{name}})
            if(events.count>0){
                return res.json(events)
            }
            return res.json('Мероприятия не найдены')
        }
        catch(e){
            res.json(e)
        }
    }

    async delete(req, res){
        const {id} = req.params
        const events = await Events.findOne({where:{id}})
        if(!events){
            return res.json('Мероприятие не найдено')
        }
        events.destroy()
        res.json('Мероприятие стёрто >:)')
    }
    async update(req, res){
        try{
            const {id} = req.params
            const {name, date} = req.body
            const events = await Events.findByPk(id)
            if(!events){
                return res.json("такого меро нет, уходите")
            }
            await events.update({name, date})
            res.json('ура обновление подъехало')
        }
        catch (e){
            res.json(e)
        }
    }
}

export default new EventsController()