import { useToast } from '@chakra-ui/react'
import {Image,Box,Flex, Text,Stack ,Center,Heading,Button,Spinner ,Container} from '@chakra-ui/react';
import {Menu,MenuButton, MenuList,MenuItem} from '@chakra-ui/react'

import { Card, Col, Row } from "react-bootstrap";
import { useState ,useEffect} from 'react';

const Purchasednfts = ({accounts ,setaccounts,createnftcontract,nftmarketplacecontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const [myownnfts, setmyownnfts] = useState([]);
    const toast = useToast();
    
    const getmynfts = async ()=> {
        const nftscount = await createnftcontract.getcurrentnftid();

        let mynfts = [];
        for (let i = 1; i <= Number(nftscount); i++){ 
            const currentnftowner = await createnftcontract.ownerOf(i);

            if ( currentnftowner.toLowerCase() == accounts[0]){
                console.log(i);

                const metadataurl = await createnftcontract.tokenURI(i);
                console.log(metadataurl);
                const responsefrom_metadata = await fetch(metadataurl);
                const metadata = await responsefrom_metadata.json();
                const imageurl = metadata.image;
                const ipfsimageurl = imageurl.replace("ipfs://", "https://ipfs.io/ipfs/");
                mynfts.push({ image: ipfsimageurl , name: metadata.name, description: metadata.description, nftcontractaddress: createnftcontract.address , tokenid: i   });

            }
            

        }

        setmyownnfts(mynfts);



    }
    useEffect(() => {
        getmynfts();
        
      }, [])


    return (

            <Flex justify="center" padding={3}>
                { iswalletconnected ? (
                    <Flex justify="center" padding={3}>

                        {  myownnfts.length > 0 ? (
                        
                            <Container px={5} justify="center" >
                            <Row xs={1} md={2} lg={4} g={4} py={5}>
                                { myownnfts.map((nft,idx) => (
                                    <Col key={idx} overflow= "hidden">
                                            <br></br>
                                            <Box border='2px' borderColor='pink.200' borderRadius="15px" padding={3} pb={1} >
                                                <Card  >
                                                    <Card.Img variant="top" src= {nft.image}  />
                                                    <Card.Body ml="150px">
                                                        <Card.Title><Text fontSize={26} ml="15px" fontWeight="extrabold"> {nft.name} </Text> </Card.Title>
                                                        <Card.Text>
                                                            <Text fontSize={18} ml="15px" fontWeight="bold">
                                                                {nft.description}
                                                            </Text>
                                                            
                                                            <Text fontSize={18} ml="15px" fontWeight="bold">
                                                                <Menu>
                                                                    <MenuButton as={Button} _expanded={{ bg: 'blue.400' }}  _hover={{ bg: 'gray.400' }} >
                                                                        Details
                                                                    </MenuButton>
                                                                    <MenuList>
                                                                        <MenuItem> 
                                                                            <Text fontSize={15} ml="12px">
                                                                                <a href={`https://mumbai.polygonscan.com/address/${nft.nftcontractaddress}`}> 
                                                                                NFT contract address: {nft.nftcontractaddress.slice(0, 5) + '...' + nft.nftcontractaddress.slice(38, 42)}
                                                                                </a>
                                                                            </Text>
                                                                        </MenuItem>

                                                                        <MenuItem>
                                                                            <Text fontSize={15} ml="12px"> 
                                                                                Token ID: {nft.tokenid}
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
                                                                backgroundColor="pink.800"
                                                                fontWeight='extrabold'
                                                                colorScheme='green' 
                                                                variant='solid'
                                                                borderRadius= "100px"
                                                                width="100px"
                                                                height="55px"
                                                        >Owned</Button>
                                                        
                                                    </Card.Footer>
                                                    <br></br>
                                                </Card>
                                            </Box>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                        
                        
                    ) : (
                        <Flex  justify="center" fontWeight='extrabold' fontSize="35px" bgClip='text'  bgGradient='linear(to-r, blue.900, red.700)' padding={50} >
                           You did not purchased NFTs
                        </Flex>
                    )
                    }
                      </Flex>
                ) : (
                    <Flex  justify="center" fontWeight='extrabold' fontSize="37px" bgClip='text'  bgGradient='linear(to-r, blue.900, red.500)' padding={50} >
                        Connect Wallet to view your purchased NFTs
                    </Flex>

 
                )
            
                }


            </Flex>

    )
    
};
export default Purchasednfts;