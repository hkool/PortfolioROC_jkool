export class Card {
    constructor(id, image){
        this.id = id;
        this.image = image;
        this.turned = false;
    }
    getImage(){
        return this.image;
    }
    getTurned(){
        return this.turned;
    }
    setImage(image){
        this.image = image;
    }
    getId()
    {return this.id;
    }
    setTurned(indicator){
        this.turned = indicator;
    }


}