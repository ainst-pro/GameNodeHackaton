pragma solidity ^0.4.21;


contract EnergyWars {

    struct Bonus {
        uint16 position;
        uint16 value;
    }

    struct Gamer {
        address idx;
        uint16 position;
        uint256 energy;
    }

    uint16[900] public gamePlace;

    Gamer[] public gamers;
    mapping (address => boolean) checkGamer;
    uint8 public idxGamerStep = 0;
    Bonus public gameBonus;

    function EnergyWars(){

    }

    function regGamer() public
    {
        assert(gamer.length < 3);
        assert(!checkGamer[msg.sender]);

        uint16 position = uint16((blockhash(block.number) + block.timestamp) % 900);
        gamers[msg.sender] = Gamer(position, 1);
        checkGamer[msg.sender] = True;
    }

    function action() public
    {
        assert(gamers[idxGameStep].idx == msg.sender);
        assert(gamer.length == 3);

        idxGamerStep += 1;
        if (idxGamerStep == 3) idxGamerStep = 0;
    }
}
