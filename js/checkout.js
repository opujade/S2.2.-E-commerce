const alphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïð'.split(
    ''
  );
// Get the input fields
const fName = document.getElementById('fName');
const fEmail = document.getElementById('fEmail');
const fAddress = document.getElementById('fAddress');
const fLastN = document.getElementById('fLastN');
const fPassword = document.getElementById('fPassword');
const fPhone = document.getElementById('fPhone');

fName.addEventListener('keyup', () => validateNameLast(fName));
fEmail.addEventListener('keyup', () => validateMail(fEmail));
fAddress.addEventListener('keyup', () => validateAddress(fAddress));
fLastN.addEventListener('keyup', () => validateNameLast(fLastN));
fPassword.addEventListener('keyup', () => validatePassword(fPassword));
fPhone.addEventListener('keyup', () => validatePhone(fPhone));

// Exercise 6
function validate() {
  // Validate calls
  validateNameLast(fName);
  validateNameLast(fLastN);
  validateMail(fEmail);
  validateAddress(fAddress);
  validatePassword(fPassword);
  validatePhone(fPhone);
}

//Validate Name and Last Name Form
const validateNameLast = (item) => {
  if (!validateLength(item.value) || !validateAlphabet(item.value)) {
    item.classList = 'form-control is-invalid';
    return false;
  } else {
    item.classList = 'form-control is-valid';
    return true;
  }
};
// Validate Mail Form
const validateMail = (mail) => {
  if (!validateLength(mail.value) || !validateMailAt(mail.value)) {
    mail.classList = 'form-control is-invalid';
  } else {
    mail.classList = 'form-control is-valid';
  }
};
// Validate Adress Form
const validateAddress = (address) => {
  if (!validateLength(address.value)) {
    address.classList = 'form-control is-invalid';
  } else {
    address.classList = 'form-control is-valid';
  }
};
// Validate Password Form
const validatePassword = (password) => {
  if (
    !validateLength(password.value) ||
    !validatePasswordChar(password.value)
  ) {
    password.classList = 'form-control is-invalid';
  } else {
    password.classList = 'form-control is-valid';
  }
};
// Validate Phone Form
const validatePhone = (phone) => {
  if (!validateLength(phone.value) || isNaN(phone.value)) {
    error++;
    phone.classList = 'form-control is-invalid';
  } else {
    phone.classList = 'form-control is-valid';
  }
};

// Validate Length
const validateLength = (value) => (value.length < 3 ? false : true);
// Validate Letters of Alphabet
const validateAlphabet = (word) => {
  let correct = true;
  word = word.split('');
  word.forEach((e) => {
    if (!alphabet.includes(e)) {
      correct = false;
    }
  });
  return correct;
};
// Validate Password CharType
const validatePasswordChar = (password) => {
  let countAlph = 0;
  let countNum = 0;

  password = password.split('');
  password.forEach((e) => {
    if (alphabet.includes(e)) {
      // If password has a letter
      countAlph++;
    } else if (!isNaN(e)) {
      // If password has a number
      countNum++;
    }
  });

  if (countAlph > 0 && countNum > 0) {
    return true;
  } else {
    return false;
  }
};
// Validate Mail Contains @
const validateMailAt = (mail) => {
  let correct = false;
  mail = mail.split('');
  mail.forEach((e) => {
    if (e == '@') {
      correct = true;
    }
  });
  return correct;
};
