let isPrevUtility=false;
let currentOp;
let firstOperand;
let secondOperand;
let prevSelection;



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


function updateDisplay(val){
  const formula = document.querySelector('div#formula')
  const result = document.querySelector('div#result')
  result.innerHTML=val;
}

function processInput(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    var key = e.currentTarget
    // ['innerHTML']
  
    

    if(key.className=='utility') {
      isPrevUtility=true;
      
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
        default:
          return equals;
      }
    } else if(key.className=='digit'){
      // type out digits one by one
      if(isPrevUtility==false) {
        (firstOperand==null)? firstOperand=key.innerText:firstOperand=firstOperand+key.innerText
        updateDisplay(firstOperand)}
      else if(isPrevUtility==true){
        (secondOperand==null)? secondOperand=key.innerText:secondOperand=secondOperand+key.innerText
        updateDisplay(secondOperand)
      }else{
        console.log('unhandled')
        
      }
      
      
      // secondOperand=key.innerHTML //replace old values in second operand
    }
    



}


const keys = document.querySelectorAll(`button`)
keys.forEach(key=>key.addEventListener('click', 
    processInput)
);


