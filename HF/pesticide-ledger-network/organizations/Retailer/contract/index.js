/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * farma supply chain network smart contract - index  
 * Accelerated Hands-on Smart Contract Development with Hyperledger Fabric V2
 * Author: Brian Wu
 */
'use strict';

const PesticideLedgerContract = require('./lib/pesticideledgercontract.js');

module.exports.PesticideLedgerContract = PesticideLedgerContract;
module.exports.contracts = [ PesticideLedgerContract ];

