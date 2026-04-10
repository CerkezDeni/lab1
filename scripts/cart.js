// //Za svaki pronađeni minus gumb, izvrši ovaj blok koda, a taj konkretni gumb zovi btn
// document.querySelectorAll('.minus').forEach((btn) => {
//   //Sad za svaki pojedini gumb postavljaš što će se dogoditi kad se klikne.
//   btn.onclick = function () {
//     //trazi u parentu(kolicina) prvi element clase counter
//     let counter = this.parentElement.querySelector('.counter');
//     let number = parseInt(counter.innerText);
//     number--;
//     if (number <= 0) {
//       this.closest('tr').remove();
//     } else {
//       counter.innerText = number;
//     }
//   };
// });

// document.querySelectorAll('.plus').forEach((btn) => {
//   btn.onclick = function () {
//     let counter = this.parentElement.querySelector('.counter');
//     let number = parseInt(counter.innerText);
//     number++;
//     counter.innerText = number;
//   };
// });
//EFIKASNIJE AKO NAPRAVIS Funkcije posebno

const addBtn = document.getElementById('addBtn');
const cartBody = document.getElementById('cartBody');

let proizvodBroj = cartBody.querySelectorAll('tr').length + 1;

addBtn.onclick = function () {
  const noviRed = document.createElement('tr');
  noviRed.innerHTML = `<td>Proizvod ${proizvodBroj}</td> <td class="kolicina"> 
    <button class="minus">-</button>
    <span class="counter">1</span>
    <button class="plus">+</button></td>`;

  cartBody.appendChild(noviRed);
  proizvodBroj++;
};
function povecaj(counterElement) {
  let broj = parseInt(counterElement.innerText);
  broj++;
  counterElement.innerText = broj;
}
function smanji(counterElement, row) {
  let broj = parseInt(counterElement.innerText);
  broj--;
  if (broj <= 0) {
    row.remove();
  } else {
    counterElement.innerText = broj;
  }
}
cartBody.onclick = function (e) {
  const kliknutiElement = e.target;
  if (kliknutiElement.classList.contains('plus')) {
    const counter = kliknutiElement.parentElement.querySelector('.counter');
    povecaj(counter);
  }
  if (kliknutiElement.classList.contains('minus')) {
    const counter = kliknutiElement.parentElement.querySelector('.counter');
    const row = kliknutiElement.closest('tr');
    smanji(counter, row);
  }
};
