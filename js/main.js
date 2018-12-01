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





 var getRandomNumber = function (property) {
   var numberGenerator = property[Math.floor(Math.random() * property.length)];
   return numberGenerator;
 };

 var getRandomNumb = function (min, max) {
   var rand = Math.ceil(Math.random() * (min - max) + max)
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

var userData = function () {
  var virt = getAvatarImage();
  var avat = 'img/avatars/' + getRandomNumber(virt);
  var offer = getRandomNumber(offerTitle);
  var price = getRandomNumb(1000, 100000); //круглые значения с шагом 1000
  var type = getRandomNumber(typeMas); //нужно переводить на русский?
  var rooms = getRandomNumb(0, 5);
  var guests = getRandomNumb(1, 15); //Гостей иногда слишком много!
  var checkin = getRandomNumber(checkMas);
  var checkout = getRandomNumber(checkMas);
  var features = getRandomNumber(featuresMas); //вывести несколько массивов!
  var photos = getRandomNumber(photosMas); //Должны выводиться все три в произвольном порядке
  // var locationX =
  var locationY = getRandomNumb(130, 630);
  console.log(avat);
  console.log(offer);
  console.log(price);
  console.log(type);
  console.log(rooms);
  console.log(guests);
  console.log(checkin);
  console.log(checkout);
  console.log(features);
  console.log(photos);
  // console.log(locationX);
  console.log(locationY);
}

userData();
