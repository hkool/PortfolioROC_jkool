export class MemoryView {
    //constructor
    images = [];
    memory;

    constructor(memory){
        this.memory = memory;
        this.cards = this.memory.getCards()
        this.images = document.querySelectorAll(".pict1");
        this.showCardset();
    }
    // function to select elements from DOM
    getElement(selector){
        const element = document.querySelector(selector);
        return element;
    }
    //function to bind element to function to turn a card
    bindCardChoice(handler) {
        this.cardLinks = document.querySelectorAll('.pict1');
        this.cardLinks.forEach(element =>element.addEventListener('click', MemoryEvent => {
                handler(element.id-1);
            }));
    }
    // function to bind start of the game to the button
    bindStartGame(handler){
        let startbutton = this.getElement("#start");
        startbutton.addEventListener('click',MemoryEvent =>{
            handler();
        })
    }
    // function to bind the button to the hiding of the pictures.
    bindTurnCards(handler) {
        let turnButton = this.getElement("#turnCards");
        turnButton.addEventListener('click', MemoryEvent=>{
            handler();
        })
    }
    // function to prepare the images array.
    showCardset(){
        for(let m=0;m<30;m++) {
            if ( this.cards[m].getTurned()==false) {
                let img = this.cards[m].getImage();
                this.images[m].innerHTML = "<img id='img" + (m + 1) + "' src='./images/" + img + "'/>";
            }
            else{
                this.images[m].style.background="white";
            }
        }
    }
    //show the picture that was chosen.
    turnCard(pickedCard){
        let img = this.cards[pickedCard].getImage();
        this.images[pickedCard].innerHTML = "<img id='img" + pickedCard + "' src='./images/" + img + "'/>";
    }
    //update the score
    updateScore()
    {
         let score = document.querySelector('#score');
         score.innerHTML = this.memory.getScore()+" punten.";
    }

    // function to turn the cards
    turnTheCards() {
        let images = document.querySelectorAll("img");

       if(!images.length){
           this.showCardset(this.cards);
           this.memory.setCardsVisible(true);
       }
        else{
           this.hideTheCards();
       }
    }
    hideTheCards(){
        let cardset = document.querySelectorAll(".pict1");
        for(let m=0;m<30;m++){
            cardset[m].innerHTML = "";
            if(this.cards[m].getTurned()==true)
            {
                cardset[m].style.background="white";
            }
            else{
                cardset[m].style.background="oceanblue";
            }
        }
        this.memory.setCardsVisible(false);
    }
}