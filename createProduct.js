const fs = require("fs");
const csv = require("csvtojson");
const { faker } = require("@faker-js/faker")

const createProductPokemon = async () => {
    let newData = await csv().fromFile("pokemon.csv")

    // Set là 1 kiểu dữ liệu mà trong đó các element của Set là độc nhất
    // đầu vào của Set là 1 array
    newData = new Set(newData.map(element => element))
    newData = Array.from(newData)
    // types = newData.map(element => [element.Type1 && element.Type2 !== ''])
    newData = newData.map((element, index) => {
        let url = `https://coderdex-m2sw.onrender.com/images/${index + 1}.png`
        let types = [element.Type1.toLowerCase(), element.Type2.toLowerCase()]
        let newTypes = types.filter(element => element)

        let height = faker.number.float({ multipleOf: 0.2, min: 0, max: 10 })
        let weight = faker.number.float({ multipleOf: 0.2, min: 0, max: 10 })
        // console.log(weight.slice(0, 3))

        return { name: element.Name, height: height + " '", weight: weight + " .lbs", types: newTypes, id: index + 1, url: url }
    })

    const totalPokemons = newData.pop()

    let dataInDBJSON = JSON.parse(fs.readFileSync("db.json"))
    dataInDBJSON.data = newData
    dataInDBJSON.totalPokemons = totalPokemons.id
    fs.writeFileSync("db.json", JSON.stringify(dataInDBJSON))
    console.log(dataInDBJSON, "done")
}

createProductPokemon()