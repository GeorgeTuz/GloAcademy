"use strict";
document.addEventListener("DOMContentLoaded", () => {
	//display keyboard
	{
		const keyboardButton = document.querySelector(".search-form__keyboard");
		const keyboard = document.querySelector(".keyboard");
		const closeKeyboard = document.getElementById("close-keyboard");
		const searchInput = document.querySelector(".search-form__input");

		const toggleKeyboard = () => {
			if (keyboard.style.top) {
				keyboard.style.top = "";
			} else {
				keyboard.style.top = "50%";
			}
		};

		const changeLang = (btn, lang) => {
			const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
               ];
            const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '
               ];

               if (lang === 'en') {
                    btn.forEach((elem, i) => {
                        elem.textContent = langEn[i];
                    })
               } else {
                    btn.forEach((elem, i) => {
                        elem.textContent = langRu[i];
                    })
               }
		};

		const typing = event => {
			const target = event.target;
			const contentButton = target.textContent.trim();
			const buttons = [...keyboard.querySelectorAll("button")].filter(
				elem => elem.style.visibility !== "hidden"
			);
			console.log(buttons);
			if (contentButton === "⬅") {
				searchInput.value = searchInput.value.slice(0, -1);
			} else if (contentButton === "") {
				searchInput.value += " ";
			} else if (contentButton === "en" || contentButton === "ru") {
				changeLang(buttons, contentButton);
			} else if (target.tagName === "BUTTON") {
				searchInput.value += contentButton;
			}
		};

		keyboardButton.addEventListener("click", toggleKeyboard);
		closeKeyboard.addEventListener("click", toggleKeyboard);
		keyboard.addEventListener("click", typing);
	}

	//Menu
	{
		const burger = document.querySelector(".spinner");
		const sidebarMenu = document.querySelector(".sidebarMenu");

		burger.addEventListener("click", () => {
			burger.classList.toggle("active");
			sidebarMenu.classList.toggle("rollUp");
		});

		sidebarMenu.addEventListener("click", event => {
			let target = event.target;
			target = target.closest("li");

			if (target) {
				sidebarMenu.querySelectorAll("li").forEach(elem => {
					if (elem === target) {
						elem.classList.add("active");
					} else {
						elem.classList.remove("active");
					}
				});
			}
		});
	}

    //модальное окно
    {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="youTuberModal">
            <div id="youtuberClose">&#215;</div>
            <div id="youtuberContainer"></div>
        </div>
        `);
        
        const youtuberItems = document.querySelectorAll('[data-youtuber]');
        const youTuberModal = document.querySelector('.youTuberModal');
        const youtuberContainer = document.getElementById('youtuberContainer');

		const qw = [3840, 2560, 1920, 1280, 854, 640, 420, 256];
		const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

		const sizeVideo = () => {
			let ww = document.documentElement.clientWidth;
			let wh = document.documentElement.clientHeight;

			for (let i = 0; i < qw.length; i++) {	
				if (ww > qw[i]) {
					youtuberContainer.querySelector('iframe').style.cssText = `
						width: ${qw[i]}px;
						height: ${qh[i]}px;
					`;
					youtuberContainer.style.cssText = `
						width: ${qw[i]}px;
						height: ${qh[i]}px;
						top: ${(wh - qh[i]) / 2}px;
						left: ${(ww - qw[i]) / 2}px;
					`;
					break;
				}
			}
		}


        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                const idVideo = elem.dataset.youtuber;
                youTuberModal.style.display = 'block';

                const youTuberFrame = document.createElement('iframe');
                youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
				sizeVideo();
				
				window.addEventListener('resize', sizeVideo);
            })
        })

        youTuberModal.addEventListener('click', () => {
            youTuberModal.style.display = '';
			youtuberContainer.textContent = '';
			window.removeEventListener('resize', sizeVideo);
		});	
	}
	
	//API
	{
		const API_KEY = 'AIzaSyDkfFZ3tkL2uEKkqtTZzbnzOmyat179AMQ';
		const CLIENT_ID ='155875051348-me2rqptibtaq2f5btebg6n4m029geub6.apps.googleusercontent.com';
		//авторизация
		{
			const buttonAuth = document.getElementById('authorize');
			const authBlock = document.querySelector('.auth');



			function authenticate() {
				return gapi.auth2.getAuthInstance()
					.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
					.then(function() { console.log("Sign-in successful"); },
						  function(err) { console.error("Error signing in", err); });
			  }
			  function loadClient() {
				gapi.client.setApiKey(API_KEY);
				return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
					.then(function() { console.log("GAPI client loaded for API"); },
						  function(err) { console.error("Error loading GAPI client for API", err); });
			  }
			  // Make sure the client is loaded and sign-in is complete before calling this method.
			  function execute() {
				return gapi.client.youtube.channels.list({})
					.then(function(response) {
							// Handle the results here (response.result has the parsed body).
							console.log("Response", response);
						  },
						  function(err) { console.error("Execute error", err); });
			  }
			  gapi.load("client:auth2", function() {
				gapi.auth2.init({client_id: CLIENT_ID});
			  });

			  buttonAuth.addEventListener('click', () => {
				authenticate().then(loadClient)
			  })

		}
		//request
		{

		}

	}


});
