import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(e)
    setFormData({
      ...formData,
    [name]:value
    });
  };
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')
    // alert(formData)

    try {
    await axios.post('http://localhost:5000/createUser', formData)
    // .then(result=>console.log(result))
    // .catch(error=>console.log(error, "errrrr"));
    // alert("new user create")
    
    window.location='/'

      
      setFormData({
        name: '',
        email: '',
        age: ''
      });

    } catch (error) {
      console.error('Error creating user:', error.response);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add user</h2>
          <div className='mb-2'>
            <label>Name</label>
            <input type='text' className='form-control' name='name' value={formData.name} onChange={handleChange} />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input type='text' className='form-control' name='email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='mb-2'>
            <label>Age</label>
            <input type='text' className='form-control' name='age' value={formData.age} onChange={handleChange} />
          </div>
          <button type='submit' className='btn btn-success'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
