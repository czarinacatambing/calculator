let currentOp;
let firstOperand;
let secondOperand;
let currentResult;
let currentFormula;
let isRepeat = false;
let prevKey;
let curKey;





function add(a, b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
	return a+b;
};

function subtract(a,b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
	return a-b
};

// function sum(a,b) {
//   // if(arr.length>0 ) {
//   //   return arr.reduce(( total, i) => total += i)
//   // }
//   // else return 0
//   return a+b
// };

function multiply(a,b) {
  // if(arr.length>0) return arr.reduce( (total, i) => total * i)
  // else return 0
  return a*b
};

function power(a,b) {
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
	return Math.pow(a,b)
};



function clear() {
  isPrevUtility=false; //only to determine if 1st/2nd operand
  isCurrentUtility=false; // only to determine if shows on result/formula on updateDisplay
  currentOp=null;
  firstOperand='';
  secondOperand='';
  currentResult=null;
  currentFormula=null;
  isRepeat = false;
  let formula = document.querySelector('div#formula')
  let result = document.querySelector('div#result')

  formula.innerText = ''
  result.innerText = ''
}


const divide = function(a,b){
  if(typeof a == 'string' || typeof b =='string'){
    a = Number(a)
    b = Number(b)
  }
  return a/b;
}

function plusminus(a){
  if(typeof a == 'string' ) a = Number(a)

  if(a<0){
    return Math.abs(a)
  } else {
    return Math.abs(a) * -1
  }
}

function decimal(a){
  return parseFloat(a.toString()+'.00').toFixed(1)
}

// NEXT STEP: UPDATE THIS FOR AFTER EQUALS IS PRESSED
// function updateDisplay(formulaVal, resultVal){
  
//   const formula = document.querySelector('div#formula')
//   const result = document.querySelector('div#result')
//   currentFormula = formula.innerText;

//   if (isCurrentUtility==false){
//     result.innerHTML= resultVal; // (isPrevUtility==true) ? formulaVal: 
//     formula.innerHTML=currentFormula; // this only works 

//   } else if (isCurrentUtility==true) {
//     formula.innerHTML= formulaVal;
//     // result.innerHTML = (i)
//     if(currentOp=='equals'|| currentOp==decimal || currentOp==plusminus) result.innerHTML = resultVal; // result of op
//   }

//   //first digit shows undefined on results
//   //second operand does not show up on results after clicking number.
//   //    it shows up on formula and results
//   // does not show up as 7x3 on formula after equals
// }


function updateDisplay(type){
  const formula = document.querySelector('div#formula')
  const result = document.querySelector('div#result')
  // type 1: [action] 1stOp clicked [formula] 1stOp only [result] N/A
  if(type===1){
    (typeof prevKey=== 'undefined' )? formula.innerHTML = '' : formula.innerHTML=firstOperand+currentOp['char']
    result.innerHTML = firstOperand
  } else if(type===2){
    (typeof secondOperand === 'undefined'|| (isRepeat && prevKey.innerTexT==="=" ) ) ?  result.innerHTML = '' : result.innerHTML = secondOperand
    formula.innerHTML = firstOperand+currentOp['char']
  } else {
    formula.innerHTML = firstOperand+currentOp['prevChar']+secondOperand
    result.innerHTML=currentOp['result']
  }
  // type 2: [action] operator clicked [formula] 1stOp, operator [result] N/A

  // type 3 : [action] = clicked [formula] 1st Op, operator, 2ndOp [result] calculation 
}


function pickOperation(key){

  switch(key.innerText){
    case 'AC': 
      clear();
    // case 'Xy': 
    //   (operand==1) ?  updateDisplay(firstOperand+key.innerText,'') : updateDisplay(secondOperand+key.innerText,'')
    //   currentOp= power;
    //   break;
    // case '/':
    //   (operand==1) ?  updateDisplay(firstOperand+key.innerText,'') : updateDisplay(secondOperand+key.innerText,'')
    //   currentOp = divide;
    //   break;
    case 'x':
      return {'function':multiply, 'char': key.innerText};
    // case '-':
    //   (operand==1) ?  updateDisplay(firstOperand+key.innerText,'') : updateDisplay(secondOperand+key.innerText,'')
    //   currentOp= subtract;
    //   break;
    // case '+':
    //   (operand==1) ?  updateDisplay(firstOperand+key.innerText,'') : updateDisplay(secondOperand+key.innerText,'')
    //   currentOp = add;
    //   break;
    case '+/-':
      return plusminus(firstOperand);
    case '.':
        currentOp=decimal
        
        if (operand==1) { 
            firstOperand = decimal(firstOperand+key.innerText)
            updateDisplay(firstOperand,'')
        } else { 
          secondOperand = decimal(secondOperand+key.innerText)

          updateDisplay(secondOperand,'')
        }
    case '=': 
        isRepeat = true;
        return {'result': currentOp['function'](firstOperand, secondOperand), 'char':'=', 'prevChar': currentOp['char']}

    default:  // equals only applies if 2 operands

      if(!(['.','+/-'].includes(key.innerText))){
        result = currentOp(firstOperand, secondOperand)
        currentOp='equals'
        isRepeat = true;
        currentResult=result;
        updateDisplay(currentFormula+secondOperand, result)
        return result;
      } 

}}



// where does updateDisplay reside??? 

function processInput(e) {
    // figure out the operation from the button pressed
    // console.log(e.currentTarget['innerHTML'])
    let key = e.currentTarget
    let operand;
    // ['innerHTML']
  


    // identify if key pressed is 1st or 2nd operand
    // if 1st operarnd is null, key = firstOperand
    // if 1st operand not null but 2nd is, key = secondOperand
    //  if both are NOT null, key will always be 2nd operand
    // if(!(firstOperand==null) && secondOperand==null && isPrevUtility==false){
    //   operand = 1;
    // } else if (firstOperand==null && secondOperand==null) {
    //   operand = 1
    // } else {
    //   operand = 2;
    // }




    if(isRepeat) {
      if(key.className=='utility' && key.innerText==="=") {
        firstOperand = currentResult;
        secondOperand = null;
        updateDisplay(2)
      } else if(key.className=='utility' && !(key.innerText==="=")){ //first operator of nth run 
        firstOperand = currentOp['result'];
        secondOperand = null;
        currentOp = pickOperation(key)
        updateDisplay(2)
        

      } else if(key.className=='digit'){
        
      } else {
        console.log("---Warning: Unhandled -----")
      }

    } else { 
      // first run and initiating first operand
      if(!(prevKey) && key.className=='digit') {
        firstOperand = key.innerText;
        updateDisplay(1)
        prevKey = key
      } else if (key.className==='digit'){
        if(prevKey.className==='digit'){
          // currentOp = pickOperation(key)

          updateDisplay(2)
          prevKey=key
        } else { // first run and 2nd operator clicked
          secondOperand=key.innerText
          updateDisplay(2)
          prevKey=key
        }
      } else {
        currentOp = pickOperation(key)
        if (key.innerText==='=') {
          updateDisplay(3) } // when = clicked during first run
        else {
          updateDisplay(2) //first run and first operator clicked
        }
        // (key.innerText==='=') ? updateDisplay(3) : updateDisplay(2)

        prevKey=key
      }
    }



  }


  const keys = document.querySelectorAll(`button`)
  keys.forEach(key=>key.addEventListener('click', 
      processInput)
  );
  



   
      // isCurrentUtility=false;

      // if(isRepeat===true) secondOperand = ''; // due to condition on digit where we assign secondOperand to be same as currentResult

      // // type out digits one by one
      // if(isPrevUtility==false) {
      //   (firstOperand==null)? firstOperand=key.innerText:firstOperand=firstOperand+key.innerText
      //   updateDisplay('',firstOperand)}
      // else if(isPrevUtility==true){
      //   (secondOperand==null)? secondOperand=key.innerText:secondOperand=secondOperand+key.innerText
      //   updateDisplay('',secondOperand)
      // }else{
      //   console.log('unhandled')
        
      // }
      // if (operand==1) { 
      //   (firstOperand==null)? firstOperand = key.innerText : firstOperand=firstOperand+key.innerText
      //   updateDisplay('',firstOperand)
      // } else { 
      //   (secondOperand==null)? secondOperand = key.innerText : secondOperand=secondOperand+key.innerText
      //   updateDisplay('',secondOperand)
      // }


      // isPrevUtility=false;
      