import Car from "../../Components/Car.js";

const navLine = document.querySelector("#nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const body = document.querySelector("body");
const driverForm = document.querySelector("#driver");
const dateForm = document.querySelector("#date");
const timeForm = document.querySelector("#time");
const passengerForm = document.querySelector("#passenger");
const searchButton = document.querySelector("#search");
const carForm = document.querySelector("#car-form");
const resultContainer = document.querySelector("#result");

navLine.addEventListener("click", function () {
  navLine.classList.toggle("nav-line__active");
  navMenu.classList.toggle("hidden");
  body.classList.toggle("max-md:before:overlay");
});

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("max-md:before:overlay")) {
    navLine.classList.remove("nav-line__active");
    navMenu.classList.add("hidden");
    body.classList.remove("max-md:before:overlay");
  }
});

window.addEventListener("scroll", function () {
  navLine.classList.remove("nav-line__active");
  navMenu.classList.add("hidden");
  body.classList.remove("max-md:before:overlay");
});

const updateButtonState = () => {
  if (
    driverForm.value.trim() !== "" &&
    dateForm.value.trim() !== "" &&
    timeForm.value.trim() !== ""
  ) {
    searchButton.disabled = false;
  }
  if (driverForm.value.trim() !== "") {
    driverForm.classList.remove("text-neutral-300");
    driverForm.classList.add("text-neutral-700");
  }
  if (dateForm.value.trim() !== "") {
    dateForm.classList.remove("text-neutral-300");
    dateForm.classList.add("text-neutral-700");
  }
  if (timeForm.value.trim() !== "") {
    timeForm.classList.remove("text-neutral-300");
    timeForm.classList.add("text-neutral-700");
  } else {
    searchButton.disabled = true;
  }
};

driverForm.addEventListener("input", updateButtonState);
dateForm.addEventListener("input", updateButtonState);
timeForm.addEventListener("input", updateButtonState);

updateButtonState();

carForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchData = {
    date: dateForm.value,
    time: timeForm.value,
  };

  if (passengerForm.value) {
    searchData.passenger = passengerForm.value;
  }

  const formData = new URLSearchParams();
  formData.append("driver", driverForm.value);
  formData.append("date", dateForm.value);
  formData.append("time", timeForm.value);
  formData.append("passenger", passengerForm.value);

  try {
    const response = await fetch("/cars/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.length === 0) {
        resultContainer.innerHTML = `
        <div id="not-found" class="container mx-auto items-center justify-center p-4 xl:py-4 xl:px-0">
          <h2 class="bg-danger bg-opacity-10 py-3 px-4 rounded-lg w-full text-danger text-sm font-light">Data tidak ditemukan</h2>
        </div>
        `;
      } else {
        let content = "";
        const contentHeadTag = `<div id="result-col" class="container mx-auto items-center justify-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 xl:py-4 xl:px-0">`;
        const contentTailTag = `</div>`;
        result.forEach((car) => (content += new Car(car).render()));
        resultContainer.innerHTML = `${contentHeadTag}${content}${contentTailTag}`;
      }
    } else {
      console.error("Failed to fetch search results");
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("testimonial-carousel");
  const cards = document.querySelectorAll(".testimonial-card");
  const totalCards = cards.length;

  let currentPosition;
  if (totalCards % 2 === 1) {
    currentPosition =
      window.innerWidth >= 768
        ? -(Math.floor(totalCards / 2) - 1)
        : -Math.floor(totalCards / 2);
  } else if (totalCards % 2 === 0) {
    currentPosition =
      window.innerWidth >= 768
        ? -(totalCards / 2) + 1.5
        : -(totalCards / 2) + 0.5;
  }

  function updateCarousel() {
    const carouselWidth = cards[0].clientWidth + 32;
    const offset = -(currentPosition * carouselWidth);
    carousel.style.transform = `translateX(${offset}px)`;
  }

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (totalCards % 2 === 1) {
      if (currentPosition > -Math.floor(totalCards / 2)) {
        currentPosition--;
        updateCarousel();
      }
    } else if (totalCards % 2 === 0) {
      if (currentPosition > -(totalCards / 2 - 0.5)) {
        currentPosition += -1;
        updateCarousel();
      }
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (totalCards % 2 === 1) {
      if (currentPosition < Math.floor(totalCards / 2)) {
        currentPosition++;
        updateCarousel();
      }
    } else if (totalCards % 2 === 0) {
      if (currentPosition < totalCards / 2 - 0.5) {
        currentPosition += 1;
        updateCarousel();
      }
    }
  });

  window.addEventListener("resize", function () {
    updateCarousel();
  });

  document.querySelectorAll(".accordion").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-accordion-target");
      const targetEl = document.querySelector(targetId);
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", !isExpanded);

      if (!isExpanded) {
        const scrollHeight = targetEl.scrollHeight;
        targetEl.style.maxHeight = scrollHeight + "px";
      } else {
        targetEl.style.maxHeight = "0";
      }
    });
  });
  updateCarousel();
});
