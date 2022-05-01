const { assert } = require("chai");

const TokenCrush = artifacts.require("TokenCrush.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Memory Token", async (accounts) => {
  let token;

  before(async () => {
    token = await TokenCrush.deployed();
  });

  describe("Deployment", async () => {
    it("Deploys the contract", async () => {
      const addrss = token.address;

      assert.notEqual(addrss, 0x0);
      assert.notEqual(addrss, "");
      assert.notEqual(addrss, null);
      assert.notEqual(addrss, undefined);
    });
    it("Has a name", async () => {
      const name = await token.name();
      assert.equal(name, "Token Crush");
    });
    it("Has a symbol", async () => {
      const symbol = await token.symbol();
      assert.equal(symbol, "TC");
    });
  });
  describe("Minting of Token", async () => {
    let result;

    it("mints tokens", async () => {
      await token.mint(accounts[0], "https://lovemytokens.com");
      // total supply of token should increase
      result = await token.totalSupply();
      assert.equal(result.toString(), "1", "Number of total supply is correct");
      // Owners balance increases
      result = await token.balanceOf(accounts[0]);
      assert.equal(result.toString(), "1");

      // Token should belong to owner
      result = await token.ownerOf("1");
      assert.equal(
        result.toString(),
        accounts[0].toString(),
        "Onwer is correct"
      );

      // Owner can view all tokens...balanceOf returns numbers of tokens owned
      let balanceOf = await token.balanceOf(accounts[0]);
      let tokenIds = [];
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.tokenOfOwnerByIndex(accounts[0], i);
        tokenIds.push(id.toString());
      }
      let expected = ["1"];
      assert.equal(
        tokenIds.toString(),
        expected.toString(),
        "TokenIds are correct"
      );

      // Check if tokenURI is correct
      let tokenURI = await token.tokenURI("1");
      assert.equal(tokenURI, "https://lovemytokens.com");
    });
  });
});

// const TokenCrush = artifacts.require('./TokenCrush.sol')

// require('chai')
//   .use(require('chai-as-promised'))
//   .should()

// contract('Memory Token', (accounts) => {
//   let token

//   before(async () => {
//     token = await TokenCrush.deployed()
//   })

//   describe('deployment', async () => {
//     it('deploys successfully', async () => {
//       const address = token.address
//       assert.notEqual(address, 0x0)
//       assert.notEqual(address, '')
//       assert.notEqual(address, null)
//       assert.notEqual(address, undefined)
//     })

//     it('has a name', async () => {
//       const name = await token.name()
//       assert.equal(name, 'Memory Token')
//     })

//     it('has a symbol', async () => {
//       const symbol = await token.symbol()
//       assert.equal(symbol, 'MEMORY')
//     })
//   })

//   describe('token distribution', async () => {
//     let result

//     it('mints tokens', async () => {
//       await token.mint(accounts[0], 'https://www.token-uri.com/nft')

//       // It should increase the total supply
//       result = await token.totalSupply()
//       assert.equal(result.toString(), '1', 'total supply is correct')

//       // It increments owner balance
//       result = await token.balanceOf(accounts[0])
//       assert.equal(result.toString(), '1', 'balanceOf is correct')

//       // Token should belong to owner
//       result = await token.ownerOf('1')
//       assert.equal(result.toString(), accounts[0].toString(), 'ownerOf is correct')
//       result = await token.tokenOfOwnerByIndex(accounts[0], 0)

//       // Owner can see all tokens
//       let balanceOf = await token.balanceOf(accounts[0])
//       let tokenIds = []
//       for (let i = 0; i < balanceOf; i++) {
//         let id = await token.tokenOfOwnerByIndex(accounts[0], i)
//         tokenIds.push(id.toString())
//       }
//       let expected = ['1']
//       assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct')

//       // Token URI Correct
//       let tokenURI = await token.tokenURI('1')
//       assert.equal(tokenURI, 'https://www.token-uri.com/nft')
//     })
//   })

// })
