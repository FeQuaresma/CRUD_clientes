function mask (cep) {
    let newCep = cep.slice(0, 5) + "-" + cep.slice(5)
    console.log(newCep)
}

const cep = "02758010"

mask(cep)
