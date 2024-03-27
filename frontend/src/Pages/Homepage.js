import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if(!userInfo){
            navigate("/");
        }
    }, [navigate])

  return (
    <Container maxW='xl'>
      <Box 
        p={3} 
        bg={"transparent"} 
        w={"100%"} 
        m={"40px 0 15px 0"} 
        borderRadius={"lg"} 
        borderWidth={"1px"} 
        boxShadow="0 4px 12px rgba(255, 255, 255, 0.3)" // Add a subtle white drop shadow
        backdropFilter="blur(10px)"  // Apply backdrop filter for blur effect
      >
        <Text fontSize={"4xl"} fontFamily={"Work Sans"} color={"white"} textAlign="center">Talk-A-Tive</Text>
      </Box>
      <Box 
        w="100%" 
        p={4} 
        color={"white"} 
        borderRadius={"lg"} 
        borderWidth={"1px"} 
        boxShadow="0 4px 12px rgba(255, 255, 255, 0.3)" // Add a subtle white drop shadow
        backdropFilter="blur(10px)"  // Apply backdrop filter for blur effect
      >
        <Tabs variant='soft-rounded'>
          <TabList mb={"1em"}>
            <Tab width={"50%"} color={"white"}>Login</Tab>
            <Tab width={"50%"} color={"white"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
