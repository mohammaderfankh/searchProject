const searchInput = document.querySelector(".search");
const productsDom = document.querySelector(".product-center");
const btns = document.querySelectorAll(".btn");

let allProductsData = [];

const filters = {
    searchItems: "",
};

document.addEventListener("DOMContentLoaded", (e) => {
    // console.log(e)
    axios
        .get("http://localhost:3000/items")
        .then((res) => {
            allProductsData = res.data;
            renderProducts(res.data, filters);
        })
        .catch((err) => {
            console.log(err);
        });
});

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDom.innerHTML = "";
    filteredProducts.forEach((item, index) => {
        const productsDiv = document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML = `<div class="img-container">
        <img src=${item.image} alt="p-${index}" />
    </div>
    <div class="caption">
        <div class="price-caption">${item.price} $</div>
        <div class="name-caption">${item.title}</div>
    </div>`;
        productsDom.appendChild(productsDiv);
    });
}

searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        filters.searchItems = filter;
        renderProducts(allProductsData, filters);
    });
});
