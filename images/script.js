const adLinkId = '{{ ad_link_id }}';
fetch(`https://graph.instagram.com/${adLinkId}?fields=image,description`, {
  headers: {
    'Authorization': 'Bearer YOUR_INSTAGRAM_API_TOKEN'
  }
})
.then(response => response.json())
.then(data => {
  const productImage = data.image;
  const productDescription = data.description;
  document.getElementById('product-image').src = productImage;
  document.getElementById('product-description').textContent = productDescription;
  document.getElementById('popup').style.display = 'flex'; // Show the popup
})
.catch(error => {
  console.error('Error fetching product details:', error);
});

document.getElementById('buy-now').addEventListener('click', () => {
  document.getElementById('checkout-form').style.display = 'block';
});

document.getElementById('pay-now').addEventListener('click', () => {
  // Handle payment processing here
  alert('Payment processing...');
});