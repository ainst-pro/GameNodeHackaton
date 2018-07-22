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
      let bytecode = '0x60806040526000601f5560c060405190810160405280600060ff168152602001600760ff168152602001601260ff168152602001602160ff168152602001604b60ff168152602001605a60ff168152506022906006620000619291906200009b565b506000602360006101000a81548160ff021916908360038111156200008257fe5b02179055503480156200009457600080fd5b506200016f565b826006601f01602090048101928215620001295791602002820160005b83821115620000f857835183826101000a81548160ff021916908360ff1602179055509260200192600101602081600001049283019260010302620000b8565b8015620001275782816101000a81549060ff0219169055600101602081600001049283019260010302620000f8565b505b5090506200013891906200013c565b5090565b6200016c91905b808211156200016857600081816101000a81549060ff02191690555060010162000143565b5090565b90565b6118c8806200017f6000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633bc5de30146100b45780635254f536146101b35780635c07a4b0146101fd578063657439b11461021457806391b5d8cf1461025657806399949b6614610281578063b41c5dd4146102d5578063c19d93fb1461031c578063d578241914610355578063d65ab5f214610380578063f71d96cb14610397575b600080fd5b3480156100c057600080fd5b506100c961041a565b6040518087600360200280838360005b838110156100f45780820151818401526020810190506100d9565b5050505090500186600360200280838360005b83811015610122578082015181840152602081019050610107565b5050505090500185600360200280838360005b83811015610150578082015181840152602081019050610135565b505050509050018461ffff1661ffff1681526020018361ffff1661ffff1681526020018261038460200280838360005b8381101561019b578082015181840152602081019050610180565b50505050905001965050505050505060405180910390f35b3480156101bf57600080fd5b506101fb600480360381019080803560010b9060200190929190803560010b9060200190929190803560ff169060200190929190505050610842565b005b34801561020957600080fd5b506102126112a5565b005b34801561022057600080fd5b506102296114b6565b604051808361ffff1661ffff1681526020018261ffff1661ffff1681526020019250505060405180910390f35b34801561026257600080fd5b5061026b6114e4565b6040518082815260200191505060405180910390f35b34801561028d57600080fd5b506102966114ea565b604051808261038460200280838360005b838110156102c25780820151818401526020810190506102a7565b5050505090500191505060405180910390f35b3480156102e157600080fd5b506103006004803603810190808035906020019092919050505061155d565b604051808260ff1660ff16815260200191505060405180910390f35b34801561032857600080fd5b50610331611587565b6040518082600381111561034157fe5b60ff16815260200191505060405180910390f35b34801561036157600080fd5b5061036a61159a565b6040518082815260200191505060405180910390f35b34801561038c57600080fd5b506103956115a0565b005b3480156103a357600080fd5b506103c260048036038101908080359060200190929190505050611762565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018361ffff1661ffff168152602001828152602001935050505060405180910390f35b61042261180e565b61042a611831565b610432611854565b60008061043d611877565b6000601d80549050111561056057601d600081548110151561045b57fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1686600060038110151561049c57fe5b602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050601d60008154811015156104e357fe5b90600052602060002090600202016001015484600060038110151561050457fe5b602002018181525050601d600081548110151561051d57fe5b906000526020600020906002020160000160149054906101000a900461ffff1685600060038110151561054c57fe5b602002019061ffff16908161ffff16815250505b6001601d80549050111561068357601d600181548110151561057e57fe5b906000526020600020906002020160000160149054906101000a900461ffff168560016003811015156105ad57fe5b602002019061ffff16908161ffff1681525050601d60018154811015156105d057fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1686600160038110151561061157fe5b602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050601d600181548110151561065857fe5b90600052602060002090600202016001015484600160038110151561067957fe5b6020020181815250505b6002601d8054905011156107a657601d60028154811015156106a157fe5b906000526020600020906002020160000160149054906101000a900461ffff168560026003811015156106d057fe5b602002019061ffff16908161ffff1681525050601d60028154811015156106f357fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1686600260038110151561073457fe5b602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050601d600281548110151561077b57fe5b90600052602060002090600202016001015484600260038110151561079c57fe5b6020020181815250505b602060000160009054906101000a900461ffff169250602060000160029054906101000a900461ffff16915060006103848060200260405190810160405280929190826103848015610833576020028201916000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116107fc5790505b50505050509050909192939495565b6000806000806000601d6003601f5481151561085a57fe5b0660ff1681548110151561086a57fe5b906000526020600020906002020194503373ffffffffffffffffffffffffffffffffffffffff168560000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156108dd575060008560010154115b15156108e557fe5b600260038111156108f257fe5b602360009054906101000a900460ff16600381111561090d57fe5b14151561091657fe5b60038660ff1610151561092557fe5b60058860010b1315801561095c57507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb8860010b12155b801561099b575060058760010b1315801561099a57507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb8760010b12155b5b15156109a357fe5b601e8560000160149054906101000a900461ffff1660010b8115156109c457fe5b079350601e8560000160149054906101000a900461ffff1660010b8115156109e857fe5b0592508784019150868301905060008261ffff16118015610a0d5750601e8261ffff16105b1515610a1557fe5b60008161ffff16118015610a2d5750601e8161ffff16105b1515610a3557fe5b81601e8202018560000160146101000a81548161ffff021916908361ffff1602179055508460000160149054906101000a900461ffff1661ffff16601d60036001601f5401811515610a8357fe5b0660ff16815481101515610a9357fe5b906000526020600020906002020160000160149054906101000a900461ffff1661ffff16148015610af857506000601d60036001601f5401811515610ad457fe5b0660ff16815481101515610ae457fe5b906000526020600020906002020160010154115b15610c5057601d60036001601f5401811515610b1057fe5b0660ff16815481101515610b2057fe5b90600052602060002090600202016001015485600101541115610bbe57601d60036001601f5401811515610b5057fe5b0660ff16815481101515610b6057fe5b90600052602060002090600202016001015485600101600082825401925050819055506000601d60036001601f5401811515610b9857fe5b0660ff16815481101515610ba857fe5b9060005260206000209060020201600101819055505b601d60036001601f5401811515610bd157fe5b0660ff16815481101515610be157fe5b90600052602060002090600202016001015485600101541015610c4f578460010154601d60036001601f5401811515610c1657fe5b0660ff16815481101515610c2657fe5b906000526020600020906002020160010160008282540192505081905550600085600101819055505b5b8460000160149054906101000a900461ffff1661ffff16601d60036002601f5401811515610c7a57fe5b0660ff16815481101515610c8a57fe5b906000526020600020906002020160000160149054906101000a900461ffff1661ffff16148015610cef57506000601d60036002601f5401811515610ccb57fe5b0660ff16815481101515610cdb57fe5b906000526020600020906002020160010154115b15610e4757601d60036002601f5401811515610d0757fe5b0660ff16815481101515610d1757fe5b90600052602060002090600202016001015485600101541115610db557601d60036002601f5401811515610d4757fe5b0660ff16815481101515610d5757fe5b90600052602060002090600202016001015485600101600082825401925050819055506000601d60036002601f5401811515610d8f57fe5b0660ff16815481101515610d9f57fe5b9060005260206000209060020201600101819055505b601d60036002601f5401811515610dc857fe5b0660ff16815481101515610dd857fe5b90600052602060002090600202016001015485600101541015610e46578460010154601d60036002601f5401811515610e0d57fe5b0660ff16815481101515610e1d57fe5b906000526020600020906002020160010160008282540192505081905550600085600101819055505b5b606460226001610e67610e598c6117c9565b610e628c6117c9565b6117ea565b0361ffff16600681101515610e7857fe5b602091828204019190069054906101000a900460ff1660ff16866001015402811515610ea057fe5b0485600101600082825403925050819055506064856001016000828254019250508190555060008560000160149054906101000a900461ffff1661ffff1661038481101515610eeb57fe5b602091828204019190069054906101000a900460ff1660ff16606460f942811515610f1257fe5b0643034060019004811515610f2357fe5b0661ffff16111515610f8b576000808660000160149054906101000a900461ffff1661ffff1661038481101515610f5657fe5b602091828204019190066101000a81548160ff021916908360ff1602179055506103e885600101600082825401925050819055505b6000602060000160009054906101000a900461ffff1661ffff16148015610fc957506000602060000160029054906101000a900461ffff1661ffff16145b8015610ff95750601e606460f942811515610fe057fe5b0643034060019004811515610ff157fe5b0661ffff1611155b156110815761038460f94281151561100d57fe5b064303406001900481151561101e57fe5b06602060000160006101000a81548161ffff021916908361ffff1602179055506014603260f94281151561104e57fe5b064303406001900481151561105f57fe5b0601602060000160026101000a81548161ffff021916908361ffff1602179055505b6000602060000160029054906101000a900461ffff1661ffff161180156110d457508460000160149054906101000a900461ffff1661ffff16602060000160009054906101000a900461ffff1661ffff16145b156111ef576064602060000160029054906101000a900461ffff1661ffff16601d8860ff1681548110151561110557fe5b9060005260206000209060020201600101540281151561112157fe5b0485600101600082825401925050819055506064602060000160029054906101000a900461ffff1661ffff16601d8860ff1681548110151561115f57fe5b9060005260206000209060020201600101540281151561117b57fe5b04601d8760ff1681548110151561118e57fe5b9060005260206000209060020201600101600082825403925050819055506000602060000160006101000a81548161ffff021916908361ffff1602179055506000602060000160026101000a81548161ffff021916908361ffff1602179055505b60036001601f540181151561120057fe5b06601f819055506000601d601f5481548110151561121a57fe5b906000526020600020906002020160010154141561129b5760036001601f540181151561124357fe5b06601f819055506000601d601f5481548110151561125d57fe5b906000526020600020906002020160010154141561129a576003602360006101000a81548160ff0219169083600381111561129457fe5b02179055505b5b5050505050505050565b60006003601d805490501015156112b857fe5b601e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561130e57fe5b6000601d80549050141561132f57605e90506004430160218190555061134d565b6001601d805490501415611346576093905061134c565b61031c90505b5b601d6060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018361ffff16815260200160648152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548161ffff021916908361ffff160217905550604082015181600101555050506001601e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506003601d8054905014156114b3576001602360006101000a81548160ff021916908360038111156114ad57fe5b02179055505b50565b60208060000160009054906101000a900461ffff16908060000160029054906101000a900461ffff16905082565b601f5481565b6114f2611877565b60006103848060200260405190810160405280929190826103848015611553576020028201916000905b82829054906101000a900460ff1660ff168152602001906001019060208260000104928301926001038202915080841161151c5790505b5050505050905090565b6000816103848110151561156d57fe5b60209182820401919006915054906101000a900460ff1681565b602360009054906101000a900460ff1681565b60215481565b600080600080600080600080600160038111156115b957fe5b602360009054906101000a900460ff1660038111156115d457fe5b1415156115dd57fe5b600197505b600588101561173457876021540340600190049650601e6103848881151561160657fe5b0681151561161057fe5b069550601e6103848881151561162257fe5b0681151561162c57fe5b049450600293507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd92505b60038360010b1215611727577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd91505b60038260010b121561171a578286601e84880102010160010b905061038481101561170d57602884888115156116b957fe5b048115156116c357fe5b06600082610384811015156116d457fe5b602091828204019190068282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055506002840293505b8180600101925050611687565b8280600101935050611657565b87806001019850506115e2565b6002602360006101000a81548160ff0219169083600381111561175357fe5b02179055505050505050505050565b601d8181548110151561177157fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900461ffff16908060010154905083565b6000808260010b12156117e1578160000390506117e5565b8190505b919050565b60008161ffff168361ffff16111561180457829050611808565b8190505b92915050565b606060405190810160405280600390602082028038833980820191505090505090565b606060405190810160405280600390602082028038833980820191505090505090565b606060405190810160405280600390602082028038833980820191505090505090565b61708060405190810160405280610384906020820280388339808201915050905050905600a165627a7a72305820935ae5dcec2d9bd533b4a1a1b30404cfccd79fcb13a4a373c50c7cbb6fcd05cb0029';
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
