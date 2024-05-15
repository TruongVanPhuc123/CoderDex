const fs = require("fs");
const csv = require("csvtojson");

const createProductPokemon = async () => {
    let newData = await csv().fromFile("pokemon.csv")

    // Set là 1 kiểu dữ liệu mà trong đó các element của Set là độc nhất
    // đầu vào của Set là 1 array
    newData = new Set(newData.map(element => element))
    newData = Array.from(newData)
    // types = newData.map(element => [element.Type1 && element.Type2 !== ''])
    newData = newData.map((element, index) => {
        let url = `http://localhost:5000/images/${index + 1}.png`
        return { name: element.Name, types: [element.Type1, element.Type2], id: index + 1, url: url }
    })

    const totalPokemons = newData.pop()

    let dataInDBJSON = JSON.parse(fs.readFileSync("db.json"))
    dataInDBJSON.data = newData
    dataInDBJSON.totalPokemons = totalPokemons.id
    fs.writeFileSync("db.json", JSON.stringify(dataInDBJSON))
    console.log(dataInDBJSON, "done")
}

createProductPokemon()