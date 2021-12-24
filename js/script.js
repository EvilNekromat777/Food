window.addEventListener('DOMContentLoaded', () => {

    // =============  Функционал для табов =========
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    // Функция - скрывает не нужные табы
    function hideTabContent() {
        tabsContent.forEach(item => {      // перебираем псевдомассив с табами
            item.classList.add('hide'); // добавляем класс hide (display: none;)
            item.classList.remove('show', 'fade'); // удаляем класс show (display: block;) и класс с анимацией
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');  // удаляем у табов класс активности
        });
    }

    // Функция - показывает нужные табы
    function showTabContent(i = 0) {    // аргумент i - это индекс элемента в псевдомассиве, присваиваем сразу внутри аргумента, чтобы i всегда было 0
        tabsContent[i].classList.add('show', 'fade');   // добавляем класс show (display: block;) и класс с анимацией
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');  // добавляем класс активности
    }

    hideTabContent();
    showTabContent();  // показываем первый таб с нулевым индексом

    tabsParent.addEventListener('click', (event) => {  // вешаем слушатель на родителя
        const target = event.target; // если часто будем его использовать, то можем положить его в переменную

        if (target && target.classList.contains('tabheader__item')) {  // если клик был именно по табу, тогда..
            tabs.forEach((item, i) => {  // перебираем псевдомассив с табами, item - это каждый таб (Что перебираем?), i -это номер по порядку
                if (target == item) {    // если таргет совпадает с тем элементом, по которому мы сейчас кликнули, тогда вызывай наши функции
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });


    // =============  Функционал для таймера =========
    const deadline = '2021-12-31';

    // Функция определяет разницу между дедлайном и нашим текущим временем
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // создаем переменную куда получаем кол-во миллисекунд дедлайна минус кол-во миллисекунд текущего времени
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // вычисляем сколько дней осталось до дедлайна
              // Math.floor - округление до ближайшего целого числа
              // 1000 * 60 - получаем кол-во миллисекунд в одной минуте
              // 1000 * 60 * 60 - получаем кол-во миллисекунд в одном часе
              // 1000 * 60 * 60 * 24 - получаем кол-во миллисекунд в сутках
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // вычисляем сколько часов осталось до дедлайна
              // 1000 * 60 * 60 - получаем кол-во миллисекунд в одном часе
              // (t / (1000 * 60 * 60) % 24 - чтобы не было 26 часов, а было 1 день и 2 часа, получаем остаток от деления на 24
              minutes = Math.floor((t / 1000 / 60) % 60), // вычисляем сколько минут осталось до дедлайна
              seconds = Math.floor((t / 1000) % 60); // вычисляем сколько секунд осталось до дедлайна

              return {  // создаем объект и возвращаем его из функции
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              };
    }

    // Функция будет проверять одно число или два, и если одно то будет подставлять ноль
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Функция устанавливает время на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock(); // запускаем ее здесь, чтобы не было мигания верстки на странице

               // Функция обновляет наш таймер каждую секунду
               function updateClock() {
                   const t = getTimeRemaining(endtime);

                   days.innerHTML = getZero(t.days);
                   hours.innerHTML = getZero(t.hours);
                   minutes.innerHTML = getZero(t.minutes);
                   seconds.innerHTML = getZero(t.seconds);

                   if (t.total <= 0) {   // остановим нашу функцию когда время истечет
                     clearInterval(timeInterval);
                   }
               }
    }

    setClock('.timer', deadline);





    // MODAL  =========

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          // modalCloseBtn = modal.querySelector('[data-close]');

            //   Открытие по нажатию на одну из нескольких одинаковых кнопок
            modalTrigger.forEach(btn => {
                btn.addEventListener('click', openModal);
            });

            //   Закрытие модалки
            function closeModal() {
                modal.classList.add('hide');
                modal.classList.remove('show');
                // modal.classList.toggle('show');
                document.body.style.overflow = '';
            }

          //   Открытие модалки
          function openModal() {
              modal.classList.add('show');
              modal.classList.remove('hide');   //   Первый способ с добавлением или удалением классов
              // modal.classList.toggle('show');      //   Второй способ с toggle
                document.body.style.overflow = 'hidden';
                clearInterval(modalTimerId); // если пользователь уже открывал модалку, то setTimeout больше не нужен, отменяем его
          }

          // //   Закрытие на крестик
          // modalCloseBtn.addEventListener('click', closeModal);

        //   Закрытие на оверлей
          modal.addEventListener('click', (e) => {
             if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
             }
          });

          //   Закрытие на Эскейп
          document.addEventListener('keydown', (e) => {
             if (e.code === "Escape" && modal.classList.contains('show')) {  // с помощью contains проверяем наличие класса
                closeModal();
             }
          });

          // Появление модалки через 50 секунд после загрузки страницы
          const modalTimerId = setTimeout(openModal, 50000);

          // Появление модалки когда пользователь долистал страницу до конца
          function showModalByScroll() {
                if (Math.ceil(window.pageYOffset + document.documentElement.clientHeight) === document.documentElement.scrollHeight) { // если они совпадают, значит пользователь долистал страницу до конца
                    openModal();
                    window.removeEventListener('scroll', showModalByScroll); // если один раз модалка открылась, то удали обработчик, больше открывать не надо
                }
          }
        //    {once: true} - говорим, чтобы наше событие выполнилось только один раз, но в данном случае это работать не будет, потому что у нас не клик, а скролл
        //    С помощью Math.ceil округлили до большего числа
        //    window.pageYOffset - сколько пролистано страницы вверху
        //    document.documentElement.clientHeight - высота монитора пользователя
        //    document.documentElement.scrollHeight - общая высота нашей страницы (всей)


           window.addEventListener('scroll', showModalByScroll); // обработчик на скролл окна





           // =============  Функционал для добавления карточек через экземпляры классов =========
           class MenuCard {        // создаем родителя, от которого потом будем делать экземпляры
               constructor(src, alt, title, descr, price, parentSelector, ...classes){  // смотрим какие элементы содержит каждая карточка
                // ...classes - это Rest оператор, если вдруг мы захотим добавить к нашим карточкам еще что-то
                // назвать его можем как угодно. Это массив, работать с ним наддо как с массивом!
                    this.src = src;
                    this.alt = alt;
                    this.title = title;
                    this.descr = descr;
                    this.price = price;
                    this.classes = classes;  // Это массив, работать с ним наддо как с массивом!
                    this.parent = document.querySelector(parentSelector);  // родитель, внутрь которого будем помещать новые карточки
                    this.transfer = 27; // курс валют, статический
                    this.changeToUAH(); // вызываем метод для конвертации прямо внутри конструктора
               }

               changeToUAH(){  // создаем метод, который будет конвертировать цену из доллара в гривну
                this.price = this.price * this.transfer; // данные друг с другом взаимодействуют, и в this.price в конструкторе записывается уже новое значение
               }

               render(){  // метод, формирующий верстку
                    const element = document.createElement('div');  // создаем елемент div

                    if (this.classes.length === 0){  // проверка: если класс никакой не был передан,
                        this.element = 'menu__item'; // то по умолчанию присваиваем menu__item
                        element.classList.add(this.element);     // и добавляем его к нашему диву
                    } else{
                        this.classes.forEach(className => element.classList.add(className)); // иначе перебираем массив c классами и добавляем эти классы нашему диву (element)
                    }

                    element.innerHTML = `        
                            <img src=${this.src} alt=${this.alt}>
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>`;      // создаем структуру верстки внутри нашего дива

                        this.parent.append(element); // помещаем нашу созданную карточку (element) внутрь родителя (this.parent) c помощью метода append
               }
           }

           const getResourse = async (url) => {
            const res = await fetch(url);

            if (!res.ok) {
               throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            return await res.json();
        };

        // Первый способ создания карточек, с помощью экземпляра класса new MenuCard
        // getResourse('http://localhost:3000/menu')
        //     .then(data => {
        //      data.forEach(({img, altimg, title, descr, price}) => {
        //        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //      });
        //     });

        // Будем использовать библиотеку AXIOS
        // Берем данные из документации: https://github.com/axios/axios
        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });



    // Forms

    const forms = document.querySelectorAll('form'); // получаем все формы со страницы
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {  // если кнопка задана тегом button, то у нее автоматом есть тип submit - отправка
            e.preventDefault();

            let statusMessage = document.createElement('img');  // создаем динамический элемент, куда будет выводиться сообщение об успешной отправке формы
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);  // добавляем спинер после формы, чтобы не плющил форму, которая внизу

            const formData = new FormData(form);  // собираем все данные из нашей формы с помощью FormData

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {    // then - если запрос выполнился успешно, сделай это
                console.log(data);   // выводим в консоль то, что нам вернул сервер
                showThanksModal(message.success);   // запускаем функцию showThanksModal
                statusMessage.remove();
            }).catch(() => {         // catch - если будет ошибка, то выполни это
                showThanksModal(message.failure);
            }).finally(() => {    // finally - действие которое выполнится всегда, вне зависимости от того успешно выполнился мой запрос или нет
                form.reset();   // сбросить форму, очистить поля
            });
        });
    }

    function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 10000);
        }

        // fetch('http://localhost:3000/menu')  // обращаемся к нашей базе данных
        //     .then(data => data.json())   // превращаем ответ от сервера (json-файл) в обычный js-объект
        //     .then(res => console.log(res));



        // Slider

        const slides = document.querySelectorAll('.offer__slide'),
              slider = document.querySelector('.offer__slider'),
              prev = document.querySelector('.offer__slider-prev'),
              next = document.querySelector('.offer__slider-next'),
              total = document.querySelector('#total'),
              current = document.querySelector('#current'),
              slidesWrapper = document.querySelector('.offer__slider-wrapper'),
              slidesField = document.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;  // getComputedStyle - так получаем стили, которые применились в данный момент на элементе
        let slideIndex = 1;
        let offset = 0;


        // Вариант 1 - простой

        // showSlides(slideIndex);

        // if (slides.length < 10) {
        //     total.textContent = `0${slides.length}`;
        // } else {
        //     total.textContent = slides.length;
        // }

        // function showSlides(n) {
        //     if (n > slides.length) {
        //         slideIndex = 1;
        //     }

        //     if (n < 1) {
        //         slideIndex = slides.length;
        //     }

        //     slides.forEach(item => item.style.display = 'none'); // перебираем массив слайдов и прячем их все под display: none;

        //     slides[slideIndex - 1].style.display = 'block'; // показываем первый слайд (с индексом 0)

        //     if (slides.length < 10) {
        //         current.textContent = `0${slideIndex}`;
        //     } else {
        //         current.textContent = slideIndex;
        //     }
        // }

        // function plusSlides(n) {
        //     showSlides(slideIndex += n) // slideIndex будет увеличен на значение n
        // }

        // prev.addEventListener('click', () => {
        //     plusSlides(-1);
        // });

        // next.addEventListener('click', () => {
        //     plusSlides(1);
        // });



        // Вариант 2 - сложный

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%'; // чтобы поместить все слайды, которые есть на странице во внутрь slidesField
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;  // устанавливаем всем слайдам одинаковую ширину
        });

        slider.style.position = 'relative';


        // Точки для слайдера
        const indicators = document.createElement('ol'),
              dots = [];

        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }


        function dotsOpacity() {
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        }

        function showNumber() {
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }

        function transformTranslate() {
            slidesField.style.transform = `translateX(-${offset}px)`;
        }


        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');  // с помощью регулярного выражения все НЕ числа (то есть px) удаляем (пустая строка)
        }

        next.addEventListener('click', () => {
            // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            //     offset = 0;
            // } else {
            //     offset += +width.slice(0, width.length - 2);
            // }

            if (offset == deleteNotDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            transformTranslate();
            showNumber();
            dotsOpacity();
        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = deleteNotDigits(width) * (slides.length - 1)
            } else {
                offset -= deleteNotDigits(width);
            }

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            transformTranslate();
            showNumber();
            dotsOpacity();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideTo - 1);

                transformTranslate();
                showNumber();
                dotsOpacity();
            });
        });




        // Calculator

        const result = document.querySelector('.calculating__result span');

        let sex, height, weight, age, ratio;

        if(localStorage.getItem('sex')) {       // если в локал сторедже есть эта переменная
            sex = localStorage.getItem('sex');  // тогда берем ее оттуда
        } else{
            sex = 'female';                          // если нет, устанавливаем дефолтное значение female
            localStorage.setItem('sex', 'female');   // и записываем это дефолтное значение в локал сторедж
        }

        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else{
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }

        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {  // если хоть одно поле пустое (возвращает false)
                result.textContent = '____';  // тогда в поле результата выводим пробел, то есть результат не считаем
                return;  // прерываем функцию
            }

            if (sex === 'female'){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);  // берем формулу со стороннего сайта
            }else {
                result.textContent = Math.round ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);  // берем формулу со стороннего сайта
            }
        }
        calcTotal();

        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);

            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')) {  // если у блока есть атрибут data-ratio - берем его
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {   // если такого атрибута нет, берем id
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }

                    elements.forEach(elem => {   // перебираем все элементы
                        elem.classList.remove(activeClass);  // у всех убираем класс активности
                    });
                    e.target.classList.add(activeClass);  // добавляем этот класс только тому элементу, по которому был клик
                    calcTotal();
                });
            });


        }
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);

            input.addEventListener('input', () => {

                if(input.value.match(/\D/g)) {  // если в инпут ввели НЕ число (регулярное выражение)
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }

                switch(input.getAttribute('id')) {  // используем конструкцию switch, проверяем инпут по айдишнику
                    case 'height':              // если есть id="height"
                        height = +input.value;  // записываем значение этого инпута в переменную height
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
        }
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');

});
