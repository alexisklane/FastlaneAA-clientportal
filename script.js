const correctPIN = "1234"; // Change this to your private PIN

function checkPIN() {
  const pin = document.getElementById("pin-input").value;
  if (pin === correctPIN) {
    document.getElementById("pin-section").style.display = "none";
    document.getElementById("form-section").style.display = "block";
  } else {
    document.getElementById("pin-error").textContent = "Incorrect PIN.";
  }
}

const garments = ["T-shirt", "Hoodie", "Jacket", "Tank Top"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const garmentsDiv = document.getElementById("garments");

garments.forEach(item => {
  const container = document.createElement("div");
  container.innerHTML = `<h4>${item}</h4>`;
  sizes.forEach(size => {
    container.innerHTML += `
      <label>${size}:
        <select name="${item}-${size}">
          ${[...Array(21)].map((_, i) => `<option value="${i}">${i}</option>`).join('')}
        </select>
      </label>`;
  });
  garmentsDiv.appendChild(container);
});

// EmailJS init
emailjs.init("3h3_QcAW6VM05zix0"); // Replace with your actual public key

document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const email = formData.get("email");
  let message = `Date: ${formData.get("date")}\nDescription: ${formData.get("description")}\n\nOrder:\n`;

  garments.forEach(item => {
    sizes.forEach(size => {
      const qty = formData.get(`${item}-${size}`);
      if (qty > 0) {
        message += `${item} (${size}): ${qty}\n`;
      }
    });
  });

  // Send confirmation to client and copy to business
  emailjs.send("service_k80zcg6", "template_c80t8d4", {
    to_email: email,
    order_details: message
  }).then(() => {
    document.getElementById("success-message").textContent = "Order submitted successfully!";
    document.getElementById("order-form").reset();
  }).catch(err => {
    alert("Failed to send email. " + err);
  });
});
