import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import {validateEmail} from "../../utils/helper";

const Sign = () => {
  const [profilePic,setProfilePic] = useState(null);
  const [fullname,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigete = useNavigate();
  return (
    <div>Sign</div>
  )
}

export default Sign