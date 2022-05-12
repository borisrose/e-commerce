let itemsDiv = document.getElementById("items");




async function fetchProducts(){

    let response = await fetch('http://localhost:3000/api/products');
    let productsJSON = await response.json();
    
    let products = JSON.parse(JSON.stringify(productsJSON)); 

   
    for (product of products) {
       
        let newElementA = document.createElement('a');
        itemsDiv.appendChild(newElementA);
        newElementA.setAttribute("href","./product.html?id="+ product["_id"]);
    
        let newElementArticle = document.createElement('article');
        newElementA.appendChild(newElementArticle);

        let newImg = document.createElement('img');
        newImg.setAttribute("src",product['imageUrl']);
        newImg.setAttribute("al", product['altTxt']);
        newElementArticle.appendChild(newImg);

        let newH3 = document.createElement('h3');
        newH3.classList.add("productName")
        newElementArticle.appendChild(newH3);

        let productName = document.createTextNode(product['name']);
        newH3.appendChild(productName);

        let newParagraph = document.createElement('p');
        newParagraph.classList.add("productDescription");
        newElementArticle.appendChild(newParagraph);

        let productDescription = document.createTextNode(product['description']);
        newParagraph.appendChild(productDescription);

    } 

}

fetchProducts();



