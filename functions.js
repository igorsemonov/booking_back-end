
const {titles, types, checkpoints, comfort, descriptions, images} = require('./variables.js');

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomElement(array){
    return array[Math.floor(Math.random() * array.length)];
};

function getAvatar(){
    return `img/avatars/user0${getRandomInt(1,8)}.png`;
};

function getRandomFloatingPointNum(min, max){
    return (min + Math.random() * (max - min)).toFixed(5);
};

function advert(){
    const location = {
        x: getRandomFloatingPointNum(35.65000, 35.70000),
        y: getRandomFloatingPointNum(139.70000, 139.80000)
    };
    return {
    author: {
        avatar: getAvatar()
    },
    offer: {
        title: getRandomElement(titles),
        address: `${location.x}, ${location.y}`,
        price: getRandomInt(100, 500),
        type: getRandomElement(types),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 5),
        checkin: getRandomElement(checkpoints),
        checkout: getRandomElement(checkpoints),
        features: comfort.slice(0, getRandomInt(1, comfort.length)),
        description: getRandomElement(descriptions),
        photos: images.slice(0, getRandomInt(1, images.length))
    },
    location
    };
};

const ads = Array.from({length: 10}, () => advert());

module.exports = {ads};