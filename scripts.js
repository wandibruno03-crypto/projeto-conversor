const convertButton = document.querySelector(".convert-button");
const currencyFrom = document.querySelector(".currency-from");
const currencySelect = document.querySelector(".currency-select");

async function convertValues() {
    const inputValue = Number(
        document.querySelector(".input-currency").value.replace(",", ".")
    );

    const currencyValueToConvert =
        document.querySelector(".currency-value-to-convert");

    const currencyValueConverted =
        document.querySelector(".currency-value");

    if (!inputValue) return;

    try {

        const from = currencyFrom.value;
        const to = currencySelect.value;

        if (from === to) {

            currencyValueToConvert.innerHTML =
                inputValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: from
                });

            currencyValueConverted.innerHTML =
                inputValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: to
                });

            return;
        }

        const response = await fetch(
            `https://economia.awesomeapi.com.br/json/last/${from}-${to}`
        );

        const data = await response.json();

        const pair = `${from}${to}`;

        const rate = Number(data[pair].bid);

        const convertedValue = inputValue * rate;

        currencyValueToConvert.innerHTML =
            inputValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: from
            });

        currencyValueConverted.innerHTML =
            convertedValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: to
            });

    } catch (error) {
        console.error(error);
        alert("Erro ao obter cotação.");
    }
}

function changeCurrency() {

    const currencyName =
        document.getElementById("currency-name");

    const currencyImage =
        document.querySelector(".currency-img");

    if (currencySelect.value === "USD") {
        currencyName.innerHTML = "<b>Dólar Americano</b>";
        currencyImage.src = "./assets/dolar.png";
    }

    if (currencySelect.value === "EUR") {
        currencyName.innerHTML = "<b>Euro</b>";
        currencyImage.src = "./assets/euro.png";
    }

    if (currencySelect.value === "GBP") {
        currencyName.innerHTML = "<b>Libra Esterlina</b>";
        currencyImage.src = "./assets/libra.png";
    }

    if (currencySelect.value === "ARS") {
        currencyName.innerHTML = "<b>Peso Argentino</b>";
        currencyImage.src = "./assets/peso.png";
    }

    if (currencySelect.value === "BRL") {
        currencyName.innerHTML = "<b>Real Brasileiro</b>";
        currencyImage.src = "./assets/real.png";
    }

    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
currencyFrom.addEventListener("change", convertValues);
convertButton.addEventListener("click", convertValues);