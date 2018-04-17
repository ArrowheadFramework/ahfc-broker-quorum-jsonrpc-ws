/**
* central logic implementation instantiating and calling the smart contract
* implementation in node.js
* inclusion of web interface
*/

// config file inclusion
const config = require('./config/config.js');
//requirements for smart contract communication
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// web3 instance
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.MINER_NODE));

var CONTRACT;
var CONTRACT_COMPILED;


function compileContract(contract) {
    let input = fs.readFileSync(String(contract));
    let output = solc.compile(input.toString(), 1);
    if (output.errors) {
        throw(output.errors);
    }
    return output.contracts[':userRegistry'];
}

let deployContract = (compiled_contract) => new Promise(resolve => {
    console.log('deployContract');
    const bytecode = compiled_contract.bytecode;
    const abi = JSON.parse(compiled_contract.interface);

    let contract = new web3.eth.Contract(abi);

    console.log('deploying contract from: ' + config.ACCOUNT_DEPLOYER);
    contract.deploy({data: '0x' + bytecode})
        .send({
            from: config.ACCOUNT_DEPLOYER,
            gas: 1000000})
        .on('error', error => {
            console.error(error);
        })
        .on('transactionHash', hash => {
            console.log('transactionHash ' + hash);
        })
        .on('receipt', receipt => {
            console.log('receipt received ' + receipt.contractAddress);
            console.log(receipt);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // debug
            // console.log('confirmation received ' + receipt.contractAddress);
        })
        .then(contract => {
            console.log('contract successfully deployed ' + contract.options.address)
            setNewContract(contract);
            return resolve(contract);
        });
});
