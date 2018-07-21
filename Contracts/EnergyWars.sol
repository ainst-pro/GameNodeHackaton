pragma solidity ^0.4.21;


contract EnergyWars {

    struct Bonus {
        uint16 position;
        uint16 value;
        bool isView;
    }

    struct Gamer {
        address idx;
        uint16 position;
        uint256 energy;
    }

    uint16[900] gamePlace;

    Gamer[] gamers;
    mapping (address => boolean) checkGamer;
    uint8 idxGamerStep = 0;
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

    function getInfoGamer(uint8 index) constant public returns(uint16 x, uint16 y, uint256 energy)
    {

    }

    function action() public
    {
        assert(gamers[idxGameStep].idx == msg.sender);
        assert(gamer.length == 3);
    }
}
