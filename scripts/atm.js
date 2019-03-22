class Notes {
    constructor(value, ammount, imageSource){
        this.value = value;
        this.ammount = ammount;
        this.image = document.createElement("img");
        this.image.src = imageSource;
        this.image.width = 48;
        this.image.height = 19;
    }
}

//Object.prototype.clone = function() {
//    var newObj = (this instanceof Array) ? [] : {};
//    for (let i in this) {
//      if (i == 'clone') continue;
//      if (this[i] && typeof this[i] == "object") {
//        newObj[i] = this[i].clone();
//      } else newObj[i] = this[i]
//    } return newObj;
//};

var atmCurrentNotesAmmount = [];
var atmNotesAmmountTemp = [];
var atmCurrentTotalMoney = 0;
var customerNotes = [];
var ammountRequired;
var ammountRequiredSource = document.getElementById("ammountRequired");
var ammountEnteredSource = document.getElementById("ammountEntered");
ammountEnteredSource.addEventListener("click", () => {
    if (!isNaN(ammountRequiredSource.value)) {
        ammountRequired = ammountRequiredSource.value;
        getMoney();    
    } else {
        alert("Withdrawal ammount not valid");
    }
});
var atm50AmmountSource = document.getElementById("atm50Ammount");
var atm20AmmountSource = document.getElementById("atm20Ammount");
var atm10AmmountSource = document.getElementById("atm10Ammount");
var ammountATMSource = document.getElementById("ammountATM");
var newATMinputSource = document.getElementById("newATMinput");
ammountATMSource.innerHTML = "<strong>Money in the ATM:</strong> " + atmCurrentTotalMoney + " euros";
newATMinputSource.addEventListener("click", getAtmNotesUpdate);
var ammountGivenSource = document.getElementById("ammountGiven");

function updateATM() {
    atmCurrentTotalMoney = 0;
    let atmMoney = 0;
    for (let note of atmCurrentNotesAmmount) {
        atmMoney += (note.value * parseInt(note.ammount));
    }
    atmCurrentTotalMoney = atmMoney;
    ammountATMSource.innerHTML = "<strong>Money in the ATM:</strong> " + atmCurrentTotalMoney + " euros";  
    if (atmCurrentNotesAmmount[0].ammount > 0) {
        ammountATMSource.innerHTML += "<br><br>" + atmCurrentNotesAmmount[0].value + " euros notes: " + atmCurrentNotesAmmount[0].ammount + " ";
        ammountATMSource.appendChild(atmCurrentNotesAmmount[0].image);
    }
    if (atmCurrentNotesAmmount[1].ammount > 0) {
        ammountATMSource.innerHTML += "<br><br>" + atmCurrentNotesAmmount[1].value + " euros notes: " + atmCurrentNotesAmmount[1].ammount + " ";
        ammountATMSource.appendChild(atmCurrentNotesAmmount[1].image);
    }
    if (atmCurrentNotesAmmount[2].ammount > 0) {
        ammountATMSource.appendChild(document.createElement("br"));
        ammountATMSource.appendChild(document.createElement("br"));
        ammountATMSource.appendChild(document.createTextNode(atmCurrentNotesAmmount[2].value + " euros notes: " + atmCurrentNotesAmmount[2].ammount + " "));
        ammountATMSource.appendChild(atmCurrentNotesAmmount[2].image);
    }
}

function getAtmNotesUpdate() {
    if (!isNaN(parseInt(atm50AmmountSource.value)) && !isNaN(parseInt(atm20AmmountSource.value)) && !isNaN(parseInt(atm10AmmountSource.value))) {
        if (!atmCurrentNotesAmmount.length) {
            atmCurrentNotesAmmount.push(new Notes(50, parseInt(atm50AmmountSource.value), "images/50euroNote.png"));
            atmCurrentNotesAmmount.push(new Notes(20, parseInt(atm20AmmountSource.value), "images/20euroNote.png"));
            atmCurrentNotesAmmount.push(new Notes(10, parseInt(atm10AmmountSource.value), "images/10euroNote.png"));
        } else {
            atmCurrentNotesAmmount[0].ammount += parseInt(atm50AmmountSource.value);
            atmCurrentNotesAmmount[1].ammount += parseInt(atm20AmmountSource.value);
            atmCurrentNotesAmmount[2].ammount += parseInt(atm10AmmountSource.value);
        }
        updateATM();        
    } else {
        alert("ATM notes ammount not valid");
    }
}

function getMoney() {
    var moneyLeftToExtend = ammountRequired;
    var numberOfNotes;
    customerNotes = [];
    //atmNotesAmmountTemp = atmCurrentNotesAmmount.clone();
    atmNotesAmmountTemp = atmCurrentNotesAmmount.map(a => Object.assign({}, a));
    if (atmCurrentTotalMoney >= moneyLeftToExtend) {
        atmNotesAmmountTemp.forEach(note => {
            numberOfNotes = Math.floor (moneyLeftToExtend / note.value);
            if (numberOfNotes > note.ammount) {
                numberOfNotes = note.ammount;
            }
            customerNotes.push(new Notes(note.value, parseInt(numberOfNotes), "images/" + note.value + "euroNote.png"));
            moneyLeftToExtend -= (note.value * numberOfNotes);
            note.ammount -= numberOfNotes; 
        });       
        if (moneyLeftToExtend != 0) {
            customerNotes = [];
            alert("Unable to withdraw that ammount.\nThis ATM only extends 50, 20 and 10 euros notes");
            ammountGivenSource.innerHTML = ("");
        } else {
            ammountGivenSource.innerHTML = "<strong>Your Money:</strong>";
            if (customerNotes[0].ammount > 0) {
                ammountGivenSource.innerHTML += "<br><br>" + customerNotes[0].value + " euros notes: " + customerNotes[0].ammount + " ";
                for (let notesToDraw = 0; notesToDraw < customerNotes[0].ammount; notesToDraw++) {
                    
                }
                ammountGivenSource.appendChild(customerNotes[0].image);
            }
            if (customerNotes[1].ammount > 0) {
                ammountGivenSource.innerHTML += "<br><br>" + customerNotes[1].value + " euros notes: " + customerNotes[1].ammount + " ";
                ammountGivenSource.appendChild(customerNotes[1].image);
            }
            if (customerNotes[2].ammount > 0) {
                ammountGivenSource.appendChild(document.createElement("br"));
                ammountGivenSource.appendChild(document.createElement("br"));
                ammountGivenSource.appendChild(document.createTextNode(customerNotes[2].value + " euros notes: " + customerNotes[2].ammount + " "));
                ammountGivenSource.appendChild(customerNotes[2].image);
            }
            atmCurrentNotesAmmount = atmNotesAmmountTemp.map(a => Object.assign({}, a));
            //atmCurrentNotesAmmount = atmNotesAmmountTemp.clone();
            updateATM();
        }
    } else {
        alert("ATM has not enough cash");
    }
}