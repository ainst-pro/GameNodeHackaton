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

    Game: any;

    public isNativeInstalled(): boolean {
        return !!this.web3;
    }

    public get accounts() {
        return this.web3.accounts;
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