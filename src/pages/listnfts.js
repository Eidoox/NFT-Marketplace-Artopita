import { useToast } from '@chakra-ui/react'
import {Button , HStack , Container, Flex , FormControl , FormLabel, Input} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState ,useEffect} from 'react';

const Listnfts = ({accounts ,setaccounts,createnftcontract,nftmarketplacecontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();


    const listnftonmarketplace = async () => {
        const nftcontractaddress = document.getElementById('nftcontractaddress').value;
        const nfttokenid = document.getElementById('tokenid').value;
        const nftprice = document.getElementById('nftprice').value;
       

        const listing_price = ethers.utils.parseEther(nftprice.toString());
        try{
            const buytxxx =  await (await createnftcontract.approve (nftmarketplacecontract.address , nfttokenid)).wait();
              console.log(buytxxx);
      
            if (buytxxx.hash || buytxxx.transactionHash ){
                  toast({
                      title: 'Aprroval success',
                      description: "Wait for next confirmation to complete listing process",
                      status: 'success',
                      duration: 1500,
                      isClosable: true,
                      position: 'top-left',   
                    });
      
              }
            
         

            const tx2 = await (await nftmarketplacecontract.listnft(nftcontractaddress,nfttokenid,listing_price)).wait();
            if (tx2.hash || tx2.transactionHash){
                toast({
                    title: "Success",
                    description: "Your NFT listed successfully on the marketplace",
                    status: 'success',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
        catch (err){
            if (err.data.message === "VM Exception while processing transaction: revert ERC721: transfer from incorrect owner"){
                toast({
                    title: "Ownership Error",
                    description: "You do not own that NFT",
                    status: 'error',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
                

            if (err.data.message === "VM Exception while processing transaction: revert ERC721: approval to current owner"){
                    toast({
                        title: "Ownership Error",
                        description: "You do not own that NFT",
                        status: 'error',
                        duration: 1600,
                        isClosable: true,
                        position: 'top-left',   
                    });


            }
            if (err.data.message === "VM Exception while processing transaction: revert ERC721: invalid token ID"){
                toast({
                    title: "Invalid token iD Error",
                    description: "Incorrect token id, This id not found on that contract ",
                    status: 'error',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });

            }
        }

        
    }

    return (
        <div>
            <br></br>  <br></br>
            
            
            
            <Flex justify="center" fontWeight='extrabold' fontSize="35px" bgClip='text'  bgGradient='linear(to-r, cyan.900, pink.600)'>
                    Welcome to Artopita's Listing Serivce
            </Flex>
             
            <br></br>
            <Container  border='1px' borderColor='pink.900' height="420px" borderWidth={3} borderRadius= "33px">
                <FormControl justify="center"  isRequired>
                    <br></br>
                    <FormLabel htmlfor= "nftcontractaddress" fontSize="20px" >Contract Address</FormLabel>
                    <Input id = "nftcontractaddress" type='text' placeholder="  eg. 0x3D76...1E97" variant='outline' isRequired />
                    <br></br><br></br>
                    <FormLabel htmlfor= "tokenid" fontSize="20px" >Token Id</FormLabel>
                    <Input id = "tokenid" type='text' placeholder="eg. 2" variant='outline'/>
                    <br></br><br></br>
                    <FormLabel tmlfor= "nftprice" fontSize="20px">Price</FormLabel>
                    <Input id = "nftprice" type='number' placeholder="Price in ETH" variant='outline' />
                
                    <br></br>
                 
                    <br></br>
                    <Button 
                        backgroundColor="pink.700"
                        fontWeight='extrabold'
                        colorScheme='green' 
                        variant='solid'
                        borderRadius= "100px"
                        width="120px"
                        height="50px"
                        ml="180px"
                        type='submit'
                        onClick={listnftonmarketplace}
                        >List NFT
                    </Button>

                </FormControl>
            </Container>
  
        </div>

       



        

    )
    
};
export default Listnfts;