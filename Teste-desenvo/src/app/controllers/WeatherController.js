import Weather from '../models/Weather'
import Pokemons from '../models/Pokemons'

import AppError from '../errors/AppError'

class WeatherController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required('Name required field!'),
          })

        try {
        await schema.validate(req.body, { abortEarly: false })
        } catch (err) {
        throw new AppError(err)
        }

        const resultWeather = await Weather.create(req.body)

        const weather = [
            { name: 'Cloudy' },
            { name: 'Fog' },
            { name: 'Partly cloudy' },
            { name: 'Rainy' },
            { name: 'Snow' },
            { name: 'Sunny/clear' },
            { name: 'Windy' },
        ]

        const resultWeather = await Weather.bulkCreate(weather, {
            returning: true,
        })

        return res.status(201).json({
            resultWeather,
        })
    }

    async show(req, res) {
        const { id } = req.params

        const weather = await Weather.findByPk(id, {
            order: ['name'],
            attributes: ['id', 'name'],
            include: [
                {
                    model: Pokemons,
                    as: 'weather1',
                    attributes: [
                        'name',
                        'generation',
                        'legendary',
                        'stat_total',
                        'atk',
                        'def',
                        'sta',
                        'cp39',
                        'cp40',
                    ],
                },
            ],
        })

        if (!weather) {
            throw new AppError('Weather not found')
        }

        return res.json(weather)
    }

    async index(req, res) {
        const weather = await Weather.findAll({
            order: ['name'],
            attributes: ['id', 'name'],
        })

        if (weather.length === 0) {
            throw new AppError('There are no weather forms.')
        }

        return res.json({
            weather,
        })
    }

    async update(req, res) {
        const { id } = req.params

        const weather = await Weather.findByPk(id)

        if (!weather) {
            throw new AppError('Weather not found.')
        }

        const newWeather = await weather.update(req.body)

        return res.json(newWeather)
    }
}

export default new WeatherController()
