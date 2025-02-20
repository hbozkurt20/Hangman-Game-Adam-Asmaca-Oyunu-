const wordEl = document.getElementById("word");
const miniPopup = document.querySelector(".popup")
const popup = document.querySelector("#popup-container");
const messageElement = document.getElementById("succes-message");
const wrongLettersEl = document.querySelector("#wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.querySelector("#message");
const playAgainBtn = document.querySelector("#play-again");
const örnekİpucu = document.getElementById("ipucu");


let selectedWord = getRandomWord();

const correctLetters = [];
const wrongLetters = [];

örnekİpucu.innerHTML = `<p>${selectedWord.ipucu}</p>`;

displayWord()

function getRandomWord() {
    // const words = ["javascrıpt","java","python"];
    const words = [{
        kelime:"javascrıpt",
        ipucu:"web de en çok kullanılan programlama dili"
    },{
        kelime :"css",
        ipucu : "Stillendirme dili"
    },{
        kelime :"nodejs",
        ipucu : "JS tabanlı backend dili"
    },{
        kelime : "html",
        ipucu : "Metin işaretleme dili"
    }];

    //! Math.random() 0 (dahil) ile 1 (hariç) arasında rastgele bir sayı üretir.
    return words[Math.floor(Math.random() * (words.length))]
}

function displayWord() {
    

    wordEl.innerHTML = `
    ${selectedWord.kelime.split("").map(letter => `
        <div class = "letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </div>
        `).join("")}
    `;

    const w = wordEl.innerText.replace(/\n/g,"");
    if(w===selectedWord.kelime) {
        popup.style.display="flex"
        messageElement.innerText ="Tebrikler Kazandınız"
    }
}

function updateWrongLetters(){
    wrongLettersEl.innerHTML =`
    ${wrongLetters.length>0 ? '<h3>Hatalı Harfler</h3>':""}
    ${wrongLetters.map(letter=> `<span>${letter}</span>`).join("-")}
    `

    items.forEach( (item,index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });

    if(wrongLetters.length === items.length){
        popup.style.display = "flex";
        messageElement.innerText = "Üzgünüm Kaybettiniz"
        miniPopup.classList.add("wrong-popup");
    }
}

function displayMessage() {
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show")
    }, 2000);
}

window.addEventListener("keydown",(e) =>{
    // sadece harf tuşları almak için birany sınıflandırması
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key.toLocaleLowerCase();

        if(selectedWord.kelime.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
});

playAgainBtn.addEventListener("click", () => {
    location.reload();
});





// playAgainBtn.addEventListener("click", () => {
//     correctLetters.splice(0);
//     wrongLetters.splice(0);
    

//     selectedWord = getRandomWord();
//     displayWord();
//     updateWrongLetters();

//     popup.style.display = "none";
//     miniPopup.classList.remove("wrong-popup");

// });