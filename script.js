const add = function(a, b) {
	return a +b
};

const subtract = function(a,b) {
	return a-b
};

const sum = function(arr) {
  if(arr.length>0 ) {
    return arr.reduce(( total, i) => total += i)}
  else return 0
};

const multiply = function(arr) {
  if(arr.length>0) return arr.reduce( (total, i) => total * i)
  else return 0
};

const power = function(a,b) {
	return Math.pow(a,b)
};

const factorial = function(a) {
  let total=1;
	for(let i=a;i>0;i--){
   total = total*i
  }
  return total
};

const clear = function(a) {
  return
}

let total;
const operate = function(op, a, b){
    if(typeof total==='undefined') total = a
    total = op(total,b)
    return total
}

const equals = function(a){
  return a;
}

const divide = function (a,b){
  return a/b;
}

const plusminus = function(a){
  if(a<0){
    return Math.abs(a)
  } else {
    return Math.abs(a) * -1
  }
}

const decimal = function(a){
  return parseFloat(CONCAT(a.toString(),'.00'))
}

function pressUtility(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    var util = e.currentTarget.innerHTML
    // ['innerHTML']
    switch(util){
      case 'AC': 
        return clear;
        break;
      case 'Xy': 
        return power;
        break;
      case 'x!':
        return factorial;
        break;
      case '/':
        return divide;
        break;
      case 'x':
        return multiply;
        break;
      case '-':
        return subtract;
        break;
      case '+':
        return add;
        break;
      case '+/-':
        return plusminus;
        break;
      case '.':
        return decimal;
        break;
      default:
        return equals;
    }



}


const keys = document.querySelectorAll(`button.utility`)
keys.forEach(key=>key.addEventListener('click', 
    pressUtility)
);
