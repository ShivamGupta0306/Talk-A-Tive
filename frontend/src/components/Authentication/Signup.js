import React, {useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [othershow, setOtherShow] = useState(false);
  const[name, setName] = useState();
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();
  const[confirmPassword, setConfirmPassword] = useState();
  const[pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) =>{
    setLoading(true);
    if(pics === undefined){
      toast({
        title:"Please Select an Image",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type=== "image/png" || pics.type === "image/jpg"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dmor9l14v");
      fetch("https://api.cloudinary.com/v1_1/dmor9l14v/image/upload", {
        method:'post',
        body:data,
      }).then((res) => res.json())
        .then((data) =>{
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) =>{
          console.log(err);
          setLoading(false);
        })
    }else{
      toast({
        title:"Please select an Image!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });
      setLoading(false);
    }
  }

  const submitHandler = async() =>{
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title:"All fields are required",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });
      setLoading(false);
      return ;
    }

    if(password !== confirmPassword){
      toast({
        title:"Passwords do not match",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });
      return ;
    }

    try{
      const config= {
        heeaders:{
          "Content-type" :"application/json",
        },
      };
      const {data} = await axios.post("/api/user", {name, email, password, pic}, config);
      toast({
        title:"Registration Successfull",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      navigate('chats')
    } catch(err){
      toast({
        title:"Error Occured",
        description:err.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
    }

  }

  return (
    <VStack spacing={'5px'}>
      <FormControl id='first-name' isRequired>
        <FormLabel color={"white"}>Name</FormLabel>
        <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)}/>
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel color={"white"}>Email</FormLabel>
        <Input placeholder='Enter Your email' onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel color={"white"}>Password</FormLabel>
        <InputGroup>
          <Input type={`${show ? "text" : "password"}`} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/>
          <InputRightElement width={"3.5rem"}>
              {show ? <IoMdEyeOff h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setShow(!show)}/> : <IoMdEye h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setShow(!show)}/>}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='confirm-password' isRequired>
        <FormLabel color={"white"}>Confirm Password</FormLabel>
        <InputGroup>
            <Input type={`${othershow ? "text" : "password"}`} placeholder='Enter Your Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <InputRightElement width={"3.5rem"}>
                {othershow ? <IoMdEyeOff h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setOtherShow(!othershow)}/> : <IoMdEye h={"1.75rem"} cursor={"pointer"} size={22} onClick={() => setOtherShow(!othershow)}/>}
            </InputRightElement>
          </InputGroup>
      </FormControl>

      <FormControl id='pic' isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input type='file' p={1.5} accept='image/' onChange={(e) => postDetails(e.target.files[0])}/>
      </FormControl>

      <Button colorScheme='blue' width={"100%"} style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup