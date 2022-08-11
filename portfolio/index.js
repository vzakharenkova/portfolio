import i18Obj from './translate.js';
let language = "en";
let theme = "moon";
let sunTheme = ["#sun", "#moon", "body", "#skills", "#portfolio", "#video", "#price", ".section-title > h2", "#portfolioButtons > button", "footer"];
function setLocalStorage() {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);


window.onload = function() {
    
    console.log("Верстка соответствует требованиям ТЗ.\nИтого: 75 из 85 баллов");
    
    const en = document.getElementById("en");
    const ru = document.getElementById("ru");
    const play_stop_button = document.getElementById("play_stop");
    const video = document.querySelector('.player_video');
    const play_icon = document.getElementById("play_icon");
    const progress_video = document.querySelector('#progress_video');
    const progress_volume = document.querySelector('#progress_volume');
    const timer = document.getElementById('timer');
    video.volume = progress_volume.value;
    

    function getLocalStorage() {
        if(localStorage.getItem('language')) {
          const lang = localStorage.getItem('language');
          getTranslate(lang);
        }
        if(localStorage.getItem('theme')) {
            const theme = localStorage.getItem('theme');
            if (theme === "sun") {
                toogleThemeSun();
            } else {
                toogleThemeMoon();
            }
          }
    }


    getLocalStorage();


    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('#hiddenMenu');
    const menuItems = document.querySelectorAll('.hiddenNavItem');
    const sun = document.querySelector('#sun');
    const moon = document.querySelector('#moon');
    


    function toogleThemeSun() {
        theme = "sun";
        sunTheme.forEach(el => {
            document.querySelectorAll(el).forEach(el1 => {
                el1.classList.add("sunTheme")
            })
        })
    }
   
   
    function toogleThemeMoon() {
        theme = "moon";
        sunTheme.forEach(el => {
            document.querySelectorAll(el).forEach(el1 => {
                el1.classList.remove("sunTheme")
            })
        })
    }
    sun.addEventListener('click', toogleThemeMoon)
    moon.addEventListener('click',toogleThemeSun);
    
    
    function toggleMenu() {
        hamburger.classList.toggle('open');
        menu.classList.toggle('open');
    }
    hamburger.addEventListener('click', toggleMenu);
    menuItems.forEach(menuItem => 
        menuItem.addEventListener('click', toggleMenu)
    );
    
    
    const portfolioPhotos = document.querySelectorAll('.photo');
    const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    function preloadPhotos(seasons) {
        seasons.forEach ( season => {
            for (let i = 1; i <= 6; i++) {
                const img = new Image();
                img.src = `./${season}/${i}.jpg`;
            }
            }
        )   
    }
    preloadPhotos(seasons);
    
    
    const portfolioBtns = document.querySelector('#portfolioButtons');
    portfolioBtns.addEventListener('click', changePhoto);
    function changePhoto(event) {
        if(event.target.tagName === "BUTTON") {
            portfolioPhotos.forEach((ph, index) => {
                ph.src = `./${event.target.dataset.season}/${index + 1}.jpg`;
                }
            )
        }
    }
    
    
    function getTranslate(lang) {
        language = lang;
        const langArray = document.querySelectorAll("*[data-i18]");
        langArray.forEach(el => {
            el.textContent = i18Obj[lang][el.dataset.i18];
        })
        if (lang === "en") {
            toggleLangEn();
        }
        if (lang === "ru") {
            toggleLangRu();
        }
    }
    en.addEventListener('click', () => getTranslate("en"));
    ru.addEventListener('click', () => getTranslate("ru"));

    function toggleLangEn() {
        en.classList.add('active');
        ru.classList.remove('active');
    }
    en.addEventListener('click', toggleLangEn);

    function toggleLangRu() {
        ru.classList.add('active');
        en.classList.remove('active');
    }
    ru.addEventListener('click', toggleLangRu);

    function toggleVideo() {
        if (video.classList.contains('play')) {
            video.classList.remove('play');
            video.classList.add('paused'); 
            play_icon.classList.remove('play');
            play_icon.classList.add('paused'); 
            play_stop_button.classList.remove('play');
            play_stop_button.classList.add('paused');
            video.play();
        } else {
            video.classList.add('play');
            video.classList.remove('paused'); 
            play_icon.classList.add('play');
            play_icon.classList.remove('paused'); 
            play_stop_button.classList.add('play');
            play_stop_button.classList.remove('paused');
            video.pause();
        }
    }
    play_stop_button.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);
    play_icon.addEventListener('click', toggleVideo);

    function color_progress_video() {
        const value = this.value;
        video.currentTime = video.duration * (value / 100);
        this.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value}%, #bdbbbb ${value}%, #bdbbbb 100%)`
        }
    function color_progress_volum() {
        const value = this.value;
        this.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value * 100}%, #bdbbbb ${value * 100}%, #bdbbbb 100%)`
        }

    progress_video.addEventListener('input', color_progress_video);
    progress_volume.addEventListener('input', color_progress_volum);

    function change_time() {
        timer.innerHTML = calc_time(video.currentTime);
        progress_video.value = Math.floor((video.currentTime / video.duration) * 100);
        progress_video.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${progress_video.value}%, #bdbbbb ${progress_video.value}%, #bdbbbb 100%)`
    }
    function calc_time(time){
        let h = Math.floor(time / (60 * 60)),
            dm = time % (60 * 60),
            m = Math.floor(dm / 60),
            ds = dm % 60,
            s = Math.ceil(ds),
            fulltime;
        if (s === 60) {
            s = 0;
            m = m + 1;
        }
        if (s < 10) {
            s = '0' + s;
        }
        if (m === 60) {
            m = 0;
            h = h + 1;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (h === 0) {
            fulltime = m + ':' + s;
        } else {
            fulltime = h + ':' + m + ':' + s;
        }
        return fulltime;
    }
    video.addEventListener('timeupdate', change_time)
    
    function change_volum () {
        video.volume = progress_volume.value;
        if (video.volume === 0) {
            volume_icon.classList.remove('unmuted');
            video.muted = true;
        } else {
            volume_icon.classList.add('unmuted');
            video.muted = false;
        }
    }
    progress_volume.addEventListener('input', change_volum);

    function toggleMute() {
        video.muted = !video.muted;
        video.muted 
            ? volume_icon.classList.remove('unmuted')
            : volume_icon.classList.add('unmuted'); 
    }
    volume_icon.addEventListener('click', toggleMute);
}
