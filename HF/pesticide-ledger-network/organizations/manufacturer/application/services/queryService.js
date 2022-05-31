/*
 # O'Reilly - Accelerated Hands-on Smart Contract Development with Hyperledger Fabric V2
 # farma ledger supply chain network
 # Author: Brian Wu
 # QueryService -queryByKey:
 */
'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const PesticideLedgerContract = require('../../contract/lib/pesticideledgercontract.js');
class QueryService {
  /**
  * 1. Select an identity from a wallet
  * 2. Connect to network gateway
  * 3. Access farma ledger supply chain network
  * 4. Construct request to issue commercial paper
  * 5. Submit invoke queryByKey transaction
  * 6. Process response
  **/
  async queryByKey(userName, key) {
    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../identity/user/'+userName+'/wallet');
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
    console.log('userName:'+ userName + " key:"+ key);
    if(!userName || userName.length<1) {
        throw ({ status: 500,  message: 'User Name is not defined.' });
    }
    if(!key || key.length<1) {
        throw ({ status: 500,  message: 'key is not defined.' });
    }
    try {
      // Load connection profile; will be used to locate a gateway
      let connectionProfile = yaml.safeLoad(fs.readFileSync('../../../organizations/peerOrganizations/org1.example.com/connection-org1.json', 'utf8'));
      let connectionOptions = {
        identity: userName,
        wallet: wallet,
        discovery: { enabled:true, asLocalhost: true }
      };
      // Connect to gateway using application specified parameters
      console.log('Connect to Fabric gateway.');
      await gateway.connect(connectionProfile, connectionOptions);
      // Access farma ledger supply chain network
      console.log('Use network channel: plnchannel.');
      const network = await gateway.getNetwork('plnchannel');
      // Get addressability to farma ledger supply chain network contract
      console.log('Use org.pln.PesticideLedgerContract smart contract.');
      const contract = await network.getContract('pesticideLedgerContract', 'org.pln.PesticideLedgerContract');
      // query ledger data by key
      console.log('Submit pesticideledger querybyKey request.');
      const response = await contract.submitTransaction('queryByKey', key);
      //console.log(response);
      return response?JSON.parse(response):response;
    } catch (error) {
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
      throw ({ status: 500,  message: `Error processing transaction. ${error}` });
    } finally {
      // Disconnect from the gateway
      console.log('Disconnect from Fabric gateway.')
      gateway.disconnect();
    }
  }
}
module.exports = QueryService;
