import { FormControl, FormLabel, Input, VStack, Button,InputGroup,InputRightElement, Toast, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React,{useState} from 'react'


const Login = () => {
  const toast = useToast();
  const [user,setUser] = useState({
    email:"",
    password:""
  });
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const HandleChange = (event) => {
    const {name,value} = event.target;
    setUser({...user,[name]:value});
  }

  const handleClick = () => {setShow(!show)}
  const submitHandler = async () => {
    setLoading(true);
    if(!user.email || !user.password){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try{
      const {data} = await axios.post("/api/user/login",user);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
    }catch(err){
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  
  return (
    <VStack spacing="5px" color={"black"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          onChange={HandleChange}
          placeholder="Enter your Name"
        />
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
        <Button h="1.75rem" marginRight={"10px"}  onClick={handleClick} size="sm">{show ? "Hide" : "Show"}</Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      
      <Button
      colorScheme={"blue"}
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading = {loading}
      >Sign up</Button>
    </VStack>
  )
}

export default Login