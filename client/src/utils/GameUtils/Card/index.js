class Card {

    constructor(name, value, suit) {
        this.name = name;
        this.value = value;
        this.suit = suit;
        this.up = true;
    }

    isAce() {
        return this.name === "A"
    }

    isUp() {
        return this.up
    }

    flipDown() {
        this.up = false;
    }

    flipUp() {
        this.up = true;
    }

}

export default Card