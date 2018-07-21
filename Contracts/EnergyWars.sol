pragma solidity ^0.4.21;


contract EnergyWars {

    struct Bonus {
        uint16 position;
        uint16 value;
    }

    struct Player {
        address playerAddress;
        uint16 position;
        uint256 energy;
    }

    uint8[900] field;

    Player[] public players;
    mapping (address => boolean) checkGamer;
    uint8 public idxCurrentPlayerTurn = 0;
    Bonus public gameBonus;
    enum GameState
    {
        WaitingForPlayers,
        Started,
        Finished
    }

    GameState public state = GameState.WaitingForPlayers;

    function EnergyWars(){

    }


    function registerPlayer() public
    {
        assert(players.length < 3);
        assert(!checkGamer[msg.sender]);

        // uint16 position = uint16((blockhash(block.number) + block.timestamp) % 900);
        uint16 position;
        if (players.length == 0) 
            position = 94;
        else if (players.length == 1) 
            position = 147;
        else
            position = 796;

        players.push(Player(msg.sender, position, 1 /*basic energy*/));
        checkGamer[msg.sender] = True;

        if (players.length == 3) state = GameState.Started;
    }

    // gameBonus

    function getGameField () constant public returns(uint8[900]) {
            return field;
    }

    function action(int16 xOffset, int16 yOffset, uint8 indexTargetPlayer) public
    {
        Player memory player = players[idxCurrentPlayerTurn];
        assert(player.playerAddress == msg.sender);
        assert(state == GameState.Started);
        // Ходим максимум на 3 в одном из направлений
        asset(xOffset <= 3 && yOffset == 0  || yOffset <= 3 && xOffset == 0);
        int16 x = int16(player.position) % 30;
        int16 y = int16(player.position) / 30;
        uint16 newX = x + xOffset;
        uint16 newY = y + yOffset;
        assert(newX > 0 && newX < 30);
        assert(newY > 0 && newY < 30);
    }
}
