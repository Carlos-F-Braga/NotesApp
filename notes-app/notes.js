const chalk = require('chalk')
const fs = require('fs')
const { indexOf } = require('lodash')

const getNotes = () => {
    "Your Notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)


    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Nova Nota Adicionada!')
    }
    else {
        console.log(duplicateNote)
        console.log('Título da Nota já Existente!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title )
    if (notesToKeep.length === notes.length ) {
        console.log(chalk.red.inverse('Nota não Existente'))
    }
    else {
        console.log(chalk.green.inverse('Nota Removida com Sucesso!'))
        console.log(notesToKeep)
        saveNotes(notesToKeep)
    }

}

const listNote = () => {
    const notes = loadNotes()

    notes.forEach((note) => {
        console.log(chalk.green('Título da Nota: ') + chalk.yellow(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.green('O Título da sua Nota é o Seguinte: ') + chalk.yellow(note.title))
        console.log ('A Descrição da sua Nota é a Seguinte: ' + chalk.yellow(note.body))
    }
    else {
        console.log(chalk.red('Nota não Existente!'))
    }

}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}
