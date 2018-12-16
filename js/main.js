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

var MAX_GUEST_IN_ROOM = 4;

//Убираю класс .map--faded
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

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

// Выдача случайной длины массива
function getArrayLength(array) {
  var arrLength = array.slice();
  arrLength.length = getRandomNumb(1, array.length);
  return arrLength;
}

// Определение ширины карты
var getWidthBlock = function (left) {
  var elem = document.querySelector('.map__overlay');
  var widthMap = getComputedStyle(elem).width;
  var widthBlock = parseInt(widthMap, 10);
  return getRandomNumb(left, widthBlock);
};

var findingsAds = function (usersAds) {
  var ads = [];

  for(var i = 0; i < usersAds; i++) {

    // Определение координат X и Y
    var locationX = getWidthBlock(190);
    var locationY = getRandomNumb(190, 630);

    // Количество комнат в доме
    var houesRooms = getRandomNumb(0, 5);

    // Определяем количество гостей в доме
    var getGuestsInHouse = function () {
     var guestsInRoom = Math.ceil(Math.random() * MAX_GUEST_IN_ROOM);
     var roomsInHouse = houesRooms;
     var guestInHouse = guestsInRoom * roomsInHouse;
     return guestInHouse;
    };

    var dataAds =  {
        author: {
          avatar: 'img/avatars/' + getRandomNumber(getAvatarImage())
        },
        offer: {
          title: getRandomNumber(TITLE_DESCRIPTION),  //Аватар пользователя
          address: locationX + ', ' + locationY, //Координаты на карте X и Y
          price: getPriceHouse(MIN_PRICE, MAX_PRICE, 1000), //Цена жилья в диапозоне от 1000 до 1000000  с шагом 1000
          type: getRandomNumber(TYPE_APARTMENTS), //Тип жилья
          rooms: houesRooms, //Количество комнат
          guests: getGuestsInHouse(), //Количество гостей в доме
          checkin: getRandomNumber(TIMES), //Время заезда
          checkout: getRandomNumber(TIMES), //Время выезда
          features: getArrayLength(ADDITIONALLY), //Массив строк случайной длины с удобствами
          description: ' ', //Пустая строка
          photos: shuffleArray(PHOTOS_APARTMENT)  //Сортировка в произвольном порядке фотографий
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      ads.push(dataAds);
    }
  return ads;
};

var pinTemplate = document.querySelector('#pin').content;

function templateElement (arr) {
  var mapPin = pinTemplate.querySelector('.map__pin');
    for(var i = 0; i < arr.length; i++) {
      var pinData = arr[i];
      var pinElement = mapPin.cloneNode(true);

pinElement.style.left = pinData.location.x + 'px';
pinElement.style.top = pinData.location.y + 'px';
pinElement.querySelector('img').src = pinData.author.avatar;
pinElement.querySelector('img').alt = pinData.offer.title;
// console.log(pinElement);
};
return pinElement;
};

// templateElement(findingsAds(USERS));

var cardBlock = document.querySelector('#card').content;

function renderCard (pin) {
  var cardAds = cardBlock.querySelector('.map__card');
  for(var j = 0; j < pin.length; j++) {
    var pins = pin[j];
  var cardElement = cardAds.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = pins.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pins.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pins.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pins.offer.type; //Доработать
  cardElement.querySelector('.popup__text--capacity').textContent = pins.offer.rooms + ' комнаты для ' + pins.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  pins.offer.checkin + ', выезд до ' + pins.offer.checkout;
  // cardElement.querySelector('.popup__features').textContent = pins.offer.features;
  cardElement.querySelector('.popup__description').textContent = pins.offer.description;
  // cardElement.querySelector('.popup__photos').innerHTML = pins.offer.photos;
  cardElement.querySelector('.popup__avatar').src = pins.author.avatar;
  // console.log(cardElement);
};
  return cardElement;
};

// renderCard(findingsAds(USERS));






var fragment = document.createDocumentFragment();
var mapPinsBlock = document.querySelector('.map__pins');
var similarCardList = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var pinki = findingsAds(USERS);

map.insertBefore(renderCard(pinki), similarCardList);
for (var i = 0; i < USERS; i++) {
  // var pinsBlockGenerate = mapPinsBlock.cloneNode(true);
  fragment.appendChild(templateElement(pinki));
};

mapPinsBlock.appendChild(fragment);
