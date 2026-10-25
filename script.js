/**
 * Amit Rawal — Developer Portfolio Script
 * Full-Stack Laravel & Flutter App Developer
 */

const PORTFOLIO = {
  name: "Amit Rawal",
  email: "rawalamit387@gmail.com",
  phone: "+91 6354806444",
  phoneRaw: "6354806444",
  whatsappNumber: "916354806444",
  github: "https://github.com/amit-rawal12",
  linkedin: ""
};

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toast notification helper
const toastEl = document.getElementById("toast");
let toastTimeout;
function showToast(message, duration = 3000) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, duration);
}

// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      if (filter === "all" || categories.includes(filter)) {
        card.hidden = false;
        card.style.display = "";
      } else {
        card.hidden = true;
        card.style.display = "none";
      }
    });
  });
});

// Copy Email functionality
const copyEmailBtn = document.getElementById("copyEmail");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO.email);
      showToast("✓ Email copied to clipboard: " + PORTFOLIO.email);
    } catch {
      showToast("Email: " + PORTFOLIO.email);
    }
  });
}

// Copy Phone functionality
const copyPhoneBtn = document.getElementById("copyPhoneBtn");
if (copyPhoneBtn) {
  copyPhoneBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO.phone);
      showToast("✓ Phone number copied: " + PORTFOLIO.phone);
    } catch {
      showToast("Phone: " + PORTFOLIO.phone);
    }
  });
}

// Quick Message handling (WhatsApp & Email)
const sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const senderName = document.getElementById("senderName");
const projectCategory = document.getElementById("projectCategory");
const senderMessage = document.getElementById("senderMessage");

if (sendWhatsAppBtn) {
  sendWhatsAppBtn.addEventListener("click", () => {
    const name = senderName ? senderName.value.trim() : "";
    const category = projectCategory ? projectCategory.value : "General Inquiry";
    const msg = senderMessage ? senderMessage.value.trim() : "";

    let text = `Hi Amit,`;
    if (name) text += ` I'm ${name}.`;
    text += ` I'm interested in discussing a project regarding: ${category}.`;
    if (msg) text += `\n\nProject details: ${msg}`;

    const waUrl = `https://wa.me/${PORTFOLIO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp with your message...");
  });
}

if (sendEmailBtn) {
  sendEmailBtn.addEventListener("click", () => {
    const name = senderName ? senderName.value.trim() : "Potential Client";
    const category = projectCategory ? projectCategory.value : "Project Inquiry";
    const msg = senderMessage ? senderMessage.value.trim() : "";

    const subject = `Inquiry: ${category} - from ${name}`;
    let body = `Hello Amit,\n\n`;
    body += `My name: ${name}\n`;
    body += `Project Category: ${category}\n\n`;
    body += `Message Details:\n${msg || "I would like to discuss an opportunity/project with you."}\n\n`;
    body += `Best regards,\n${name}`;

    const mailUrl = `mailto:${PORTFOLIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailUrl;
    showToast("Launching your email client...");
  });
}
