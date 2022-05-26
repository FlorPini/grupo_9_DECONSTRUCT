window.addEventListener("load",function(){
    let createForm = document.querySelector("form.createNew");
    createForm.addEventListener("submit", function(e){
        
        let nameInput = document.querySelector("input.name")
        let priceInput = document.querySelector("input.price")
        let descriptionInput = document.querySelector("textarea.description")
        let typeInput = document.querySelector("option.type")

        if(nameInput.value == ""){ 
            e.preventDefault();
            let ulErrors = document.querySelector("div.errorsName ") 
                ulErrors.innerHTML += "<li>" + "El campo de nombre tiene que estar completo"+ "</li>"
        }

        if(priceInput.value == ""){
            errors.push("El campo de precio tiene que estar completo")

        }
        if(descriptionInput.value == ""){ 
            e.preventDefault();
            let ulErrors = document.querySelector("div.errorsDescription") 
                ulErrors.innerHTML += "<li>" + "Debe contener una descripción"+ "</li>"
        }
        if(typeInput.value == ""){ 
            e.preventDefault();
            let ulErrors = document.querySelector("div.errorsType") 
                ulErrors.innerHTML += "<li>" + "Debe contener una descripción"+ "</li>"
        }
    })
})


// window.addEventListener("load",function(){
//     let createForm = document.querySelector("form.createNew");
//     createForm.addEventListener("submit", function(e){
        
   
//         let errors =[];
//         let nameInput = document.querySelector("input.name")
//         let priceInput = document.querySelector("input.price")

//         if(nameInput.value == ""){
//             errors.push("El campo de nombre tiene que estar completo")
//         }
//         if(priceInput.value == ""){
//             errors.push("El campo de precio tiene que estar completo")
//         }
//         if(errors.length>0){
//         e.preventDefault();
//         let ulErrors = document.querySelector("div.errors")
//         for(let i = 0; i < errors.length; i ++){
//             ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
//         }
   
//         }

//     })
// })