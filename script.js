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

closeModal();



document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
 
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
 
});
 
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd  > 1) {
        modalQtd--;
       
    }
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
 
})   

//-----------------------------------------------------------Tamanhos de pizzas---------------------------------------------------------------------------------------------

        //sempre que em um sistemas tivermos que selecionar uma opção diferente e uma opção anterior estiver selecionada, devemos primeiro tirar a seleção de todas as opções anteriores e só depois selecionar a nova opção que o usuário selecionou.
document.querySelectorAll('.pizzaInfo--size').forEach((item, sizeIndex) => {

    item.addEventListener('click', (event) => {

        //removendo a classeselecionada dos tamanhos da pizza.
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        //adicionado a classe selected ao tamanho que o usuario esta clicando
        item.classList.add('selected');

    })
})

//-------------------------------Botão adicionar ao carrinho-----------------

document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-Key'));

    let identifier = pizzaJson[modalKey].id + '@'
+ size;

let Key = cart.findIndex((item) => {

    return item.identifier == identifier
})


if (Key > -1) {
cart[Key].qt += modalQtd;

}else {

cart.push({
    identifier,
    id: pizzaJson[modalKey].id,
    size,
    qt: modalQtd
})

}

closeModal()
updateCart()

});


//--------------------Atualização do carrinho Mobile----------------------

//Exibindo o carrinho caso tenham pizzas adicionadas

document.querySelector('.menu-closer').addEventListener('click', () => {

    if(cart.length > 0){    
        
        document.querySelector('aside').style.left = '0';
    }
})

//escondendo o carrinho ao usuario clicar em fechar o carrinho

document.querySelector('.menu-closer').addEventListener('click', () => {

    document.querySelector('aside').style.left = '100vw';
})

function updateCart() {
    //Atualizando a quantidade de pizzas no carrinho na versao mobile
    document.querySelector('.menu-openner span').innerHTML = cart.length

    //verificando se o carrinho possuiu pizzas adicionadas dentro dele
    if (cart.length > 0) {
        //adicionando a classe show a tag aside, isso fará com que o carrinho seja exibido na tela
        document.querySelector('aside').classList.add('show');

        //limpando o HTML antes de exibir as pizzas novamente

        document.querySelector('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
             //iremos procurar dentro no pizzaJson itens que tenham o mesmo id da pizza a qual o usuário clicou, a função find irá buscar no array e em seguida jogar dentro do parÂmetro item. Nesse caso usamos a função find ao invés de findIndex pois queremos retornar todas as informações dos itens do json e não somente o índice dele(posição no array)
            let pizzaItem = pizzaJson.find((item) => {
            //procurando nos itens do array que serão adicionados no parÂmetro(variável) item e iremos procurar no id deste item  por um item que seja igual ao item que estiver no carrinho, assim poderemos exibir as informações desse item.

                return item.id == cart[i].id;
            });

            //atualizando o sub total
            subTotal += pizzaItem.price * cart[i].qt;

            //clonando o elemento pizza-item onde serão exibidos os dados da pizza no carrinho
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);

             //o switch case irá percorrer o array de tamanho de pizzas adicionando uma letra correspondente ao tamanho da pizza, se não fizessemos isso não teriamos como o usuário saber o tamanho da pizza que ele está comprando.
             let pizzaSizeName;

             switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName ='G'
                    break;    

             }

             //concatenando o nome da pizza com o tamanho da mesa
             let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

             cartItem.querySelector('img').src = pizzaItem.img;
             cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
             cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
             //detectando quando o usuário clicar no botão de diminuir a quantidade de pizza e atualizando a quantidade

             cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;

                    
                } else {
                    //iremos usar o splice psara remover a pizza do carrinho, pois somente iremos entrar no else se quantidade de pizzas no carrinho forem maiores que 1, caso seja 1 e o usuário clicar no botão - significa que o usuário quer remover a pizza do carrinho.
                      // splice= possibilita remover elementos de um array, no caso abaixo, diremos que queremos remover o item que está na posição i e em seguida diremos quantos itens ele irá remover, como só temos um item no array ele irá remover este item
                    cart.splice(i, 1)
                }
                //chamamos o updateCart pois sem ele o número de pizza não irá ser exbibido na tela.
                updateCart();
             });

             cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                updateCart();
             })


            //adicionando o elemento clonado do html ao carinho
             document.querySelector('.cart').append(cartItem);
        }
             
            //calculando o desconto de 10% sobre o valor

            desconto = subTotal * 0.1;

            total = subTotal - desconto;

            document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
            document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
            document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } 
    else {
            //escondendo menu desktop 
            document.querySelector('aside').classList.remove('show');
            //escondendo menu mobile
            document.querySelector('aside').style.left = '100vw';
    }


}


