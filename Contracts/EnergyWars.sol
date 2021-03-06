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
    mapping (address => bool) checkGamer;
    uint256 public idxCurrentPlayerTurn = 0;
    Bonus public gameBonus;
    uint256 public mapBlock;

    enum GameState
    {
        WaitingForPlayers,
        WaitingForMapGeneration,
        Started,
        Finished
    }

    uint8[6] stepEnergy = [0, 7, 18, 33, 75, 90];
    GameState public state = GameState.WaitingForPlayers;

    function EnergyWars(){

    }

    function startGame () public {
        assert(state == GameState.WaitingForMapGeneration);

        for(uint256 n = 1;n < 5;n++)
        {
            uint256 source = uint256(blockhash(mapBlock - n));
            int16 positionX = int16((source % 900) % 30);
            int16 positionY = int16((source % 900) / 30);
            uint256 shift = 2;
            for(int16 x = -3;x < 3;x++)
                for(int16 y = -3;y < 3;y++)
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

        players.push(Player(msg.sender, position, 100 /*basic energy*/));
        checkGamer[msg.sender] = true;

        if (players.length == 3) state = GameState.WaitingForMapGeneration;
    }

    function getField() view public returns (uint8[900])
    {
        return field;
    }

    function getData() view public returns (address[3] playerAddress, uint16[3] position, uint256[3] energy,
        uint16 bonusPosition, uint16 bonusValue, uint8[900] _field)
    {
        if (players.length > 0)
        {
            playerAddress[0] = players[0].playerAddress;
            energy[0] = players[0].energy;
            position[0] = players[0].position;
        }

        if (players.length > 1)
        {
            position[1] = players[1].position;
            playerAddress[1] = players[1].playerAddress;
            energy[1] = players[1].energy;
        }

        if (players.length > 2)
        {
            position[2] = players[2].position;
            playerAddress[2] = players[2].playerAddress;
            energy[2] = players[2].energy;
        }


        bonusPosition = gameBonus.position;
        bonusValue = gameBonus.value;
        _field = field;
    }

    function abs(int16 x) pure internal returns (uint16)
    {
        if (x < 0) return uint16(-x);
        return uint16(x);
    }

    function max(uint16 x,uint16 y) pure internal returns (uint16)
    {
        if (x > y) return x;
        return y;
    }

    function action(int16 xOffset, int16 yOffset, uint8 indexTargetPlayer) public
    {
        Player player = players[uint8(idxCurrentPlayerTurn%3)];
        assert(player.playerAddress == msg.sender && player.energy > 0);
        assert(state == GameState.Started);
        assert(indexTargetPlayer < 3);
        // Ходим максимум на 3 в одном из направлений
        //        assert((xOffset <= 5 && xOffset >=-5 && yOffset == 0)  || (yOffset <= 5 && yOffset >=-5 && xOffset == 0));
        assert((xOffset <= 5 && xOffset >=-5)  && (yOffset <= 5 && yOffset >=-5));
        int16 x = int16(player.position) % 30;
        int16 y = int16(player.position) / 30;
        uint16 newX = uint16(int16(x) + xOffset);
        uint16 newY = uint16(int16(y) + yOffset);
        assert(newX > 0 && newX < 30);
        assert(newY > 0 && newY < 30);
        //устанавливаем новую позицию
        uint16 oldPos = player.position;
        player.position = newY * 30 + newX;

        // проверяем есть ли другой игрок в клетке и проводим бой
        if (players[uint8((idxCurrentPlayerTurn+1)%3)].position == player.position && players[uint8((idxCurrentPlayerTurn+1)%3)].energy > 0){
            if (player.energy > players[uint8((idxCurrentPlayerTurn+1)%3)].energy) {
                player.energy -= players[uint8((idxCurrentPlayerTurn+1)%3)].energy * 20 / 100;
                players[uint8((idxCurrentPlayerTurn+1)%3)].energy = 0;
            }else if (player.energy < players[uint8((idxCurrentPlayerTurn+1)%3)].energy) {
                players[uint8((idxCurrentPlayerTurn+1)%3)].energy -= player.energy * 20 / 100;
                player.energy = 0;
            }
        }

        if (players[uint8((idxCurrentPlayerTurn+2)%3)].position == player.position && players[uint8((idxCurrentPlayerTurn+2)%3)].energy > 0){
            if (player.energy > players[uint8((idxCurrentPlayerTurn+2)%3)].energy) {
                player.energy -= players[uint8((idxCurrentPlayerTurn+2)%3)].energy * 20 / 100;
                players[uint8((idxCurrentPlayerTurn+2)%3)].energy = 0;
            }else if (player.energy < players[uint8((idxCurrentPlayerTurn+2)%3)].energy) {
                players[uint8((idxCurrentPlayerTurn+2)%3)].energy -= player.energy * 20 / 100;
                player.energy = 0;
            }
        }

        // ...и отнимаем энергию за ход
        player.energy -= (player.energy * stepEnergy[uint256(max(abs(xOffset), abs(yOffset)) - 1)]) / 100;
        player.energy += 100; //прибавляем энергию за ход 1*10**2, два знака после запятой

        //расчитать и прибавить если выпадит бонусную энергию
        if (uint16(uint256(blockhash(block.number - block.timestamp%249)) % 100) <= field[player.position])
        {
            field[oldPos] = 0;
            player.energy += 1000;
        }

        //расчитываем бонус
        if ( gameBonus.position == 0 && gameBonus.value == 0 && uint16(uint256(blockhash(block.number - block.timestamp%249)) % 100) <= 30) {
            gameBonus.position = uint16(uint256(blockhash(block.number - block.timestamp%249)) % 900);
            gameBonus.value = uint16(uint256(blockhash(block.number - block.timestamp%249)) % 50) + 20;
        }
        if ( gameBonus.value > 0 && gameBonus.position == player.position ) {
            player.energy += (players[indexTargetPlayer].energy * gameBonus.value) / 100;
            players[indexTargetPlayer].energy -= (players[indexTargetPlayer].energy * gameBonus.value) / 100;
            gameBonus.position = 0;
            gameBonus.value = 0;
        }

        idxCurrentPlayerTurn = (idxCurrentPlayerTurn + 1) % 3;
        if (players[idxCurrentPlayerTurn].energy == 0) {
            idxCurrentPlayerTurn = (idxCurrentPlayerTurn + 1) % 3;

            if (players[idxCurrentPlayerTurn].energy == 0) {
                state = GameState.Finished;
            }
        }

        // if (players[uint8(idxCurrentPlayerTurn%3)].energy == 0) state = GameState.Finished;
    }
}
