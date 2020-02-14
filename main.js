const inputFilter = document.querySelector('#input-container__input'); 
const errorTolltip = document.querySelector('#error-tooltip');
const reservedVariableNames = ['let', 'return'];

// Функция для смены стилей инпута
const changeInputStyles = (condition) => {            
  if (condition == false) {
    inputFilter.classList.add('input-container__input--bad');
  } else {
    inputFilter.classList.remove('input-container__input--bad');
  }
};

// Функция для проверки имени на корректность
const isTrueWord = (value) => {
  console.log(`get in trueWord ${value}`);
  let result;

  // посимвольная проверка
  for (i = 0; i < value.length; i ++) { 
    let unicode = value[i].charCodeAt(); // метод, который возращает номер символа в юникод, но в 10-ой системе исчисления!!!
    // const result = isTrueChar(value[i].charCodeAt().toString(16)); // это перевод в 16 систему!
    console.log(`unicode char in cycle = ${unicode}`);

    if ((value[0] > 47) || (value[0] < 58)) { // проверка первого символа на цифру
      return ` # The first letter can not be a number!`;
    }
    
    if ((Number(unicode) === 36) || (Number(unicode) === 95) 
    || ((Number(unicode) > 64 && Number(unicode) < 91))
    || ((Number(unicode) > 47 && Number(unicode) < 58))
    || ((Number(unicode) > 96 && Number(unicode) <= 122))) {
      console.log('true cycle');
      result =  true;
    } else {
      console.log('false cycle');
     
      return ` # Invalid character " ${value[i]} ".`; // возврат некорректного символа
    }
  }

   // проверка на зарезервированные слова
  for (k = 0; k < reservedVariableNames.length; k++) {
    if (value === reservedVariableNames[k]) {
      return '# This is a reserved name!'
    }
  } 

  return result;
};

//Функция для вывода ошибок и смены стилей подсказок
const renderError = (result) => {
  if (result === true) { 
    errorTolltip.textContent = "# This variable name is correct!";
    errorTolltip.setAttribute('style', "visibility:visible");
    errorTolltip.classList.remove('input-container__error--true');
  } else if (result === undefined) {
    errorTolltip.textContent = "";
    errorTolltip.setAttribute('style', "visibility:hidden");
    errorTolltip.classList.remove('input-container__error--true');
  } else {
    errorTolltip.classList.add('input-container__error--true');
    errorTolltip.textContent = result;
  }
};


// Обработчик ввода символов в инпут
inputFilter.addEventListener('input', () => {
  const value = inputFilter.value;
  console.log(`передали в обработчике ${value}`);
  const result = isTrueWord(value);
  
  if (result === true || result === undefined) {
    console.log(result);
    changeInputStyles(true);
    renderError(result);
  } else {
    changeInputStyles(false);
    renderError(result);
  }
});
