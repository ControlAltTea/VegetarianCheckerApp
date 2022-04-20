console.log("connected to main.js")

function getFetch() {
    let inputVal = document.getElementById('barcode').value;
    // chicken tortilla soup = 011110038364
    // beef and vegetable soup = 041196910759

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
                item.testCall();
                item.showInfo();
                item.listIngredients();
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

    showInfo() {
        // pulling from the HTML, we can grab the element with an ID of "product-img" correlated to the product
        document.getElementById('product-img').src = this.image;
        // pulling from the HTML, we can grab the element with an ID of "product-name" correlated to the product
        document.getElementById('product-name').innerText = this.name;
    }

    listIngredients() {

        // accessing the table element in the HTML
        let tableRef = document.getElementById('ingredient-table');

        // Each time the getFetch() is called, the rows will be cleared out
        // following the header, which is at the index 0 in the rows array
        // prevents the table from retaining information from previous entered products
        for (let i = 1; i < tableRef.rows.length; i++){
            tableRef.deleteRow(i);
        }

        // loops through the properties in the ingredients object
        for (let key in this.ingredients) {
            // adds a row to the table ref
            // we pass -1 to add a row to the end of the array of rows
            let newRow = tableRef.insertRow(-1);
            // one cell for the ingredients
            // we place it at 0 to keep it at the start of the array of cells
            let newICell = newRow.insertCell(0);
            // one cell for the vegetarian category
            // we place it at 1 to make it the second cell in the array of cells
            let newVCell = newRow.insertCell(1);
            // one cell for the vegan category
            // we place it at 2 to make it the third cell in the array of cells
            let newVNCell = newRow.insertCell(2);


            // passing in text into the ICell
            // the ingredients object has a key called "text", which is why we call for 'text'
            let newIText = document.createTextNode(this.ingredients[key].text);


            // *** VEGETARIAN STATUS ***
            // same process, but with the vegetarian property
            // we initialize a vegStatus in case the vegetarian property is "undefined"
            // later, there will be a conditional to check for this
            // We use a ternerary operator to check if the vegetarian status is undefined or null, and if it is, we instead return 'unknown', else we'll continue with the pre-determined response from the object's vegetarian property 
            let vegatarianStatus = this.ingredients[key].vegetarian == null ? 'unknown' : this.ingredients[key].vegetarian;
            let newVText = document.createTextNode(vegatarianStatus);
            

            // *** VEGAN STATUS
            let veganStatus = this.ingredients[key].vegan == null ? 'unknown' : this.ingredients[key].vegan;
            let newVNText = document.createTextNode(veganStatus);


            // attachs text to the cell
            newICell.appendChild(newIText);
            // attachs text to the cell
            newVCell.appendChild(newVText);
            // attachs text to the cell
            newVNCell.appendChild(newVNText);


            // *** CHANGES THE CELL COLOR ***
            if (vegatarianStatus === 'no') {
                // turns item red
                newVCell.classList.add('veg-item-no');
            }
            else if (vegatarianStatus === 'unknown' || vegatarianStatus === 'maybe') {
                // turns item yellow
                newVCell.classList.add('veg-item-maybe');
            }

            if (veganStatus === 'no') {
                newVNCell.classList.add('vegn-item-no');
            }
            else if (veganStatus === 'unknown' || veganStatus === 'maybe') {
                newVNCell.classList.add('vegn-item-maybe');
            }
        }
    }
}
