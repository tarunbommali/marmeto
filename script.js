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

    const priceValue = parseFloat(product.price.replace("$", ""));
    const compareAtPriceValue = parseFloat(
      product.compare_at_price.replace("$", "")
    );

    // Display product title, description, and price
    document.getElementById("product-title").innerText = productTitle;
    document.getElementById("product-description").innerHTML =productDescription;
    document.getElementById("product-price").innerText = productPrice;
    document.getElementById("product-compare-price").innerText = productComparePrice;
    



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

    
    // Calculate and display discount percentage
    const discountPercent = ((compareAtPriceValue - priceValue) / compareAtPriceValue) * 100;
    const discountPercentElement = document.getElementById("discount-percent");
    if (discountPercentElement) {
      discountPercentElement.innerText = `(${discountPercent.toFixed(2)}% off)`;
    }

    // Display color options
    const optionsContainer = document.getElementById("product-options");
    const colorOptionContainer = document.createElement("div");
    colorOptionContainer.className = "option-container";

    const colorOptionTitle = document.createElement("h3");
    colorOptionTitle.className = "option-title";
    colorOptionTitle.textContent = "Choose a Color";
    colorOptionContainer.appendChild(colorOptionTitle);

    const colorOptionItemsContainer = document.createElement("div");
    colorOptionItemsContainer.className = "option-item-container";
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
            // Additional logic based on the selected color can be added here
          });
          colorOptionItemsContainer.appendChild(colorDiv);
        });
      }
    });
    colorOptionContainer.appendChild(colorOptionItemsContainer);
    optionsContainer.appendChild(colorOptionContainer);

    // Display size options
    const sizeOptionContainer = document.createElement("div");
    sizeOptionContainer.className = "option-container";

    const sizeOptionTitle = document.createElement("h3");
    sizeOptionTitle.className = "option-title";
    sizeOptionTitle.textContent = "Choose a Size";
    sizeOptionContainer.appendChild(sizeOptionTitle);

    const sizeOptionItemsContainer = document.createElement("div");
    sizeOptionItemsContainer.className = "size-option-item-container";
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === "size") {
        option.values.forEach((value) => {
          const sizeInputContainer = document.createElement("div"); // Container for each size option
          sizeInputContainer.className = "size-option-container";

          const sizeInput = document.createElement("input");
          sizeInput.type = "radio";
          sizeInput.name = "size";
          sizeInput.value = value;
          sizeInput.className = "size-option-input";
          sizeInput.addEventListener("click", function () {
            alert(`Selected Size: ${value}`);
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

          sizeOptionItemsContainer.appendChild(sizeInputContainer);
        });
      }
    });

    sizeOptionItemsContainer.className = "size-option";

    sizeOptionContainer.appendChild(sizeOptionItemsContainer);

    optionsContainer.appendChild(sizeOptionContainer);

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
        const selectedColor = document.querySelector(
          'input[name="color"]:checked'
        );
        const selectedSize = document.querySelector(
          'input[name="size"]:checked'
        );
        if (!selectedColor || !selectedSize) {
          alert("Please choose color and size.");
        } else {
          alert(
            `Product added to cart!\nColor: ${selectedColor.value}\nSize: ${selectedSize.value}\nDescription: ${product.description}`
          );
          // Additional logic to add the product to the cart can be added here
        }
      });
  })
  .catch((error) => console.error("Error fetching product data:", error));
