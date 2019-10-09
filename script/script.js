'use strict';
document.addEventListener('DOMContentLoaded', () => {
    
    //display keyboard
    {
        const keyboardButton = document.querySelector('.search-form__keyboard');
        const keyboard = document.querySelector('.keyboard');
        const closeKeyboard = document.getElementById('close-keyboard');
        const searchInput = document.querySelector('.search-form__input');

        const toggleKeyboard = () => {
            if (keyboard.style.top) {
                keyboard.style.top = '';
            } else {
                keyboard.style.top = '50%';
            }
        };

        const typing = (event) => {
            const target = event.target;

            if (target.textContent.trim() === '⬅') {
                searchInput.value = searchInput.value.slice(0, -1);
            } else if (target.textContent.trim() === '') {
                searchInput.value += ' ';
            } else if (target.tagName === 'BUTTON') {
                searchInput.value += target.textContent.trim();
            }

        };


        keyboardButton.addEventListener('click', toggleKeyboard);
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', typing);

    }

    //Menu
    {
        const burger = document.querySelector('.spinner');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            sidebarMenu.classList.toggle('rollUp');
        });

        sidebarMenu.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('li');

            if (target) {
                sidebarMenu.querySelectorAll('li').forEach(elem => {
                    if (elem === target) {
                        elem.classList.add('active');
                    } else {
                        elem.classList.remove('active');
                    }
                })
            }
        });
    }


    //модальное окно
    



});