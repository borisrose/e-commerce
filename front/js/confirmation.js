const pageURL= document.URL;

let url = new URL(pageURL);
let search_params = new URLSearchParams(url.search);
let orderId;
    
if (search_params.has("orderId")){
        
    orderId = url.searchParams.get("orderId");
    let orderIdSpan = document.getElementById("orderId");
    orderIdSpan.textContent = orderId;
}

