const SHA256 = require("crypto-js/sha256"); //sha256 hash

class Block {
    constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    }

    calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()]; //Initialize block
    }

    // First block is called Genesis block
    createGenesisBlock() {
        return new Block(0, "01/01/2019", "Genesis block", "0");
    }

    // Returns latest chain in the block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adding a new block on to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Set the previous block
        newBlock.hash = newBlock.calculateHash(); // Recalculate new hash
        this.chain.push(newBlock); // Because of the starting skipping all the conditions/security checks
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){ // 0 is Genesis block, so start from 1
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let sampleCoin = new Blockchain();
sampleCoin.addBlock(new Block(1, "02/01/2019", { amount: 4 }));
sampleCoin.addBlock(new Block(2, "03/01/2019", { amount: 8 }));
