const router = require('express').Router()
let Exercise = require('../models/exerise.model')

router.route('/').get((req, res) => {
    Exercise
        .find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Error ${err}`))
})

router.route('/add').post((req, res) => {
    const {username, description, duration, date} = req.body

    const newExercise = Exercise({
        username,
        description,
        duration: Number(duration),
        date: Date.parse(date)
    })

    console.log({newExercise})
    newExercise.save()
        .then(data => res.json("Was succes"))
        .catch(err => res.status(400).json(`Error ${err}`))
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => err.status(400).json(`Error ${err}`))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Was deleted'))
        .catch(err => err.status(400).json(`Error ${err}`))
})

router.route('/:id').put((req, res) => {
    const {username, description, duration, date} = req.body
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = username;
            exercise.description = description;
            exercise.duration = +duration;
            exercise.date = Date.parse(date);

            exercise.save()
                .then(()=>res.json("WAS SAVED"))
                .catch(err => err.status(400).json(`Errors ${err}`))
        })
        .catch(err => err.status(400).json(`Error ${err}`))
})

module.exports = router
