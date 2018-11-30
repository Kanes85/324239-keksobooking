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

 var avatarUser = ['user01',];

 var getRandomNumber = function (property) {
   var numberGenerator = property[Math.floor(Math.random() * property)];
   return numberGenerator;
 };

 var getAvatarImage = function () {
   // var avatarImage = [];
   for(var i = 0; i < 8; i++) {
   var avatarImages = 'user0' + (i + 1) + '.png';
};
// console.log(avatarImages);
return avatarImages;
};
 // };


var number = getAvatarImage();

var similarAds = [
  {
    author: {
    avatar: 'img/avatars/' + number
    }
  }
];

console.log(similarAds);
