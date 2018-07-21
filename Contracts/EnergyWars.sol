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
    uint256 public idxCurrentPlayerTurn = 0;
    Bonus public gameBonus;
    uint8 bonusPercent = 10;
    enum GameState
    {
        WaitingForPlayers,
        Started,
        Finished
    }

    uint8[3] stepEnergy = [10, 30, 80];
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

    function action(int16 xOffset, int16 yOffset, uint8 indexTargetPlayer) public
    {
        Player memory player = players[uint8(idxCurrentPlayerTurn%3)];
        assert(player.playerAddress == msg.sender && player.energy > 0);
        assert(state == GameState.Started);
        assert(indexTargetPlayer < 3);
        // Ходим максимум на 3 в одном из направлений
        asset(xOffset <= 3 && yOffset == 0  || yOffset <= 3 && xOffset == 0);
        int16 x = int16(player.position) % 30;
        int16 y = int16(player.position) / 30;
        uint16 newX = x + xOffset;
        uint16 newY = y + yOffset;
        assert(newX > 0 && newX < 30);
        assert(newY > 0 && newY < 30);
        //устанавливаем новую позицию и отнимаем энергию за ход
        player.position = (newY - 1) * 30 + newX - 1;
        player.energy -= (player.energy * stepEnergy[xOffset + yOffset -1]) / 100;
        player.energy += 100; //прибавляем энергию за ход 1*10**2, два знака после запятой

        //расчитать и прибавить если выпадит бонусную энергию
        if (uint16(uint256(blockhash(block.number - block.timestamp%249)) % 100) <= field[player.position]) player.energy += 1000;

        //расчитываем бонус
        if ( gameBonus.position == 0 && gameBonus.value == 0 && uint16(uint256(blockhash(block.number - block.timestamp%249)) % 100) <= bonusPercent) {
            gameBonus.position = uint16(uint256(blockhash(block.number - block.timestamp%249)) % 900);
            gameBonus.value = uint16(uint256(blockhash(block.number - block.timestamp%249)) % 50) + 20;
        }
        if ( gameBonus.value > 0 && gameBonus.position == player.position ) {
            player.energy += (players[indexTargetPlayer].energy * gameBonus.value) / 100;
            players[indexTargetPlayer].energy -= (players[indexTargetPlayer].energy * gameBonus.value) / 100;
            gameBonus.position = 0;
            gameBonus.value = 0;
        }

        //проверяем есть ли другой игрок в клетке и проводим бой
        if (players[uint8((idxCurrentPlayerTurn+1)%3)].position == player.position && players[uint8((idxCurrentPlayerTurn+1)%3)].energy > 0){
            if (player.energy > players[uint8((idxCurrentPlayerTurn+1)%3)].energy) {
                player.energy += players[uint8((idxCurrentPlayerTurn+1)%3)].energy;
                players[uint8((idxCurrentPlayerTurn+1)%3)].energy = 0;
            }
            if (player.energy < players[uint8((idxCurrentPlayerTurn+1)%3)].energy) {
                players[uint8((idxCurrentPlayerTurn+1)%3)].energy += player.energy;
                player.energy = 0;
            }
        }

        if (players[uint8((idxCurrentPlayerTurn+2)%3)].position == player.position && players[uint8((idxCurrentPlayerTurn+2)%3)].energy > 0){
            if (player.energy > players[uint8((idxCurrentPlayerTurn+2)%3)].energy) {
                player.energy += players[uint8((idxCurrentPlayerTurn+2)%3)].energy;
                players[uint8((idxCurrentPlayerTurn+2)%3)].energy = 0;
            }
            if (player.energy < players[uint8((idxCurrentPlayerTurn+2)%3)].energy) {
                players[uint8((idxCurrentPlayerTurn+2)%3)].energy += player.energy;
                player.energy = 0;
            }
        }

        idxCurrentPlayerTurn += 1;
        if (players[uint8(idxCurrentPlayerTurn%3)].energy == 0) {
            idxCurrentPlayerTurn += 1;
        }
        if (players[uint8(idxCurrentPlayerTurn%3)].energy == 0) state = GameState.Finished;
    }
}
