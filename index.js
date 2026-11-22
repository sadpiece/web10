async function fetchProducts() {
    const productsDiv = document.getElementById('products-list');
    productsDiv.textContent = 'Завантаження товарів...';

    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        document.getElementById('section-title').textContent = 'Усі товари';
        showProducts(data.products);
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
    }
}

async function fetchProductsByCategory(categorySlug, categoryName) {
    const productsDiv = document.getElementById('products-list');
    productsDiv.textContent = 'Завантаження товарів...';

    try {
        const res = await fetch('https://dummyjson.com/products/category/' + categorySlug);
        const data = await res.json();

        document.getElementById('section-title').textContent = 'Категорія: ' + categoryName;
        showProducts(data.products);
    } catch (error) {
        console.error('Помилка завантаження категорії:', error);
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
        const btn = document.createElement('button');

        btn.className = 'cat-btn';
        btn.textContent = category.name;
        btn.onclick = function () {
            fetchProductsByCategory(category.slug, category.name);
        };

        categoriesDiv.appendChild(btn);
    }
}

function showProducts(productsArray) {
    const productsDiv = document.getElementById('products-list');
    productsDiv.innerHTML = '';

    for (let i = 0; i < productsArray.length; i++) {
        const product = productsArray[i];

        productsDiv.innerHTML +=
            '<div class="card">' +
                '<img src="' + product.thumbnail + '" alt="' + product.title + '">' +
                '<h3>' + product.title + '</h3>' +
                '<p class="card-cat">Категорія: ' + product.category + '</p>' +
                '<p class="card-price">$' + product.price + '</p>' +
            '</div>';
    }
}

fetchCategories();
fetchProducts();