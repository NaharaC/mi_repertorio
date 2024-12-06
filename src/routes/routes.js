const {Router} = require('express')
const path = require('path')
const {getData, addSong, deleteSong, editSong} = require('../controllers/songs.controllers')

const router = Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'))
})

router.get('/canciones', getData)

router.post('/canciones',addSong);

router.delete('/canciones/:id', deleteSong);

router.patch('/canciones/:id', editSong);

module.exports = router