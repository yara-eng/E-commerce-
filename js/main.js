//brawse category
let category_nav_list =document.querySelector(".category_nav_list");
function Open_Categ_list(){
    category_nav_list.classList.toggle("active");
}
//header
let userInfo =document.querySelector("#user_info");
let userdom =document.querySelector("#user");
let links =document.querySelector("#links");
let logOutBtn =document.querySelector("#logout");


let username = localStorage.getItem('username');
if(username){
    links.remove()
    userInfo.style.display ="flex"
    userdom.innerHTML= username;
}
logOutBtn.addEventListener('click',function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location="register.html"
    },1500)
})
//cart
var cart=document.querySelector(".cart");
function open_close_cart(){
  cart.classList.toggle("active")
}
//nav bar responsive
let nav_links =document.querySelector(".nav_links")
function open_Menu(){
  nav_links.classList.toggle("active")
}
//cart item to add or delete the products
fetch('product.json')
.then(response=> response.json())
.then(data => {
  const addToCartButtons=document.querySelectorAll (".btn_add_cart")
  
  addToCartButtons.forEach(button =>{
    button.addEventListener("click",(event)=>{
      const productId = event.target.getAttribute('data-id')
      const selectedProduct = data.find(product => product.id== productId)

      addToCart(selectedProduct)
      const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
      allMatchingButtons.forEach(btn=>{
        btn.classList.add("active")
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>Item in cart`
      })
    })
  })

})

function addToCart(product){
  let cart= JSON.parse(localStorage.getItem('cart')) || []
  cart.push({... product , quantity:1})
  localStorage.setItem('cart',JSON.stringify(cart))
  updateCart()
}
//update cart
function updateCart(){
  const cartItemsContainer = document.getElementById("cart_items")
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const checkout_items= document.getElementById('checkout_items')

  let items_input = document.getElementById("items")
  let total_Price_input = document.getElementById("total_Price")
  let count_items_input = document.getElementById("count_items")
  if(checkout_items){
    checkout_items.innerHTML=""
   
    items_input.value ="";
    total_Price_input.value ="";
    count_items_input.value ="";


  }

  var total_Price=0
  var total_count=0
  cartItemsContainer.innerHTML ="";
  cart.forEach((item , index) =>{
    let total_Price_item = item.price *item.quantity;
    total_Price +=total_Price_item
    total_count +=item.quantity
    //checkout input
    if(checkout_items){
    items_input.value+= item.name +"---"+"price: "+total_Price_item+"---"+"count:"+item.quantity+"\n"
    
    total_Price_input.value=total_Price+20
    count_items_input.value= total_count
    }
    cartItemsContainer.innerHTML +=`
     <div class="item_cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">$${total_Price_item}}</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" data-index=${index}>-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="Increase_quantity" data-index=${index}>+</button>
                    </div>
                </div>
                <button class="delete_item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
    `
    //to checkout page
    if(checkout_items){
      checkout_items.innerHTML += `
      <div class="item_cart">
                            <div class="image_name">
                                <img src="${item.img}" alt="product_img">
                                <div class="content">
                                    <h4>${item.name} </h4>
                                    <p class="price_cart">$${total_Price_item}</p>
                                    <div class="quantity_control">
                                        <button class="decrease_quantity" data-index=${index}>-</button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="Increase_quantity" data-index=${index}>+</button>
                                    </div><!-- ./quantity_control -->
                                </div><!-- ./content -->
                            </div><!-- ./image_name -->
                            <button class="delete_item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                        </div><!-- ./item_cart -->
      `
    }
  })
  //count item
  const price_cart_total =document.querySelector('.price_cart_total')
  const count_item_cart =document.querySelector('.Count_item_cart')
  const count_item_header =document.querySelector('.count_item_header')
  price_cart_total.innerHTML= `$${total_Price}`
  count_item_cart.innerHTML = total_count
  count_item_header.innerHTML = total_count
  // subtotal checkout page
  if(checkout_items){
    const subtotal_checkout= document.querySelector(".subtotal_checkout")
    const total_checkout= document.querySelector(".total_checkout")
    subtotal_checkout.innerHTML= `$${total_Price}`
    total_checkout.innerHTML= `$${total_Price+20}`


  }

  // button increase or decrease product
  const increaseButtons =document.querySelectorAll(".Increase_quantity")
  const decreaseButtons =document.querySelectorAll(".decrease_quantity")
  // increase button
  increaseButtons.forEach(button => {
    button.addEventListener("click", (event)=>{
      const itemIndex = event.target.getAttribute("data-index")
      increaseQuantity(itemIndex)
    })
  })
  // decrease button
  decreaseButtons.forEach(button => {
    button.addEventListener("click", (event)=>{
      const itemIndex = event.target.getAttribute("data-index")
      decreaseQuantity(itemIndex)
    })
  })

  //to delete items
  const delteButtons =document.querySelectorAll('.delete_item')
  delteButtons.forEach(button=>{
    button.addEventListener('click', (event) =>{
      const itemIndex = event.target.closest('button').getAttribute('data-index')
      removeFromCart(itemIndex)
    })
  })
}
//function to increase button
function increaseQuantity(index){
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cart[index].quantity +=1
  localStorage.setItem('cart', JSON.stringify(cart))
  updateCart()
}
//function to decrease button
function decreaseQuantity(index){
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  if(cart[index].quantity > 1){
    cart[index].quantity -=1
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
  updateCart()
}
function removeFromCart(index){
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const removeProduct = cart.splice(index, 1)[0]
  localStorage.setItem('cart',JSON.stringify(cart))
  updateCart()
  updateButoonsState(removeProduct.id)
}
//to return the button if remove the item of the cart
function updateButoonsState(productId){
  const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
  allMatchingButtons.forEach(button=>{
    button.classList.remove('active')
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>add to cart`
  })
}


updateCart()
