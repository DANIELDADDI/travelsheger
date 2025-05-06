
// logo and company name onclick
// reload() Reloads the current document
// replace() Replaces the current document with a new one
function loadHomePage() {
      location.assign("index.html");
}

// flight offer list 
// assign() Loads a new document
function loadFlightOfferList() {
      location.assign('flighofferlist.html');
}
function openPaymentPage() {
      window.open("./payment.html", "_self");

}

// flight offer list 
// assign() Loads a new document
function openPassegerDetails() {
      // location.assign('./passegerDetails.html');
      window.open('./passegerDetails.html', "_self");
}
// flight offer list 
// assign() Loads a new document
function openFlightDetails() {
      location.assign('./pages/flightDetails.html');
}

departureCity = document.getElementById('departureCity');
arrivalCity = document.getElementById('arrivalCity');
departureDate = document.getElementById('departureDate');
arrivalDate = document.getElementById('arrivalDate');
const departMatchList = document.getElementById('dCity'); // departure city
const arrivalMatchList = document.getElementById('aCity'); // arrival city

singleTrip = document.getElementById('singleTrip');
roundTrip = document.getElementById('roundTrip');
multipleTrip = document.getElementById('multipleTrip');

inboudDate = document.getElementById('inbound');
outboundDate = document.getElementById('outbound');

function validationForm() {
      let dCityValue = document.forms["serachFlight"]["departureCity"].value;
      if (dCityValue == '') {
            alert("please select the Departure City");
            return false
      }
}

// on single trip selction return or inboud date will hide
// deprture date will hold
// let today = new Date();
// let someDate = new Date();
(() => {
      let dDate = new Date();
      let year = dDate.getFullYear();

      let month = dDate.getMonth() + 1;
      if (month < 10) {
            month = "0" + dDate.getMonth() + 1;
      }

      let date = dDate.getDate();
      if (date < 10) {
            date = "0" + dDate.getDate();
      }
      let minDate = year + "-" + month + "-" + date;
      departureDate.setAttribute('min', minDate);
})();

(() => {
      let dDate = new Date();
      let year = dDate.getFullYear();

      let month = dDate.getMonth() + 1;
      if (month < 10) {
            month = "0" + dDate.getMonth() + 1;
      }

      let date = dDate.getDate();
      if (date < 10) {
            date = "0" + dDate.getDate();
      }
      let minDate = year + "-" + month + "-" + date;
      arrivalDate.setAttribute("min", minDate);
})();

singleTrip.addEventListener('click', () => {
      inboudDate.classList.add('w3-hide');
})

roundTrip.addEventListener('click', () => {
      inboudDate.classList.remove('w3-hide');

})




// searching city code and  country name
// for Deapprture city
// with json file

departureCity.addEventListener('input', () => searchStates(departureCity.value));

const searchStates = async searchText => {
      const respose = await fetch("./json/airports.json");
      const states = await respose.json();
      // console.log(states);
      // et match to the current text input

      let matches = states.filter(statex => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return statex.city.match(regex) || statex.code.match(regex) || statex.country.match(regex);
      });
      // console.log(matches);
      if (searchText.length === 0) {
            matches = [];
            departMatchList.innerHTML = '';
      }

      outputHtml(matches);
}

const outputHtml = matches => {
      if (matches.length > 0) {
            const html = matches.map(match => `
                  <ul  class="w3-ul w3-red" style="position:relatve; text-align: start; padding-left: 0;">
                        <li onclick = selectInput(this) >
                        ${match.city} (${match.code}), ${match.country}
                        </li>
                  </ul>
                  `).join('');
            // console.log(html);
            departMatchList.innerHTML = html;
      }
}
function selectInput(match) {
      departureCity.value = match.innerHTML;
      departMatchList.innerHTML = "";
}

// getting city , code and country bame
// for arrival city
arrivalCity.addEventListener('input', () => searchArrivalStates(arrivalCity.value));

const searchArrivalStates = async searchText => {
      const respose = await fetch("./json/airports.json");
      const arrtivalState = await respose.json();

      let matches = arrtivalState.filter(statex => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return statex.city.match(regex) || statex.code.match(regex) || statex.country.match(regex);
      });

      // console.log(matches);
      if (searchText.length === 0) {
            matches = [];
            arrivalMatchList.innerHTML = '';
      }

      outputArrivalHtml(matches)

}
const outputArrivalHtml = matches => {
      if (matches.length > 0) {
            const html = matches.map(match => `
                  <ul  class="w3-ul w3-red" style="position:absolute;">
                        <li onclick = selectArrivalInput(this)>
                        ${match.city} (${match.code}), ${match.country}
                        </li>
                  </ul>
                  `).join('');
            // console.log(html);
            arrivalMatchList.innerHTML = html;
      }
}
function selectArrivalInput(match) {
      arrivalCity.value = match.innerHTML;
      arrivalMatchList.innerHTML = "";
}


