import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hometable from "../components/Hometable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteContext, registerContext, updateContext } from "../components/ContextShare";
import { Alert } from "react-bootstrap";
import { allUsers, deleteUser } from "../services/allApi";

function Home() {
   const {deleteData,setDeleteData} = useContext(deleteContext)
   const {updateData,setUpdateData} = useContext(updateContext)
  const { registerData, setRegisterData } = useContext(registerContext);
  const [showSpin, setShowSpin] = useState(true);
  const [allUsersData, setAllUsersData] = useState([]);
  const [search, setSearch] = useState([]);

  const getallEmployee = async () => {
    const response = await allUsers(search);
    if (response.status === 200) {
      setAllUsersData(response.data);
    } else {
      toast.error("Connot fetch data!!");
    }
  };

  const removeUser = async (id)=>{
    const response = await deleteUser(id)
    console.log(response);
    if(response.status===200){
      getallEmployee()
      setDeleteData(response.data)
    }else{
      toast.error("Operation faild Please try again...!")
    }
  }

  useEffect(() => {
    getallEmployee();
    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  }, [search]);

  return (
    <>
    {updateData && (
        <Alert
          variant="primary"
          onClose={() => setUpdateData("")}
          dismissible
        >
          {updateData.fname.toUpperCase()} Updated Successfully...!
        </Alert>
      )}
      {registerData && (
        <Alert
          variant="success"
          onClose={() => setRegisterData("")}
          dismissible
        >
          {registerData.fname.toUpperCase()} Register Successfully...!
        </Alert>
      )}
      {deleteData && (
        <Alert
          variant="danger"
          onClose={() => setDeleteData("")}
          dismissible
        >
          {deleteData.fname.toUpperCase()} removed  Successfully...!
        </Alert>
      )}
      {showSpin ? (
        <LoadingSpinner />
      ) : (
        <div className="container mt-3 ">
          <div className="search-all d-flex align-items-center">
            <div className="search d-flex align-items-center ">
              <button
                type="button"
                class="btn btn-light "
                style={{ borderRadius: "50px" }}
              >
                <i class="fa-solid fa-magnifying-glass fa-fade"></i>
              </button>
              <input
                type="text"
                style={{ width: "400px" }}
                placeholder="Search By Employee name"
                className="form-control ms-3  "
                onChange={e=>setSearch(e.target.value)}
              />
            </div>
            <Link to={"/add"} className="btn btn-warning ms-auto">
              <i class="fa-solid fa-user-plus me-1"></i>
              Add
            </Link>
          </div>
          <div className="table mt-5">
            <h1>List of All Employees</h1>
            <Hometable displayData={allUsersData} removeUser={removeUser} />
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </>
  );
}

export default Home;
