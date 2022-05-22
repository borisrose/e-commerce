const pageURL= document.URL;



async function fetchProduct(){

    let url = new URL(pageURL);
    let search_params = new URLSearchParams(url.search);
    let productId;
    
    if (search_params.has("id")){
        
        productId = url.searchParams.get("id");
      
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

    //dans le select id="colors" ajouter des options 
    let colorsSelect = document.getElementById("colors");
  

    for(let i = 0; i< product['colors'].length; i++){

        let newOption = document.createElement('option');
        newOption.setAttribute("value",product['colors'][i]);
        let optionText = document.createTextNode(product['colors'][i]);
        newOption.append(optionText);
        colorsSelect.appendChild(newOption);

    }
  
    

    
    let productColor;
    colorsSelect.onchange = (e) => {

        productColor = e.target.value;
        
        

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
           
        }
        else if(localStorage.length > 0){
            let cartJSON = localStorage.getItem("cart");
            let cartJS = JSON.parse(cartJSON);
            console.log(cartJS, "si panier non vide");
            let isSameExactProductInCart = false;
            let isSameProductWithDifferentColorInCart = false;
            let SameProductWithDifferentColorInCartArray = [];
            let indexSameProductWithDifferentColorInCartArray = [];

            // si i n'est pas supérieure au nombre d'items dans le panier
            let i = 0;
            while(i< cartJS.length){
                console.log(localStorage.length);
                
                //si l'item du panier a le même id et la même couleur que le potentiel item : on change la quantité de l'item du panier
                if(cartJS[i].id == productId && cartJS[i].color == productColor ){

                    
                    cartJS[i].quantity = productQuantity;
                    let cartJSON = JSON.stringify(cartJS);
                    localStorage.setItem("cart",cartJSON);
                   
                    isSameExactProductInCart = true;
                    break;
                    
                }
                else if(cartJS[i].id == productId && cartJS[i].color !== productColor){
                        // si le produit existe mais d'une couleur différente on le signale 
                   
                        isSameProductWithDifferentColorInCart = true
                        
                        //on créé deux tableaux : un qui garde le produit égal mais de couleur différente 
                        SameProductWithDifferentColorInCartArray.push(cartJS[i]);
                        //un qui garde son index. 
                        indexSameProductWithDifferentColorInCartArray.push(i);
                         
                        
                        i++;
                      // on avance car on attend de voir si le produit identique n'est pas dans le reste du panier
                }
                else{
                    i++;
                    // si le produit n'est pas identique on avance pour voir s'il n'est pas dans le reste du panier 
                }

            }
            
            if(i== cartJS.length && isSameExactProductInCart == false){
                
                if(isSameProductWithDifferentColorInCart ==  true){

                    console.log(SameProductWithDifferentColorInCartArray, "Les produits identitques a coul dif");
                    console.log(indexSameProductWithDifferentColorInCartArray, "Array des index des futurs sup");
                    console.log(cartJS, "AVANT TOUT AJOUT OU SUPP");

                    //on supprime tous les  produits identiques et de couleurs différentes du panier
                    for(let i = 0; i < indexSameProductWithDifferentColorInCartArray.length; i++){
                        cartJS.splice(indexSameProductWithDifferentColorInCartArray[i],1);
                        console.log(cartJS,"pendant les splices");

                    }

                    console.log(cartJS, "Après les splice");
                   
                    //on ajoute à la fin du panier tous les produits identiques et de couleurs différents du panier
                    for(let i = 0;  i< SameProductWithDifferentColorInCartArray.length; i++){
                        cartJS.push(SameProductWithDifferentColorInCartArray[i]);
                       
                    }
                    console.log(cartJS, "Après les push produits id mais couleur différente");
                    //on ajoute le nouveau produit identique mais de couleur différente
                    cartJS.push(cartProductJson);
                    console.log(cartJS, "Après l'ajout du cartProductJson");
                    cartJSON = JSON.stringify(cartJS);
                    localStorage.setItem("cart", cartJSON);

                }else {
                    cartJS.push(cartProductJson);
                    let cartJSON = JSON.stringify(cartJS);
                    localStorage.setItem("cart", cartJSON);
                    
                    
                }
                

            }
              


        }

        

      
    

    };



}

fetchProduct();


