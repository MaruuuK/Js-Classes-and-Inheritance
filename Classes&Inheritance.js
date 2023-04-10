"use strict";

//Parent class
function Builder(startValue) {
    this.value = startValue;
}

//Common methods for str and int
Builder.prototype.get = function () {
    return this.value;
}

Builder.prototype.plus = function () {
    for (var i = 0; i < arguments.length; i++) {
        this.value += arguments[i];
    }
    return this;
}

Builder.prototype.minus = function () { }
Builder.prototype.multiply = function () { }
Builder.prototype.divide = function () { }

// Child Class - StrBuilder in ES5
function StringBuilder(startValue) {
    Builder.call(this, startValue || "");
}

StringBuilder.prototype = Object.create(Builder.prototype);

//Methods of StringBuilder
StringBuilder.prototype.minus = function (number) {
    this.value = this.value.slice(0, this.value.length - number);
    return this;
}

StringBuilder.prototype.multiply = function (number) {
    this.value = this.value.repeat(number);
    return this;
}

StringBuilder.prototype.divide = function (number) {
    this.value = this.value.slice(0, number);
    return this;
}

StringBuilder.prototype.remove = function (str) {
    this.value = this.value.slice(0, this.value.indexOf(str));
    return this;
}

StringBuilder.prototype.sub = function (start, length) {
    this.value = this.value.substr(start, length);
    return this;
}

//Child Class - IntBuilder in ES6
class IntBuilder extends Builder {
    constructor(startValue = 0) {
        super(startValue);
    }

    static random(from, to) {
        return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) - 1) + Math.ceil(from));
    }

    minus(...numbers) {
        for (let number of numbers) {
            this.value -= number;
        }
        return this;
    }

    multiply(number) {
        this.value *= number;
        return this;
    }

    divide(number) {
        this.value /= number;
        return this;
    }

    mod(number) {
        this.value %= number;
        return this;
    }
}

// Example with string
const strBuilder = new StringBuilder('Hello'); // 'Hello';
console.log(strBuilder
    .plus(' all', '!')                         // 'Hello all!'
    .minus(4)                                  // 'Hello '
    .multiply(3)                               // 'Hello Hello Hello '
    .divide(4)                                 // 'Hell';
    .remove('l')                               // 'He';
    .sub(1, 1)                                  // 'e';
    .get());


//Example with int
let intBuilder = new IntBuilder(10); // 10;
console.log(intBuilder
    .plus(2, 3, 2)                     // 17;
    .minus(1, 2)                       // 14;
    .multiply(2)                       // 28;
    .divide(4)                         // 7;
    .mod(3)                            // 1;
    .get());                            // -> 1;

console.log(IntBuilder.random(10, 100));
