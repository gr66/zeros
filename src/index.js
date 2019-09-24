module.exports = function zeros(expression) {
    let res = "1";

    expression = expression.split("*");
    expression.forEach(function (phrase) {
        phrase = phrase.split("!");
        res = multiply(res, extraLongFactorial(phrase.shift(), phrase.length));
    });
    return counter(res);
}

function factorial (n, j) {
    return n <= j ? n : n * factorial(n - j, j);
}

function counter(num) {
    let count = 0;
    for(let i = num.length - 1; i >= 0; i--) {
        if (num[i] == '0') {
            count++;
        } else {
            return count;
        }
    }
}

function extraLongFactorial(n, j) {
    let fact = 1;

    for (let i = n; j <= i; i -= j) {
        if(Number.isSafeInteger(fact * i)) {
            fact = fact * i;
        } else {
            let factString = "0";
            for(let s = 0; s < i; s++) {
                factString = add(factString, fact.toString());
            }
            fact = factString;
        }
    }
    return String(fact);
}

/**
 * Program to add VERY large numbers in javascript
 * Note - numbers should be passed as strings.
 * example -
 * add("15", "15");  // returns "30"
 *
 */
function add(str1, str2) {

    let sum = "";  // our result will be stored in a string.

    // we'll need these in the program many times.
    let str1Length = str1.length;
    let str2Length = str2.length;

    // if s2 is longer than s1, swap them.
    if(str2Length > str1Length ){
        let temp = str2;
        str2 = str1;
        str1 = temp;
    }

    let carry = 0;  // number that is carried to next decimal place, initially zero.
    let a;
    let b;
    let temp;
    let digitSum;
    for (let i = 0; i < str1.length; i++) {
        a = parseInt(str1.charAt(str1.length - 1 - i));      // get ith digit of str1 from right, we store it in a
        b = parseInt(str2.charAt(str2.length - 1 - i));      // get ith digit of str2 from right, we store it in b
        b = (b) ? b : 0;                                    // make sure b is a number, (this is useful in case, str2 is shorter than str1
        temp = (carry + a + b).toString();                  // add a and b along with carry, store it in a temp string.
        digitSum = temp.charAt(temp.length - 1);            //
        carry = parseInt(temp.substr(0, temp.length - 1));  // split the string into carry and digitSum ( least significant digit of abSum.
        carry = (carry) ? carry : 0;                        // if carry is not number, make it zero.

        sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;  // append digitSum to 'sum'. If we reach leftmost digit, append abSum which includes carry too.

    }

    return sum;     // return sum
}

function multiply(a, b) {
    if ((a.length + b.length) < 12) {
        return (parseInt(a) * parseInt(b)).toString();
    }

    a = a.split('').reverse();
    b = b.split('').reverse();
    var result = [];

    for (var i = 0; a[i] >= 0; i++) {
        for (var j = 0; b[j] >= 0; j++) {
            if (!result[i + j]) {
                result[i + j] = 0;
            }

            result[i + j] += a[i] * b[j];
        }
    }

    for (i = 0; result[i] >= 0; i++) {
        if (result[i] >= 10) {
            if (!result[i + 1]) {
                result[i + 1] = 0;
            }

            result[i + 1] += parseInt(result[i] / 10);
            result[i] %= 10;
        }
    }

    result.reverse();
    for (i = 0; i < result.length; i++){
        if (result[i] === 0){
            result.splice(i--, 1);
        }else{
            i = result.length * 2;
        }
    }

    return result.join('');
}
