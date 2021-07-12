const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.js-lightbox');
const bigModalImg = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox');
const overlay = document.querySelector(' .lightbox__overlay');
let currentIndex;

// TASK 1 Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
const galleryMarkup = galleryItems.reduce(
    (add, { preview, original, description }) => {
        return (
            add +
            `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt='${description}'/></a></li>`
        );
    },
    '',
);

gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

// TASK 2 Реализация делегирования на галерее ul.js-gallery
gallery.addEventListener('click', onClick);

function onClick(evt) {
    const galleryImage = evt.target;
    evt.preventDefault();
    if (galleryImage.nodeName !== 'IMG') {
        return;
    }

    // TASK 3 Открытие модального окна по клику на элементе галереи.
    modal.classList.add('is-open');

    // TASK 4 Подмена значения атрибута src элемента img.lightbox__image получение url большого изображения.
    bigModalImg.src = galleryImage.dataset.source;
    currentIndex = +galleryImage.dataset.index;
}

// TASK 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
    modal.classList.remove('is-open');

    // TASK 6 Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
    bigModalImg.src = '';
    bigModalImg.alt = '';
    window.removeEventListener('keydown', onEscKeyPress);
}

// ДОПОЛНИТЕЛЬНО 1. Закрытие модального окна по клику на div.lightbox__overlay.
overlay.addEventListener('click', onOverlayClick);
function onOverlayClick() {
    onCloseModal();
}

// ДОПОЛНИТЕЛЬНО 2. Закрытие модального окна по нажатию клавиши ESC.
const escape = document.querySelector('body');
escape.addEventListener('keydown', onEscKeyPress);
function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
        onCloseModal();
    }
}

// ДОПОЛНИТЕЛЬНО 3. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// ¯\_(ツ)_/¯