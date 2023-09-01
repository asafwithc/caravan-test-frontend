import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import ListOfUsers from './components/listOfUsers';
import Image from './components/image'
import Messaging from './components/message';

function App() {
  const [auth, setAuth] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
  const [token, setToken] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userCred) => {
			if (userCred) {
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
				userCred.getIdToken().then((token) => {
					setToken(token);
				});
			}
		});
	}, []);
  useEffect(() => {
    console.log(token);
  })

  const loginWithGoogle = () => {
    
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCred) => {
        if(userCred){
          setAuth(true);
        }
    })
  };

  const logout = ()=>{firebase.auth().signOut()}

  return (
    <div className="App">
      <Image/>
      
      {auth ? (
        <>
        <button onClick={loginWithGoogle}>login</button>
          <button onClick={logout}>logout</button>
          <Messaging token={token}/>
          <ListOfUsers token={token}/>
        </>
        
      ) : (
        <button onClick={loginWithGoogle}>login</button>
      )}
      
    </div>
  )
}

export default App;
