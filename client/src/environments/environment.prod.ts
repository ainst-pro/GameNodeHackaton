export const environment = {
  production: true,
  server: 'https://ew.ainst.pro',
  GameAddress : '0x1b40ef68524fe60963f11d24782a21c76db1d238',
  GameABI: [
    {
      "constant": false,
      "inputs": [
        {
          "name": "xOffset",
          "type": "int16"
        },
        {
          "name": "yOffset",
          "type": "int16"
        },
        {
          "name": "indexTargetPlayer",
          "type": "uint8"
        }
      ],
      "name": "action",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "registerPlayer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "startGame",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "field",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "gameBonus",
      "outputs": [
        {
          "name": "position",
          "type": "uint16"
        },
        {
          "name": "value",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "name": "playerAddress",
          "type": "address[3]"
        },
        {
          "name": "position",
          "type": "uint16[3]"
        },
        {
          "name": "energy",
          "type": "uint256[3]"
        },
        {
          "name": "bonusPosition",
          "type": "uint16"
        },
        {
          "name": "bonusValue",
          "type": "uint16"
        },
        {
          "name": "_field",
          "type": "uint8[900]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getField",
      "outputs": [
        {
          "name": "",
          "type": "uint8[900]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "idxCurrentPlayerTurn",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mapBlock",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
};
