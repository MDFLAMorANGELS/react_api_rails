import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';

const Login= () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUserState] = useAtom(userAtom)

    const handlePasswordHide = () => {
      let pswrd = document.getElementById('password');
      let toggleBtn = document.getElementById('toggleBtn');
      
      if(pswrd.type === 'password'){
        pswrd.setAttribute('type', 'text');
        toggleBtn.classList.add('hide')
      } else {
        pswrd.setAttribute('type', 'password');
        toggleBtn.classList.remove('hide')
      }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const userData = { user: { email, password } };
    
      try {
        const response = await fetch('http://127.0.0.1:3000/users/sign_in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          console.log('Connexion réussie !');
          console.log(response.headers);
    
          const authorizationHeader = response.headers.get('authorization');
          if (authorizationHeader) {
            const token = authorizationHeader.split('Bearer ')[1];
            console.log('Bearer Token:', token);
            setUserState({ isLogged: true });
            // Vous pouvez stocker ou utiliser ce token comme nécessaire

          }    
          setEmail('');
          setPassword('');
        } else {
          console.error('Échec de la connexion email ou mot de passe incorect');
        }
      } catch (error) {
        console.log('catch');
        console.error('Erreur lors de la requête:', error);
      }
    };

    return (

      <div className='box py-4 mt-5'>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
          <div className='inputBox mb-3'>
              <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  value={email}
                  onChange={handleEmailChange}
                  required
              />
          </div>
          <label htmlFor="password">Mot de passe :</label>
          <div className='inputBox mb-3'>
              <input
                  type="password"
                  id="password"
                  placeholder='Mot de passe'
                  value={password}
                  onChange={handlePasswordChange}
                  required
              />
              <span id='toggleBtn' onClick={handlePasswordHide}></span>
          </div>
          <button type="submit" className='btn btn-primary mt-3'>S'inscrire</button>
      </form>
  </div>
    );
}

export default Login;