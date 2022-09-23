const popupInput = document.querySelector("#popupInput")
const popupError = document.querySelector(".popupError")
const popupButton = document.querySelectorAll(".popupButton")
const SaveBtn = document.getElementById("popupSave")
const popupLogin = document.querySelector(".popupLogin")
const mainSite = document.querySelector(".mainSite")
const changeProfilBtn = document.querySelector(".changeProfil")

const LikeBtn = document.querySelector(".mainCandidateLike")
const RejectedBtn = document.querySelector(".mainCandidateRejected")
const resetSiteBtn = document.querySelector(".resetSite")

const candidatePhoto = document.querySelector("#candidatePhoto")

const letters = /[a-zA-Z]/g;

let userNameLocal;
let userInterest = [];

let candidateIndex = 0;

class Candidate{

	constructor(name, job, about, interested, img){
		this.name = name;
		this.job = job;
		this.about = about;
		this.interested = interested;
		this.img = img;
	}

}

const openSite = () => {
    if(localStorage.getItem("userNameLocal") !== null){
        popupInput.value = localStorage.getItem("userNameLocal")
        userInterest = localStorage.getItem("userInterest").split(",")
    
        localStorage.getItem("userInterest")
        for(let i=0; i<popupButton.length; i++){
            for(let j=0; j<userInterest.length; j++){
                if(popupButton[i].textContent.includes(userInterest[j])){
                    popupButton[i].classList.toggle("popupButtonsClicked")
                    popupButton[i].children[0].classList.toggle("popupIconWhite")
                }
            }
        }   
    }

}

openSite();

const checkForm = () => {
    userInterest = [];
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
        changeProfilBtn.innerHTML = popupInput.value + ` <i class="fa-solid fa-circle-user"></i>`;
        localStorage.setItem('userNameLocal', popupInput.value);
        localStorage.setItem('userInterest', userInterest);

    }
}

const openClosePopup = () => {
    popupLogin.classList.toggle("hiddenClass")
    mainSite.classList.toggle("hiddenClass")

}

const candidateDraw = () => {

    document.querySelector("#candidatePhoto").src = candidates[candidateIndex].img;
    document.querySelector("#mainCandidateProfilName").innerHTML = candidates[candidateIndex].name;
    document.querySelector("#mainCandidateProfilWork").innerHTML = `<i class="fa-solid fa-briefcase"></i>` + candidates[candidateIndex].job;
    document.querySelector("#mainCandidateProfilAbout").innerHTML = candidates[candidateIndex].about;
    document.querySelector("#mainCandidateInterest1").innerHTML = candidates[candidateIndex].interested[0];
    document.querySelector("#mainCandidateInterest2").innerHTML = candidates[candidateIndex].interested[1];
    document.querySelector("#mainCandidateInterest3").innerHTML = candidates[candidateIndex].interested[2];
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

let candidates = [];


candidates.push(new Candidate("Rosso the Lobster", " Underwater mafia leader", "I'm just escaped from an underwater Italian prison. I'm trying to be more polite. I'm looking for an accomplice for a crime.", [`<i class="fa-solid fa-volleyball"></i> Sport`, `<i class="fa-solid fa-pizza-slice"></i> Cooking`, `<i class="fa-solid fa-earth-americas"></i> Travel`], "Concept/lobster.png"))
candidates.push(new Candidate("Alveolar the Parasite", " CEO of DirtyWater Company", "I'm looking for a new host. I promise to clean up and water the flowers.", [`<i class="fa-solid fa-camera"></i> Photo`, `<i class="fa-solid fa-pizza-slice"></i> Cooking`, `<i class="fa-solid fa-book"></i> Book`], "Concept/parasite.png"))
candidates.push(new Candidate("Sophie the Cat", " Librarian", "I am looking for a calm partner with comfortable knees.", [`<i class="fa-solid fa-bag-shopping"></i> Shopping`, `<i class="fa-solid fa-otter"></i> Animals`, `<i class="fa-solid fa-book"></i> Book`], "Concept/cat.png"))
candidates.push(new Candidate("Leonardo the Lizard", " Freelancer Artist", "I span all my free time on artistic self-development, so I'm looking for a rich partner.", [`<i class="fa-solid fa-palette"></i> Art`, `<i class="fa-solid fa-gamepad"></i> Games`, `<i class="fa-solid fa-video"></i> Movie`], "Concept/lizard.png"))
candidates.push(new Candidate("Centaurid the Galactic Wolf", " Army leader of Arp 332 Galaxy Chain", "I am looking for someone to help me understand this planet's security systems, so I can come back later and conquer it for my own kin.", [`<i class="fa-solid fa-music"></i> Music`, `<i class="fa-solid fa-ghost"></i> Paranormal`, `<i class="fa-solid fa-video"></i> Movie`], "Concept/wolf.png"))
candidates.push(new Candidate("Breeze the Horse", " Owner of airline company", "Did you fall from the sky? You can with me ;)", [`<i class="fa-solid fa-earth-americas"></i> Travel`, `<i class="fa-solid fa-volleyball"></i> Sport`, `<i class="fa-solid fa-ghost"></i> Paranormal`], "Concept/horse.png"))
candidates.push(new Candidate("Pavoni the Peacock", " Foto Model", "You already know me from the latest VOGUE covers, so lets talk about You. What do you think about my new look?", [`<i class="fa-solid fa-camera"></i> Photo`, `<i class="fa-solid fa-bag-shopping"></i> Shopping`, `<i class="fa-solid fa-palette"></i> Art`], "Concept/bird.png"))

candidateDraw();

const nextCandidate = () =>{
    candidateIndex++;
    if(candidateIndex == candidates.length){
        document.querySelector(".mainCandidate").classList.toggle("hiddenClass")
        document.querySelector(".noCandidates").classList.toggle("hiddenClass")
    }else{
        candidateDraw();
    }
}

const resetSite = () => {
    localStorage.clear()
    window.location.reload()
}


SaveBtn.addEventListener('click', checkForm);
changeProfilBtn.addEventListener('click', openClosePopup);
LikeBtn.addEventListener('click', nextCandidate);
RejectedBtn.addEventListener('click', nextCandidate);
resetSiteBtn.addEventListener('click', resetSite);
