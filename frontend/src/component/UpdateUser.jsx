import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/getUser/'+id)
      .then((result) =>setUserData(result.data))
      .catch(err => console.log(err));
    }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/updateUser/'+id, userData);
      navigate("/");
    } catch (error) {
      console.log(error, "errrrr");
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update user</h2>
          <div className='mb-2'>
            <label>Name</label>
            <input type='text' name="name" onChange={handleChange} className='form-control' value={userData.name} />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input type='text' name="email" onChange={handleChange} className='form-control' value={userData.email} />
          </div>
          <div className='mb-2'>
            <label>Age</label>
            <input type='text' name="age" onChange={handleChange} className='form-control' value={userData.age} />
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
