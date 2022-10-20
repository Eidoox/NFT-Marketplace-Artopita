import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { useToast } from '@chakra-ui/react'
import React from "react";
import {Image,Box,Flex, Text,Stack ,Center,Heading,Button,Spinner ,Container} from '@chakra-ui/react';
import {Menu,MenuButton, MenuList,MenuItem} from '@chakra-ui/react'
import { Card, Col, Row } from "react-bootstrap";

const Explore = ({accounts ,setaccounts,createnftcontract, nftmarketplacecontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const [marketitems , setmarketitems] = useState([]);
    const toast = useToast();
    
    const explore_not_sold_nfts = async () => {
        const nftscount = await nftmarketplacecontract.gettotalcountitems();
        let nftitems = [];
        for (let i = 1; i <= Number(nftscount); i++){ 
            const currentitem = await nftmarketplacecontract.getmarketdata(i); 
            if (!currentitem.issold){
                const metadataurl = await createnftcontract.tokenURI(currentitem.tokenid);
                const responsefrom_metadata = await fetch(metadataurl);
                const metadata = await responsefrom_metadata.json();
                const imageurl = metadata.image;
                const ipfsimageurl = imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
                const totalprice_marketitem = await nftmarketplacecontract.totalpricewith_marketfees(currentitem.itemid);
                console.log(Number(currentitem.price));
                console.log("totalprice_marketitem");

                console.log(Number(totalprice_marketitem));

                
                nftitems.push({ image: ipfsimageurl , name: metadata.name, description: metadata.description , seller: currentitem.seller, itemid: Number(currentitem.itemid), price: totalprice_marketitem, nftcontractaddress: currentitem.nftcontractaddress , tokenid : Number(currentitem.tokenid) });
            }

        }
        setmarketitems(nftitems);
    }

    const buynftfrommarket = async (marketitem) => {

        try {
        const nftowner = await nftmarketplacecontract.getmarketdata(marketitem.tokenid);
        const buytx = await (await nftmarketplacecontract.buynft(marketitem.itemid, { value: marketitem.price })).wait();
       
        if (buytx.transactionHash){
            toast({
                title: 'Purchasing NFT success',
                description: "Congratulations! You own that NFT now",
                status: 'success',
                duration: 1700,
                isClosable: true,
                position: 'top-left',   
              });


            
        }
        explore_not_sold_nfts();
    }
    catch (err){
        if (err.data.message === "VM Exception while processing transaction: revert buyer can not be seller"){
            toast({
                title: 'Error',
                description: "You could not buy this NFT, because you own it.",
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'top-left',   
              });

        }
    }
     

    }

    useEffect(() => {
        explore_not_sold_nfts();

      }, [])

      useEffect(() => {
        if(!iswalletconnected){
            toast({
                title: 'Connect wallet',
                description: "You have to connect wallet to explore other NFTs",
                status: 'info',
                duration: 1500,
                isClosable: true,
                position: 'top-right',   
              });
        

        }
       

      }, [])
    
    return (
        <Flex justify="center" padding={3}>
            { marketitems.length > 0 ? 
                <Container px={5} justify="center" >
                    <Row xs={1} md={2} lg={4} g={4} py={5}>
                        { marketitems.map((nftitem,id) => (
                            <Col key={id} overflow= "hidden">
                                    <br></br>
                                    <Box border='2px' borderColor='pink.200' borderRadius="15px" padding={3} pb={1} >
                                        <Card  >
                                            <Card.Img variant="top" src= {nftitem.image}  />
                                            <Card.Body ml="150px">
                                                <Card.Title><Text fontSize={26} ml="15px" fontWeight="extrabold">#{nftitem.itemid}  {nftitem.name} </Text> </Card.Title>
                                                <Card.Text>
                                                    <Text fontSize={18} ml="15px" fontWeight="bold">
                                                        {nftitem.description}
                                                    </Text>
                                                    <Text fontSize={18} ml="15px" fontWeight="bold">
                                                        <a href={`https://mumbai.polygonscan.com/address/${nftitem.seller}`}> 
                                                            Owner: {nftitem.seller.slice(0, 5) + '...' + nftitem.seller.slice(38, 42)}
                                                        </a>
                                                    </Text>
                                                    <Text fontSize={21} ml="15px" fontWeight="bold">
                                                        Buy for: {ethers.utils.formatEther(nftitem.price)} MATIC
                                                    </Text>
                                                    <Text fontSize={18} ml="15px" fontWeight="bold">
                                                    <Menu>
                                                        <MenuButton as={Button} _expanded={{ bg: 'blue.400' }}  _hover={{ bg: 'gray.400' }} >
                                                            Details
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem> 
                                                                <Text fontSize={15} ml="12px">
                                                                    <a href={`https://mumbai.polygonscan.com/address/${nftitem.nftcontractaddress}`}> 
                                                                    NFT contract address: {nftitem.nftcontractaddress.slice(0, 5) + '...' + nftitem.nftcontractaddress.slice(38, 42)}
                                                                    </a>
                                                                </Text>
                                                            </MenuItem>

                                                            <MenuItem>
                                                                <Text fontSize={15} ml="12px"> 
                                                                    Token ID: {nftitem.tokenid}
                                                                </Text>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <Text fontSize={15} ml="12px"> 
                                                                    Token Standard: ERC721
                                                                </Text>
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                    </Text>

                                                </Card.Text>
                                            </Card.Body>
                                            <br></br>
                                            <Card.Footer>
                                                <Button ml="175px"
                                                        backgroundColor="pink.700"
                                                        fontWeight='bold'
                                                        colorScheme='green' 
                                                        variant='solid'
                                                        borderRadius= "100px"
                                                        width="100px"
                                                        height="55px"
                                                        onClick= {() => buynftfrommarket(nftitem)}
                                                >Buy</Button>
                                                
                                            </Card.Footer>
                                            <br></br>
                                        </Card>
                                    </Box>
                            </Col>
                        ))}
                    </Row>
                </Container>
    

            : ( 
                    <Flex justify="center" padding={3}> 
                        <Spinner
                        thickness='3px'
                        speed='0.65s'
                        color='green.500'
                        size='xl'
                        />
                    </Flex>
                    
                    )}

        </Flex>
       
        
    );
 
};
export default Explore;