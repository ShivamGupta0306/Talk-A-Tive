import React, {useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const [othershow, setOtherShow] = useState(false);
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) =>{

  }

  const submitHandler = async() =>{
    setLoading(true);
    if(!email || !password){
      toast({
        title:"Please fill all the details",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      setLoading(false);
      return ;
    }
    try{
      const config = {
        headers:{
          "Content-type":"application/json",
        },
      };

      const {data} = await axios.post("/api/user/login",
      {email, password}, config);

      toast({
        title:"Login Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch(err) {
      toast({
        title:"Error Occurred",
        description:err.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      setLoading(false);
      return;
    }
  }


  return (
    <VStack spacing={'5px'}>
    <FormControl id='email' isRequired>
      <FormLabel color={"white"}>Email</FormLabel>
      <Input value={email} placeholder='Enter Your email' onChange={(e) => setEmail(e.target.value)}/>
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel color={"white"}>Password</FormLabel>
      <InputGroup>
        <Input value={password} type={`${show ? "text" : "password"}`} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/>
        <InputRightElement width={"3.5rem"}>
            {show ? <IoMdEyeOff h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setShow(!show)}/> : <IoMdEye h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setShow(!show)}/>}
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <Button colorScheme='blue' isLoading={loading} width={"100%"} style={{marginTop:15}} onClick={submitHandler}>
      Login
    </Button>
    <Button variant={"solid"} colorScheme='red' width={"100%"} onClick={() =>{
      setEmail("guest@example.com");
      setPassword("123456");
    }}>Get Guest User Credentials</Button>
  </VStack>
  )
}

export default Login