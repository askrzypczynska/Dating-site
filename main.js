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
const userAnswerYesBtn = document.querySelector(".userAnswerYes")
const userAnswerNoBtn = document.querySelector(".userAnswerNo")

const closeMessageBtn = document.querySelector(".closeMessage")

const candidatePhoto = document.querySelector("#candidatePhoto")
const messagePoppupTemp = document.querySelector(".messagePoppupTemp")
const userAnswersChoiceButtonsTemp = document.querySelector(".userAnswersChoiceButtonsTemp")
const userAnswersChoice = document.querySelector(".userAnswersChoice")
const messagePoppupList = document.querySelector(".messagePoppupList")

const messageAudio = new Audio('Concept/message.mp3');

const letters = /[a-zA-Z]/g;

let userNameLocal;
let userInterest = [];

let candidateIndex = 0;
let activeMessageIndex = 0;
let candidateStack = [];
let userAnswerIsVisivle = true;

let currentdate = new Date()
let time = currentdate.getHours() + ":" + currentdate.getMinutes() 

class Candidate{

	constructor(name, job, about, interested, img, icon, candidateId){
		this.name = name;
		this.job = job;
		this.about = about;
		this.interested = interested;
		this.img = img;
        this.icon = icon;
        this.candidateId = candidateId;

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


candidates.push(new Candidate("Rosso the Lobster", " Underwater mafia leader", "I'm just escaped from an underwater Italian prison. I'm trying to be more polite. I'm looking for an accomplice for a crime.", [`<i class="fa-solid fa-volleyball"></i> Sport`, `<i class="fa-solid fa-pizza-slice"></i> Cooking`, `<i class="fa-solid fa-earth-americas"></i> Travel`], "Concept/lobster.png", "Concept/lobsterIcon.png", 1))
candidates.push(new Candidate("Alveolar the Parasite", " CEO of DirtyWater Company", "I'm looking for a new host. I promise to clean up and water the flowers.", [`<i class="fa-solid fa-camera"></i> Photo`, `<i class="fa-solid fa-pizza-slice"></i> Cooking`, `<i class="fa-solid fa-book"></i> Book`], "Concept/parasite.png", "Concept/parasiteIcon.png", 2))
candidates.push(new Candidate("Sophie the Cat", " Librarian", "I am looking for a calm partner with comfortable knees.", [`<i class="fa-solid fa-bag-shopping"></i> Shopping`, `<i class="fa-solid fa-otter"></i> Animals`, `<i class="fa-solid fa-book"></i> Book`], "Concept/cat.png", "Concept/catIcon.png", 3))
candidates.push(new Candidate("Leonardo the Lizard", " Freelancer Artist", "I span all my free time on artistic self-development, so I'm looking for a rich partner.", [`<i class="fa-solid fa-palette"></i> Art`, `<i class="fa-solid fa-gamepad"></i> Games`, `<i class="fa-solid fa-video"></i> Movie`], "Concept/lizard.png", "Concept/lizardIcon.png", 4))
candidates.push(new Candidate("Centaurid the Galactic Wolf", " Army leader of Arp 332 Galaxy Chain", "I am looking for someone to help me understand this planet's security systems, so I can come back later and conquer it for my own kin.", [`<i class="fa-solid fa-music"></i> Music`, `<i class="fa-solid fa-ghost"></i> Paranormal`, `<i class="fa-solid fa-video"></i> Movie`], "Concept/wolf.png", "Concept/wolfIcon.png", 5))
candidates.push(new Candidate("Breeze the Horse", " Owner of airline company", "Did you fall from the sky? You can with me ;)", [`<i class="fa-solid fa-earth-americas"></i> Travel`, `<i class="fa-solid fa-volleyball"></i> Sport`, `<i class="fa-solid fa-ghost"></i> Paranormal`], "Concept/horse.png", "Concept/horseIcon.png", 6))
candidates.push(new Candidate("Pavoni the Peacock", " Foto Model", "You already know me from the latest VOGUE covers, so lets talk about You. What do you think about my new look?", [`<i class="fa-solid fa-camera"></i> Photo`, `<i class="fa-solid fa-bag-shopping"></i> Shopping`, `<i class="fa-solid fa-palette"></i> Art`], "Concept/bird.png", "Concept/birdIcon.png", 7))

candidateDraw();

const likeCandidate = () => {
    candidateStack.push(candidateIndex)
    nextCandidate();
    messageAudio.play();
    setTimeout(showMessagePoppup, 600);
}

const showMessagePoppup = () => {

    const messagePoppup = messagePoppupTemp.content.cloneNode(true);
    
    messagePoppup.querySelector(".messageIcon").src = candidates[candidateStack[0]].icon;
    messagePoppup.querySelector(".messageName").textContent = candidates[candidateStack[0]].name + " wrote to you!";
    document.querySelector(".messagePoppupList").appendChild(messagePoppup)

    document.querySelectorAll(".messagePoppup")[activeMessageIndex].setAttribute("id", candidates[candidateStack[0]].candidateId)

    candidateStack.shift()

    messagePoppupList.addEventListener("click", openChat)
    activeMessageIndex++
}

const nextCandidate = () =>{
    candidateIndex++;
    if(candidateIndex == candidates.length){
        document.querySelector(".mainCandidate").classList.toggle("hiddenClass")
        document.querySelector(".noCandidates").classList.toggle("hiddenClass")
    }else{
        candidateDraw();
    }
}

const openChat = (e) => {
    if(e.target.classList[0] !== "messagePoppupList"){
        if(e.target.classList[0] === "messageIcon" || e.target.classList[0] === "messageName"){
            document.querySelector(".messagePoppupList").removeChild(e.target.parentElement)
            document.querySelector(".messageBox").classList.remove("hiddenClass")

            setChat(parseInt(e.target.closest(".messagePoppup").id))
        }
        else{
            document.querySelector(".messagePoppupList").removeChild(e.target)
            document.querySelector(".messageBox").classList.remove("hiddenClass")

            setChat(parseInt(e.target.closest(".messagePoppup").id))
        }
        activeMessageIndex--

    }
}

const setChat = (x) =>{

    switch(x){
        case 1:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "I'm organizing a bank robbery this Friday. Do you want to come with me?"
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;

        case 2:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "I can see that you liked me. Can I move in tomorrow?"
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;

        case 3:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "This month I was only gonna sleep and eat, but I can make an exception. Wanna go outside?"
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;

        case 4:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "Do you want to come with me to my exhibition? Tickets are only 230$ apiece."
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;
        
        case 5:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "Will you explain to me at dinner, how much of a threat is a water gun?"
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;

        case 6:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "I'm in your town on Sunday. Maybe I'll fly by You?"
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;
        
        case 7:
            document.querySelector(".messageBoxIcon").src = candidates[x-1].icon;
            document.getElementById("candidateMessage1").innerHTML = "Will you come with me to a local Mirror Maze, so you can gaze at me from all sides."
            document.querySelector(".timeCandidateMessage1").innerHTML = time
            break;
    }

    //Wykonuje się po pierwszej rozmowie, gdy Przyciski są usuniętę --- dodać addevent
    if(userAnswerIsVisivle === false){
        const userAnswers = userAnswersChoiceButtonsTemp.content.cloneNode(true);
        document.querySelector(".userAnswersChoice").appendChild(userAnswers)
        document.querySelector(".userMessageBox").classList.toggle("hiddenClass")
    
    }

    userAnswerYesBtn.addEventListener('click', continueChatOnYes);
    userAnswerNoBtn.addEventListener('click', continueChatOnNo);

}

const continueChatOnYes = () =>{

    console.log("Tak");
    userAnswersChoice.removeChild(userAnswerYesBtn)
    userAnswersChoice.removeChild(userAnswerNoBtn)
    userAnswerIsVisivle = false;
    document.querySelector(".userMessageBox").classList.toggle("hiddenClass")
    document.querySelector(".timeUsereMessage").innerHTML = time;

}

const continueChatOnNo = () =>{

    console.log("Nie");
    userAnswersChoice.removeChild(userAnswerYesBtn)
    userAnswersChoice.removeChild(userAnswerNoBtn)
    userAnswerIsVisivle = false;
    document.querySelector(".userMessageBox").classList.toggle("hiddenClass")
    document.querySelector(".timeUsereMessage").innerHTML = time;
    document.getElementById("userMessage1").innerHTML = "No, thx.";
}

const closeChat = () =>{
    document.querySelector(".messageBox").classList.add("hiddenClass")
}


const resetSite = () => {
    localStorage.clear()
    window.location.reload()
}


SaveBtn.addEventListener('click', checkForm);
changeProfilBtn.addEventListener('click', openClosePopup);
LikeBtn.addEventListener('click', likeCandidate);
RejectedBtn.addEventListener('click', nextCandidate);
resetSiteBtn.addEventListener('click', resetSite);
closeMessageBtn.addEventListener('click', closeChat);
