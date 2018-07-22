// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    server: 'https://ew.ainst.pro',
    GameAddress : '',
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
