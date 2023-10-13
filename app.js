document.querySelector("#btnSearch").addEventListener("click", () => {
    let text = document.querySelector("#txtSearch").value;
    getCountry(text);
});

function getCountry(country) {

    // Baglanti Istegini Olusturuyoruz
    const request = new XMLHttpRequest();

    // Sadece Data Almak Icin Baglanti Olusturuyoruz
    request.open('GET', 'https://restcountries.com/v3.1/name/' + country);

    // Baglanti Istegini Gonderiyoruz
    request.send();

    request.addEventListener('load', function() {

        // JSON Veri Tipini Javascript Icinde Kullanilabilecek
        // Objeye Veri Tipine Ceviriliyor
        const data = JSON.parse(this.responseText);

        // Objeye Cevierilen Data nin Tamamini Aliyoruz
        console.log(data);            
        renderCountry(data[0]);

        // Komsu Ulkeler Listesinde Yer Alan Ulkelere Ulasmak Icin
        // 0 Nolu indis Uzerinden
        // Object Icindeki borders Alani Icinde Yer Alan Ulke Adlarina Ulasiyoruz
        // Ulastigimiz Ulke Adlarini String Tipi Veriye Ceviriyoruz
        const countries = data[0].borders.toString();

        // load neighbors
        const req = new XMLHttpRequest();
        req.open('GET', 'https://restcountries.com/v3.1/alpha?codes=' + countries);
        req.send();

        req.addEventListener('load', function() {

            // Ilk Ulke Bilgisi Geldikten Sonra
            const data = JSON.parse(this.responseText);
            
            renderNeighbors(data);
        });
    });
}

// Ulke Bilgilerini Gosteriyoruz
function renderCountry(data) {        
   
    let html = `        
        <div class="card-header">
                Search Result
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <img src="${data.flags.png}" alt="" class="img-fluid">
                    </div>
                    <div class="col-8">
                        <h3 class="card-title">${data.name.common}</h3>
                        <hr>
                        <div class="row">
                            <div class="col-4">Population: </div>
                            <div class="col-8">${(data.population / 1000000).toFixed(1)} milion</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Official Language: </div>
                            <div class="col-8">${Object.values(data.languages)}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Capital: </div>
                            <div class="col-8">${data.capital[0]}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Currency: </div>
                            <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    document.querySelector("#country-details").innerHTML = html;       
}

// Komsu Ulkelere Ait Detay Bilgilerini Yazdiriyoruz
function renderNeighbors(data) {
    console.log(data);
    let html = "";
    for(let country of data) {
        html += `
            <div class="col-2 mt-2">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                        <h6 class="card-title">${country.name.common}</h6>
                    </div>
                </div>
            </div>
        `;
        
    }
    document.querySelector("#neighbors").innerHTML =  html;
}