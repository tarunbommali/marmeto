const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const product = data?.product;

    const productTitle = product?.title;
    const productDescription = product?.description;
    const productPrice = product?.price;
    const productComparePrice = product?.compare_at_price;

    let selectedColor = null;
    let selectedSize = null;

    const priceValue = parseFloat(productPrice.replace("$", ""));
    const compareAtPriceValue = parseFloat(
      productComparePrice.replace("$", "")
    );
    const discountPercent =
      ((compareAtPriceValue - priceValue) / compareAtPriceValue) * 100;

    // Display product title, description, and price
    document.getElementById("product-title").innerText = productTitle;
    document.getElementById("product-description").innerHTML =
      productDescription;
    document.getElementById("product-price").innerText = productPrice;
    document.getElementById("product-compare-price").innerText =
      productComparePrice;

    // Display product images and thumbnails
    const imagesContainer = document.getElementById("thumbnail-images");
    const previewImage = document.getElementById("preview-image");

    product.images.forEach((image, index) => {
      // Create thumbnail image
      const thumbnailImg = document.createElement("img");
      thumbnailImg.src = image?.src;
      thumbnailImg.alt = "Thumbnail Image";
      thumbnailImg.className = "thumbnail-image";

      // Add click event listener to change preview image
      thumbnailImg.addEventListener("click", function () {
        previewImage.src = image.src;
      });

      // Append thumbnail image to thumbnails container
      imagesContainer.appendChild(thumbnailImg);

      // Set the first image as the initial preview image
      if (index === 0) {
        previewImage.src = image?.src;
      }
    });

    // Display discount percentage
    const discountPercentElement = document.getElementById("discount-percent");
    if (discountPercentElement) {
      discountPercentElement.innerText = `(${discountPercent.toFixed(2)}% off)`;
    }

    // Display color options
    const colorsListContainer = document.getElementById("colorsList");
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === "color") {
        option.values.forEach((value) => {
          const colorName = Object.keys(value)[0];
          const hexCode = value[colorName];
          const colorDiv = document.createElement("div");
          colorDiv.className = "color-option";
          colorDiv.style.backgroundColor = hexCode;
          colorDiv.title = colorName;
          colorDiv.addEventListener("click", function () {
            alert(`Selected Color: ${colorName}`);
            selectedColor = colorName;
          });
          colorsListContainer.appendChild(colorDiv);
        });
      }
    });

    // Display size options
    const sizesListContainer = document.getElementById("sizesList");
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === "size") {
        option.values.forEach((value) => {
          const sizeInputContainer = document.createElement("div"); // Container for each size option
          sizeInputContainer.classList.add("size-option-container");

          const sizeInput = document.createElement("input");
          sizeInput.type = "radio";
          sizeInput.name = "size";
          sizeInput.value = value;
          sizeInput.className = "size-option-input";
          sizeInput.addEventListener("click", function () {
            alert(`Selected Size: ${value}`);
            selectedSize = value; // Corrected variable name
          });

          const sizeLabel = document.createElement("label");
          sizeLabel.textContent = value;
          sizeLabel.className = "size-option-label";
          sizeLabel.setAttribute("for", value);
          sizeLabel.addEventListener("click", function () {
            sizeInput.click();
          });

          sizeInputContainer.appendChild(sizeInput);
          sizeInputContainer.appendChild(sizeLabel);

          sizesListContainer.appendChild(sizeInputContainer);
        });
      }
    });

    // Quantity Controller
    document.getElementById("increment").addEventListener("click", function () {
      const quantityInput = document.getElementById("quantity");
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById("decrement").addEventListener("click", function () {
      const quantityInput = document.getElementById("quantity");
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

    // Event listener for adding product to cart
    document
      .getElementById("add-to-cart")
      .addEventListener("click", function (event) {
        event.preventDefault();
        
        // Check if both color and size are selected
        if (selectedColor !== null && selectedSize !== null) {
          alert(
            `Product added to cart!\nColor: ${selectedColor}\nSize: ${selectedSize}\nDescription: ${productDescription}`
          );
        } else {
          alert("Please choose color and size.");
        }
      });
  })
  .catch((error) => console.error("Error fetching product data:", error));
