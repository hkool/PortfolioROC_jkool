import {MemoryModel} from "../model/MemoryModel.js";
import {MemoryView} from "../view/MemoryView.js";

export class Controller {

    constructor() {
        this.memory = new MemoryModel();
        this.memoryView = new MemoryView(this.memory);
        this.memoryView.bindTurnCards(this.handleTurnCards);
        this.memoryView.bindStartGame(this.handleStartGame);
        this.memoryView.bindCardChoice(this.handleCardChoice);
        this.memoryView.updateScore();
    }
    handleStartGame = () =>{
        alert("The game will be prepared, good luck");
        this.memory.prepareTheGame();
        this.memoryView.showCardset();
        this.memoryView.updateScore();
    }
    handleTurnCards = () =>{
        if(this.memory.getCardsVisible() == true){
            alert("The pictures will be turned., good luck");
        }
        else
        {
            if(confirm("You want an other look at the pictures? That will cost you 50 pnts ")){
                this.memory.setScore(-50);
            }
        }

        this.memoryView.turnTheCards();
    }
    handleCardChoice=(pickedCard)=> {
        this.pickedCard = pickedCard;
        this.memoryView.turnCard(this.pickedCard);
        // when two pictures are turned return true, then the cards must be turned back of taken out of the game.
        let hide = this.memory.checkTurnedCard(this.pickedCard);
        if(hide== true){
            setTimeout(() => this.memoryView.hideTheCards(), 1000);
        }
        this.memoryView.updateScore();
    }
}