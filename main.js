const popupInput = document.querySelector("#popupInput")
const popupError = document.querySelector(".popupError")
const popupButton = document.querySelectorAll(".popupButton")
const SaveBtn = document.getElementById("popupSave")
const popupLogin = document.querySelector(".popupLogin")
const mainSite = document.querySelector(".mainSite")
const changeProfilBtn = document.querySelector(".changeProfil")

const letters = /[a-zA-Z]/g;

let userInterest = [];
let userName;

const checkForm = () => {
    checkSelectedInsterest();

    if(popupInput.value == ""){
        popupError.innerHTML = "INCORRECT NAME!"
        console.log(!letters.test(popupInput.value));
        console.log(popupInput.value == "");

    }else if(!popupInput.value.match(letters)){
        popupError.innerHTML = "NAME MUST CONTAIN LETTERS!"
    }else if(userInterest.length == 0){
        popupError.innerHTML = "SELECT INTERESTS!"
    }else{
        popupError.innerHTML = ""
        userName = popupInput.value
        //save userName and userInterest to local storage
        openClosePopup()
        userInterest = [];
    }
}

const openClosePopup = () => {
    popupLogin.classList.toggle("hiddenClass")
    mainSite.classList.toggle("hiddenClass")

}

const checkSelectedInsterest = () =>{
    for(let i = 0; i < popupButton.length ; i++){
        if(popupButton[i].classList.contains("popupButtonsClicked")){
            userInterest.push(popupButton[i].textContent)
        }
    }
}

for(let i = 0; i<popupButton.length ; i++){
    popupButton[i].addEventListener("click", function(e){
        if(e.target.children.length>0){
            e.target.classList.toggle("popupButtonsClicked")
            e.target.children[0].classList.toggle("popupIconWhite")
        }else{
            e.target.parentElement.classList.toggle("popupButtonsClicked")
            e.target.classList.toggle("popupIconWhite")
        }
    })
}


SaveBtn.addEventListener('click', checkForm);
changeProfilBtn.addEventListener('click', openClosePopup);