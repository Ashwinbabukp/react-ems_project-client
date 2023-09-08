import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, FloatingLabel, FormControl, FormGroup, Button } from "react-bootstrap";
import Select from 'react-select'
import Loadingspinner from "../components/LoadingSpinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../services/allApi';
import { registerContext } from '../components/ContextShare';



function Add() {

  const{registerData,setRegisterData} = useContext(registerContext)
  const navigate=useNavigate()

  const [showSpin, setShowSpin] = useState(true);
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if(profile){
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  },[profile]);

  const [normalUserInputs, setnormalUserInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });


  const getandsetNormalUSerInputs = (e) => {
    const { name, value } = e.target;
    setnormalUserInputs({ ...normalUserInputs, [name]: value });
  };
  console.log(normalUserInputs);
  console.log(status);
  console.log(profile);

  const options = [
    { value: "Active", label: "Active" },
    { value: "inActive", label: "inActive" },
  ];

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {fname,lname,email,mobile,gender,location} = normalUserInputs
    if(!fname ||!lname ||!email ||!mobile ||!gender ||!location ||!status ||!profile){
      toast.warning("Please Fill The Form Completely")
    }
    else{
      // toast.success("Form Completeed")
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("profile",profile)
      data.append("location",location)

      const headers = {
        "content-type":"multipart/form-data"
      }

      // api call

      const result = await addUser(data,headers)
      console.log(result);
      if(result.status===200){
        setnormalUserInputs({...normalUserInputs,
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",})
        setStatus("")
        setProfile("")
        setRegisterData(result.data)
        navigate('/')
      }else{
        toast.error("Request Failed")
      }
    }
  }

  return (
    <>
      {showSpin ? (
        <Loadingspinner />
      ) : (
        <div className="container mt-3">
          <h1 className="text-center">Add New Employee Details</h1>
          <div className=" shadow border rounded    p-2 mt-3">
            <div className="image w-100 text-center mb-3">
              <img
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                src={preview?preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"}
                alt=""
              />
            </div>
            <Form>
              <Row>
                <FloatingLabel
                  controlId="floatingname"
                  label="First Name"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    value={normalUserInputs.fname}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatinglname"
                  label="Last Name"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    value={normalUserInputs.lname}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingemail"
                  label="Email Address"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={normalUserInputs.email}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingmobile"
                  label="Mobile Number"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="number"
                    placeholder="Mobile"
                    name="mobile"
                    value={normalUserInputs.mobile}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                </FloatingLabel>

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    name="gender"
                    value={"Male"}
                    label={"Male"}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    name="gender"
                    value={"Female"}
                    label={"Female"}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  />
                </Form.Group>
                {/* dropdown */}

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select onChange={e=>setStatus(e.value)} options={options}></Select>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Choose Profile Picture </Form.Label>
                  <FormControl type="file" name="user_profile" onChange={e=>setProfile(e.target.files[0])}></FormControl>
                </Form.Group>

                <FormGroup className="mb-3 col-lg-6">
                  <Form.Label>Employee Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={normalUserInputs.location}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                  ></Form.Control>
                </FormGroup>
                <Button type="submit" varient="primary" onClick = {e=>handleSubmit(e)}>
                  Submit
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      )}
      <ToastContainer position='top-center'/>
    </>
  );
}
export default Add;
