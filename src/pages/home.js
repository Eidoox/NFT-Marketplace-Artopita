
import {Box , Stack , Link , Image , VStack, StackDivider, Flex,HStack} from '@chakra-ui/react';

const Home = () => {
    return (
            <VStack
                divider={<StackDivider borderColor='white' />}
                spacing={4}
                align='stretch'
                >
                <Box h='200px' bg='white' bgGradient='linear(to-r, cyan.100, pink.100)' >
                    <Flex justify="center" fontFamily="Fantasy" fontWeight='extrabold' fontSize="77px" padding={10}>
                         Create, explore, trade, and stake NFTs
                    </Flex>
                </Box>
                
                <Box h='470px' bg='white' >
                   
                   

                    <Stack direction={['column', 'row']} >
                        <Box w='860px' h='200px' bg='white' ml={150} padding={20}>
                         
                                <Flex fontWeight='bold' fontSize="40px" ml={10} bgClip='text'  bgGradient='linear(to-r, cyan.800, red.900)'>
                                    Welcome to Artopita !
                                </Flex>
                                <Box fontSize="27px"  bgClip='text'  bgGradient='linear(to-r, black, blue.800)'>
                                    Artopita is an NFT marketplace that makes it simple to create, explore, trade NFTs. Users can stake their NFTs and earn  ERC-20 reward tokens. Artopita is deployed on Mumbai Polygon Network.
                                </Box>
                        </Box>
                        <Box w='590px' h='410px' bg='white'>
                            <Flex>
                                <Image src="https://media.giphy.com/media/CccEJ1t9STE5vA5F7E/giphy-downsized-large.gif"  height={410} width={570} ml={315}   />
                            </Flex>
                        </Box>
                    </Stack>
                  
                   
                </Box>
                    <Box h='100' bg='white'>
                    <br></br> <br></br><br></br><br></br>
            <Box fontSize="18px" fontWeight="bold" >
                <Flex justify="center"  >
                    Made with {"\u2665" } By: Eidoox
                </Flex>
                    <HStack spacing='24px' justify="center" color="blue.500" >
                        <Link href="https://www.linkedin.com/in/eidoox/" external>Linkedin</Link> 
                        <Link href="https://github.com/Eidoox">GitHub</Link>
                        <Link href="https://eidoox.hashnode.dev/"> Blogs</Link>
                    </HStack>
            </Box>
        
                    </Box>
            </VStack>
        
             
            
        
        
    );
 
};
export default Home;