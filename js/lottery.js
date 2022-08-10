"use strict";
// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic;

// Set the date we're counting down to
var countDownDate = new Date("Aug 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("time_spend").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("time_spend").innerHTML = "EXPIRED";
  }
}, 1000);

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_jackpotTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_randomGeneratorAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AdminTokenRecovery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "firstTicketIdNextJackpot",
				"type": "uint256"
			}
		],
		"name": "JackpotClose",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "injectedAmount",
				"type": "uint256"
			}
		],
		"name": "JackpotInjection",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "countWinningTickets",
				"type": "uint256"
			}
		],
		"name": "JackpotNumberDrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "priceTicketInCake",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "firstTicketId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "injectedAmount",
				"type": "uint256"
			}
		],
		"name": "JackpotOpen",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "treasury",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "injector",
				"type": "address"
			}
		],
		"name": "NewOperatorAndTreasuryAndInjectorAddresses",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "randomGenerator",
				"type": "address"
			}
		],
		"name": "NewRandomGenerator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "claimer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numberTickets",
				"type": "uint256"
			}
		],
		"name": "TicketsClaim",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "jackpotId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numberTickets",
				"type": "uint256"
			}
		],
		"name": "TicketsPurchase",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_LENGTH_LOTTERY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_TREASURY_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_DISCOUNT_DIVISOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_LENGTH_LOTTERY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "uint32[]",
				"name": "_ticketNumbers",
				"type": "uint32[]"
			}
		],
		"name": "buyTickets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_discountDivisor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priceTicket",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberTickets",
				"type": "uint256"
			}
		],
		"name": "calculateTotalPriceForBulkTickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_randomGeneratorAddress",
				"type": "address"
			}
		],
		"name": "changeRandomGenerator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_ticketIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint32[]",
				"name": "_brackets",
				"type": "uint32[]"
			}
		],
		"name": "claimTickets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			}
		],
		"name": "closeJackpot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentJackpotId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentTicketId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_autoInjection",
				"type": "bool"
			}
		],
		"name": "drawFinalNumberAndMakeJackpotClaimable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "injectFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "injectorAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "jackpotToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxNumberTicketsPerBuyOrClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxPriceTicketInCake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minPriceTicketInCake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "operatorAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pendingInjectionNextJackpot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomGenerator",
		"outputs": [
			{
				"internalType": "contract IRandomNumberGenerator",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			}
		],
		"name": "recoverWrongTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxNumberTicketsPerBuy",
				"type": "uint256"
			}
		],
		"name": "setMaxNumberTicketsPerBuy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minPriceTicketInCake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxPriceTicketInCake",
				"type": "uint256"
			}
		],
		"name": "setMinAndMaxTicketPriceInCake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operatorAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_treasuryAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_injectorAddress",
				"type": "address"
			}
		],
		"name": "setOperatorAndTreasuryAndInjectorAddresses",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_priceTicketInCake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_discountDivisor",
				"type": "uint256"
			},
			{
				"internalType": "uint256[6]",
				"name": "_rewardsBreakdown",
				"type": "uint256[6]"
			},
			{
				"internalType": "uint256",
				"name": "_treasuryFee",
				"type": "uint256"
			}
		],
		"name": "startJackpot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "treasuryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewCurrentJackpotId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			}
		],
		"name": "viewJackpot",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum GoGoalJacpot.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "priceTicketInCake",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "discountDivisor",
						"type": "uint256"
					},
					{
						"internalType": "uint256[6]",
						"name": "rewardsBreakdown",
						"type": "uint256[6]"
					},
					{
						"internalType": "uint256",
						"name": "treasuryFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256[6]",
						"name": "cakePerBracket",
						"type": "uint256[6]"
					},
					{
						"internalType": "uint256[6]",
						"name": "countWinnersPerBracket",
						"type": "uint256[6]"
					},
					{
						"internalType": "uint256",
						"name": "firstTicketId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "firstTicketIdNextJackpot",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountCollectedInCake",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "finalNumber",
						"type": "uint32"
					}
				],
				"internalType": "struct GoGoalJacpot.Jackpot",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_ticketIds",
				"type": "uint256[]"
			}
		],
		"name": "viewNumbersAndStatusesForTicketIds",
		"outputs": [
			{
				"internalType": "uint32[]",
				"name": "",
				"type": "uint32[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ticketId",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "_bracket",
				"type": "uint32"
			}
		],
		"name": "viewRewardsForTicketId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_jackpotId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_cursor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_size",
				"type": "uint256"
			}
		],
		"name": "viewUserInfoForJackpotId",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint32[]",
				"name": "",
				"type": "uint32[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const addressMM = "0xc97E9f5a9e6fB7B4E3986bB0e382224489E06CD0";

// const web3 = new Web3(window.ethereum);
// window.ethereum.ebable();

// var contract_MM = new web3.eth.Contract(abi, addressMM);

/**
 * Main entry point.
 */
 window.addEventListener('load', async () => {
  console.log("SSS");
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);

 
})


async function onConnect() {
  console.log("Opening a dialog", web3Modal);
  try {
      if(selectedAccount == ""){
          provider = await web3Modal.connect();
      }
  } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
      fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
      fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
      fetchAccountData();
  });

  await refreshAccountData();
}
 
/**
* Disconnect wallet button pressed.
*/
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
      await provider.close();

  // If the cached provider is not cleared,
  // WalletConnect will default to the existing session
  // and does not allow to re-scan the QR code with a new wallet.
  // Depending on your use case you may want or want not his behavir.
      await web3Modal.clearCachedProvider();
      provider = null;
  }

  selectedAccount = "";
  balanceBnb = "";

  // Display fully loaded UI for wallet data
  document.querySelector("#btn-connect").style.display = "block";
  document.querySelector("#btn-disconnect").style.display = "none";
}


$(document).ready(function(){
  console.log("SSS");
})
