import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {environment} from '../../environments/environment';

declare var require: any;
declare const Buffer: any;
const Tx = require('ethereumjs-tx');
const ethUtil = require('ethereumjs-util');
// TODO:
let Web3;

@Injectable()
export class Web3NativeService {
    public web3: any;

    constructor() {
    }

    // public transferWalletCurrency(transaction: NewTransaction) {
    //
    //     return new Promise((resolve, reject)=>{
    //         const hash = this.Token.methods.transfer(transaction.to, Math.floor(transaction.data.token_amount * 10**18)).send({
    //             from: transaction.from,
    //             gasPrice: transaction.gasPriceInWei,
    //             gas: transaction.gasLimit
    //         }).on('transactionHash', function(hash) {
    //             resolve(hash);
    //         }).on('error', (e:any)=> {
    //             const errorDesc = e.toString().toLowerCase();
    //             if (errorDesc.indexOf('unable to sign transaction for this address') != -1) {
    //                 reject('Невозможно подписать транзацию. Вероятно адрес кошелька MetaMask отличается от адреса, указанного на сайте.');
    //             }
    //             else if (errorDesc.indexOf('user denied transaction signature') != -1)
    //                 reject('Транзакция была отменена пользователем');
    //             else {
    //                 // TODO: send an error to server
    //                 reject('Неизвестная ошибка');
    //             }
    //         });
    //     });
    // }

    // public buy(options: any)
    // {
    //   // address: string, data: number, promo: string, gasAmount: number, gasPrice: string
    //   return new Promise((resolve, reject)=>
    //   {
    //     const amountInWei = this.web3.utils.toWei(options.data).toString();
    //
    //     this.ActiveICOContract.methods.buy(options.promo).send({from:options.address,gasPrice:options.gasPrice, gas : options.gasAmount, value: amountInWei })
    //       .then(resolve)
    //       .catch((err: any)=>
    //       {
    //         if (err.toString().toLowerCase().indexOf('unable to sign transaction for this address') != -1)
    //         {
    //           reject({error : 'Unable_to_sign_transaction_for_this_address'})
    //         }
    //         else
    //         {
    //           reject({error : 'Unknown error', details: err})
    //         }
    //       });
    //   })
    //
    // }

    GetContract(abi: any, address: string) {
        if (this.web3.eth.contract) {
            var MyContract = this.web3.eth.contract(abi);
            return MyContract.at(address);
        }
        else {
            const obj = new this.web3.eth.Contract(abi, address);
            return obj;
        }
    }

    public async newGame() {
      let gasPrice = await this.web3.eth.getGasPrice();
      let bytecode = '0x6000601f8190556101406040526080908152600760a052601260c052602160e052604b61010052605a610120526200003c9060229060066200005b565b506023805460ff191690553480156200005457600080fd5b5062000119565b600183019183908215620000e35791602002820160005b83821115620000b257835183826101000a81548160ff021916908360ff160217905550926020019260010160208160000104928301926001030262000072565b8015620000e15782816101000a81549060ff0219169055600101602081600001049283019260010302620000b2565b505b50620000f1929150620000f5565b5090565b6200011691905b80821115620000f157805460ff19168155600101620000fc565b90565b6111de80620001296000396000f3006080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633bc5de3081146100b35780635254f536146101995780635c07a4b0146101c4578063657439b1146101d957806391b5d8cf1461020f57806399949b6614610236578063b41c5dd414610284578063c19d93fb146102b2578063d5782419146102eb578063d65ab5f214610300578063f71d96cb14610315575b600080fd5b3480156100bf57600080fd5b506100c8610358565b6040518087606080838360005b838110156100ed5781810151838201526020016100d5565b5050505090500186600360200280838360005b83811015610118578181015183820152602001610100565b5050505090500185600360200280838360005b8381101561014357818101518382015260200161012b565b50505061ffff808916949092019384525085166020830152506040018261708080838360005b83811015610181578181015183820152602001610169565b50505050905001965050505050505060405180910390f35b3480156101a557600080fd5b506101c2600435600190810b90602435900b60ff604435166105b0565b005b3480156101d057600080fd5b506101c2610dc3565b3480156101e557600080fd5b506101ee610f2e565b6040805161ffff938416815291909216602082015281519081900390910190f35b34801561021b57600080fd5b50610224610f42565b60408051918252519081900360200190f35b34801561024257600080fd5b5061024b610f48565b604051808261708080838360005b83811015610271578181015183820152602001610259565b5050505090500191505060405180910390f35b34801561029057600080fd5b5061029c600435610fa1565b6040805160ff9092168252519081900360200190f35b3480156102be57600080fd5b506102c7610fc9565b604051808260038111156102d757fe5b60ff16815260200191505060405180910390f35b3480156102f757600080fd5b50610224610fd2565b34801561030c57600080fd5b506101c2610fd8565b34801561032157600080fd5b5061032d6004356110ee565b60408051600160a060020a03909416845261ffff909216602084015282820152519081900360600190f35b610360611172565b610368611172565b610370611172565b60008061037b611191565b601d546000101561040557601d8054600090811061039557fe5b6000918252602082206002919091020154600160a060020a03168752601d805490919081106103c057fe5b60009182526020822060029190910201600101548552601d805490919081106103e557fe5b60009182526020909120600291909102015460a060020a900461ffff1685525b601d54600110156104a557601d8054600190811061041f57fe5b60009182526020918290206002909102015461ffff60a060020a9091041690860152601d8054600190811061045057fe5b600091825260209182902060029091020154600160a060020a031690870152601d8054600190811061047e57fe5b90600052602060002090600202016001015484600160038110151561049f57fe5b60200201525b601d546002101561054457601d805460029081106104bf57fe5b600091825260209091206002918202015460a060020a900461ffff166040870152601d805490919081106104ef57fe5b6000918252602090912060029182020154600160a060020a03166040880152601d8054909190811061051d57fe5b90600052602060002090600202016001015484600260038110151561053e57fe5b60200201525b6020546040805161708081019182905261ffff8084169650620100009093049092169350600090610384908280855b825461010083900a900460ff1681526020600192830181810494850194909303909202910180841161057357905050505050509050909192939495565b6000806000806000601d6003601f548115156105c857fe5b0660ff168154811015156105d857fe5b600091825260209091206002909102018054909550600160a060020a031633148015610608575060008560010154115b151561061057fe5b600260235460ff16600381111561062357fe5b1461062a57fe5b600360ff87161061063757fe5b60058860010b1315801561065057506004198860010b12155b8015610670575060058760010b1315801561067057506004198760010b12155b151561067857fe5b50508254601e61ffff60a060020a909204821660010b8181079450059150868301908683019060009083161180156106b45750601e8261ffff16105b15156106bc57fe5b60008161ffff161180156106d45750601e8161ffff16105b15156106dc57fe5b845461ffff601e83028401811660a060020a90810275ffff00000000000000000000000000000000000000001990931692909217808855601f549290041690601d906003906001010660ff1681548110151561073457fe5b600091825260209091206002909102015460a060020a900461ffff1614801561079157506000601d6003601f5460010181151561076d57fe5b0660ff1681548110151561077d57fe5b906000526020600020906002020160010154115b156108e257601f54601d906003906001010660ff168154811015156107b257fe5b90600052602060002090600202016001015485600101541115610859576064601d6003601f546001018115156107e457fe5b0660ff168154811015156107f457fe5b90600052602060002090600202016001015460140281151561081257fe5b60018088018054939092049092039055601f54600091601d91600391010660ff1681548110151561083f57fe5b9060005260206000209060020201600101819055506108e2565b601f54601d906003906001010660ff1681548110151561087557fe5b906000526020600020906002020160010154856001015410156108e257600185015460649060140204601d6003601f546001018115156108b157fe5b0660ff168154811015156108c157fe5b60009182526020822060016002909202018101805493909303909255908601555b8454601f5460a060020a90910461ffff1690601d906003906002010660ff1681548110151561090d57fe5b600091825260209091206002909102015460a060020a900461ffff1614801561096a57506000601d6003601f5460020181151561094657fe5b0660ff1681548110151561095657fe5b906000526020600020906002020160010154115b15610abc57601f54601d906003906002010660ff1681548110151561098b57fe5b90600052602060002090600202016001015485600101541115610a33576064601d6003601f546002018115156109bd57fe5b0660ff168154811015156109cd57fe5b9060005260206000209060020201600101546014028115156109eb57fe5b600187018054929091049091039055601f54600090601d906003906002010660ff16815481101515610a1957fe5b906000526020600020906002020160010181905550610abc565b601f54601d906003906002010660ff16815481101515610a4f57fe5b90600052602060002090600202016001015485600101541015610abc57600185015460649060140204601d6003601f54600201811515610a8b57fe5b0660ff16815481101515610a9b57fe5b60009182526020822060016002909202018101805493909303909255908601555b606460226001610adc610ace8c611130565b610ad78c611130565b611150565b0361ffff16600681101515610aed57fe5b602091828204019190069054906101000a900460ff1660ff16866001015402811515610b1557fe5b600187018054929091049091036064019055845460009060a060020a900461ffff166103848110610b4257fe5b60208104919091015460ff601f9092166101000a90041661ffff606460f94206430340061611610bbe578454600090819060a060020a900461ffff166103848110610b8957fe5b602091828204019190066101000a81548160ff021916908360ff1602179055506103e885600101600082825401925050819055505b60205461ffff16158015610bdc575060205462010000900461ffff16155b8015610bf65750601e606460f942064303400661ffff1611155b15610c37576020805461ffff191661038460f9420643034090810661ffff9081169290921763ffff0000191662010000603290920660140192909216021790555b60205460006201000090910461ffff16118015610c655750845460205461ffff90811660a060020a90920416145b15610d3357602054601d805460649262010000900461ffff16919060ff8a16908110610c8d57fe5b90600052602060002090600202016001015402811515610ca957fe5b600187018054929091049091019055602054601d805460649262010000900461ffff16919060ff8a16908110610cdb57fe5b90600052602060002090600202016001015402811515610cf757fe5b04601d8760ff16815481101515610d0a57fe5b6000918252602091829020600160029092020101805492909203909155805463ffffffff191690555b601f5460039060010106601f819055601d80549091908110610d5157fe5b90600052602060002090600202016001015460001415610db957601f5460039060010106601f819055601d80549091908110610d8957fe5b90600052602060002090600202016001015460001415610db957602380546003919060ff19166001835b02179055505b5050505050505050565b601d54600090600311610dd257fe5b336000908152601e602052604090205460ff1615610dec57fe5b601d541515610e04575060044301602155605e610e1c565b601d5460011415610e1757506093610e1c565b5061031c5b604080516060810182523380825261ffff80851660208085019182526064858701908152601d8054600181810183556000838152985160029092027f6d4407e7be21f808e6509aa9fa9143369579dd7d760fe20a2c09680fc146134f81018054975190981660a060020a0275ffff000000000000000000000000000000000000000019600160a060020a039490941673ffffffffffffffffffffffffffffffffffffffff1990981697909717929092169590951790955590517f6d4407e7be21f808e6509aa9fa9143369579dd7d760fe20a2c09680fc146135090940193909355928452601e90925292909120805460ff191690911790555460031415610f2b576023805460ff191660011790555b50565b60205461ffff808216916201000090041682565b601f5481565b610f50611191565b6040805161708081019182905290600090610384908280855b825461010083900a900460ff16815260206001928301818104948501949093039092029101808411610f695790505050505050905090565b6000816103848110610faf57fe5b60209182820401919006915054906101000a900460ff1681565b60235460ff1681565b60215481565b600080808080808080600160235460ff166003811115610ff457fe5b14610ffb57fe5b600197505b60058810156110da57602154889003409650601e610384880681810697500494506002935060021992505b60038360010b12156110cf5760021991505b60038260010b12156110c45750601e848201028501820160010b6103848110156110b9576028848881151561106e57fe5b0481151561107857fe5b06600082610384811061108757fe5b60208104909101805460ff601f9093166101000a80820484169094018316840292909302199092161790556002909302925b60019091019061103d565b60019092019161102b565b600190970196611000565b602380546002919060ff1916600183610db3565b601d8054829081106110fc57fe5b600091825260209091206002909102018054600190910154600160a060020a038216925060a060020a90910461ffff169083565b6000808260010b12156111485781600003905061114b565b50805b919050565b60008161ffff168361ffff16111561116957508161116c565b50805b92915050565b6060604051908101604052806003906020820280388339509192915050565b617080604051908101604052806103849060208202803883395091929150505600a165627a7a72305820f171070a7bc9db32fec524ef8d3f0f70f64dbdda7bdd71130ef5fa75a8bebf1c0029';
      let abi = [
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
          "constant": false,
          "inputs": [],
          "name": "startGame",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "players",
          "outputs": [
            {
              "name": "playerAddress",
              "type": "address"
            },
            {
              "name": "position",
              "type": "uint16"
            },
            {
              "name": "energy",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        }
      ];

      return await new Promise((resolve, reject)=>
      {
        let newContrat = new this.web3.eth.Contract(abi);

        newContrat.deploy({data: bytecode,
          arguments: []}).send(
          {
            from: this.getCurrentAddress(),
            gas: '2000000',
            gasPrice: gasPrice.toString()
          }, function (err, transactionHash)
          {
            if (transactionHash)
            {
              console.log(transactionHash);
            }
            else if (err)
            {
              console.log(err);
            }
          }).on('error', function(error){ reject({error: error}); })
          .on('transactionHash', function(transactionHash){console.log(transactionHash);})
          .on('receipt', function(receipt){
            console.log(receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){ console.log(receipt); })
          .then(function(newContractInstance){
            environment.GameAddress = newContractInstance.options.address;
            resolve({contract: newContractInstance, address: newContractInstance.options.address, interface: newContractInstance.options.interface});
          });
      });
  }


    public async getData()
    {
      const data = await this.Game.methods.getData().call();
      return {
        players: [
          {playerAddress : data.playerAddress[0], x: data.position[0]%30, y: Math.floor(data.position[0]/30), energy: Math.floor(data.energy[0])},
          {playerAddress : data.playerAddress[1], x: data.position[1]%30, y: Math.floor((data.position[1]/30)), energy: Math.floor(data.energy[1])},
          {playerAddress : data.playerAddress[2], x: data.position[2]%30, y: Math.floor((data.position[2]/30)), energy: Math.floor(data.energy[2])}
          ],
        bonus: {
          x: data.bonusPosition%30,
          y: Math.floor(data.bonusPosition/30),
          bonusValue: data.bonusValue
        },
        field: data._field
      }
    }

    public async getState()
    {
      const data = await this.Game.methods.state().call();
      return data;
    }

    getCurrentAddress()
    {
      return this.web3.currentProvider.publicConfigStore.getState().selectedAddress;
    }
    Game: any;

    public isNativeInstalled(): boolean {
        return !!this.web3;
    }

    public get accounts() {
        return this.web3.accounts;
    }

    async action(xOffset, yOffset, indexTargetPlayer) {
      await this.web3.Game.methods.action(xOffset, yOffset, indexTargetPlayer).send({from: this.web3.getCurrentAddress()})
    }

    public recreateContract()
    {
      this.Game = this.GetContract(environment.GameABI, environment.GameAddress);
    }

    public loadNativeWeb3() {
        Web3 = require('./web3_client');

        const Provider = Web3.givenProvider;// || (window['web3'] && window['web3'].currentProvider);

        if (Provider && !this.web3) {
            this.web3 = new Web3();

            this.web3.setProvider(Provider);

            this.Game = this.GetContract(environment.GameABI, environment.GameAddress);
        }
    }
}
