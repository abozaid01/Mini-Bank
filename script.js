'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97,
    1300,
  ],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-14T17:01:17.194Z',
    '2023-08-16T20:36:17.929Z',
    '2023-08-17T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [
    5000, 3400, -150, -790, -3210, -1000, 8500, -30,
  ],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2022-06-25T06:04:23.907Z',
    '2022-03-25T14:18:46.235Z',
    '2022-08-05T16:33:06.386Z',
    '2022-01-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
  ],
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector(
  '.balance__value'
);
const labelSumIn = document.querySelector(
  '.summary__value--in'
);
const labelSumOut = document.querySelector(
  '.summary__value--out'
);
const labelSumInterest = document.querySelector(
  '.summary__value--interest'
);
const labelTimer = document.querySelector('.timer');

const usersApp = document.querySelector('.users');
const containerApp = document.querySelector('.app');
const containerMovements =
  document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector(
  '.form__btn--transfer'
);
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector(
  '.form__btn--close'
);
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector(
  '.login__input--user'
);
const inputLoginPin = document.querySelector(
  '.login__input--pin'
);
const inputTransferTo = document.querySelector(
  '.form__input--to'
);
const inputTransferAmount = document.querySelector(
  '.form__input--amount'
);
const inputLoanAmount = document.querySelector(
  '.form__input--loan-amount'
);
const inputCloseUsername = document.querySelector(
  '.form__input--user'
);
const inputClosePin = document.querySelector(
  '.form__input--pin'
);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Functions
const setUserNames = function (accounts) {
  for (const acc of accounts) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  }
};

setUserNames(accounts);

const calcDaysPassed = function (date1, date2) {
  return Math.round(
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)
  );
};

const formatMoventsDates = function (
  date,
  locale = navigator.language
) {
  const dayPassed = calcDaysPassed(new Date(), date);

  if (dayPassed === 0) return `today`;
  if (dayPassed === 1) return `yesterday`;
  if (dayPassed < 7) return `${dayPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (
  value,
  locale = navigator.language,
  currency = 'USD'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const formattedCurrency = formatCur(
      mov,
      acc.locale,
      acc.currency
    );

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${formatMoventsDates(
            new Date(acc.movementsDates[i]),
            acc.locale
          )}
            </div>
          <div class="movements__value">${formattedCurrency}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML(
      'afterbegin',
      html
    );
  });
};

const calcPrintBalance = function (Acc) {
  Acc.Balance = Acc.movements.reduce((acc, el) => {
    return acc + el;
  }, 0);

  labelBalance.textContent = formatCur(
    Acc.Balance,
    Acc.locale,
    Acc.currency
  );
};

const calcDisplaySummary = function (Acc) {
  const incomes = Acc.movements
    .filter(el => el > 0)
    .reduce((Acc, el) => Acc + el, 0);
  labelSumIn.textContent = formatCur(
    incomes,
    Acc.locale,
    Acc.currency
  );

  const outcomes = Acc.movements
    .filter(el => el < 0)
    .reduce((Acc, el) => Acc + el, 0);

  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    Acc.locale,
    Acc.currency
  );

  const interest = Acc.movements
    .filter(el => el > 0)
    .map(deposite => (deposite * Acc.interestRate) / 100)
    //Bank rule => exclude any interset < 1€
    .filter(deposite => deposite >= 1)
    .reduce((acc, el) => acc + el, 0);

  labelSumInterest.textContent = formatCur(
    interest,
    Acc.locale,
    Acc.currency
  );
};

const setDate = function (acc) {
  const now = new Date();
  const locale = acc.locale || navigator.language;

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    // weekday: 'short',
  };

  labelDate.textContent = new Intl.DateTimeFormat(
    locale,
    options
  ).format(now);
};

const updateUI = function (currentAcc) {
  //Display Movements
  displayMovements(currentAcc);

  //Dispaly balance
  calcPrintBalance(currentAcc);

  //Display summary
  calcDisplaySummary(currentAcc);

  //Display Date
  setDate(currentAcc);
};

const startLogoutTimer = function () {
  //set Time to 5 min
  let time = 5 * 60; //sec

  const tick = () => {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each call, print the remaining time in UI
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 sec, stop the timer and log out
    if (!time) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      usersApp.style.opacity = 100;
      setTimeout(
        () => usersApp.classList.toggle('none'),
        1000
      );

      labelWelcome.textContent = `Welcome Back, ${
        currentAcc.owner.split(' ')[0]
      }`;
      labelWelcome.textContent = `Login to get started`;
    }
    time--;
  };

  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Event handlers
let currentAcc, timer;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAcc = accounts.find(
    el => el.username === inputLoginUsername.value
  );

  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    containerApp.style.opacity = 100;
    usersApp.style.opacity = 0;
    setTimeout(() => usersApp.classList.add('none'), 1000);

    labelWelcome.textContent = `Welcome Back, ${
      currentAcc.owner.split(' ')[0]
    }`;

    //Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //‼ remove focus

    // start timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //Update the UI
    updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    reciverAcc &&
    reciverAcc.username !== currentAcc.username &&
    currentAcc.Balance >= amount &&
    amount > 0
  ) {
    // After 1 sec
    setTimeout(() => {
      // Do the Transfer
      currentAcc.movements.push(-amount);
      reciverAcc.movements.push(amount);

      // Add transfer date
      currentAcc.movementsDates.push(
        new Date().toISOString()
      );
      reciverAcc.movementsDates.push(
        new Date().toISOString()
      );

      //reset Timer
      clearInterval(timer);
      timer = startLogoutTimer();

      //Update the UI
      updateUI(currentAcc);
    }, 1000);
  }

  //Clear Input Fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const requested = Math.floor(inputLoanAmount.value);
  //Bank Condition => At least one deposite Must be >= 10% of the requested amount (max requested loan = max deposite * 10)
  if (
    requested > 0 &&
    currentAcc.movements.some(mov => mov >= requested * 0.1)
  ) {
    // after 1200 milliseconds
    setTimeout(() => {
      //Do the Loan
      currentAcc.movements.push(requested);

      // Add loan date
      currentAcc.movementsDates.push(
        new Date().toISOString()
      );

      //reset Timer
      clearInterval(timer);
      timer = startLogoutTimer();

      //Update the UI
      updateUI(currentAcc);
    }, 1200);
  }

  //Clear Input Fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );

    //Delete account
    // accounts.splice(index, 1);
    if (index !== -1) {
      accounts[index] = {
        owner: '',
        movements: [],
        interestRate: 0,
        pin: 0,
        movementsDates: [],
        currency: '',
        locale: '',
      };
    }

    //Hide UI
    containerApp.style.opacity = 0;

    //Display users and mark the closed acc as deleted
    usersApp.style.opacity = 100;
    setTimeout(() => {
      usersApp.classList.toggle('none');

      const delElements = document.querySelectorAll(
        `.i${index}`
      );

      for (let i = 0; i < delElements.length; i++)
        delElements[
          i
        ].innerHTML = `<del>${delElements[i].innerText}</del>`;
    }, 1000);

    labelWelcome.textContent = `Log in to get started`;
  }

  //Clear Input Fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

let sortedState = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(currentAcc, !sortedState);
  sortedState = !sortedState;
});
