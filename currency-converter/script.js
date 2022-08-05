const currencyFromSelect = document.getElementById("currency-one");
const currencyFrom = document.getElementById("currency-from");
const currencyToSelect = document.getElementById("currency-two");
const currencyTo = document.getElementById("currency-to");
const swapBtn = document.querySelector("button");
const rate = document.getElementById("rate");

function convertCurrency() {
  const currencyFromSelectValue = currencyFromSelect.value;
  const currencyToSelectValue = currencyToSelect.value;
  fetch(
    `https://open.exchangerate-api.com/v6/latest/${currencyFromSelectValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      const convertRate = data.rates[currencyToSelectValue];
      rate.innerText = `1 ${currencyFromSelectValue} = ${convertRate} ${currencyToSelectValue}`;
      currencyTo.value = (currencyFrom.value * convertRate).toFixed(2);
    });
}
currencyFrom.addEventListener("input", convertCurrency);
currencyFromSelect.addEventListener("change", convertCurrency);
currencyToSelect.addEventListener("change", convertCurrency);

swapBtn.addEventListener("click", () => {
  [currencyFromSelect.value, currencyToSelect.value] = [
    currencyToSelect.value,
    currencyFromSelect.value,
  ];
  convertCurrency();
});

window.addEventListener("load", convertCurrency);
