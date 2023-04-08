"use strict";

//Parent class
function Builder(startValue) {
    this.value = startValue;
}

//Common methods for str and int
Builder.prototype.get = function () {
    return this.value;
}
Builder.prototype.plus = function () { }
Builder.prototype.minus = function () { }
Builder.prototype.multiply = function () { }
Builder.prototype.divide = function () { }

//Unique methods for string
Builder.prototype.remove = function (letter) {
    var result = "";
    for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] !== letter) {
            result += this.value.substring(i, i + 1);
        }
    }
    this.value = result;
    return this;
}

Builder.prototype.sub = function (start, length) {
    this.value = this.value.substr(start, length);
    return this;
}

//Unique methods for int

Builder.prototype.mod = function (number) {
    this.value %= number;
    return this;
}

// Child Class - StrBuilder in ES5
function StringBuilder(startValue) {
    Builder.call(this, startValue || "");
}

StringBuilder.prototype = Object.create(Builder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.plus = function (arg) {
    var strings = [arg];
    for (var i = 0; i < strings.length; i++) {
        this.value += strings[i];
    }
    return this;
}

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


//Child Class - IntBuilder in ES6
class IntBuilder extends Builder {
    constructor(startValue = 0) {
        super(startValue);
    }

    static random(from, to) {
        return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) - 1) + Math.ceil(from));
    }

    plus(...numbers) {
        for (let number of numbers) {
            this.value += number;
        }
        return this;
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
