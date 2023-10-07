import {data} from "./database.js";
console.log(data);

function renderProducts(data){
    const ulProducts = document.querySelector("#ul-products");

    data.forEach((item)=>{
        
        ulProducts.insertAdjacentHTML('afterbegin',`
        
            <li>
                <img src="${item.img}" alt="">

                <div class="div-information">
                    <p class="p-tag">${item.tag}</p>
                    <p class="p-name">${item.nameItem}</p>
                    <p class="p-description">${item.description}</p>
                    <p class="p-value">${item.value}</p>
                </div>
                <button class="btn-add">${item.addCart}</button>
            </li>
        `);
        const btnAdd = document.querySelector(".btn-add");

        btnAdd.addEventListener('click', ()=>{
            //console.log(item);
            addToCart(item);
        })
    })
}

renderProducts(data)

let cartList = [];

function addToCart(itemProduct){
    const newItem = {...itemProduct}
    if(cartList.length==0){
        newItem.id = 1
    }else{
        newItem.id = parseInt(cartList[cartList.length-1].id) +1
        //console.log(item.id)
    }
    cartList.push(newItem);
    renderCart(cartList);
    const jsonCart = JSON.stringify(cartList); //JSON Transformando Object em String
    localStorage.setItem("@cart-local", jsonCart);
    console.log(cartList);
}

function renderCart(list=[]){
    const ulCart =  document.querySelector("#ul-cart");
    ulCart.innerHTML = "";

    list.forEach((item)=>{
        ulCart.insertAdjacentHTML('afterbegin', `      
            <li>
                <img src="${item.img}" alt="">

                <div class="cart-information">         
                    <p class="p-name">${item.nameItem}</p>
                    <p class="p-value">${item.value}</p>
                    <button class="btn-remove">Remover Produto</button>
                </div>
            </li>            
        `);
        
        const btnRemove = document.querySelector(".btn-remove");

        btnRemove.addEventListener('click', ()=>{
            removeToCart(item);
        })
    })
}

function removeToCart(item){
    const index = cartList.findIndex((cart)=>cart.id == item.id)
    cartList.splice(index,1)
    renderCart(cartList)
    const jsonCart = JSON.stringify(cartList)
    localStorage.setItem("@cart-local", jsonCart)
}



// Filtros Roupas
const filterItems = document.querySelectorAll("#filter-items")
    console.log(filterItems)
    filterItems.forEach((item)=>{
        item.addEventListener("click",()=>{
            separaCategorias(item.innerText)
        })
    })

function separaCategorias(categoria){
    
    console.log(categoria)
    if(categoria != "Todos"){
        const filterArray = data.filter((item)=>{
            return item.tag[0] == categoria
        })
        renderLista(filterArray)
    }else{
        renderLista(data)
    }
      
}
function renderLista(lista=[]){
    const ulProducts = document.querySelector("#ul-products")
    ulProducts.innerHTML=""
    lista.forEach((item)=>{
        ulProducts.insertAdjacentHTML('afterbegin',`
        <li>
            <img src="${item.img}" alt="">

            <div class="div-information">
                <p class="p-tag">${item.tag}</p>
                <p class="p-name">${item.nameItem}</p>
                <p class="p-description">${item.description}</p>
                <p class="p-value">${item.value}</p>
            </div>
            <button class="btn-add">${item.addCart}</button>
        </li>    
    `)
    })
}



const inputSearch = document.querySelector("#input-search");

inputSearch.addEventListener('input', (e)=>{
    const filterCart = cartList.filter((item)=>{
        return item.nameItem.includes(e.target.value);
    })
    console.log(e.target.value);
    renderCart(filterCart);
})


// let newArray = []
// for(let i =0;i<data.length;i++){
//     if(data[i].tag[0] == "Acessórios"){
//         newArray.push(data[i])
//     }
// }
// const filterArray = data.filter((item)=>{
//     return item.tag[0] == "Camisetas"
// })
// console.log(filterArray)



//Cache Carrinho
const localCart = localStorage.getItem("@cart-local");
if(localCart){
    const objCartLocal = JSON.parse(localCart); //JSON Transformando String em Object
    cartList = objCartLocal;
    renderCart(cartList);
}

