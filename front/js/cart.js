

let totalQuantity = 0;
let totalPrice = 0;



async function fetchProduct(id, img, title, price, total){

    
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


async function getCart() {



    let cartItemsSection = document.getElementById("cart__items");

    let localStorageCart = localStorage.getItem('cart');
    let localStorageCartJS = JSON.parse(localStorageCart);
    for(productCart of localStorageCartJS){
    
        console.log(productCart.id);
        let cartItemsArticle = document.createElement('article');
        cartItemsArticle.classList.add("cart__item");
        cartItemsArticle.setAttribute("data-id",productCart.id);
        cartItemsArticle.setAttribute("data-color", productCart.color);
        cartItemsSection.appendChild(cartItemsArticle);
    
        let cartItemImgDiv = document.createElement('div');
        cartItemImgDiv.classList.add("cart__item__img");
        cartItemsArticle.appendChild(cartItemImgDiv);
        let itemImg = document.createElement("img");
        cartItemImgDiv.appendChild(itemImg);
        let productId = productCart.id;
     
        
    
        let cartItemContentDiv = document.createElement('div');
        cartItemImgDiv.classList.add("cart__item__content");
        cartItemsArticle.appendChild(cartItemContentDiv);
        let cartItemContentDescriptionDiv = document.createElement('div');
        cartItemContentDescriptionDiv.classList.add('cart__item__content__description');
        cartItemContentDiv.appendChild(cartItemContentDescriptionDiv);
        let descriptionTitleHeader = document.createElement('h2');
        cartItemContentDescriptionDiv.appendChild(descriptionTitleHeader);
        let descriptionColorParagraph = document.createElement('p');
        descriptionColorParagraph.textContent = productCart.color;
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
        quantityInput.setAttribute("value", productCart.quantity);
        cartItemContentSettingsQuantity.appendChild(quantityInput);
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        cartItemContentSettingsDiv.appendChild(cartItemContentSettingsDelete);
        let deleteItemParagraph = document.createElement("p");
        deleteItemParagraph.classList.add("deleteItem");
        deleteItemParagraph.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItemParagraph);
    
    
       let priceInt = await fetchProduct(productId, itemImg, descriptionTitleHeader, descriptionPriceParagraph, totalPrice);
       let quantityInt = new Number(productCart.quantity);
       totalPrice += priceInt * quantityInt;
       totalQuantity += quantityInt;
    
    
    
    }
    
    console.log(totalPrice);
    console.log(totalQuantity);
    spanTotalQuantity = document.getElementById("totalQuantity");
    spanTotalQuantity.textContent = new String(totalQuantity);
    spanTotalPrice = document.getElementById("totalPrice");
    spanTotalPrice.textContent = new String(totalPrice);
    
    




}

getCart();

