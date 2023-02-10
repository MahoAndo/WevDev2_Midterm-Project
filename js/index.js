const apiUrl = "https://jsonblob.com/api/1072398668350636032";
let request = new XMLHttpRequest();

let plusBtnList = document.querySelectorAll('[name="plusButton"]');
let minusBtnList = document.querySelectorAll('[name="minusButton"]');
let resetBtnList = document.querySelectorAll('[name="resetButton"]');
let orderBtnList = document.querySelectorAll('.card-overlay-btn');

let plusBtn =  document.getElementsByName('plusButton');
let counterOutput =  document.getElementsByName('counterOutput');
let minusBtn =  document.getElementsByName('minusButton');
let resetBtn =  document.getElementsByName('resetButton');
let price = document.getElementsByName('cart-price');
let totalCount =  document.getElementsByName('totalCount')[0];
let msgBtn =  document.getElementsByName('msgBtn');

request.open('GET', apiUrl);
request.responseType = 'json';
request.send();

//-----------------------------
// JSON data change to object
//-----------------------------
request.onload = function () {
    let data = request.response;
    data = JSON.parse(JSON.stringify(data));
    dataArray(data);
    allReset();
}
//-----------------------------
// output data to html
//-----------------------------
function dataArray(els) {
    let i = 0;
    els.forEach(el => {
        // main page
        document.getElementsByName('goods-name')[i].innerHTML = el.title;
        document.getElementsByName('goods-price')[i].innerHTML = el.price;
        //cart page
        document.getElementsByName('goods-cart')[i].innerHTML = el.title;
        price[i].innerHTML = el.price.substr(1);
        i++;
    })
};

//-----------------------------
// click order button action
//-----------------------------
orderBtnList.forEach(function(i, index){
    i.addEventListener("click", function(e){
        plusBtn[index].removeAttribute("disabled");
        counterOutput[index].removeAttribute("disabled");
        counterOutput[index].value++;
        minusBtn[index].removeAttribute("disabled");
        resetBtn[index].removeAttribute("disabled");

        //calculation
        let sum = String(Number(totalCount.innerText) + Number(price[index].innerText) * 1);
        totalCount.innerHTML = sum;

        msgBtn[0].removeAttribute("disabled");
        msgBtn[1].removeAttribute("disabled");
    });
});

//-----------------------------
// click cart button action
//-----------------------------
document.getElementById('drawerOpen').addEventListener('click', () => {
    document.getElementById("drawerNavi").style.width = "100%";
});

document.getElementById('drawerClose').addEventListener('click', () => {
    document.getElementById("drawerNavi").style.width = "0%";
});

//-----------------------------
// add function
//-----------------------------
plusBtnList.forEach(function(i, index){
    i.addEventListener("click", function(e){
        counterOutput[index].value++;

    //calculation
    let sum = String(Number(totalCount.innerText) + Number(price[index].innerText) * 1);
    totalCount.innerHTML = sum;
    });
});

//-----------------------------
// reset function
//-----------------------------
minusBtnList.forEach(function(i, index){
    i.addEventListener("click", function(e){
        let count = document.getElementsByName('counterOutput')[index];
        if (count.value >= 1){
            count.value--;
            //calculation
            let sum = String(Number(totalCount.innerText) - Number(price[index].innerText) * 1);
            totalCount.innerHTML = sum;
        }
    });
});


//-----------------------------
// reset function
//-----------------------------
resetBtnList.forEach(function(i, index){
    i.addEventListener("click", function(e){
        let count = counterOutput[index];
        let sum = String(Number(totalCount.innerText) - Number(price[index].innerText) * count.value);
        totalCount.innerHTML = sum;
        count.value = 0;
        plusBtn[index].setAttribute("disabled", true);
        counterOutput[index].setAttribute("disabled", true);
        minusBtn[index].setAttribute("disabled", true);
        resetBtn[index].setAttribute("disabled", true);
    });
});

//-----------------------------
// alert message
//-----------------------------
let bar = document.getElementById("snackbar");
document.getElementById('order-msgBtn').addEventListener('click', () => {
    bar.innerHTML = 'Ordered! Thank you!' + '<br>' + 'We look forward to seeing you again!';
    bar.className = "show";
    setTimeout(function(){ bar.className = bar.className.replace("show", ""); }, 3000);
    
    allReset();
});

document.getElementById('cancel-msgBtn').addEventListener('click', () => {
    bar.className = "show";
    bar.innerHTML = 'Canceled.' + '<br>' + 'We look forward to seeing you again!';
    setTimeout(function(){ bar.className = bar.className.replace("show", ""); }, 3000);

    allReset();
});

//-----------------------------
// all reset
//-----------------------------
function allReset(){
    for(let i = 0; i < resetBtnList.length; i++){
        counterOutput[i].value = 0;
        totalCount.innerHTML = 0;
        plusBtn[i].setAttribute("disabled", true);
        counterOutput[i].setAttribute("disabled", true);
        minusBtn[i].setAttribute("disabled", true);
        resetBtn[i].setAttribute("disabled", true);
    };

    msgBtn[0].setAttribute("disabled", true);
    msgBtn[1].setAttribute("disabled", true);
}
