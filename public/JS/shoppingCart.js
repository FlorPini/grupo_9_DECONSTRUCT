window.addEventListener("load",function(){
      let quantity = 0;
      let shoppingCartButon = document.querySelectorAll("a.shopping-Cart-Button");
      shoppingCartButon.forEach((item)=>{
      item.addEventListener("click", function(){
         let totalQuantity = document.querySelector("div.counter") 
         quantity = quantity + 1
         totalQuantity.innerHTML = quantity
        


      })
        
    })
})