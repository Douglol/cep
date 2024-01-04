const enderecoForm = document.querySelector("#enderecoform");
const cep = document.getElementById("cep");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const neighborhood = document.querySelector("#neighborhood");
const region = document.querySelector("#region");
const inputs = document.querySelectorAll("[data-input]");
const close = document.querySelector("#close-message");

cep.addEventListener("keypress", (e) =>
{
    const numeros = /[0-9]/;
    const thekey = e.key;

    if (!numeros.test(thekey))
    {
        e.preventDefault();
        return;
    }
});

cep.addEventListener("keyup", (e) =>
{
    const inputValue = e.target.value;
    if(inputValue.length === 8)
    {
        getAddress(inputValue);
    }
});

const getAddress = async(cepp) =>
{
    cep.blur();

    const apiurl = 'https://viacep.com.br/ws/'+cepp+'/json/'

    const resp = await fetch(apiurl);

    const data = await resp.json();

    if(data.erro === "true")
    {
        enderecoForm.reset();
        return;
    }

    if(address.value === "")
    {
        toggleDisabled();
    }

    address.value = data.logradouro;
    city.value = data.localidade;
    neighborhood.value = data.bairro;
    region.value = data.uf;

};

const toggleDisabled = () =>
{
    if(region.hasAttribute("disabled"))
    {
        inputs.forEach((input) =>
        {
            input.removeAttribute("disabled");
        });
    }
    else
    {
        inputs.forEach((input) =>
        {
            input.setAttribute("disabled", "disabled");
        });
    }
}

var r = document.querySelector(':root');

function lightMode()
{
    r.style.setProperty('--mode1', 'rgb(228, 228, 228)');
    r.style.setProperty('--mode2', 'white');
    r.style.setProperty('--mode3', 'green');
    r.style.setProperty('--mode4', 'white');
}

function darkMode()
{
    r.style.setProperty('--mode1', 'rgb(49, 49, 49)');
    r.style.setProperty('--mode2', 'rgb(27, 27, 27)');
    r.style.setProperty('--mode3', 'greenyellow');
    r.style.setProperty('--mode4', 'black');
}