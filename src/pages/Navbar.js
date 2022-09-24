import {Box , Button , Flex , Container , Spacer, HStack,VStack} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import {Menu,MenuButton, MenuList,MenuItem} from '@chakra-ui/react'

import { Link } from "react-router-dom";

const Navbar = ({accounts , setaccounts,connectwallet}) => {
    const iswalletconnected = Boolean(accounts[0]);
 
    return (

        <Flex justify= "space-between" padding="15px"  bg="white" >
                <Flex></Flex><Flex></Flex><Flex></Flex>
                <HStack spacing="70" justify="space-between" position= "sticky" ml= {400}  >
                    <Button as={Link} varient="link" backgroundColor= "white" to="/create" fontSize="20px" fontWeight="bold" > Create</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/explore" fontSize="20px" fontWeight="bold"> Explore</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/listnfts" fontSize="20px" fontWeight="bold"> List NFTs</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/staking" fontSize="20px" fontWeight="bold"> Staking</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/purchasednfts" fontSize="20px" fontWeight="bold"> Purchased NFTs</Button>

                  
                </HStack>
            {/* Connect button*/}
            {iswalletconnected ? (
                <Box as='button' backgroundColor="lightgreen" borderRadius= "100px" width="10%" height="40px" fontStyle="bold"> {accounts[0].slice(0, 5) + '...' + accounts[0].slice(38, 42)}</Box>
               
            ): (
                <Button 
                backgroundColor="gray"
                colorScheme='green' 
                variant='solid'
                borderRadius= "100px"
                onClick={connectwallet}>Connect Wallet</Button>
            )}


        </Flex>
        

    );
};

export default Navbar;