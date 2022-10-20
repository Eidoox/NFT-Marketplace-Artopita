import './App.css';
import { useState } from 'react';
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import {ethers} from 'ethers';
import { useToast } from '@chakra-ui/react'


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

  const createnftcontract_address= "0xDB9f52eB73fcfDc1deca105d0881B33f7C80942C";
  const nftmarketplacecontract_address= "0xF9Eb05e4332865a1C3D8E06f7d49F3550a4d1197";

  const toast = useToast();

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
    else {
      toast({
        title: 'Error! MetaMask Not Found',
        description: "You have not installed MetaMask",
        status: 'error',
        duration: 2200,
        isClosable: true,
        position: 'top',   
    });
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
          <Route path= "/home" element={ <Home/>}/>
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
