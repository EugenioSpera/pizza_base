pizzaJson.map((item, index) => {

    //clonando o pizza-item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    document.querySelector('.pizza-area').append(pizzaItem);
})