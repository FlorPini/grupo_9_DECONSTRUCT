window.addEventListener("load",function(){
     let quantity = 0;
    let shoppingCartButon = document.querySelector("a.shopping-Cart-Button");
    shoppingCartButon.addEventListener("click", function(){
       let totalQuantity = document.querySelector("div.counter") 
       quantity = quantity + 1
       totalQuantity.innerHTML = quantity


        
    })
})