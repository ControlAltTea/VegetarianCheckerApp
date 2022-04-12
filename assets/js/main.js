console.log("connected to main.js")

function getFetch() {
    let inputVal = document.getElementById('barcode').value;
    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`;

    // Checks that the barcode is a valid length
    if (inputVal.length != 12) {
        alert(`Please ensure that barcode is 12 characters`);
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // "status" has either a value of 1 if the product barcode is valid
            // or a value of 0 if the product barcode is invalid 
            if (data.status === 1) {
                // do this
                const item = new ProductInfo(data.product);
                item.testCall()
            }
            else {
                // If the barcode is invalid, the user will receive an alert to check it or use a different code
                alert(`Product ${inputVal} not found. Please try another.`);
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

class ProductInfo {
    constructor(productData) {
        // when looking in the inputVal object, the product has a property called "product_name"
        // here, we are retrieving that name
        this.name = productData.product_name
        // same with the ingredients
        this.ingredients = productData.ingredients
        // same with the image associated with the product
        // after this line, check under the if(data.status === 1) in the fetch() above
        this.image = productData.image_url
    }

    testCall() {
        console.log(this.ingredients)
    }
}
