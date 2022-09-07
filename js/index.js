const searchInput = document.querySelector(".search");

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
}

searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProductsData, filters);
});
