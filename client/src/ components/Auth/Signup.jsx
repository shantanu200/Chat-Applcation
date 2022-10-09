import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    pic: "",
  });

  const [show, setShow] = useState(false);
  const [picloading, setpicLoading] = useState(false);
  const [pic, setPic] = useState();

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    setShow(!show);
  };

  const uploadImage = (pics) => {
    setpicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-application");
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setpicLoading(false);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    console.log(user)
    setpicLoading(true);
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.cPassword 
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }
    if (user.password !== user.cPassword) {
      toast({
        title: "Password not matched",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }
    console.log(user);
   
    try{
      const postUser = {
        name : user.name,
        email: user.email,
        password : user.password,
        pic: pic
      }
      const data = await axios.post(`/api/user`,postUser);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setpicLoading(false);    
    }catch(err){
      toast({
        title: "Error Occured",
        description:err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
    }

  };

  return (
    <VStack spacing="5px" color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          onChange={HandleChange}
          placeholder="Enter your Name"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input name="email" onChange={HandleChange} placeholder="Enter Email" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={show ? "text" : "password"}
            onChange={HandleChange}
            placeholder="Enter Password"
          />
          <InputRightElement>
            <Button h="1.75rem" onClick={handleClick} size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="cPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            name="cPassword"
            type={show ? "text" : "password"}
            onChange={HandleChange}
          />
          <InputRightElement>
            <Button h="1.75rem" onClick={handleClick} size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picloading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
