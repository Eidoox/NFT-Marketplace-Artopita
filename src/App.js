import './App.css';
import { useState } from 'react';
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import {ethers} from 'ethers';

import nftcontractabi from './NFTContractsData/ContractAbi.json';
import Navbar from './pages/Navbar.js';
import Purchasednfts from './pages/purchasednfts.js';
import Create from './pages/create.js';
import Explore from './pages/explore.js';
import Home from './pages/home.js';
import Listnfts from './pages/listnfts.js';

import Staking from './pages/staking.js';



function App() {
  const [accounts , setaccounts] = useState([]);

  const [createnftcontract, setcreatnftcontract] = useState({});
  const [nftmarketplacecontract, setnftmarketplacecontract] = useState({});

  const createnftcontract_address= "0xF9FE2Fe5F6E8Fc662ef74F474C4C4e4086F284E4";
  const nftmarketplacecontract_address= "0xE87dAFA8F6e60A7fB9BA45ba4eEDE0522BdB6634";



  const  connectwallet = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        }); 
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        setaccounts(accounts);

        window.ethereum.on('accountsChanged', async function (accounts) {
            setaccounts(accounts[0])
            
            await connectwallet()
          })

        connectnftcreation_smartcontract(signer);
        connectnftmarketplace_smartcontract(signer);
    }

   
  
  }
  const connectnftcreation_smartcontract = async (signer) => {
    const createnftcontract = new ethers.Contract(createnftcontract_address,nftcontractabi.nftcreatecontractabi,signer);
    setcreatnftcontract(createnftcontract);
  }


  const connectnftmarketplace_smartcontract = async (signer) => {
    const nftmarketplacecontract = new ethers.Contract(nftmarketplacecontract_address,nftcontractabi.nftmarketplacecontractabi,signer);
    setnftmarketplacecontract(nftmarketplacecontract);
  }

  return (
    <div>
      <BrowserRouter>
        
        <div className="App">
          <Navbar accounts={accounts} setaccounts={setaccounts} connectwallet={connectwallet} />
        </div>

        <Routes>
          <Route path= "/" element={ <Home/>}/>

          <Route path= "/create" element={ <Create accounts={accounts} setaccounts={setaccounts} createnftcontract={createnftcontract} nftmarketplacecontract = {nftmarketplacecontract}/>}/>
          <Route path= "/explore" element={ <Explore accounts={accounts} setaccounts={setaccounts} createnftcontract={createnftcontract} nftmarketplacecontract = {nftmarketplacecontract}/>}/>
          <Route path= "/listnfts" element={ <Listnfts accounts={accounts} setaccounts={setaccounts} createnftcontract={createnftcontract} nftmarketplacecontract = {nftmarketplacecontract}/>}/>
          <Route path= "/staking" element={ <Staking accounts={accounts} setaccounts={setaccounts} createnftcontract={createnftcontract} nftmarketplacecontract = {nftmarketplacecontract}/>}/>

          <Route path= "/purchasednfts" element={ <Purchasednfts accounts={accounts} setaccounts={setaccounts}  createnftcontract={createnftcontract} nftmarketplacecontract = {nftmarketplacecontract}/>}/>

          
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
