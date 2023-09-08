import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Row, FloatingLabel, FormControl, FormGroup, Button } from "react-bootstrap";
import Select from 'react-select'
import Loadingspinner from "../components/LoadingSpinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser, allUsers, editUser } from '../services/allApi';
import { registerContext, updateContext } from '../components/ContextShare';
import { BASE_URL } from '../services/baseUrl';


function Edit() {
  const{registerData,setRegisterData} = useContext(registerContext)
  const navigate=useNavigate()
  const {updateData,setUpdateData} = useContext(updateContext)

  const [showSpin, setShowSpin] = useState(true);
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
  const {id} = useParams()
  const [ existingImg,setExistingImg ] = useState("")

  const getuser = async ()=>{
    const {data} = await allUsers("")
    let existingUser = data.find(item=>item._id===id) 
    console.log(existingUser);
    setnormalUserInputs(existingUser)
    setStatus(existingUser.status)
    setExistingImg(existingUser.profile)

}

  useEffect(()=>{
    getuser()
  },[])

  useEffect(() => {
    if(profile){
      setExistingImg("")
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
    if(!fname ||!lname ||!email ||!mobile ||!gender ||!location ||!status ){
      toast.warning("Please Fill The Form Completely")
    }
    else{
      // toast.success("Form Completed")
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      profile?data.append("profile",profile):data.append("profile",existingImg)
      data.append("location",location)

      if(profile){
        var headers = {
          "content-type":"multipart/form-data"
        }
      }else{
        var headers = "";   
      }

      // api call

      const result = await editUser(id,data,headers)
      console.log(result);
      if(result.status===200){
        setUpdateData(result.data)
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
          <h1 className="text-center">Updata Employee Details</h1>
          <div className=" shadow border rounded    p-2 mt-3">
            <div className="image w-100 text-center mb-3">
              <img
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                src={preview?preview:`${BASE_URL}/uploads/${existingImg}` }
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
                    checked={normalUserInputs.gender==="Male"?true:false}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    name="gender"
                    value={"Female"}
                    label={"Female"}
                    onChange={(e) => getandsetNormalUSerInputs(e)}
                    checked={normalUserInputs.gender==="Female"?true:false}
                  />
                </Form.Group>
                {/* dropdown */}

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select placeholder={status} onChange={e=>setStatus(e.value)} options={options}></Select>
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
                  Update
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

export default Edit