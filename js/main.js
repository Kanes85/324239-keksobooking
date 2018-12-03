var USER_AVATAR = 8;
var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
 ];
 var typeMas = ['palace', 'flat', 'house', 'bungalo'];
 var checkMas = ['12:00', '13:00', '14:00'];
 var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
 var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
 // var photosMas = [1, 2, 3];

// Получение диапазона price
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

 var getAvatarImage = function () {
    var avatarImages = [];
    for(var i = 0; i < USER_AVATAR; i++) {
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

// Перемешивание массива photos
// var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// function compareRandom() {
//   return Math.random() - 0.5;
// }

function random (min, max, l) {
  var arr = [], m = [], n = 0;
  if (max - min < l-1) return;
  for(var i=0; i<=(max-min); i++)
  m[i] = i + min;
  for (var i=0; i<l; i++) {
    n = Math.floor(Math.random()*(m.length));
    arr[i]= m.splice(n, 1)[0];};
  return arr
}
// console.log(JSON.stringify(random(0,2,3)));

var photo = function () {
  var mas = [];
  // for(var i = 0; i < photosMas.length; i++) {
    mas.push(random(0,2,3));
  // }
  // mas = i;
photosMas
  console.log(mas);
  // return mas;
};
photo();


// function random (min, max, l) {
//   var arr = [], m = [], n = 0;
//   if (max - min < l-1) return;
//   for(var i=0; i<=(max-min); i++)
//   m[i] = i + min;
//   for (var i=0; i<l; i++) {
//     n = Math.floor(Math.random()*(m.length));
//     arr[i]= m.splice(n,1)[0];};
//   return arr
// }
// console.log(JSON.stringify(random(0,2,3)));

var massiv = [
  {
    author: {
      avatar: 'img/avatars/' + getRandomNumber(getAvatarImage())
    },
    offer: {
      title: getRandomNumber(offerTitle),  //Значения не должны повторяться
      address: '600, 350',  //"{{location.x}}, {{location.y}}", например, "600, 350"
      price: getPriceHouse(1000, 1000000, 1000),
      type: getRandomNumber(typeMas),
      rooms: houesRooms,
      guests: getGuestsInHouse(),
      checkin: getRandomNumber(checkMas),
      checkout: getRandomNumber(checkMas),
      features: getRandomNumber(featuresMas), //ассив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
      description: ' ',
      // photos: photosMas.sort(compareRandom),
      // photos: random(0,2,3)
    },
    location: {
      x: 360, //«x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: getRandomNumb(130, 630)
    }
  }

];
console.log(massiv);
