async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        document.getElementById('section-title').innerText = 'Усі товари';
        showProducts(data.products);
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
    }
}

async function fetchProductsByCategory(categorySlug, categoryName) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${categorySlug}`);
        const data = await res.json();

        document.getElementById('section-title').innerText = `Категорія: ${categoryName}`;
        showProducts(data.products);
    } catch (error) {
        console.error('Помилка завантаження категорії:', error);
    }
}

async function fetchProductById(id) {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await res.json();
        console.log(product);
    } catch (error) {
        console.error('Помилка завантаження товару:', error);
    }
}

async function fetchCategories() {
    try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const categories = await res.json();

        showCategories(categories);
    } catch (error) {
        console.error('Помилка завантаження категорій:', error);
    }
}

function showCategories(categoriesArray) {
    const categoriesDiv = document.getElementById('categories-list');
    categoriesDiv.innerHTML = '';

    for (let i = 0; i < categoriesArray.length; i++) {
        const category = categoriesArray[i];

        categoriesDiv.innerHTML += `
            <button class="category-btn" onclick="fetchProductsByCategory('${category.slug}', '${category.name}')">
                ${category.name}
            </button>
        `;
    }
}

function showProducts(productsArray) {
    const productsDiv = document.getElementById('products-list');
    productsDiv.innerHTML = '';

    for (let i = 0; i < productsArray.length; i++) {
        const product = productsArray[i];

        productsDiv.innerHTML += `
            <div class="product-card">
                <div>
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="product-category">Категорія: ${product.category}</p>
                </div>
                <p class="product-price">$${product.price}</p>
            </div>
        `;
    }
}


fetchCategories();
fetchProducts();