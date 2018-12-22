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
var MAX_GUESTS_IN_ROOM = 4;

// Убираю класс .map--faded
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// Получение диапазона цен в интервале с шагом
var getPriceHouse = function (min, max, interval) {
  var randomePriceElement = Math.floor(Math.random() * (max - min + interval) / interval);
  var randomePrice = randomePriceElement * interval + min;
  return randomePrice;
};

// Случайное число
var getRandomItem = function (items) {
  var numberGenerator = items[Math.floor(Math.random() * items.length)];
  return numberGenerator;
};

// Генерация случайного числа в заданном диапазоне
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

// Генерация аватара
var getAvatarImage = function () {
  var avatarImages = [];
  for (var i = 0; i < USER_COUNT; i++) {
    avatarImages.push('img/avatars/user0' + (i + 1) + '.png');
};
  return avatarImages;
};

// Перемешивание массива с фотографиями
function shuffle(array){
	for(var i = array.length - 1; i > 0; i--){
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
	return array;
}

// Выдача случайной длины массива
function getArrayLength(array) {
  var arrLength = array.slice(0, getRandomNumber(1, array.length));
  return arrLength;
}

// Перебор массива
function getEnumeration (array) {
  var temp = array;
  temp.forEach(function(entry) {});
  return temp[i];
}

var findingsAds = function (usersAds) {
  var ads = [];

    // Определение координат X и Y
    var locationX = getRandomNumber(MIX_LOCATION_X, MAX_LOCATION_X) - PIN_WIDTH / 2;
    var locationY = getRandomNumber(MIX_LOCATION_Y, MAX_LOCATION_Y) - PIN_HEIGHT;

    // Количество комнат в доме
    var houseRooms = getRandomNumber(1, ROOMS_IN_HOUSE);

    // Определяем количество гостей в доме
    var getGuestsInHouse = function () {
      var guestsInRoom = Math.ceil(Math.random() * MAX_GUESTS_IN_ROOM);
      var roomsInHouse = houseRooms;
      var guestInHouse = guestsInRoom * roomsInHouse;
      return guestInHouse;
    };

    var dataAds = {
      author: {
        avatar: getEnumeration(getAvatarImage()) // Аватар пользователя
      },
      offer: {
        title: getEnumeration(TITLES), // Заголовок объявления
        address: locationX + ', ' + locationY, // Координаты на карте X и Y
        price: getPriceHouse(MIN_PRICE, MAX_PRICE, 1000), // Цена жилья в диапозоне от 1000 до 1000000  с шагом 1000
        type: getRandomItem(TYPE_APARTMENTS), // Тип жилья
        rooms: houseRooms, // Количество комнат
        guests: getGuestsInHouse(), // Количество гостей в доме
        checkin: getRandomItem(TIMES), // Время заезда
        checkout: getRandomItem(TIMES), // Время выезда
        features: getArrayLength(FEATURES), // Массив строк случайной длины с удобствами
        description: ' ', // Пустая строка
        photos: shuffle(APARTMENT_PHOTOS) // Сортировка в произвольном порядке фотографий
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    ads.push(dataAds);
  // console.log(ads);
  return ads;
};

var pinTemplate = document.querySelector('#pin').content;

function templateElement(items) {
  var mapPin = pinTemplate.querySelector('.map__pin');
  for (var i = 0; i < items.length; i++) {
    var pinData = items[i];
    var pinElement = mapPin.cloneNode(true);

    pinElement.style.left = pinData.location.x + 'px';
    pinElement.style.top = pinData.location.y + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
  }
  return pinElement;
}

var cardBlock = document.querySelector('#card').content;
function renderCard(pin) {
  var cardAds = cardBlock.querySelector('.map__card');
  for (var j = 0; j < pin.length; j++) {
    var pins = pin[j];
    var cardElement = cardAds.cloneNode(true);

    // Русская локализация типа жилья ('palace', 'flat', 'house', 'bungalo')
    var getTranslationType = function () {
      var textContent = '';
      if (pins.offer.type === 'palace') {
        textContent = 'Дворец';
      } else if (pins.offer.type === 'flat') {
        textContent = 'Квартира';
      } else if (pins.offer.type === 'house') {
        textContent = 'Дом';
      } else if (pins.offer.type === 'bungalo') {
        textContent = 'Бунгало';
      }
      return textContent;
    };

    // Добавление изображений жилья в карточку .popup__photos
    function getApartmentPhoto () {
      cardElement.querySelector('.popup__photos').innerHTML = '';
    for (var k = 0; k < APARTMENT_PHOTOS.length; k++) {
      var img = document.createElement('img');
      img.src = pins.offer.photos[k];
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      cardElement.querySelector('.popup__photos').appendChild(img);
    }
    return img;
  }

    // Добавление иконок удобств в карточку жилья .popup__feature
    function getFeaturesIcon () {
      cardElement.querySelector('.popup__features').innerHTML = '';
      var shuffleFeature = shuffle(FEATURES);
    for (var z = 0; z < getArrayLength(shuffleFeature).length; z++) {
      var feature = document.createElement('li');
      var featureAppart = getArrayLength(shuffleFeature);
      feature.className = 'popup__feature popup__feature--' + featureAppart[z];
      cardElement.querySelector('.popup__features').appendChild(feature);
    }
    return feature;
  };

    cardElement.querySelector('.popup__title').textContent = pins.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pins.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pins.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTranslationType();
    cardElement.querySelector('.popup__text--capacity').textContent = pins.offer.rooms + ' комнаты для ' + pins.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins.offer.checkin + ', выезд до ' + pins.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(getFeaturesIcon());
    cardElement.querySelector('.popup__description').textContent = pins.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(getApartmentPhoto());
    cardElement.querySelector('.popup__avatar').src = pins.author.avatar;
  }
  console.log(cardElement);
  return cardElement;
};

var fragment = document.createDocumentFragment();
var mapPinsBlock = document.querySelector('.map__pins');
var similarCardList = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var renderPin = findingsAds(USER_COUNT);
map.insertBefore(renderCard(renderPin), similarCardList);
for (var i = 0; i < USER_COUNT; i++) {
  fragment.appendChild(templateElement(findingsAds(USER_COUNT)));
};

mapPinsBlock.appendChild(fragment);
console.log(mapPinsBlock);
