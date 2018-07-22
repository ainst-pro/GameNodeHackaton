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
      let bytecode = '0x6000601f8190556101406040526080908152600760a052601260c052602160e052604b61010052605a610120526200003c9060229060066200005b565b506023805460ff191690553480156200005457600080fd5b5062000119565b600183019183908215620000e35791602002820160005b83821115620000b257835183826101000a81548160ff021916908360ff160217905550926020019260010160208160000104928301926001030262000072565b8015620000e15782816101000a81549060ff0219169055600101602081600001049283019260010302620000b2565b505b50620000f1929150620000f5565b5090565b6200011691905b80821115620000f157805460ff19168155600101620000fc565b90565b6111d880620001296000396000f3006080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633bc5de3081146100b35780635254f536146101995780635c07a4b0146101c4578063657439b1146101d957806391b5d8cf1461020f57806399949b6614610236578063b41c5dd414610284578063c19d93fb146102b2578063d5782419146102eb578063d65ab5f214610300578063f71d96cb14610315575b600080fd5b3480156100bf57600080fd5b506100c8610358565b6040518087606080838360005b838110156100ed5781810151838201526020016100d5565b5050505090500186600360200280838360005b83811015610118578181015183820152602001610100565b5050505090500185600360200280838360005b8381101561014357818101518382015260200161012b565b50505061ffff808916949092019384525085166020830152506040018261708080838360005b83811015610181578181015183820152602001610169565b50505050905001965050505050505060405180910390f35b3480156101a557600080fd5b506101c2600435600190810b90602435900b60ff604435166105b0565b005b3480156101d057600080fd5b506101c2610dba565b3480156101e557600080fd5b506101ee610f25565b6040805161ffff938416815291909216602082015281519081900390910190f35b34801561021b57600080fd5b50610224610f39565b60408051918252519081900360200190f35b34801561024257600080fd5b5061024b610f3f565b604051808261708080838360005b83811015610271578181015183820152602001610259565b5050505090500191505060405180910390f35b34801561029057600080fd5b5061029c600435610f98565b6040805160ff9092168252519081900360200190f35b3480156102be57600080fd5b506102c7610fc0565b604051808260038111156102d757fe5b60ff16815260200191505060405180910390f35b3480156102f757600080fd5b50610224610fc9565b34801561030c57600080fd5b506101c2610fcf565b34801561032157600080fd5b5061032d6004356110e8565b60408051600160a060020a03909416845261ffff909216602084015282820152519081900360600190f35b61036061116c565b61036861116c565b61037061116c565b60008061037b61118b565b601d546000101561040557601d8054600090811061039557fe5b6000918252602082206002919091020154600160a060020a03168752601d805490919081106103c057fe5b60009182526020822060029190910201600101548552601d805490919081106103e557fe5b60009182526020909120600291909102015460a060020a900461ffff1685525b601d54600110156104a557601d8054600190811061041f57fe5b60009182526020918290206002909102015461ffff60a060020a9091041690860152601d8054600190811061045057fe5b600091825260209182902060029091020154600160a060020a031690870152601d8054600190811061047e57fe5b90600052602060002090600202016001015484600160038110151561049f57fe5b60200201525b601d546002101561054457601d805460029081106104bf57fe5b600091825260209091206002918202015460a060020a900461ffff166040870152601d805490919081106104ef57fe5b6000918252602090912060029182020154600160a060020a03166040880152601d8054909190811061051d57fe5b90600052602060002090600202016001015484600260038110151561053e57fe5b60200201525b6020546040805161708081019182905261ffff8084169650620100009093049092169350600090610384908280855b825461010083900a900460ff1681526020600192830181810494850194909303909202910180841161057357905050505050509050909192939495565b600080600080600080601d6003601f548115156105c957fe5b0660ff168154811015156105d957fe5b600091825260209091206002909102018054909650600160a060020a031633148015610609575060008660010154115b151561061157fe5b600260235460ff16600381111561062457fe5b1461062b57fe5b600360ff88161061063857fe5b60058960010b1315801561065157506004198960010b12155b8015610671575060058860010b1315801561067157506004198860010b12155b151561067957fe5b8554601e61ffff60a060020a909204821660010b81810797500594508986019350888501925060009084161180156106b55750601e8361ffff16105b15156106bd57fe5b60008261ffff161180156106d55750601e8261ffff16105b15156106dd57fe5b508454601e8202830161ffff90811660a060020a90810275ffff000000000000000000000000000000000000000019841617808955601f549382900483169391900490911690601d906003906001010660ff1681548110151561073c57fe5b600091825260209091206002909102015460a060020a900461ffff1614801561079957506000601d6003601f5460010181151561077557fe5b0660ff1681548110151561078557fe5b906000526020600020906002020160010154115b156108ea57601f54601d906003906001010660ff168154811015156107ba57fe5b90600052602060002090600202016001015486600101541115610861576064601d6003601f546001018115156107ec57fe5b0660ff168154811015156107fc57fe5b90600052602060002090600202016001015460140281151561081a57fe5b60018089018054939092049092039055601f54600091601d91600391010660ff1681548110151561084757fe5b9060005260206000209060020201600101819055506108ea565b601f54601d906003906001010660ff1681548110151561087d57fe5b906000526020600020906002020160010154866001015410156108ea57600186015460649060140204601d6003601f546001018115156108b957fe5b0660ff168154811015156108c957fe5b60009182526020822060016002909202018101805493909303909255908701555b8554601f5460a060020a90910461ffff1690601d906003906002010660ff1681548110151561091557fe5b600091825260209091206002909102015460a060020a900461ffff1614801561097257506000601d6003601f5460020181151561094e57fe5b0660ff1681548110151561095e57fe5b906000526020600020906002020160010154115b15610ac457601f54601d906003906002010660ff1681548110151561099357fe5b90600052602060002090600202016001015486600101541115610a3b576064601d6003601f546002018115156109c557fe5b0660ff168154811015156109d557fe5b9060005260206000209060020201600101546014028115156109f357fe5b600188018054929091049091039055601f54600090601d906003906002010660ff16815481101515610a2157fe5b906000526020600020906002020160010181905550610ac4565b601f54601d906003906002010660ff16815481101515610a5757fe5b90600052602060002090600202016001015486600101541015610ac457600186015460649060140204601d6003601f54600201811515610a9357fe5b0660ff16815481101515610aa357fe5b60009182526020822060016002909202018101805493909303909255908701555b606460226001610ae4610ad68d61112a565b610adf8d61112a565b61114a565b0361ffff16600681101515610af557fe5b602091828204019190069054906101000a900460ff1660ff16876001015402811515610b1d57fe5b600188018054929091049091036064019055855460009060a060020a900461ffff166103848110610b4a57fe5b60208104919091015460ff601f9092166101000a90041661ffff606460f94206430340061611610bbc5760008061ffff83166103848110610b8757fe5b602091828204019190066101000a81548160ff021916908360ff1602179055506103e886600101600082825401925050819055505b60205461ffff16158015610bda575060205462010000900461ffff16155b8015610bf45750601e606460f942064303400661ffff1611155b15610c35576020805461ffff191661038460f9420643034090810661ffff9081169290921763ffff0000191662010000603290920660140192909216021790555b60205460006201000090910461ffff16118015610c635750855460205461ffff90811660a060020a90920416145b15610d3157602054601d805460649262010000900461ffff16919060ff8b16908110610c8b57fe5b90600052602060002090600202016001015402811515610ca757fe5b600188018054929091049091019055602054601d805460649262010000900461ffff16919060ff8b16908110610cd957fe5b90600052602060002090600202016001015402811515610cf557fe5b04601d8860ff16815481101515610d0857fe5b6000918252602091829020600160029092020101805492909203909155805463ffffffff191690555b601f5460039060010106601f819055601d80549091908110610d4f57fe5b90600052602060002090600202016001015460001415610daf57601f5460039060010106601f819055601d80549091908110610d8757fe5b90600052602060002090600202016001015460001415610daf576023805460ff191660031790555b505050505050505050565b601d54600090600311610dc957fe5b336000908152601e602052604090205460ff1615610de357fe5b601d541515610dfb575060044301602155605e610e13565b601d5460011415610e0e57506093610e13565b5061031c5b604080516060810182523380825261ffff80851660208085019182526064858701908152601d8054600181810183556000838152985160029092027f6d4407e7be21f808e6509aa9fa9143369579dd7d760fe20a2c09680fc146134f81018054975190981660a060020a0275ffff000000000000000000000000000000000000000019600160a060020a039490941673ffffffffffffffffffffffffffffffffffffffff1990981697909717929092169590951790955590517f6d4407e7be21f808e6509aa9fa9143369579dd7d760fe20a2c09680fc146135090940193909355928452601e90925292909120805460ff191690911790555460031415610f22576023805460ff191660011790555b50565b60205461ffff808216916201000090041682565b601f5481565b610f4761118b565b6040805161708081019182905290600090610384908280855b825461010083900a900460ff16815260206001928301818104948501949093039092029101808411610f605790505050505050905090565b6000816103848110610fa657fe5b60209182820401919006915054906101000a900460ff1681565b60235460ff1681565b60215481565b600080808080808080600160235460ff166003811115610feb57fe5b14610ff257fe5b600197505b60058810156110d157602154889003409650601e610384880681810697500494506002935060021992505b60038360010b12156110c65760021991505b60038260010b12156110bb5750601e848201028501820160010b6103848110156110b0576028848881151561106557fe5b0481151561106f57fe5b06600082610384811061107e57fe5b60208104909101805460ff601f9093166101000a80820484169094018316840292909302199092161790556002909302925b600190910190611034565b600190920191611022565b600190970196610ff7565b50506023805460ff19166002179055505050505050565b601d8054829081106110f657fe5b600091825260209091206002909102018054600190910154600160a060020a038216925060a060020a90910461ffff169083565b6000808260010b121561114257816000039050611145565b50805b919050565b60008161ffff168361ffff161115611163575081611166565b50805b92915050565b6060604051908101604052806003906020820280388339509192915050565b617080604051908101604052806103849060208202803883395091929150505600a165627a7a723058206ee32fe425fb6499ec5dfd5a0f23699c567156f65e00dcf5a71be5ef6cc7ef1d0029';
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
