// Получение элементов на странице
const searchInput = document.querySelector(".search-input");
const sortSelect = document.querySelector(".sort-select");
const catalogGrid = document.querySelector(".catalog-grid");

// Получение всех карточек в виде массива
let cards = Array.from(document.querySelectorAll(".catalog-card"));


// ПОИСК КУРСОВ
searchInput.addEventListener("input", () => {
    // Получение текста из поля поиска
    const searchValue = searchInput.value.toLowerCase();
    // Проверка каждой карточки
    cards.forEach(card => {
        // Название курса из data-title
        const title = card.dataset.title.toLowerCase();
        // Если введённый текст найден в названии
        if (title.includes(searchValue)) {
            // Показываем карточку
            card.style.display = "block";
        } else {
            // Иначе - скрываем карточку
            card.style.display = "none";
        }
    });
});


// СОРТИРОВКА КУРСОВ
sortSelect.addEventListener("change", () => {

    // Получение выбранного варианта сортировки
    const value = sortSelect.value;
    // Сортировка по названию курса
    if (value === "По названию") {
        cards.sort((a, b) =>
            a.dataset.title.localeCompare(b.dataset.title)
        );
    }

    // Сортировка по количеству занятий
    if (value === "По количеству занятий") {
        cards.sort((a, b) =>
            Number(a.dataset.lessons) -
            Number(b.dataset.lessons)
        );
    }

    // Очистка контейнера каталога
    catalogGrid.innerHTML = "";
    // Добавленое карточки обратно, но уже в новом порядке
    cards.forEach(card => {
        catalogGrid.appendChild(card);
    });

});


// ПАГИНАЦИЯ
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");
const cardsPerPage = 6;
let currentPage = 1;

// Функция отображения карточек текущей страницы
function showPage(page){
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    cards.forEach((card,index)=>{
        if(index >= start && index < end){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    });
    pageNumber.textContent = page;
}

// Первая загрузка страницы
showPage(currentPage);

// Кнопка назад
prevPageBtn.addEventListener("click", ()=>{
    if(currentPage > 1){
        currentPage--;
        showPage(currentPage);
    }
});

// Кнопка вперед
nextPageBtn.addEventListener("click", ()=>{
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    if(currentPage < totalPages){
        currentPage++;
        showPage(currentPage);
    }
});