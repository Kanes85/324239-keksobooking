'use strict';

var USER_COUNT = 8;
var TITLES = [
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
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIX_LOCATION_X = 250;
var MAX_LOCATION_X = 1150;
var MIX_LOCATION_Y = 190;
var MAX_LOCATION_Y = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var ROOMS_IN_HOUSE = 5;
var MAX_GUESTS_IN_ROOM = 10;

// Убираю класс .map--faded
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// Получение диапазона цен в интервале с шагом
var getPriceHouse = function (min, max, step) {
  var randomPriceElement = Math.floor(Math.random() * (max - min + step) / step);
    return randomPriceElement * step + min;
};

// Генерация случайного числа в заданном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Случайный номер элемента массива
var getRandomItem = function (items) {
  return items[getRandomNumber(items.length, 0)];
};

// Перемешивание массива
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

// Выдача массива массива случайной длинный
function getArrayRandomLong(array) {
  return shuffle(array).slice(0, getRandomNumber(1, array.length));
}

var generateAds = function () {
  var ads = [];

  for (var i = 0; i < USER_COUNT; i++) {
  // Определение координат X и Y
  var locationX = getRandomNumber(MIX_LOCATION_X, MAX_LOCATION_X) - PIN_WIDTH / 2;
  var locationY = getRandomNumber(MIX_LOCATION_Y, MAX_LOCATION_Y) - PIN_HEIGHT;

  // Количество комнат в доме
  var rooms = getRandomNumber(1, ROOMS_IN_HOUSE);
  // Количество гостей в доме
  var guests = getRandomNumber(1, MAX_GUESTS_IN_ROOM);

  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'// Аватар пользователя
    },
    offer: {
      title: TITLES[i], // Заголовок объявления
      address: locationX + ', ' + locationY, // Координаты на карте X и Y
      price: getPriceHouse(MIN_PRICE, MAX_PRICE, 1000), // Цена жилья в диапозоне от 1000 до 1000000  с шагом 1000
      type: getRandomItem(TYPE_APARTMENTS), // Тип жилья
      rooms: rooms, // Количество комнат
      guests: guests, // Количество гостей в доме
      checkin: getRandomItem(TIMES), // Время заезда
      checkout: getRandomItem(TIMES), // Время выезда
      features: getArrayRandomLong(FEATURES), // Массив строк случайной длины с удобствами
      description: ' ', // Пустая строка
      photos: shuffle(APARTMENT_PHOTOS) // Сортировка в произвольном порядке фотографий
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  ads.push(ad);
}
  // console.log(getEnumeration(getAvatarImage()));
  return ads;
};

var pinTemplate = document.querySelector('#pin').content;
var mapPin = pinTemplate.querySelector('.map__pin');

function renderPins(ads) {
  var pins = [];
  ads.forEach(function(ad) {
    var pinElement = mapPin.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pins.push(pinElement);
  });
  return pins;
}

var cardBlock = document.querySelector('#card').content;

// Русская локализация типа жилья ('palace', 'flat', 'house', 'bungalo')
var getTranslationType = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
  }
};

// Добавление изображений жилья в карточку .popup__photos
var getApartmentPhoto = function (photos) {
  photos.forEach(function(photo) {
    var img = document.createElement('img');
    img.src = pins.offer.photos[k];
    img.className = 'popup__photo';
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    pro.push(img);
  });
};

  // Добавление иконок удобств в карточку жилья .popup__feature
  var getFeaturesIcon = function (features) {
    faeteres.forEach(function(item) {
      var feature = document.createElement('li');
      var featureAppart = getArrayRandomLong(FEATURES);
      feature.className = 'popup__feature popup__feature--' + featureAppart;
      cardElement.querySelector('.popup__features').appendChild(feature);
    });
    // console.log(feature);
  };

  // getFeaturesIcon(ad.offer.features);

function renderCard() {
  var cardAds = cardBlock.querySelector('.map__card');
  var cardElement = cardAds.cloneNode(true);
  // var type = getTranslationType(ad.offer.type);

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTranslationType(ad.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + pins.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesIcon(ad.offer.features);
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = getApartmentPhoto(ad.offer.photos);
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  // console.log(cardElement);
  return cardElement;
};

var mapPinsBlock = document.querySelector('.map__pins');
var similarCardList = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var ads = generateAds();
var pins = renderPins(ads);

var fragment = document.createDocumentFragment();
pins.forEach(function(pin) {
  fragment.appendChild(pin);
});

mapPinsBlock.appendChild(fragment);
map.insertBefore(renderCard(renderPins), similarCardList);

console.log(mapPinsBlock);
