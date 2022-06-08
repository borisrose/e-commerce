const pageURL= document.URL;


// this function is to fetch all information concerning a specific item thanks to its id which is contained in the URL of the page
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

    //ajouter un TextNode pour le span avec id="price"
    let price = document.getElementById('price');
    let productPrice = document.createTextNode(product.price);
    price.append(productPrice);

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
    //
    let addToCartButton = document.getElementById("addToCart");
    addToCartButton.onclick = () => {

       
     
        
        let cartProductJson = {
            id : productId,
            quantity : productQuantity,
            color : productColor
        } 

        console.log(productColor);

        if(productColor === undefined || new Number(cartProductJson.quantity) <= 0 || new Number(cartProductJson.quantity) > 100) {
            alert('Vous devez sélectionner une couleur et une quantité entre 1 et 100')
            return;
        }
        // on imagine un panier vide 
       let cartJSON = localStorage.getItem("cart");
        if(cartJSON === null){

            cart = [];
            cart.push(cartProductJson);
            cartJSON = JSON.stringify(cart);
            localStorage.setItem("cart",cartJSON);
           
        }
        
        let cartJS = JSON.parse(cartJSON);

        // si i n'est pas supérieure au nombre d'items dans le panier
        let i = 0;
        while(i< cartJS.length){
            
                
            //si l'item du panier a le même id et la même couleur que le potentiel item : on change la quantité de l'item du panier
            if(cartJS[i].id === productId && cartJS[i].color === productColor ){

                    
                cartJS[i].quantity = productQuantity;
                let cartJSON = JSON.stringify(cartJS);
                localStorage.setItem("cart",cartJSON);    
                return;
                    
            }
        i++;
        }
            
        cartJS.push(cartProductJson);
        cartJS.sort((canape1, canape2) => {
           
            return ('' + canape1.id).localeCompare(canape2.id);
        });
        cartJSON = JSON.stringify(cartJS);
        localStorage.setItem("cart", cartJSON);
        question = confirm('Voulez-vous accéder à votre panier ? ')
        if(question){
            window.location = './cart.html'
        }

    };

}
fetchProduct();


