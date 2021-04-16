// const person = {
//     nickname: '일분이',
//     age: 10,
//     introduce: function() {
//         console.log('안녕하세요 저는' + this.nickname + '이고, 나이는' + this.age + '살이에요.');
//     }
// };

// const person2 = {
//     nickname: '이분이',
//     age: 8,
//     introduce: function() {
//         console.log('안녕하세요 저는' + this.nickname + '이고, 나이는' + this.age + '살이에요.');
//     }
// };





// function Person(nickname, age) {
//     this.nickname = this.nickname;
//     this.age = age;
// }

// Person.prototype.introduce = function() {
//     console.log('안녕하세요 저는' + this.nickname + '이고, 나이는' + this.age + '살이에요.');
// };


// //인스턴스(instance)
// const person1 = new Person('일분이', 10);
// const person2 = new Person('일분이', 8);

// person1.introduce();
// person2.introduce();


function Card(num, color) {
    this.num = num;
    this.color = color;
    this.init();
}

Card.prototype = {
    constructor: Card,
    init: function() {
        const mainElem = document.createElement('div');
        mainElem.style.color = this.color;
        mainElem.innerHTML = this.num;
        mainElem.classList.add('card');
        document.body.appendChild(mainElem);
    }
};

const card1 = new Card(1, 'green');
const card2 = new Card(7, 'blue');


