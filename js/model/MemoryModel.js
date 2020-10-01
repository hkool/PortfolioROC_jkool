import {Card} from './Card.js';

export class MemoryModel extends EventTarget {

    constructor() {
        super();
        this.cards = [];
        this.prepareTheGame();
        this.score;
        this.cardTurnedFirst;
        this.cardsVisible= true;
    }

    //game is made to start, cards shuffled and shown in the game
    //score = 0, property "turned"set to false
    prepareTheGame() {
        this.fillCards();
        this.setCardsVisible(true);
        this.score = 100;
        this.cardTurnedFirst=null;

    }
    //the array with pictures is filled en shuffled
    fillCards()
    {
        let index, initCard;
        for(let c=0;c<15;c++) {
            index = c + 1;
            initCard = new Card(index, "image" + index + ".jpg");
            // card not picked out, when couple is found, setTurned = true.
            initCard.setTurned(false);
            // card is in the game on two positions
            this.cards[c] = initCard;
            this.cards[c + 15] = initCard;
        }
        //cards are shuffled
        for( let p=0; p<80;p++){
            let random = Math.floor(Math.random() *30);
            let switchCard = this.cards[random];
            if(random < 29){
                this.cards[random] = this.cards[random+1];
                this.cards[random+1]=switchCard;
            }
            else{
                this.cards[random]= this.cards[0];
                this.cards[0] = switchCard;
            }
        }
    }

    checkTurnedCard(id) {
        // Only if the pictures are hidden, otherwise an message.
        // the photos are visible = true, the photos are turned = false
        // if photos visible, no move possible.
        if (this.cardsVisible == true)
        {
            alert("Please turn the cards to start or continue.");
        }
        else if(id == this.cardTurnedFirst){
            alert("Choose two different cards.")
        }
        else{
            // picture number 1 in the turn
            if (this.cardTurnedFirst == null) {
                this.cardTurnedFirst = id;
                return false; // leave the card turned;
            }
            // picture number 2, now comparison
            else {
                if (this.cards[this.cardTurnedFirst].getImage() == this.cards[id].getImage()) {
                    this.cards[this.cardTurnedFirst].setTurned(true);
                    this.cards[id].setTurned(true);
                    this.score+=2;
                }
                else{
                    this.score-=2;
                }
                this.cardTurnedFirst = null;
                return true; // hide the cards again.
            }

        }


    }

    // in game the pictures are visible with True, and hidden with False
    setCardsVisible(indicator) {
        this.cardsVisible = indicator;
    }
    // returns value cardsVisible
    getCardsVisible() {
        return this.cardsVisible;
    }

    // return de array with shuffled cards
    getCards() {
        if(!this.cards){
            alert("No cards prepared.");
        }
        return this.cards;
    }
    // number of turned cards.
    getScore(){
        return this.score;
    }

    //adjust score.
    setScore(value) {
        this.score + value;
    }
}