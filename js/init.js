"use strict";
// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic;
  
 // Web3modal instance
let web3Modal
  
 // Chosen wallet provider given by the dialog window
let provider;
  
  
 // Address of the selected account
let selectedAccount = "";
let balanceBnb = "";
let jwtToken = "";
const env = {
    BSCSCAN: "https://testnet.bscscan.com/address/",
    TOKEN: ""
};

var chamCondition= {tour:"WC", tourNm:"2022", dateCondition:""};
// const URL_END_POINT = "http://127.0.0.1:7003/";
const URL_END_POINT = "https://api.gogoal.info/";

const ID_GIRD_VIEW_DATA = "id_grid_view_data"
 /**
  * Setup the orchestra
  */
function init() {
  const providerOptions = {
      walletconnect: {
          package: window.WalletConnectProvider.default,
          options: {
              rpc: {
                  '1': 'https://bsc-dataseed1.defibit.io',
                  '56': 'https://bsc-dataseed1.defibit.io',
              },
          }
      }
  };
  web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
  });
  // Display fully loaded UI for wallet data
}
 
 /**
  * Kick in the UI action after Web3modal dialog has chosen a provider
  */
async function fetchAccountData() {

    // Get a Web3 instance for the wallet
    const web3 = new Web3(provider);

    console.log("Web3 instance is", web3);  

    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();

    // MetaMask does not give you all accounts, only the selected account
    console.log("Got accounts", accounts);
    selectedAccount = accounts[0];  

    // Go through all accounts and get their ETH balance
    const rowResolvers = accounts.map(async (address) => {
      const balance = await web3.eth.getBalance(address);
      // ethBalance is a BigNumber instance
      // https://github.com/indutny/bn.js/
      const ethBalance = web3.utils.fromWei(balance, "ether");
      const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);   
      balanceBnb = humanFriendlyBalance;

      // Display fully loaded UI for wallet data
      document.querySelector("#btn-connect").style.display = "none";
      document.querySelector("#btn-disconnect").style.display = "block";
    });
    await Promise.all(rowResolvers);
}
   
   
   
/**
* Fetch account data for UI when
* - User switches accounts in wallet
* - User switches networks in wallet
* - User connects wallet initially
*/
async function refreshAccountData() {
    await fetchAccountData(provider);
}

   
/**
* Connect wallet button pressed.
*/
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


/**
 * Main entry point.
 */
 window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);

  $('.league-info, .league-info-type').click(LeagueGetData);

  //load defaul value
  GetItemsCham(chamCondition);
}); //and event


function LeagueGetData() {
  var isChangeData = false;
    var info = $(this);
    if (info.attr('class').indexOf("league-info-type")> 0) {
      $(".league-info-type").removeClass('bt983');
    } else {
      //for case click data
      $(".league-info").removeClass('bt983');
      $(".league-info-type").removeClass('bt983');
      $(".league-info-type[type='scheduled']").addClass('bt983');
    }

    info.addClass('bt983');

    if (info.attr('tour').length > 0) {
      if( info.attr('tour') != chamCondition.tour) {
        chamCondition.tour = info.attr('tour');
        isChangeData = true;
      }
    }

    if (info.attr('tourNm').length > 0) {
      if( info.attr('tourNm') != chamCondition.tourNm) {
        chamCondition.tourNm = info.attr('tourNm');
        isChangeData = true;
      }
    }

    if (info.attr('type').length > 0) {
      if( info.attr('type') != chamCondition.type) {
        chamCondition.type = info.attr('type');
        isChangeData = true;
      }
    } else {
      chamCondition.type = 'scheduled';
    }

    if (isChangeData == true) {
      GetItemsCham(chamCondition);
    }
}

function GetItemsCham(condition) {
    $.ajax({
        data: JSON.stringify(condition),
        contentType: "application/json",
        type: "POST",
        url: URL_END_POINT+"champage",
        dataType:"json",
        success: function(response){
            $('#'+ID_GIRD_VIEW_DATA).html("");
            if(response.length == 0) {                
                return
            }           
            
            $(response).each(function(index){
                let data = response[index]
                data._date = new Date(Date.parse(response[index].strDt));
                $('#'+ID_GIRD_VIEW_DATA).append(ItemRound(data));
            })
        }
    });
}

const ItemRound = (round) => 
`
<div class="" style="height: auto; overflow: visible; transition: height 0.25s ease 0s; margin-bottom: 5px;">
  <div style="overflow: visible;">
    <div class="bt1584 bt1585 bt1587">
      <div class="bt1589 bt1588">
        <div class="bt1594">
          <div class="bt1604">
            <!--Round Time-->
            <div class="bt1611 bt1612" style="border-right: 2px solid #a2a2b3;">
              <div class="bt1615"></div>
              <div class="bt1608">
                <div class="bt1597">
                  <div>${round._date.toLocaleDateString()}</div>
                  <div class="bt1596">${round._date.toLocaleTimeString([], {timeStyle: 'short'})}</div>
                </div>
              </div>
            </div>
            <!--Round Time-->
            <!--Round View-->
            <table>
                <tbody>
                    <tr>
                    <td style="width: 45%;text-align: right;word-break: break-all;font-weight: 600;">
                        <div class="bt955" style="width: 24px;height: 24px;position: relative;top: 6px;right: 3px;">
                        <img src="${round.aFlg}" alt="${round.aNm}" height="24" width="24">
                        </div>
                        <span>${round.aNm}</span>
                    </td>
                    <td style="text-align: center;">vs</td>
                    <td style="width: 45%;text-align: left;word-break: break-all;font-weight: 600;">
                        <div class="bt955" style="width: 24px;height: 24px;position: relative;top: 6px;right: 3px;">
                        <img src="${round.bFlg}" alt="${round.bNm}" height="24" width="24">
                        </div>
                        <span>${round.bNm}</span>
                    </td>
                    </tr>
                    <tr>
                    <td style="width: 45%;text-align: right;word-break: break-all;font-weight: 300;color: red;">${round.bOdds==0?'0':'+'+round.bOdds}</td>
                    <td style="text-align: center;">${round.aScore+' : '+round.bScore}</td>
                    <td style="width: 45%;text-align: left;word-break: break-all;font-weight: 300;color: red;">${round.aOdds==0?'0':'+'+round.aOdds}</td>
                    </tr>
                </tbody>
            </table>
            <!--Round View-->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;