
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersForm = ({ children, isShow, setIsShow, getUsers, userSelected, setUserSelected }) => {

        const [ firstName, setFirstName ] = useState("");
        const [ lastName, setLastName ] = useState("");
        const [ email, setEmail ] = useState("");
        const [ password, setPassword ] = useState("");
        const [ birthday, setBirthday ] = useState("");

        useEffect(() =>{
            if (userSelected) {
                setFirstName(userSelected.first_name);
                setLastName(userSelected.last_name);
                setEmail(userSelected.email);
                setPassword(userSelected.password);
                setBirthday(userSelected.birthday);
            }
        }, [userSelected])

        const submit = e =>{
            e.preventDefault();
            const user = { 
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                birthday
            }
            if(userSelected){
                axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                    .then(() => {
                        getUsers();
                        setUserSelected(null);
                        reset();
                    })
            }else{
                axios.post('https://users-crud1.herokuapp.com/users/', user)
                .then(() => {
                    getUsers();
                    reset();
                })
                .catch(error => console.log(error.response))
            }
            
          }

          const reset = () =>{
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setBirthday("");
          }

    return (
        <div>
           { isShow &&
            <div className="modal container">
                
                <div className="modal_container" id='modal-container'>
                    
                            <div className="modal_content">
                                <div className="modal_close" title='close'>
                                    <button onClick={() => setIsShow(false)}>
                                        <i className="fa-solid fa-x"></i>
                                    </button>  
                                </div>
                                <h1 className='modal_title'>New User</h1> 

                                <div className="form">

                                    <form onSubmit={submit}>
                                        <div className="input-container">
                                            <label htmlFor="fist_name">
                                                <i className="fa-solid fa-user"></i>
                                            </label>
                                            <input 
                                                type="text" 
                                                id='first_name'
                                                placeholder='First Name' 
                                                onChange={e => setFirstName(e.target.value)}
                                                value={firstName}
                                            />
                                            <label htmlFor="last_name"></label>
                                            <input 
                                                type="text" 
                                                id='last_name'
                                                placeholder='Last Name' 
                                                onChange={e => setLastName(e.target.value)}
                                                value={lastName}
                                            />
                                        </div>

                                        <div className="input-container">
                                            <label htmlFor="email">
                                                <i className="fa-solid fa-envelope"></i>
                                            </label>
                                            <input 
                                                type="email" 
                                                id='email'
                                                placeholder='Email' 
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>

                                        <div className="input-container">
                                            <label htmlFor="password">
                                                <i className="fa-solid fa-lock"></i>
                                            </label>
                                            <input 
                                                type="password" 
                                                id='password'
                                                placeholder='Password' 
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>

                                        <div className="input-container">
                                            <label htmlFor="birthday">
                                                <i className="fa-solid fa-cake-candles"></i>
                                            </label>
                                            <input 
                                                type="date" 
                                                id='birthday'
                                                onChange={e => setBirthday(e.target.value)}
                                                value={birthday}
                                            />
                                        </div>
                                        <button
                                            className="modal_button modal_button-width">
                                            Upload
                                        </button>

                                    </form>
                                </div>
                                
                                <button onClick={() => setIsShow(false)}
                                    className="modal_button-link">
                                    Close
                                </button>
                                { children }
                            </div>                  
                </div>
            
            </div>
            }
        </div>
    );
};

export default UsersForm;