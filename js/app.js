'use strict'

let itemname, category, quantity, priceitem=0;

// function randomnumber(){
//  return  ( Math.floor(Math.random() * 900) + 100);
// }

function Iteminfo(itemname, category, quantity,priceitem) {

    this.itemname = itemname;
    this.category = category;
    this.quantity = quantity;
    this.priceitem = Math.floor(Math.random() * 900) + 100;
    Iteminfo.all.push(this);

};


Iteminfo.prototype.unitprice = function () {

    priceitem =( Math.floor(Math.random() * 900) + 100);
    return priceitem;

};



Iteminfo.all = [];


function render() {


    let divEl = document.getElementById('tableinfo');
    let tableEl = document.createElement('table');
    divEl.append(tableEl);
    tableEl.id = 'tabelinfo';

    let trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    let tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = 'Device Name';


    let tdEl1 = document.createElement('td');
    trEl.appendChild(tdEl1);
    tdEl1.textContent = 'Quantity';


    let tdEl2 = document.createElement('td');
    trEl.appendChild(tdEl2);
    tdEl2.textContent = 'Unit Price';


    let tdEl3 = document.createElement('td');
    trEl.appendChild(tdEl3);
    tdEl3.textContent = 'Category';

    let tdEl4 = document.createElement('td');
    trEl.appendChild(tdEl4);
    tdEl4.textContent = '';


    restoreinfo();
}

render();

let itemdata = document.getElementById('forminfo');
itemdata.addEventListener('submit', addinfo);

function addinfo(event) {

    event.preventDefault()
    let oldtable = document.getElementById('tabelinfo');
    oldtable.remove();

    itemname = event.target.Itemname.value;

    category = event.target.Category.value;

    quantity = event.target.Quantity.value;

    let newitem = new Iteminfo(itemname, category, quantity);
    saveinfo();
    // console.log(priceitem);
    // console.log(newitem);
    render();
    location.reload();



}


function saveinfo() {

    let savedata = JSON.stringify(Iteminfo.all);
    localStorage.setItem('iteminfo', savedata);


}


function restoreinfo() {

    let restoreitem = localStorage.getItem('iteminfo');

    if (restoreitem !== null) {

        Iteminfo.all = JSON.parse(restoreitem);
        console.log(Iteminfo.all);
        let tablenew = document.getElementById('tabelinfo');

        for (let i = 0; i < Iteminfo.all.length; i++) {
            let trEln = document.createElement('tr');
            tablenew.appendChild(trEln);

            let tdel = document.createElement('td');
            trEln.appendChild(tdel);
            tdel.textContent = Iteminfo.all[i].itemname;


            let tdel1 = document.createElement('td');
            trEln.appendChild(tdel1);
            tdel1.textContent = Iteminfo.all[i].quantity;


            let tdel2 = document.createElement('td');
            trEln.appendChild(tdel2);
            tdel2.textContent = Iteminfo.all[i].priceitem;


            let tdel3 = document.createElement('td');
            trEln.appendChild(tdel3);
            tdel3.textContent = Iteminfo.all[i].category;

            let tdel4 = document.createElement('td');
            trEln.appendChild(tdel4);
            tdel4.textContent = 'Remove';
            tdel4.style = 'color: red;'

        }

    }
}


let removeitem = document.getElementById('tableinfo');
removeitem.addEventListener('click', removefun);

function removefun() {

    console.log(event);

    let dez = event.target.textContent;
    console.log(dez);

    let trpath = event.target.parentElement.firstChild.textContent;

    console.log(trpath);
    if (dez == 'Remove') {
        let restoreitem = localStorage.getItem('iteminfo');
        Iteminfo.all = JSON.parse(restoreitem);
        let arry = Iteminfo.all;
        for (let i = 0; i < arry.length; i++) {

            if (arry[i].itemname == trpath) {

                let arry2 = arry.splice(i, 1);
                // let savedata = JSON.stringify(arry2);
                // localStorage.setItem('iteminfo', savedata);
                location.reload();
                
                console.log(arry2);
            }

        }
        saveinfo()
        render();
    }
}