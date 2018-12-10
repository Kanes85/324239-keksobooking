'use strict';

var USERS = 8;
var TITLE_DESCRIPTION = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
 ];
 var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
 var TIMES = ['12:00', '13:00', '14:00'];
 var ADDITIONALLY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
 var PHOTOS_APARTMENT = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

 var MIN_PRICE = 1000;
 var MAX_PRICE = 1000000;


// Получение диапазона цен
var getPriceHouse = function (min, max, interval) {
  var randomePriceElement = Math.floor(Math.random()*(max-min+interval)/interval);
  var randomePrice = randomePriceElement * interval + min;
  return randomePrice;
};

 var getRandomNumber = function (property) {
   var numberGenerator = property[Math.floor(Math.random() * property.length)];
   return numberGenerator;
 };

// Генерация случайного числа в заданном диапазоне
 var getRandomNumb = function (min, max) {
   var rand = Math.ceil(Math.random() * (min - max) + max);
   return rand;
   };

// Генерация случайного номера аватара
 var getAvatarImage = function () {
    var avatarImages = [];
    for(var i = 0; i < USERS; i++) {
      avatarImages.push('user0' + (i + 1) + '.png');
    };
    return avatarImages;
};

var getRandomNumb = function (min, max) {
  var rand = Math.ceil(Math.random() * (min - max) + max)
  return rand;
  };

// Количество комнат в доме
var houesRooms = getRandomNumb(0, 5);

// Определяем количество гостей в доме
var getGuestsInHouse = function () {
 var guestsInRoom = Math.ceil(Math.random() * 4);
 var roomsInHouse = houesRooms;
 var guestInHouse = guestsInRoom * roomsInHouse;
 return guestInHouse;
};

// Перемешивание массива с фотографиями
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Определение ширины карты
var getWidthBlock = function (left) {
  var elem = document.querySelector('.map__pins');
  var widthMap = getComputedStyle(elem).width;
  var widthBlock = parseInt(widthMap, 10);
  return getRandomNumb(left, widthBlock);
};

var massiv = [
  {
    author: {
      avatar: 'img/avatars/' + getRandomNumber(getAvatarImage())
    },
    offer: {
      title: getRandomNumber(TITLE_DESCRIPTION),  //Значения не должны повторяться
      address: '600, 350',  //"{{location.x}}, {{location.y}}", например, "600, 350"
      price: getPriceHouse(MIN_PRICE, MAX_PRICE, 1000),
      type: getRandomNumber(TYPE_APARTMENTS),
      rooms: houesRooms,
      guests: getGuestsInHouse(),
      checkin: getRandomNumber(TIMES),
      checkout: getRandomNumber(TIMES),
      features: getRandomNumber(ADDITIONALLY), //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
      description: ' ',
      photos: shuffleArray(PHOTOS_APARTMENT)  //Сортировка в произвольном порядке фотографий
    },
    location: {
      x: getWidthBlock(150),
      y: getRandomNumb(130, 630)
    }
  }
];
console.log(massiv);
