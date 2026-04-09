// SEARCH functionality
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");
const recipeCards = document.querySelectorAll(".recipe-card");
const modal = document.getElementById("recipe-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close-btn");
const darkToggle = document.getElementById("dark-toggle");
const form = document.getElementById("recipe-form");
const recipes = [...document.querySelectorAll(".recipe-card")];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  recipes.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    recipes.forEach(card => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

recipeCards.forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.getAttribute("data-title");
    modalDesc.textContent = card.getAttribute("data-description");
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value.toLowerCase();
  const cooktime = document.getElementById("cooktime").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;

  const newCard = document.createElement("section");
  newCard.className = "recipe-card";
  newCard.setAttribute("data-category", category);
  newCard.setAttribute("data-title", title);
  newCard.setAttribute("data-description", description);
  newCard.innerHTML = `
    <h2>${title}</h2>
    <img src="${image}" alt="${title}" />
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Cook Time:</strong> ${cooktime}</p>
  `;

  document.getElementById("recipe-list").appendChild(newCard);
  recipes.push(newCard);

  newCard.addEventListener("click", () => {
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modal.style.display = "block";
  });

  form.reset();
});

// ===============================
// AI RECIPE GENERATOR FUNCTIONALITY
// ===============================

const aiModal = document.getElementById('ai-recipe-modal');
const openAIModal = document.getElementById('open-ai-modal');
const closeAIBtn = document.querySelector('.close-ai-btn');
const getRecipeBtn = document.getElementById('get-recipe-btn');
const ingredientInput = document.getElementById('ingredientInput');
const recipeResult = document.getElementById('recipeResult');

// Open AI Modal
openAIModal.addEventListener('click', () => {
  aiModal.style.display = 'block';
  recipeResult.innerHTML = '';
  ingredientInput.value = '';
});

// Close AI Modal
closeAIBtn.addEventListener('click', () => {
  aiModal.style.display = 'none';
});

// Close on outside click
window.addEventListener('click', (e) => {
  if (e.target === aiModal) {
    aiModal.style.display = 'none';
  }
});

// Typing animation function
function typeWriterEffect(element, text, speed = 20) {
  element.innerHTML = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Fetch AI Recipe
getRecipeBtn.addEventListener('click', async () => {
  const ingredients = ingredientInput.value.trim();
  if (!ingredients) return;

  recipeResult.innerHTML = '⏳ Generating recipe...';

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer your api key"  },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Suggest a detailed recipe using these ingredients: ${ingredients}`
          }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "❌ No recipe found.";
    typeWriterEffect(recipeResult, aiText);
  } catch (err) {
    recipeResult.innerHTML = "⚠️ Error fetching recipe. Please try again.";

  }
  document.addEventListener("DOMContentLoaded", () => {
    // All your existing code here
    // SEARCH functionality
    const searchInput = document.getElementById("search");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const recipeCards = document.querySelectorAll(".recipe-card");
    const modal = document.getElementById("recipe-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close-btn");
    const darkToggle = document.getElementById("dark-toggle");
    const form = document.getElementById("recipe-form");
    const recipes = [...document.querySelectorAll(".recipe-card")];
  
    // ... rest of your code untouched
  });
  
});
