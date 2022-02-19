let currentOp;
let firstOperand;
let secondOperand;

function add(a, b) {
	return a +b
};

function subtract(a,b) {
	return a-b
};

function sum(arr) {
  if(arr.length>0 ) {
    return arr.reduce(( total, i) => total += i)
  }
  else return 0
};

function multiply(arr) {
  if(arr.length>0) return arr.reduce( (total, i) => total * i)
  else return 0
};

function power(a,b) {
	return Math.pow(a,b)
};

function factorial(a) {
  let total=1;
	for(let i=a;i>0;i--){
   total = total*i
  }
  return total
};

function clear(a) {
  return
}

function equals(a){
  return a;
}

function divide(a,b){
  return a/b;
}

function plusminus(a){
  if(a<0){
    return Math.abs(a)
  } else {
    return Math.abs(a) * -1
  }
}

const decimal = function(a){
  return parseFloat(CONCAT(a.toString(),'.00'))
}


function processInput(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    var util = e.currentTarget.innerHTML
    // ['innerHTML']
    switch(util){
      case 'AC': 
        return clear;
        break;
      case 'Xy': 
        return power(firstOperand, secondOperand);
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


const keys = document.querySelectorAll(`button`)
keys.forEach(key=>key.addEventListener('click', 
    processInput)
);


