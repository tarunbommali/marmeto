const apiUrl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const product = data.product;
    
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-description').innerHTML = product.description;
    document.getElementById('product-price').innerText = product.price;
    const discount = product.compare_at_price -  product.price / product.compare_at_price * 100 
    document.getElementById('discount-percent').innerText = discount; 
    document.getElementById('product-compare-price').innerText = `Compare at Price: ${product.compare_at_price}`;
    
    const imagesContainer = document.querySelector('.product-images');
    product.images.forEach(image => {
      const img = document.createElement('img');
      img.src = image.src;
      imagesContainer.appendChild(img);
    });

    const optionsContainer = document.getElementById('product-options');
    
    // Create container for color options
    const colorOptionContainer = document.createElement('div');
    colorOptionContainer.className = 'color-option-container';
    
    // Create container for size options
    const sizeOptionContainer = document.createElement('div');
    sizeOptionContainer.className = 'size-option-container';

    product.options.forEach(option => {
      const optionContainer = document.createElement('div');
      optionContainer.className = 'option-container';
      
      const optionTitle = document.createElement('h1');
      optionTitle.textContent = option.name; // Display option name (e.g., Color or Size)
      optionContainer.appendChild(optionTitle);

      const optionItemContainer = document.createElement('div');
      optionItemContainer.className = 'option-item-container';

      option.values.forEach(value => {
        if (option.name.toLowerCase() === 'color') {
          const colorDiv = document.createElement('div');
          const colorName = Object.keys(value)[0];
          const hexCode = value[colorName];
          
          colorDiv.className = 'color-option';
          colorDiv.style.backgroundColor = hexCode;
          colorDiv.title = colorName; // Set the color name as tooltip
          colorDiv.addEventListener('click', function() {
            alert(`Selected Color: ${colorName}`);
            // Additional logic based on the selected color can be added here
          });
          optionItemContainer.appendChild(colorDiv);
        } else if (option.name.toLowerCase() === 'size') {
          const sizeInput = document.createElement('input');
          sizeInput.type = 'radio';
          sizeInput.name = 'size';
          sizeInput.value = value;
          sizeInput.className = 'size-option'; // Add classname for size option
          sizeInput.addEventListener('click', function() {
            alert(`Selected Size: ${value}`);
            // Additional logic based on the selected size can be added here
          });
          const sizeLabel = document.createElement('label');
          sizeLabel.textContent = value;
          optionItemContainer.appendChild(sizeInput);
          optionItemContainer.appendChild(sizeLabel);
        }
      });

      if (option.name.toLowerCase() === 'color') {
        colorOptionContainer.appendChild(optionContainer);
        colorOptionContainer.appendChild(optionItemContainer);
      } else if (option.name.toLowerCase() === 'size') {
        sizeOptionContainer.appendChild(optionContainer);
        sizeOptionContainer.appendChild(optionItemContainer);
      }
    });

    optionsContainer.appendChild(colorOptionContainer);
    optionsContainer.appendChild(sizeOptionContainer);

    document.getElementById('add-to-cart').addEventListener('click', function(event) {
      event.preventDefault();
      const selectedColor = document.querySelector('input[name="color"]:checked');
      const selectedSize = document.querySelector('input[name="size"]:checked');
      if (!selectedColor || !selectedSize) {
        alert('Please choose color and size.');
      } else {
        alert(`Product added to cart!\nColor: ${selectedColor.value}\nSize: ${selectedSize.value}\nDescription: ${product.description}`);
        // Additional logic to add the product to the cart can be added here
      }
    });
  })
  .catch(error => console.error('Error fetching product data:', error));
