import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';


function App() {

  const [ isShow, setIsShow ] = useState(false);
  const [ users, setUsers ] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
  }, [])

  const getUsers =() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
  }

  // const selectUser = user => setUserSelected(user);

  const modalOpen = () => setIsShow(!isShow);
 
  const removeUser = id => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(() => {
        getUsers();
    });
  }

  return (
    <div className="App">
      
      <div className="app_title">
        <h1>Users</h1>
      </div>
  
        <div className="form_content">
          <button onClick={modalOpen}
                  className="modal_button" id='open-modal'>
                  <span>+</span> Create New User         
          </button>
          <UsersForm 
            isShow={isShow} 
            setIsShow={setIsShow} 
            getUsers={getUsers}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
          />
        </div>  
      
      <div className="users">
          <UsersList 
            users={users} 
            setUserSelected={setUserSelected} 
            modalOpen={modalOpen}
            removeUser={removeUser}
          />
      </div>
    </div>
  );
}

export default App;
