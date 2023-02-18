//Connection to openfoodfacts API
const off = require('openfoodfacts-nodejs');
const client = new off();

/*
* Finds information about a product from openfoodfacts.org.
* @param barcode The barcode of scanned product / product to find
*/
function getOpenFoodFacts(barcode) {
    return new Promise(product_info => {
        //Wait until request is completed before proceeding
        client.getProduct(barcode).then((productInformation) => {
            
            //Check that product is found
            if(productInformation['status'] == 0) {
                console.log('Product not found');
                product_info('');
            } else {
                information = {
                    name: productInformation['product']['product_name'],
                    quantity: productInformation['product']['quantity'],
                    categories: productInformation['product']['categories'],
                    labels: productInformation['product']['labels'],
                    ingredients: productInformation['product']['ingredients_text'],
                    processing: productInformation['product']['nova_groups_tags'],
                    nutritionGrade: productInformation['product']['nutriscore_grade'],
                    nutriments: productInformation['product']['nutriments'],
                    ecoscoreGrade: productInformation['product']['ecoscore_grade'],
                    packaging: productInformation['product']['packaging'],
                    origins: productInformation['product']['countries']
                };
                product_info(information);
            };
            
        });
    })
};

//Log result to console. Testing function.
function print_info(res) {
    console.log(res);
}

//Wait that API request is completed
async function getItemInfo(barcode) {
    const result = await getOpenFoodFacts(barcode);
    print_info(result);
}

getItemInfo('6407840041172')    //Product exists
getItemInfo('64078400411723')   //Product doesn't exist