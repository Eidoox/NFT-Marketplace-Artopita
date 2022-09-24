import {Button , HStack , Container, Flex , FormControl , FormLabel, Input} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { NFTStorage } from 'nft.storage';



const Create = ({accounts ,setaccounts, createnftcontract, nftmarketplacecontract}) => {
    const [ismissing, setfillingstate] = useState(true);
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();
    var NFT_STORAGE_API_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVlMERCQWIzYkVkYjkwNTY2MjZjZGM0MTVjMTMzNzVhZkZmNzVhYjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Mzg5OTA5MzE0MSwibmFtZSI6Im5mdG1hcmtldHBsYWNlZSJ9.vyvjae5HOwHOHvCTbeer-PJpJ6jmHXjhoiwFnT-9wqM';
    const storeandmintNFT = async () => {
        const nftname = document.getElementById('nftname').value;
        const nftdescription = document.getElementById('nftdescription').value;
        const nftprice = document.getElementById('nftprice').value;
        const nftuploadedimage = document.getElementById("uploadnft").files;

        if (!nftname  || !nftdescription  ||  !nftuploadedimage[0] ||   !nftprice ){
            setfillingstate(true);
        }
    
        if (nftname  && nftdescription && nftuploadedimage[0] &&  nftprice){
            setfillingstate(false);
        }

    
        if (iswalletconnected == false) {
            toast({
                title: 'Error',
                description: "Connect wallet to create and mint NFTs",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'bottom-left',
                
              });
        }

      
        


        if (iswalletconnected == true ){
            try {
                const client = new NFTStorage({
                token: NFT_STORAGE_API_KEY
                });
    
                const metadata = await client.store({
                    name: nftname,
                    description: nftdescription,
                    image: nftuploadedimage[0],
                })
    
                const metadata_before_edit = metadata.url;
                const nftmetadatalink = metadata_before_edit.replace("ipfs://", "https://ipfs.io/ipfs/");


                const tx = await (await createnftcontract.createNFT(nftmetadatalink)).wait();
                if (tx.hash || tx.transactionHash){
                    toast({
                        title: 'NFT metadata uploaded on IPFS',
                        description: "NFT created successfully, wait for the next metamask confirmation to list the NFT",
                        status: 'success',
                        duration: 1700,
                        isClosable: true,
                        position: 'bottom-middle',   
                      });
                }
                const currentnftid = await createnftcontract.getcurrentnftid();
                const listing_price = ethers.utils.parseEther(nftprice.toString());
              

                const tx2 = await (await nftmarketplacecontract.listnft(createnftcontract.address,Number(currentnftid),listing_price));


                if (tx2.hash){
                    toast({
                        title: 'NFT Created and Listed',
                        description: "Your NFT created and listed on the markerplace successfully",
                        status: 'success',
                        duration: 1600,
                        isClosable: true,
                        position: 'bottom-middle',   
                      });
                }


                

    
            
            }
            catch (error) {
                console.error(error);
            }

        }
        
    }


    return (
       
        <div>
            <br></br>  <br></br>
            
            
            
            <Flex justify="center" fontWeight='extrabold' fontSize="35px" bgClip='text'  bgGradient='linear(to-r, cyan.800, pink.700)'>
                    Welcome to creating and listing NFTs service
            </Flex>
             
            <br></br>
            <Container  border='1px' borderColor='pink.900' height="550px" borderWidth={3} borderRadius= "15px">
                <FormControl justify="center"  isRequired>
                    <br></br>
                    <FormLabel htmlfor= "nftname" fontSize="20px" >Name</FormLabel>
                    <Input id = "nftname" type='text' placeholder=" eg. EidooxPunks" variant='outline' isRequired />
                    <br></br><br></br>
                    <FormLabel htmlfor= "nftdescription" fontSize="20px" >Description</FormLabel>
                    <Input id = "nftdescription" type='text' placeholder="eg. Special NFT" height="80px" variant='outline'/>
                    <br></br><br></br>
                    <FormLabel tmlfor= "nftprice" fontSize="20px">Price</FormLabel>
                    <Input id = "nftprice" type='number' placeholder="Price in ETH" variant='outline' />
                    <br></br><br></br>
                    <Flex justify="center" fontWeight='bold' fontSize="15px" bgClip='text'  bgGradient='linear(to-r, pink.900, red.500)'>
                        Upload NFT image
                    </Flex>
                    <br></br>
                    <Flex justify="center" ml="100px">
                        <input id= 'uploadnft' type='file' justify="center"  />
                    </Flex>
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
                        onClick={storeandmintNFT}
                        >Create NFT
                    </Button>



                </FormControl>
            </Container>
  
        </div>
    );
 
};
export default Create;