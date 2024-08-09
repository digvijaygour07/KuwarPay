const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    'address-line1': document.getElementById('address-line1').value,
    'address-line2': document.getElementById('address-line2').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    pincode: document.getElementById('pincode').value,
  };

  console.log('Form data:', formData);

  fetch('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log('Server response:', data))
    .catch((error) => console.error('Error:', error));
});