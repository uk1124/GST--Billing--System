//JS File

// Function to populate categories in the dropdown
const populateCategories = async () => {
  try {
    // Fetch categories from the API
    const response = await fetch("http://localhost:3000/api/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();

    // Populate category dropdown with fetched data
    const categorySelect = document.getElementById("product-category");
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = `${category.name} (${category.gstRate}%)`;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Function to populate products in the dropdown
const populateProducts = async () => {
  try {
    // Fetch products from the API
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    // Populate product dropdown with fetched data
    const productSelect = document.getElementById("sale-product");
    productSelect.innerHTML = '<option value="">Select Product</option>';
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to handle category form submission
document
  .getElementById("category-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("category-name").value;
    const gstRate = document.getElementById("gst-rate").value;
    try {
      // Create a new category via API POST request
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, gstRate }),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      alert("Category created successfully");
      document.getElementById("category-form").reset();
      await populateCategories(); // Refresh category dropdown after creation
    } catch (error) {
      console.error("Error creating category:", error);
    }
  });

// Function to handle product form submission
document
  .getElementById("product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const categoryId = document.getElementById("product-category").value;
    try {
      // Create a new product via API POST request
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, categoryId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      alert("Product created successfully");
      document.getElementById("product-form").reset();
      await populateProducts(); // Refresh product dropdown after creation
    } catch (error) {
      console.error("Error creating product:", error);
    }
  });

// Function to handle sale form submission
document.getElementById("sale-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const productId = document.getElementById("sale-product").value;
  const quantity = document.getElementById("sale-quantity").value;
  try {
    console.log(
      `Recording sale for productId: ${productId}, quantity: ${quantity}`
    );
    // Record a new sale via API POST request
    const response = await fetch("http://localhost:3000/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to record sale: ${errorData.details}`);
    }
    const sale = await response.json();

    // Fetch product details to display in the bill table
    console.log(`Fetching product details for productId: ${productId}`);
    const productResponse = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    if (!productResponse.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await productResponse.json();

    // Fetch category details to display in the bill table
    console.log(
      `Fetching category details for categoryId: ${product.categoryId}`
    );
    const categoryResponse = await fetch(
      `http://localhost:3000/api/categories/${product.categoryId}`
    );
    if (!categoryResponse.ok) {
      throw new Error("Failed to fetch category details");
    }
    const category = await categoryResponse.json();

    console.log("Sale:", sale);
    console.log("Product:", product);
    console.log("Category:", category);

    // Populate the bill table with sale details
    const billTableBody = document
      .getElementById("bill-table")
      .getElementsByTagName("tbody")[0];
    const row = billTableBody.insertRow();
    row.insertCell(0).textContent = product.name;
    row.insertCell(1).textContent = category.name;
    row.insertCell(2).textContent = sale.quantity;
    row.insertCell(3).textContent = sale.totalPrice;
    row.insertCell(4).textContent = sale.gstAmount;
    row.insertCell(5).textContent = sale.totalPrice + sale.gstAmount;

    alert("Sale recorded successfully");
  } catch (error) {
    console.error("Error recording sale:", error);
    alert(`Error recording sale: ${error.message}`);
  }
});

// Populate categories and products on page load
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  populateProducts();
});
