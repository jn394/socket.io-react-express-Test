class Player {
    constructor(socketId, playerName, score){
        this.socketId = socketId;
        this.playerName = playerName;
        this.score = score;
    }
}

module.exports = Player;