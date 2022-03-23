import React from 'react';

const UsersList = ({users, setUserSelected, modalOpen, removeUser }) => {

    return (
        <div className='content-card'>
            {
                users.map(user => (
                    <div className="card" key={user.id}>
                        <h4>{user.first_name} {user.last_name}</h4>
                        <div className='email'>
                            <p >Email:</p>
                            <p>{user.email}</p>
                        </div>
                        
                        <div className='birthday'>
                            <p>Birthday:</p>
                            <p><i className="fa-solid fa-gift"></i>{user.birthday}</p>
                        </div>
                        
                        <div className="button">
                            <button  onClick={() => {
                                setUserSelected(user);
                                modalOpen();
                            }}
                            className='update'>
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button onClick={() => removeUser(user.id)}
                            className='remove'>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        
                    </div>
                ))
            }
        </div>
    );
};

export default UsersList;