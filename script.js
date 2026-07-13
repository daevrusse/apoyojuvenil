// Activa las animaciones únicamente cuando JavaScript está disponible.
document.documentElement.classList.add("js-enabled");

// Configuración principal
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyPtEXHuNmcZ9jpz7hG0ZT8CR_wgndTk8gZCDLRmSzrU9o1bbMc7TWIF1ezJUFqu8xKxA/exec";
const GROUP_URL = "https://rebrand.ly/gpapoyo";
const START_DATE = new Date("2026-08-03T21:00:00-05:00");

function setValue(id, value) {
  const input = document.getElementById(id);
  if (input) input.value = value || "";
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 767) return "Móvil";
  if (width <= 1024) return "Tablet";
  return "Escritorio";
}

function captureLeadMetadata() {
  const params = new URLSearchParams(window.location.search);
  const campaign = params.get("utm_campaign") || params.get("campaign") || "Orgánico";

  setValue("fecha", new Date().toISOString());
  setValue("pagina", window.location.href);
  setValue("referencia", document.referrer || "Directo");
  setValue("dispositivo", getDeviceType());
  setValue("navegador", navigator.userAgent);
  setValue("utm_source", params.get("utm_source") || "");
  setValue("utm_medium", params.get("utm_medium") || "");
  setValue("utm_campaign", campaign);
  setValue("utm_content", params.get("utm_content") || "");
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return;

  const distance = START_DATE.getTime() - Date.now();
  if (distance <= 0) {
    countdown.innerHTML = "<strong>¡La temporada ya comenzó!</strong>";
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  countdown.innerHTML = `
    <div><strong>${days}</strong><span>Días</span></div>
    <div><strong>${hours}</strong><span>Horas</span></div>
    <div><strong>${minutes}</strong><span>Min</span></div>
    <div><strong>${seconds}</strong><span>Seg</span></div>
  `;
}

function initLeadForm() {
  const form = document.getElementById("leadForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusBox = document.getElementById("formStatus");

  if (!form || !submitBtn || !statusBox) return;

  function showError(input, message) {
    input.classList.add("invalid");
    const error = input.closest(".field")?.querySelector(".error");
    if (error) error.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("invalid");
    const error = input.closest(".field")?.querySelector(".error");
    if (error) error.textContent = "";
  }

  function validateForm() {
    let isValid = true;
    const nombre = form.elements.nombre;
    const ubicacion = form.elements.ubicacion;
    const whatsapp = form.elements.whatsapp;

    [nombre, ubicacion, whatsapp].forEach(clearError);

    if (nombre.value.trim().length < 3) {
      showError(nombre, "Ingresa tu nombre completo.");
      isValid = false;
    }

    if (ubicacion.value.trim().length < 2) {
      showError(ubicacion, "Ingresa tu país o ciudad.");
      isValid = false;
    }

    const digits = whatsapp.value.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      showError(whatsapp, "Ingresa un WhatsApp válido con código de país.");
      isValid = false;
    }

    return isValid;
  }

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.innerHTML = isSubmitting
      ? "Registrando..."
      : 'Registrarme e ingresar al grupo <span>→</span>';
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusBox.textContent = "";
    statusBox.className = "form-status";

    if (!validateForm()) {
      statusBox.textContent = "Revisa los datos ingresados.";
      statusBox.classList.add("error-status");
      return;
    }

    captureLeadMetadata();
    setSubmitting(true);
    statusBox.textContent = "Guardando tus datos...";

    try {
      const formData = new FormData(form);
      const body = new URLSearchParams();
      formData.forEach((value, key) => body.append(key, value));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: body.toString()
      });

      localStorage.setItem("pastoralLeadRegistered", new Date().toISOString());
      statusBox.textContent = "¡Registro realizado! Te llevamos al grupo oficial...";
      statusBox.classList.add("success");
      submitBtn.textContent = "Registro completado";

      setTimeout(() => window.location.assign(GROUP_URL), 1200);
    } catch (error) {
      console.error("Error al registrar:", error);
      statusBox.textContent = "No pudimos registrar tus datos. Revisa tu conexión e inténtalo otra vez.";
      statusBox.classList.add("error-status");
      setSubmitting(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  captureLeadMetadata();
  initRevealAnimations();
  initLeadForm();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
