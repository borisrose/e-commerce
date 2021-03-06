

let totalQuantity = 0;
let totalPrice = 0;




async function fetchProduct(id, img, title, price){

    
    let response = await fetch('http://localhost:3000/api/products/'+ id);
    let productJSON = await response.json();
    
    let product = JSON.parse(JSON.stringify(productJSON));
    img.setAttribute("src",product['imageUrl']);
    img.setAttribute("alt",product['altTxt']);
    title.textContent = product['name'];
    price.textContent = (product['price']+",00 €");

  
     let productInt = product['price'];
     
     return Promise.resolve(productInt);
   
   
}





// function will create the whole display : every item from the localStorage will be display on the cart page, in a certain way

async function getCart() {



    let cartItemsSection = document.getElementById("cart__items");

    let localStorageCart = localStorage.getItem('cart');
    let localStorageCartJS = JSON.parse(localStorageCart);
    console.log(localStorageCartJS);
    
    if(localStorageCartJS === null){
        return;
    }

    for(let i = 0; i <localStorageCartJS.length; i++){
    
        
        
        let cartItemsArticle = document.createElement('article');
        cartItemsArticle.classList.add("cart__item");
        cartItemsArticle.setAttribute("data-id",localStorageCartJS[i].id);
        cartItemsArticle.setAttribute("data-color", localStorageCartJS[i].color);
        cartItemsSection.appendChild(cartItemsArticle);
    
        let cartItemImgDiv = document.createElement('div');
        cartItemImgDiv.classList.add("cart__item__img");
        cartItemsArticle.appendChild(cartItemImgDiv);
        let itemImg = document.createElement("img");
        cartItemImgDiv.appendChild(itemImg);
        let productId = localStorageCartJS[i].id;
     
        
    
        let cartItemContentDiv = document.createElement('div');
        cartItemImgDiv.classList.add("cart__item__content");
        cartItemsArticle.appendChild(cartItemContentDiv);
        let cartItemContentDescriptionDiv = document.createElement('div');
        cartItemContentDescriptionDiv.classList.add('cart__item__content__description');
        cartItemContentDiv.appendChild(cartItemContentDescriptionDiv);
        let descriptionTitleHeader = document.createElement('h2');
        cartItemContentDescriptionDiv.appendChild(descriptionTitleHeader);
        let descriptionColorParagraph = document.createElement('p');
        descriptionColorParagraph.textContent = localStorageCartJS[i].color;
        cartItemContentDescriptionDiv.appendChild(descriptionColorParagraph);
        let descriptionPriceParagraph = document.createElement('p');
        cartItemContentDescriptionDiv.appendChild(descriptionPriceParagraph);
      
    
        let cartItemContentSettingsDiv = document.createElement('div');
        cartItemContentSettingsDiv.classList.add('cart__item__content__settings');
        cartItemContentDiv.appendChild(cartItemContentSettingsDiv);
        let cartItemContentSettingsQuantity = document.createElement('div');
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        cartItemContentSettingsDiv.appendChild(cartItemContentSettingsQuantity);
        let quantityParagraph = document.createElement('p');
        quantityParagraph.textContent = "Qté : ";
        cartItemContentSettingsQuantity.appendChild(quantityParagraph);
        let quantityInput = document.createElement('input');
        quantityInput.setAttribute("type","number");
        quantityInput.classList.add("itemQuantity");
        quantityInput.setAttribute("name","itemQuantity");
        quantityInput.setAttribute("min",0);
        quantityInput.setAttribute("max",100);
        quantityInput.setAttribute("value", localStorageCartJS[i].quantity);


        cartItemContentSettingsQuantity.appendChild(quantityInput);
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        cartItemContentSettingsDiv.appendChild(cartItemContentSettingsDelete);
        let deleteItemParagraph = document.createElement("p");
        deleteItemParagraph.classList.add("deleteItem");
        deleteItemParagraph.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItemParagraph);

        let id = localStorageCartJS[i].id;
        let color = localStorageCartJS[i].color;
      

        // that part is to delete an Item from the cart 
            deleteItemParagraph.onclick = function () {

                let localStorageCartJSON = localStorage.getItem("cart");
                let localStorageCartJS = JSON.parse(localStorageCartJSON);
                let canap = localStorageCartJS.find((c)=> {return c.id === id && c.color === color});

                // the ex-quantity is stocked into a variable called exQuantity for changing the total amount down below
                let exQuantity = canap.quantity;
               
                //the LSCJS Array's element is removed from it 
                localStorageCartJS.splice(localStorageCartJS.indexOf(canap),1);   
                // the new LSCJS Array is turned into a JSON type
                cartJSON = JSON.stringify(localStorageCartJS);
                // the new JSON type is the new "cart" representing the localStorage
                localStorage.setItem("cart",cartJSON);
                article = deleteItemParagraph.closest('article');
                section = deleteItemParagraph.closest('section');
                section.removeChild(article);  
                   
                  
                // that function is related to the previous one and will change the total Amount after the deletion of the item
                async function getNewTotalAfterDeletion(){
                    let response = await fetch('http://localhost:3000/api/products/'+ id);
                    let productJSON = await response.json();
                    let product = JSON.parse(JSON.stringify(productJSON));
                    let priceInt = product['price'];
                    let exQuantityInt = new Number(exQuantity);
                    //delete ex quantity
                    totalPrice -= (priceInt * exQuantityInt);
                    totalQuantity -= exQuantityInt;                     
                    //display on screen
                    let spanTotalQuantity = document.getElementById("totalQuantity");
                    spanTotalQuantity.textContent = new String(totalQuantity);
                    let spanTotalPrice = document.getElementById("totalPrice");
                    spanTotalPrice.textContent = new String(totalPrice);  
                }
                getNewTotalAfterDeletion(); 
                 // the section and the article corresponding to the element's display are removed
              
            }
     
    
    
        //when quantity is modified on the cart.html page 
      
            //if the quantity changes 
            quantityInput.onchange = (e) => {
                          
                changedProductId = localStorageCartJS[i].id;
                    
                // you stock in a variable the old quantity
                let exQuantity = localStorageCartJS[i].quantity;
                // you stock in a variable the new quantity
                let newProductQuantity = e.target.value;
                // you transform the string version into a number version
                let newProductQuantityInt = new Number(newProductQuantity);
                // you stock as the new element's value the string version of the new quantity
                localStorageCartJS[i].quantity = newProductQuantity;

                // if the number version of the new  value is higher than 100 or lesser than 0 , end the program
                if(newProductQuantityInt > 100 || newProductQuantityInt < 0){
                    return;
                }
                console.log(newProductQuantityInt);
                // if the number version is identitical to 0 
                console.log(newProductQuantityInt == 0);
                if(newProductQuantityInt == 0){
                            
                    localStorageCartJS.splice(localStorageCartJS.indexOf(localStorageCartJS[i]),1);
                    console.log(localStorageCartJS);
                  
                    article = deleteItemParagraph.closest('article');
                    section = deleteItemParagraph.closest('section');
                    section.removeChild(article);
                    
                            
                }
                cartJSON = JSON.stringify(localStorageCartJS);
                localStorage.setItem("cart",cartJSON);             
           
                       
                //when a change occurs, that function will calculate the new Total Amount     
                async function getNewTotalAfterChange(){

                    let response = await fetch('http://localhost:3000/api/products/'+ changedProductId);
                    let productJSON = await response.json();
                    let product = JSON.parse(JSON.stringify(productJSON));
                    let priceInt = product['price'];
                    let exQuantityInt = new Number(exQuantity);
                    //delete ex quantity
                    totalPrice -= (priceInt * exQuantityInt);
                    totalQuantity -= exQuantityInt;
                    //new quantity add
                        
                    totalPrice += (priceInt * newProductQuantityInt);
                    totalQuantity += newProductQuantityInt;
                    //console.log(typeof priceInt);
                            
                    //display on screen
                    let spanTotalQuantity = document.getElementById("totalQuantity");
                    spanTotalQuantity.textContent = new String(totalQuantity);
                    let spanTotalPrice = document.getElementById("totalPrice");
                    spanTotalPrice.textContent = new String(totalPrice);

                }
                getNewTotalAfterChange();
                
            };
            
        
     
        //end


        let priceInt = await fetchProduct(productId, itemImg, descriptionTitleHeader, descriptionPriceParagraph);
        if(localStorageCartJS == undefined){
            totalPrice = 0;
            totalQuantity = 0;
        }else{
            let quantityInt = new Number(localStorageCartJS[i].quantity);
            totalPrice += (priceInt * quantityInt);
            totalQuantity += quantityInt;

        }
       
     
    
    }
    
    
    let spanTotalQuantity = document.getElementById("totalQuantity");
    spanTotalQuantity.textContent = new String(totalQuantity);
    let spanTotalPrice = document.getElementById("totalPrice");
    spanTotalPrice.textContent = new String(totalPrice);
    
}
getCart();




//////////////////////////////ABOUT THE FORM ///////////////////////////////////////////////////////////////////////////

let contactObject = {

    firstName : "",
    lastName : "",
    address : "",
    city : "",
    email : "",

}

// that function is all about checking the data the user puts into the form
function checkFormData() {

    let errorArray = [

        'firstNameErrorMsg',
        'lastNameErrorMsg',
        'addressErrorMsg',
        'cityErrorMsg',
        'emailErrorMsg',
        
    ]

    let inputArray = [

        'firstName',
        'lastName',
        'address',
        'city',
        'email',
    ]


    
    // that function checks if the name (first and last one) is written in a good way.
    function checkName(index,array){

        
        let name = document.getElementById(array[index]);
    

        name.addEventListener('change', (e)=> {
    
            if(/^([a-z\s-]){1,20}$/gi.test(e.target.value)){
                
                if(index == 0){
                    contactObject.firstName = e.target.value;
                    let errorParagraph = document.getElementById(errorArray[index]);
                    errorParagraph.textContent = null;
                }
                else {
                    contactObject.lastName = e.target.value;
                    let errorParagraph = document.getElementById(errorArray[index]);
                    errorParagraph.textContent = null;
                }
            }
            else {
                let errorParagraph = document.getElementById(errorArray[index]);
                if(index == 0){
                    errorParagraph.textContent = "Prénom incompréhensible";
                }
                else {
                    errorParagraph.textContent = "Nom incompréhensible";
                }
            }
        });
    

    }
    
    function checkAddress(index, array) {

        let address = document.getElementById(array[index]);

        address.addEventListener('change', (e)=> {
            let errorParagraph = document.getElementById(errorArray[index]);
            if(/^([0-9]{1,4})([\s]{1})([a-zA-Z]{1,10})([\s]{1})+([a-zA-Z-\s]{1,30})$/g.test(e.target.value)){

                contactObject.address = e.target.value;
                
                errorParagraph.textContent = null;
            }
            else {
                errorParagraph.textContent = "Adresse incompréhensible";
            }
        });
    } 

    function checkCity(index, array) {

        let city = document.getElementById(array[index]);

        city.addEventListener('change', (e)=> {

            let errorParagraph = document.getElementById(errorArray[index]);
            if(/^([a-z-\s]{1,45})$/gi.test(e.target.value)){

                contactObject.city = e.target.value;
                
                errorParagraph.textContent = null;
            }
            else {
                errorParagraph.textContent = "Ville incompréhensible";
            }

        });

    }

    function checkEmail(index, array) {

        let email = document.getElementById(array[index]);
        email.addEventListener('change', (e)=> {

            let errorParagraph = document.getElementById(errorArray[index]);
            if(/^([a-z0_9\.-]+)@([a-z]{1,10}\.[a-z]{1,3})$/gi.test(e.target.value)){

                contactObject.email = e.target.value;
                
                errorParagraph.textContent = null;
            }
            else {
                errorParagraph.textContent = "Email incompréhensible";
            }

        });
    }


    for(let i = 0; i <2; i++){
        checkName(i, inputArray);
    }
    
    checkAddress(2, inputArray);
    checkCity(3, inputArray);
    checkEmail(4,inputArray);

 
}
checkFormData();



//////////////////////////////////////////////////////ABOUT THE CART PRODUCT ARRAY//////////////////////////////////////
// that function create the cartProduct Array to use in the request to the api 
function makeCartProductsArray(){

    let cartProductsArray = [];

    let localStorageCart = localStorage.getItem('cart');
    let localStorageCartJS = JSON.parse(localStorageCart);

    if(localStorageCartJS === null ){
        return;
    }
    for(let i = 0; i < localStorageCartJS.length; i++){

        cartProductsArray.push(localStorageCartJS[i].id);
       
    }
  
    
    return cartProductsArray;

}




//////////////////////////////////////////////////////ABOUT  THE ORDER CONFIRMATION//////////////////////////////////////
let order = document.querySelector('#order'); 

order.onclick = (e) => {      
    let cartProductsArray = makeCartProductsArray();
    if( cartProductsArray.length === 0){
        
        return;
    } 
    e.preventDefault();
    
    let orderId;
    fetch("http://localhost:3000/api/products/order",{

        method:"POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({contact: contactObject, products: cartProductsArray})
    })
    .then((res) => {
         
        if(res.ok) {
                
            return res.json();
        }          
    })
    .then((value) => {
        orderId = value['orderId'];
        window.location = './confirmation.html?orderId='+orderId;
            
    })
    .catch((err) => {throw err});

}







