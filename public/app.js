<<<<<<< HEAD
const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    'address-line1': document.getElementById('address-line1').value.trim(),
    'address-line2': document.getElementById('address-line2').value.trim(),
    city: document.getElementById('city').value.trim(),
    state: document.getElementById('state').value.trim(),
    pincode: document.getElementById('pincode').value.trim(),
  };

  console.log('Form data:', formData);

  try {
    const response = await fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form. Please try again later.');
  }
=======
const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    'address-line1': document.getElementById('address-line1').value.trim(),
    'address-line2': document.getElementById('address-line2').value.trim(),
    city: document.getElementById('city').value.trim(),
    state: document.getElementById('state').value.trim(),
    pincode: document.getElementById('pincode').value.trim(),
  };

  console.log('Form data:', formData);

  try {
    const response = await fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form. Please try again later.');
  }
>>>>>>> 1b220174af62cf759b3f1921eff70dc1acdf327a
});