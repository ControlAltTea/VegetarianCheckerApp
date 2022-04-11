console.log("connected to main.js")

function getFetch() {
    let inputVal = document.getElementById('barcode').value;
    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // "status" has either a value of 1 if the product barcode is valid
            // or a value of 0 if the product barcode is invalid
            if (data.status === 1) {
                // do this
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}
