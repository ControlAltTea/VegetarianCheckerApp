

function getFetch(userInput) {
    const choice = userInput;
    fetch(`https://world.openfoodfacts.org/api/v0/product/${choice}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}
