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

    uint8[900] public field;

    Player[] public players;
    mapping (address => boolean) checkGamer;
    uint8 public idxCurrentPlayerTurn = 0;
    Bonus public gameBonus;
    uint256 public mapBlock;

    enum GameState
    {
        WaitingForPlayers,
        WaitingForMapGeneration,
        Started,
        Finished
    }

    GameState public state = GameState.WaitingForPlayers;

    function EnergyWars(){

    }

    function startGame () public {
        assert(state == GameState.WaitingForMapGeneration);

        for(uint256 n = 1;n < 4;n++)
        {
            uint256 source = uint256(blockhash(mapBlock - n));
            int16 positionX = int16((source % 900) % 30);
            int16 positionY = int16((source % 900) / 30);
            uint256 shift = 2;
            for(int16 x = -2;x < 2;x++)
            for(int16 y = -2;y < 2;y++)
            {
                uint256 position = uint256((positionY + y) * 30 + positionX + x);
                if (position < 900)
                {
                 field[position] += uint8((source / shift) % 40);
                 shift = shift * 2;
                }
            }
        }
        state = GameState.Started;
    }

    function registerPlayer() public
    {
        assert(players.length < 3);
        assert(!checkGamer[msg.sender]);

        // uint16 position = uint16((blockhash(block.number) + block.timestamp) % 900);
        uint16 position;
        if (players.length == 0) {
            position = 94;
            mapBlock = block.number + 4;
        }else if (players.length == 1)
            position = 147;
        else
            position = 796;

        players.push(Player(msg.sender, position, 1 /*basic energy*/));
        checkGamer[msg.sender] = True;

        if (players.length == 3) state = GameState.Started;
    }

    function action() public
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

        idxGamerStep += 1;
        if (idxGamerStep == 3) idxGamerStep = 0;
    }
}
