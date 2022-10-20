import { useToast } from '@chakra-ui/react'
import {Button , HStack , Container, Flex , FormControl , FormLabel, Input,Box} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState ,useEffect} from 'react';

const Staking = ({accounts ,setaccounts,createnftcontract,nftmarketplacecontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();

    

    const stakenfts = async () => {
        const nftcontractaddress = document.getElementById('nftcontractaddress').value;
        const nfttokenid = document.getElementById('tokenid').value;
       
        try{
            const approvetx =  await (await createnftcontract.approve (nftmarketplacecontract.address , nfttokenid)).wait();
              console.log(approvetx);
      
            if (approvetx.hash || approvetx.transactionHash ){
                  toast({
                      title: 'Aprroval success',
                      description: "Wait for next confirmation to complete staking process",
                      status: 'success',
                      duration: 1500,
                      isClosable: true,
                      position: 'top-left',   
                    });
      
              }
            const stakenftt =  await (await nftmarketplacecontract.stakeNFT (nftcontractaddress , nfttokenid)).wait();
              console.log(stakenftt);
      
            if (stakenftt.hash || stakenftt.transactionHash ){
                  toast({
                      title: 'Staking success',
                      description: "Wait for take time profit comes to claim your rewards",
                      status: 'success',
                      duration: 1500,
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
            if (err.data.message === "VM Exception while processing transaction: revert duration to deposit has been passed"){
                toast({
                    title: "Staking error",
                    description: "Duration to deposit NFTs has been passed ",
                    status: 'error',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });

            }
            if (err.data.message === "VM Exception while processing transaction: revert ERC721: caller is not token owner or approved"){
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

            
            
            if (err.data.message ===  "VM Exception while processing transaction: revert ERC721: approve caller is not token owner or approved for all"){
                toast({
                    title: "Ownership Error",
                    description: "You do not own that NFT",
                    status: 'error',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });

            }

        }

        
    }

    const claimrewards = async () => {
       
        try{
            const claimrewards =  await (await nftmarketplacecontract.claimrewards (createnftcontract.address)).wait();
      
            if (claimrewards.hash || claimrewards.transactionHash ){
                  toast({
                      title: 'Rewards claimed',
                      description: "Congratulations! You earned 1000 Eidoox tokens",
                      status: 'success',
                      duration: 1500,
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
            if (err.data.message ===  "VM Exception while processing transaction: revert wait until the time of taking profit comes"){
                toast({
                    title: "Error",
                    description: "Wait until the time of taking profit comes",
                    status: 'error',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });

            }
           
        }
  

        
    }
    const unstakenfts = async () => {
        try{
            const unstakerewards =  await (await nftmarketplacecontract.cancelstaking (createnftcontract.address)).wait();
      
            if (unstakerewards.hash || unstakerewards.transactionHash ){
                  toast({
                      title: 'Unstaked your NFT',
                      description: "Your NFT successfully unstaked",
                      status: 'success',
                      duration: 1500,
                      isClosable: true,
                      position: 'top-left',   
                    });
      
              }
        }
        catch (err){
            console.log(err);
        }
            

    }
   
   


 

    return (
        <div>
            <br></br>  <br></br>
            
            
            
            <Flex justify="center" fontWeight='extrabold' fontSize="35px" bgClip='text'  bgGradient='linear(to-r, cyan.900, pink.600)'>
                   Stake your NFT with Artopita
            </Flex>
             
            <br></br><br></br>
            <Container  border='1px' borderColor='black' height="330px" borderWidth={3} borderRadius= "40px">
                <FormControl justify="center"  isRequired>
                    <br></br>
                    <FormLabel htmlfor= "nftcontractaddress" fontSize="20px" >Contract Address</FormLabel>
                    <Input id = "nftcontractaddress" type='text' placeholder="  eg. 0x3D76...1E97" variant='outline' isRequired />
                    <br></br><br></br>
                    <FormLabel htmlfor= "tokenid" fontSize="20px" >Token Id</FormLabel>
                    <Input id = "tokenid" type='text' placeholder="eg. 2" variant='outline'/>
                    <br></br><br></br>
                 
                    <HStack spacing='130px'>
                        <Box w='40px' h='40px' bg='white'>
                            <Button 
                                backgroundColor="pink.700"
                                fontWeight='extrabold'
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="120px"
                                height="50px"
                                type='submit'
                                ml={2}
                                onClick={unstakenfts}
                                >Unstake
                            </Button>
                        </Box>
                        <Box w='40px' h='40px' bg='white'>
                            <Button 
                                backgroundColor="pink.700"
                                fontWeight='extrabold'
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="120px"
                                height="50px"
                                type='submit'
                                ml={2}
                                onClick={stakenfts}
                                >Stake
                            </Button>
                        </Box>
                        <Box w='40px' h='40px' bg='white'>
                                <Button 
                                    backgroundColor="pink.700"
                                    fontWeight='extrabold'
                                    colorScheme='green' 
                                    variant='solid'
                                    borderRadius= "100px"
                                    width="120px"
                                    height="50px"
                                    type='submit'
                                    ml={2}
                                    onClick={claimrewards}
                                    >Claim 
                                </Button>
                           
                        </Box>
                      
                    </HStack>
                 


                </FormControl>
            </Container>
  
        </div>

       



        

    )
    
};
export default Staking;