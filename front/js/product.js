const pageURL= document.URL;



async function fetchProduct(){

    let url = new URL(pageURL);
    let search_params = new URLSearchParams(url.search);
    let productId;
    
    if (search_params.has("id")){
        
        productId = url.searchParams.get("id");
        console.log(productId);
    }


    let response = await fetch('http://localhost:3000/api/products/'+ productId);
    let productJSON = await response.json();
    
    let product = JSON.parse(JSON.stringify(productJSON)); 

    //créer une img dans la div avec la classe item_img
    let itemImgClassArray = document.getElementsByClassName("item__img");
    let itemImgDiv = itemImgClassArray[0];
    let newImg = document.createElement('img');
    newImg.setAttribute("src", product['imageUrl']);
    newImg.setAttribute("alt", product['altTxt']);
    itemImgDiv.appendChild(newImg);


    //ajouter un TextNode pour le h1 avec id="title"
    let title = document.getElementById("title");
    let productTitle = document.createTextNode(product['name']);
    title.appendChild(productTitle);

    //ajouter un TextNode pour le p avec id="description"
    let descriptionParagraph = document.getElementById("description");
    let productDescription = document.createTextNode(product['description']);
    descriptionParagraph.appendChild(productDescription);

    //dans le select id="colors" ajouter des options avec des value verte et blanche et un TextNode 
    let colorsSelect = document.getElementById("colors");
    let newOptionOne = document.createElement('option');
    newOptionOne.setAttribute("value","vert");
    let optionOneText = document.createTextNode("vert");
    newOptionOne.append(optionOneText);
    let newOptionTwo = document.createElement('option');
    newOptionTwo.setAttribute("value","blanc");
    let optionTwoText = document.createTextNode("blanc");
    newOptionTwo.append(optionTwoText);
    colorsSelect.appendChild(newOptionOne);
    colorsSelect.appendChild(newOptionTwo);
    
    let productColor;
    colorsSelect.onchange = (e) => {

        productColor = e.target.value;
        console.log(productColor);    
        

    };
    

    //input id="quantity"
    let inputQuantity = document.getElementById("quantity");
    let productQuantity = 0;
    inputQuantity.onchange = (e) => {
        
        productQuantity = e.target.value;
        

    } 

    //button id="addToCart"
    let addToCartButton = document.getElementById("addToCart");
    addToCartButton.onclick = () => {

        let cartProductJson = {
            id : productId,
            quantity : productQuantity,
            color : productColor
        } 

        // on imagine un panier vide 
        if(localStorage.length == 0){
            cart = []
            cart.push(cartProductJson);
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart",cartJSON);
            console.log(localStorage.getItem("cart"));
            console.log("Dans le bloc 0");
        }

        //on imagine un panier non vide
        if(localStorage.length > 0){
            let cartJSON = localStorage.getItem("cart");
            let cartJS = JSON.parse(cartJSON);
            console.log(cartJS);
            let isSameExactProductInCart = false;
            let isSameProductWithDifferentColorInCart = false;
            
            // si i n'est pas supérieure au nombre d'items dans le panier
            let i = 0;
            while(i< cartJS.length){
                console.log(localStorage.length);
                
                //si l'item du panier a le même id et la même couleur que le potentiel item : on change la quantité de l'item du panier
                if(cartJS[i].id == productId && cartJS[i].color == productColor ){

                    console.log("Dans le bloc 1");
                    cartJS[i].quantity = productQuantity;
                    let cartJSON = JSON.stringify(cartJS);
                    localStorage.setItem("cart",cartJSON);
                    console.log(localStorage.getItem("cart"));
                    isSameExactProductInCart = true;
                    break;
                    
                }
                else if(cartJS[i].id == productId && cartJS[i].color !== productColor){
                        // si le produit existe mais d'une couleur différente on le signale 
                        console.log(`${i} + ${cartJS[i].id} + ${productId} + ${cartJS[i].color} + ${productColor}`);
                        isSameProductWithDifferentColorInCart = true;
                        console.log("Dans le bloc 2");
                        i++;
                      // on avance car on attend de voir si le produit identique n'est pas dans le reste du panier
                }
                else{
                    i++;
                    // si le produit n'est pas identique on avance pour voir s'il n'est pas dans le reste du panier 
                }

            }
            if(i== cartJS.length && isSameExactProductInCart == false ){
                   
                // si on est à la fin de la boucle et qu'on sait qu'un produit identique n'existe pas dans le panier
                console.log(cartJS);
                cartJS.push(cartProductJson);
                console.log(cartJS);
                let cartJSON = JSON.stringify(cartJS);
                localStorage.setItem("cart", cartJSON);
                console.log(localStorage.getItem("cart"));
                console.log("Dans le bloc 3");
            }


        }

        

      
    

    };



}

fetchProduct();


