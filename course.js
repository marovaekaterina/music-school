// УВЕЛИЧЕНИЕ ИЗОБРАЖЕНИЙ
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".course-gallery img").forEach((img) => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// ОТЗЫВЫ
const reviewsContainer = document.querySelector(".reviews-grid");
const addButton = document.getElementById("addReview");
const authorInput = document.getElementById("author");
const textInput = document.getElementById("text");

// Создание карточки отзыва
function createReview(review) {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
        <div class="stars">★★★★★</div>
        <p>${review.text}</p>
        <span>${review.author}</span>
    `;
    reviewsContainer.appendChild(card);
}


// Загрузка отзывов из Local Storage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(createReview);
}

// Добавление и сохранение отзывов
addButton.addEventListener("click", () => {
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    if (author === "" || text === "") {
        alert("Заполните все поля");
        return;
    }
    const review = {
        author,
        text
    };
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    createReview(review);
    authorInput.value = "";
    textInput.value = "";
});

// Инициализация отзывов при загрузке страницы
loadReviews();