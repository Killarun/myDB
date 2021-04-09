'use strict';
document.addEventListener('DOMContentLoaded', () =>{
    const banners = document.querySelectorAll('.promo__adv img');
const filmBlock = document.querySelector('.promo__bg');
const type = filmBlock.querySelector('.promo__genre');
const poster = document.querySelector('.promo__bg');
const movieList = document.querySelector('.promo__interactive-list');
const addForm = document.querySelector('form.add');
const inputText = addForm.querySelector('.adding__input');
const checkbox = addForm.querySelector('[type="checkbox"]');


const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};




const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};


const newDrama = () => {
    type.textContent = 'Драма';
    poster.style.backgroundImage = "url('./img/bg.jpg')";
};

addForm.addEventListener('submit', (e) =>{
    e.preventDefault(); // Убираем перезагрузку страницы
    let newFilm = inputText.value; // Получаем данные из формы
    const favorite = checkbox.checked;

    if (newFilm){

        if(newFilm.length > 21){ // Проверяем длину строки, если больше 21, обрезаем и добавляем ...
            newFilm = `${newFilm.substring(0, 22)}...`;
        }
        if (favorite) {
            console.log('Добавлен любимый фильм')
        }
        movieDB.movies.push(newFilm); // Добавляем данные в массив фильмов
        sortFunc(movieDB.movies);     // Сортируем по алфавиту массив
        createMovieList(movieDB.movies, movieList); //Создаем новый список на основе новых данных         
    }
    e.target.reset(); // Очищаем форму
});

const sortFunc = (arr) => {
   arr.sort();
};

function createMovieList(films, parent) {
   // Удаляем все классы со страницы
     parent.innerHTML ='';  
     sortFunc(films); /// сортируем фильмы 
    // Генерим содержимое блока и ставим на страницу    
    films.forEach((film, i) =>{
        parent.innerHTML += `
        <li class="promo__interactive-item">
            ${i + 1}. ${film}
                <div class="delete"></div>
        </li>
        `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
    
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(films, parent); // Рекурсивный вызов функции формирования списка.
        });
    });

};



    deleteAdv(banners);
    newDrama();
    
    createMovieList(movieDB.movies, movieList);


});