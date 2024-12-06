const {readFileSync, writeFileSync} = require('fs')

const getData = (req, res) => {
    const canciones = JSON.parse(readFileSync('repertorio.json', 'utf-8'))
    res.status(200).json(canciones)
}

const addSong = (req, res) => {
    const cancion = req.body;

    const prevSongs = JSON.parse(readFileSync('repertorio.json', 'utf-8'));
    prevSongs.push(cancion)

    writeFileSync('repertorio.json', JSON.stringify(prevSongs, null, 3));

    res.status(201).json({
        message: 'Canción agregada exitosamente',
        cancion: cancion,
  });
}

const deleteSong = (req, res) => {
    const {id} = req.params;
    const prevSongs = JSON.parse(readFileSync('repertorio.json', 'utf-8'));
    
    const filterSongs = prevSongs.filter((cancion) => cancion.id != id);

    writeFileSync('repertorio.json', JSON.stringify(filterSongs, null, 3));

    res.status(200).json({ message: 'Canción eliminada exitosamente' });
}

const editSong = (req, res) => {
    const {id} = req.params;
    const editedSong = req.body;

    const prevSongs = JSON.parse(readFileSync('repertorio.json', 'utf-8'));

    const editedSongs = prevSongs.map((cancion) => cancion.id == id ? {...cancion, ...editedSong} : cancion)

    writeFileSync('repertorio.json', JSON.stringify(editedSongs, null, 3));
    res.status(200).json({ message: "Canción actualizada correctamente" });

}

module.exports = {
    getData,
    addSong,
    deleteSong,
    editSong
}