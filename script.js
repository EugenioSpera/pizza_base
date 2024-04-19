let modalQtd;
let modalKey = 0;
let cart = []


//--------------Exibi informações das pizzas----------------------------
    //com o map é possível mapear os elementos de um array  e gerar um novo array com base no array original. sempre devemos informar dos parâmetros o item que será um elemento do array e o indice que será a posição desse elemento no array.
pizzaJson.map((item, index) => {

    //clonando o pizza-item
let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    //O atriburo data-Key permite enviar dados através do Html, esse dados podems ser utilizados posteriormente por uma janela modal ou qualquer outro componente.
    //criando um atributo data-Key ao elemento .pizza-item contendo o id da pizza que foi selecionada pelo usuário.
pizzaItem.setAttribute('data-key', index);
    


pizzaItem.querySelector('.pizza-item--img img').src = item.img;
        //to fixed permite definir quantas casas decimais o JS irá exibir na tela
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

pizzaItem.querySelector('.pizza-item--name').innerHTML = `${item.name}`;

pizzaItem.querySelector('.pizza-item--desc').innerHTML = `${item.description}`;

pizzaItem.querySelector('a').addEventListener('click',(event)=> {

event.preventDefault();
    // colocado o numero 1, pois se a pessoa clicou ela quer comprar por isso parece 1 e não 0.
        modalQtd = 1;

        modalKey = index;
    //queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
    //closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.
        //getAttribute =  pega o valor de um atributo
let Key = event.target.closest('.pizza-item').getAttribute('data-Key');

document.querySelector('.pizzaBig img').src = pizzaJson[Key].img;
document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[Key].name;
document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[Key].description;
document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[Key].price.toFixed(2)}`;

    //removendo a classe selecionada dos tamanhos da pizza, assim garantimos que nenhuma pizza estara selecionada antes do usuario selecionar um tamanaho
document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

    //selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos
document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{


    //fará que o tamanho grande sempre seja o selecionado por padrão ao usuario clicar
    if (sizeIndex == 2) {
        size.classList.add('selected');
    }

    size.querySelector('span').innerHTML = pizzaJson[Key].sizes [sizeIndex];
    //size.querySelector('span').innerHTML = '123';
});

    //definindo a opacidade 0 para que o modal não seja exibida na tela logo de inicio
document.querySelector('.pizzaWindowArea').style.opacity = 0;
    //exibindo a janela do modal na tela ao clicar em uma pizza 
document.querySelector('.pizzaWindowArea').style.display = 'flex';


   setTimeout(() => {
    document.querySelector('.pizzaWindowArea').style.opacity = 1;
   }, 200);

    }) 

    document.querySelector('.pizza-area').append(pizzaItem);

});

//----------------------Fim da Exibição das pizzas---------------------------



//--------------------Funcionalidades janela modal---------------------------

function closeModal () {

    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() =>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500) 
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {

});