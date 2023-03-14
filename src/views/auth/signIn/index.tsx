import { useState } from "react";
import { NavLink, Redirect, Route, Switch, useHistory  } from "react-router-dom";
// Chakra imports
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.jpg";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiBaseUrl, options } from "config";
import routes from "routes";
import AdminLayout from '../../../layouts/admin';
import { setAuthToken } from "helpers/setAuthToken";
const apiLogInUrl = `${apiBaseUrl}/Authentication/login`;

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const handelSignInButton = (value: any) => {
    setIsLoading(true);
    const userCredential = {
      username: value.username,
      password: value.password,
    };
    axios
      .post(apiLogInUrl, userCredential, options)
      .then((result) => {
       
          if (result.status === 200) {
            const serializedState = result.data;
            localStorage.setItem("token", serializedState.token);
            localStorage.setItem("role", serializedState.roles);
            {
            setIsLoading(false);
            setAuthToken(serializedState.token);
            history.push("/admin");
            
          }
        }
      })
      .catch((err) => {
        alert(`${err}`);
        setIsLoading(false);
      });
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your user name and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "120%", md: "460px" }}
          maxW="120%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handelSignInButton}
            style={{ maxWidth: 350 }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <NavLink to="/auth/sign-up">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                    Create an Account
                  </Text>
                </NavLink>
              </Text>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form-button"
                style={{ height: 40 }}
                loading={isLoading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          ></Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
