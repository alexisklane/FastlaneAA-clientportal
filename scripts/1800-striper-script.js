const correctPIN = "1600";

function checkPIN() {
  const pin = document.getElementById("pin-input").value;
  if (pin === correctPIN) {
    document.getElementById("pin-section").style.display = "none";
    document.getElementById("form-section").style.display = "block";
  } else {
    document.getElementById("pin-error").textContent = "Incorrect PIN.";
  }
}

// Define garments with images + descriptions
const garments = [
  {
    name: "Vest",
    image: "Images/1800 Striper Vest.jpg",
    description: "CSV101 - CornerStone ANSI 107 Class 2 Economy Mesh Zippered Vest - COLOR: SAFETY YELLOW",
  },
  {
    name: "Saftey Green Tee",
    image: "Images/I800 Striper Neon Tee.jpg",
    description: "3930R - Fruit of the Loom HD Cotton Unisex T-Shirt - COLOR: SAFETY GREEN",
  },
  {
    name: "Black Tee",
    image: "Images/1800 Striper Tee.jpg",
    description: "DM130DTG District Perfect Tri DTG Tee - COLOR: BLACK",
  }
];

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const garmentsDiv = document.getElementById("garments");

garments.forEach(({ name, image, description }) => {
  const container = document.createElement("div");
  container.classList.add("garment-item");

  container.innerHTML = `
    <div class="garment-info">
      <img src="${image}" alt="${name}" class="garment-img" />
      <div>
        <h4>${name}</h4>
        <p class="garment-desc">${description}</p>
      </div>
    </div>
    <div class="sizes-row">
      ${sizes.map(size => `
        <div class="size-wrapper">
          <label class="size-label">${size}</label>
          <input type="number" name="${name}-${size}" class="size-select" min="0" max="100" value="0" />
        </div>
      `).join('')}
    </div>
  `;

  garmentsDiv.appendChild(container);
});

// EmailJS
emailjs.init("3h3_QcAW6VM05zix0");

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const email = formData.get("email");
  let message = `Date: ${formData.get("date")}\nDescription: ${formData.get("description")}\n\nOrder:\n`;

  garments.forEach(({ name }) => {
    sizes.forEach(size => {
      const qty = formData.get(`${name}-${size}`);
      if (qty > 0) {
        message += `${name} (${size}): ${qty}\n`;
      }
    });
  });

  emailjs.send("service_k80zcg6", "template_c80t8d4", {
    to_email: email,
    order_details: message
  }).then(() => {
    document.getElementById("success-message").textContent = "Order submitted successfully!";
    this.reset();
  }).catch(err => {
    alert("Failed to send email. " + err);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.querySelector('input[type="date"]');
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  dateInput.value = today;
});