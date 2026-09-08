/* =====================================================
   FLAVORHUB - FOOD DELIVERY WEBSITE
   APP.JS
   ===================================================== */


/* =====================================================
   FOOD DATA
   ===================================================== */

const foods = [
    {
        id: 1,
        name: "Classic Burger",
        category: "burgers",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Salmon Sushi",
        category: "sushi",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Caesar Salad",
        category: "salads",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Chocolate Cake",
        category: "desserts",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Fresh Juice",
        category: "drinks",
        price: 4.49,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Chicken Burger",
        category: "burgers",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Margherita Pizza",
        category: "pizza",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 9,
        name: "California Roll",
        category: "sushi",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 10,
        name: "Greek Salad",
        category: "salads",
        price: 8.49,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 11,
        name: "Strawberry Cake",
        category: "desserts",
        price: 7.49,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 12,
        name: "Orange Juice",
        category: "drinks",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80"
    }
];


/* =====================================================
   CART
   ===================================================== */

let cart = [];


/* =====================================================
   HTML ELEMENTS
   ===================================================== */

const foodList = document.getElementById("foodList");
const specialList = document.getElementById("specialList");

const cartBtn = document.getElementById("cartBtn");
const cartBox = document.getElementById("cart");
const closeCartBtn = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const emptyCart = document.getElementById("emptyCart");

const subtotal = document.getElementById("subtotal");
const delivery = document.getElementById("delivery");
const total = document.getElementById("total");

const checkoutBtn = document.getElementById("checkout");
const message = document.getElementById("message");


/* =====================================================
   SHOW MENU
   ===================================================== */

function showMenu(category = "all") {

    if (!foodList) {
        console.error("foodList was not found.");
        return;
    }

    foodList.innerHTML = "";

    const filteredFoods = foods.filter(function (food) {

        return category === "all" ||
            food.category === category;

    });


    if (filteredFoods.length === 0) {

        foodList.innerHTML = `
            <div class="no-food">
                <h3>No food found 😔</h3>
                <p>Try another category.</p>
            </div>
        `;

        return;
    }


    filteredFoods.forEach(function (food) {

        foodList.innerHTML += `
            <div class="food-card">

                <div class="food-image">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                        loading="lazy"
                    >

                </div>

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p>
                        Delicious fresh food prepared
                        with quality ingredients.
                    </p>

                    <div class="food-bottom">

                        <span class="price">
                            $${food.price.toFixed(2)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addFood(${food.id})"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </div>
        `;

    });
}


/* =====================================================
   SHOW SPECIALS
   ===================================================== */

function showSpecials() {

    if (!specialList) {
        console.error("specialList was not found.");
        return;
    }

    specialList.innerHTML = "";


    const specials = foods.slice(0, 3);


    specials.forEach(function (food) {

        specialList.innerHTML += `
            <div class="food-card">

                <div class="food-image">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                        loading="lazy"
                    >

                </div>

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p>
                        ⭐ Today's special food.
                    </p>

                    <div class="food-bottom">

                        <span class="price">
                            $${food.price.toFixed(2)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addFood(${food.id})"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </div>
        `;

    });
}


/* =====================================================
   ADD FOOD
   ===================================================== */

function addFood(id) {

    const food = foods.find(function (item) {

        return item.id === id;

    });


    if (!food) {

        console.error("Food not found:", id);

        return;
    }


    const existingFood = cart.find(function (item) {

        return item.id === id;

    });


    if (existingFood) {

        existingFood.quantity += 1;

    } else {

        cart.push({

            id: food.id,
            name: food.name,
            category: food.category,
            price: food.price,
            image: food.image,
            quantity: 1

        });

    }


    updateCart();

    showMessage(food.name + " added to cart! 🛒");

    openCart();
}


/* =====================================================
   INCREASE QUANTITY
   ===================================================== */

function increaseQuantity(id) {

    const food = cart.find(function (item) {

        return item.id === id;

    });


    if (!food) {
        return;
    }


    food.quantity += 1;

    updateCart();
}


/* =====================================================
   DECREASE QUANTITY
   ===================================================== */

function decreaseQuantity(id) {

    const food = cart.find(function (item) {

        return item.id === id;

    });


    if (!food) {
        return;
    }


    if (food.quantity > 1) {

        food.quantity -= 1;

    } else {

        cart = cart.filter(function (item) {

            return item.id !== id;

        });

    }


    updateCart();
}


/* =====================================================
   REMOVE FOOD
   ===================================================== */

function removeFood(id) {

    const food = cart.find(function (item) {

        return item.id === id;

    });


    if (!food) {
        return;
    }


    cart = cart.filter(function (item) {

        return item.id !== id;

    });


    updateCart();

    showMessage(food.name + " removed from cart.");
}


/* =====================================================
   UPDATE CART
   ===================================================== */

function updateCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    /* ITEM COUNT */

    let itemCount = 0;

    cart.forEach(function (food) {

        itemCount += food.quantity;

    });


    if (cartCount) {

        cartCount.textContent = itemCount;

    }


    /* EMPTY CART */

    if (cart.length === 0) {

        if (emptyCart) {

            emptyCart.style.display = "block";

        }

    } else {

        if (emptyCart) {

            emptyCart.style.display = "none";

        }


        /* CART ITEMS */

        cart.forEach(function (food) {

            const itemTotal =
                food.price * food.quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <img
                            class="cart-item-image"
                            src="${food.image}"
                            alt="${food.name}"
                        >

                        <div>

                            <h4>
                                ${food.name}
                            </h4>

                            <p>
                                $${itemTotal.toFixed(2)}
                            </p>

                            <div
                                class="quantity-control"
                                style="
                                    display:flex;
                                    align-items:center;
                                    gap:10px;
                                    margin-top:8px;
                                "
                            >

                                <button
                                    onclick="decreaseQuantity(${food.id})"
                                    style="
                                        width:30px;
                                        height:30px;
                                        border-radius:50%;
                                        background:#ffe5dc;
                                        color:#ff6b35;
                                        font-size:20px;
                                        font-weight:bold;
                                        cursor:pointer;
                                    "
                                >
                                    −
                                </button>

                                <strong>
                                    ${food.quantity}
                                </strong>

                                <button
                                    onclick="increaseQuantity(${food.id})"
                                    style="
                                        width:30px;
                                        height:30px;
                                        border-radius:50%;
                                        background:#ff6b35;
                                        color:white;
                                        font-size:20px;
                                        font-weight:bold;
                                        cursor:pointer;
                                    "
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>


                    <button
                        class="remove-btn"
                        onclick="removeFood(${food.id})"
                        title="Remove item"
                    >
                        ×
                    </button>

                </div>

            `;

        });

    }


    /* SUBTOTAL */

    let sub = 0;

    cart.forEach(function (food) {

        sub += food.price * food.quantity;

    });


    /* DELIVERY */

    const deliveryCost =
        cart.length > 0 ? 2.99 : 0;


    /* TOTAL */

    const totalCost =
        sub + deliveryCost;


    /* DISPLAY */

    if (subtotal) {

        subtotal.textContent =
            "$" + sub.toFixed(2);

    }


    if (delivery) {

        delivery.textContent =
            "$" + deliveryCost.toFixed(2);

    }


    if (total) {

        total.textContent =
            "$" + totalCost.toFixed(2);

    }
}


/* =====================================================
   MESSAGE
   ===================================================== */

function showMessage(text) {

    if (!message) {
        return;
    }


    message.textContent = text;

    message.classList.add("show");


    setTimeout(function () {

        message.classList.remove("show");

    }, 2000);
}


/* =====================================================
   OPEN CART
   ===================================================== */

function openCart() {

    if (cartBox) {

        cartBox.classList.add("open");

    }


    if (overlay) {

        overlay.classList.add("open");

    }
}


/* =====================================================
   CLOSE CART
   ===================================================== */

function closeCart() {

    if (cartBox) {

        cartBox.classList.remove("open");

    }


    if (overlay) {

        overlay.classList.remove("open");

    }
}


/* =====================================================
   CART BUTTON
   ===================================================== */

if (cartBtn) {

    cartBtn.addEventListener("click", function () {

        openCart();

    });

}


/* =====================================================
   CLOSE CART BUTTON
   ===================================================== */

if (closeCartBtn) {

    closeCartBtn.addEventListener(
        "click",
        closeCart
    );

}


/* =====================================================
   OVERLAY
   ===================================================== */

if (overlay) {

    overlay.addEventListener(
        "click",
        closeCart
    );

}


/* =====================================================
   ESC KEY CLOSE CART
   ===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeCart();

    }

});


/* =====================================================
   CATEGORY BUTTONS
   ===================================================== */

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        /* REMOVE ACTIVE */

        categoryButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* ADD ACTIVE */

        button.classList.add("active");


        /* GET CATEGORY */

        const category =
            button.getAttribute("data-category");


        /* SHOW MENU */

        showMenu(category);

    });

});


/* =====================================================
   CHECKOUT
   ===================================================== */

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {


        /* EMPTY CART */

        if (cart.length === 0) {

            showMessage(
                "Your cart is empty! 🛒"
            );

            return;
        }


        /* TOTAL */

        const finalTotal =
            total
                ? total.textContent
                : "$0.00";


        /* SUCCESS */

        alert(
            "Order placed successfully! 🎉\n\n" +
            "Thank you for ordering from FlavorHub!\n\n" +
            "Total: " +
            finalTotal
        );


        /* CLEAR CART */

        cart = [];


        /* UPDATE */

        updateCart();


        /* CLOSE */

        closeCart();

    });

}


/* =====================================================
   NAVIGATION
   ===================================================== */

document.querySelectorAll("nav a").forEach(function (link) {

    link.addEventListener("click", function () {

        closeCart();

    });

});


/* =====================================================
   START WEBSITE
   ===================================================== */

showMenu("all");

showSpecials();

updateCart();


/* =====================================================
   READY
   ===================================================== */

console.log("🍽️ FlavorHub loaded successfully!");
console.log("Food items:", foods.length);