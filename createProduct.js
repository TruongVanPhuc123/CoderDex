const fs = require("fs");
const csv = require("csvtojson");

const createProductPokemon = async () => {
    let newData = await csv().fromFile("pokemon.csv")

    // Set là 1 kiểu dữ liệu mà trong đó các element của Set là độc nhất
    // đầu vào của Set là 1 array
    newData = new Set(newData.map(element => element))
    newData = Array.from(newData)
    newData = newData.map((element, index) => {
        let url = `http://localhost:3000/images/${index + 1}.png`
        return { element: element, url: url, id: index + 1 }
    })


    let data = JSON.parse(fs.readFileSync("db.json"))
    data.products = newData
    fs.writeFileSync("db.json", JSON.stringify(data))
    console.log("done")
}

createProductPokemon()