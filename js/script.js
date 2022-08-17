const timeBoard = document.querySelector('.time');
const dateBoard = document.querySelector('.date');
const greetingText = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weather = document.querySelector('.weather');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const feels = document.querySelector('.feels');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const changeQuoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const btnLanguagesBe = document.querySelector('.lang-be');
const btnLanguagesEn = document.querySelector('.lang-en');
const btnLang = document.querySelectorAll('.lang');
const footer = document.querySelector('footer');


let lang = 'be';

/*   ---   switching languages   ---   */

const switchingLanguages = () => {
  btnLang.forEach(btn => {
    btn.addEventListener('click', () => {
      btnLang.forEach(btn => {
        btn.classList.remove('active')
      })
      if(!btn.classList.contains('active')) {
      btn.classList.add('active');
      };
      if (btnLanguagesBe.classList.contains('active')) {
        lang = 'be';
      } else {
        lang = 'en';
      }
      // location.href = `${window.location.pathname}#${lang}`;
      getWeather();
      getQuotes();
      placeHolderChange();
    });
   }) 
}


 
switchingLanguages();

/*   ---   date   ---   */
const dayWeek = {
  'be': ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
  'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

const showDate = () => {
  const monthYear = ['студзеня', 'лютага', 'сакавіка', 
  'красавіка', 'мая', 'чэрвеня', 
  'ліпеня', 'жнівня', 'верасня', 
  'кастрычніка', 'лістапада', 'снежня'
];
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric'
  };
  const month = date.getMonth();
  const numberDay = date.getDay();
  const currentDate = date.toLocaleDateString('en-En', options);
  if (lang === 'be') {
    dateBoard.textContent = `${dayWeek[lang][numberDay]}, ${date.toLocaleDateString('en-en',{ day : 'numeric' })} ${monthYear[month]}`;
  } else {
    lang = 'en';
    dateBoard.textContent = `${dayWeek[lang][numberDay]}, ${currentDate}`;
  }
}

/*   ---   greeting   ---   */

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = {
    'be': ['Дабранач', 'Добрай раніцы', 'Добры дзень', 'Добры вечар'],
    'en': ['Good night', 'Good morning', 'Good afternoon', 'Good evening']
  }
  let count = Math.floor(hours / 6);
  return timeOfDay[lang][count];
}

const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  greetingText.textContent = `${timeOfDay},`;
}

const placeHolder = {
  'be': '[Увядзіце імя]',
  'en': '[Enter name]'
}

const placeHolderChange = () => {
  name.placeholder = placeHolder[lang]
}

placeHolderChange();

const setLocalStorage = () => {
  // lang = window.location.hash.substring(1);
  localStorage.setItem('name', name.value);
  // localStorage.setItem('lang', lang);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  // if (localStorage.getItem('lang') === 'en') {
  //   btnLanguagesBe.classList.remove('active');
  //   btnLanguagesEn.classList.add('active');
  // }
  //   lang = localStorage.getItem('lang');
  //   getWeather();
  //   getQuotes();
  //   placeHolderChange();
}
window.addEventListener('load', getLocalStorage);


/*   ---   background   ---   */

const getTimeOfDayBg = () => {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  let count = Math.floor(hours / 6);
  return timeOfDay[count];
}

let randomNum = 0;

const setBg = () => {
  const timeOfDay = getTimeOfDayBg();
  let bgNum = randomNum.toString().padStart(2, 0);
  const img = new Image();
  let src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.src = src;
  img.addEventListener('load', () => {      
    document.body.style.backgroundImage = `url(${src})`;
    }
  )
}

const getRandomNum = () => {
  randomNum = Math.ceil(Math.random() * 20);
  setBg();
}
getRandomNum();

const getSlidePrev = () => {
  if (randomNum < 2) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}

const getSlideNext = () => {
  if (randomNum > 19) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

/*   ----   time   ----   */

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeBoard.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();

/*   ---   weather   ---   */

const arrayWeather = {
  'be': {
    wind: 'Хуткасць ветру',
    feels: 'Адчуваецца',
    humidity: 'Вільготнасць',
    errorText: 'Памылка! Увядзіце ваш горад!',
    speedUnit: 'м/с'
  },
  'en': {
    wind: 'Wind speed',
    feels: 'Feels like',
    humidity: 'Humidity',
    errorText: 'Error! Enter your city!',
    speedUnit: 'm/s'
  }
}

const tempF = document.querySelector('.temp-f');
const temp = document.querySelectorAll('.temp');
let unitTemperature = {
  a: 1, 
  b: 0,
  c: '°C'
};

const temperatureScale = () => {
  temp.forEach(btn => {
    btn.addEventListener('click', () => {
      temp.forEach(btn => {
        btn.classList.remove('active');
      })
      if (!btn.classList.contains('active')) {
        btn.classList.add('active');
      }
      if (tempF.classList.contains('active')) {
        unitTemperature = {
          a: 9 / 5,
          b: 32,
          c: '°F'
        }
      } else {
        unitTemperature = {
          a: 1, 
          b: 0,
          c: '°C'
        };
      }
      getWeather();
    })
  })
}

temperatureScale();

function getWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=565978bc4df34911533625cad110876b&units=metric`)
    .then(res => res.json())
    .then(data => {
      weatherIcon.style.backgroundImage = `url("http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png")`;
      temperature.textContent = `${Math.round(data.main.temp * unitTemperature.a) + unitTemperature.b}${unitTemperature.c}`;
      weatherDescription.textContent = data.weather[0].description;
      feels.textContent = `${arrayWeather[lang].feels}: ${Math.round(data.main.feels_like * unitTemperature.a) + unitTemperature.b}${unitTemperature.c}`;
      wind.textContent = `${arrayWeather[lang].wind}: ${Math.round(data.wind.speed)}${arrayWeather[lang].speedUnit}`;
      humidity.textContent = `${arrayWeather[lang].humidity}: ${data.main.humidity}%`
    })
    .catch(() => {
      document.querySelector('.weather-error').textContent = arrayWeather[lang].errorText;
      weatherIcon.style.display = 'none';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      feels.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
    })
}
getWeather();

city.addEventListener('change', getWeather);

/*   ---   quotes   ---   */

function getQuotes() {
  const quotes = 'data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      let randomQuotesNum = Math.round(Math.round((Math.round( Math.random() * (data[0].en.length - 1) * 1000)) / 100) / 10)
      quote.textContent = data[0][lang][randomQuotesNum].text;
      author.textContent = data[0][lang][randomQuotesNum].author;
    })
}
getQuotes();

changeQuoteBtn.addEventListener('click', getQuotes)

/*   ---   playlist   ---   */

const playListContainer = document.querySelector('.play-list');
let playNum = 0;

const playlistBuild = () => {
  playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
  })
}

playlistBuild();

const track = document.querySelectorAll('.play-item');

const selectTrack = (playNum) => {
  if (!track[playNum].classList.contains('item-active')) {
      track.forEach(item => {
        item.classList.remove('item-active');
      })
        track[playNum].classList.add('item-active');
    }
}

const playTrack = () => {
  track.forEach((el, playNum) => {
    el.addEventListener('click', () => {
      audio.src = playList[playNum].src;
      audio.play();
      isPlay = true;
      playBtn.classList.add('pause');
      selectTrack(playNum);
    })
  })
}

playTrack();

/*   ---   player   ---   */

const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');

import playList from "./playList.js";
let isPlay = false;
const audio = new Audio();

const playAudio = () => {
  audio.currentTime = 0;
  audio.src = playList[playNum].src;
  if (!isPlay) {
    isPlay = true;
    audio.play();
    playBtn.classList.add('pause');
  } else {
    isPlay = false;
    audio.pause();
  }
}

const toggleBtn = () => {
  playBtn.classList.toggle('pause');
  playAudio();
}

const playNext = () => {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }
  isPlay = false;
  playAudio();
  selectTrack(playNum);
}

const playPrev = () => {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  isPlay = false;
  playAudio();
  selectTrack(playNum);
}

playBtn.addEventListener('click', toggleBtn);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

/*   ---   setting   ---   */

const settingBtn = document.querySelector('.setting-button');
const settingPanel = document.querySelector('.setting');
const hidden = document.querySelector('.hidden');

let isSettingMenu= false;

const settingMenu = () => {
  if (!isSettingMenu) {
    hidden.style.display = 'block';
    settingPanel.style.transform = 'translateX(30px)';
    isSettingMenu = true;
  } else {
    hidden.style.display = 'none';
    settingPanel.style.transform = '';
    isSettingMenu = false;    
  }
}

const toggleSettingBtn = () => {
  settingBtn.classList.toggle('active');
}

settingBtn.addEventListener('click', () => {
  settingMenu();
  toggleSettingBtn();
})

hidden.addEventListener('click', () => {
  hidden.style.display = 'none';
  settingPanel.style.transform = '';
  isSettingMenu = false;
  settingBtn.classList.remove('active');
})

const player = document.querySelector('.player');
const state = {
  language: 'en',
  photoSource: 'github',
  blocks: [timeBoard, dateBoard, greetingText, name, footer, weather]
}

const onOff = document.querySelectorAll('.on-off');

  onOff.forEach((btn, index) => {
    state.blocks[index].classList.add('block');
    btn.addEventListener('click', () => {
      if (!btn.checked) {
        state.blocks[index].style.opacity = '0'
      } else {
        state.blocks[index].style.opacity = '1'
      }
    })
  })
