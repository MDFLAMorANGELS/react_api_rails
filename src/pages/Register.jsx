import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import { useNavigate } from "react-router-dom";


const Registrer= () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState(null);
    const [, setUserState] = useAtom(userAtom)

    const navigate = useNavigate();

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

    const checkPassword = (data) => {
      let lowerCase = document.getElementById('lower');
      let upperCase = document.getElementById('upper');
      let digit = document.getElementById('number');
      let specialChar = document.getElementById('special');
      let minLength = document.getElementById('length');

      const lower = new RegExp('(?=.*[a-z])');
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const special = new RegExp('(?=.*[@#$%^&+=_-])');
      const length = new RegExp('(?=.{8,})');

      const isLowerValid = lower.test(data);
      const isUpperValid = upper.test(data);
      const isNumberValid = number.test(data);
      const isSpecialValid = special.test(data);
      const isLengthValid = length.test(data);

      if (lower.test(data)) {
        lowerCase.classList.add('valid');
      } else {
        lowerCase.classList.remove('valid');
      }
      
      if (upper.test(data)) {
        upperCase.classList.add('valid');
      } else {
        upperCase.classList.remove('valid');
      }

      if (number.test(data)) {
        digit.classList.add('valid');
      } else {
        digit.classList.remove('valid');
      }

      if (special.test(data)) {
        specialChar.classList.add('valid');
      } else {
        specialChar.classList.remove('valid');
      }

      if (length.test(data)) {
        minLength.classList.add('valid');
      } else {
        minLength.classList.remove('valid');
      }

      setIsPasswordValid(isLowerValid && isUpperValid && isNumberValid && isSpecialValid && isLengthValid);

    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const userData = { user: { email, password, username } };
    
      try {
        const response = await fetch('http://127.0.0.1:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        if (response.ok) {
          console.log('Inscription réussie !');
          console.log(response.headers);
    
          const authorizationHeader = response.headers.get('authorization');
          if (authorizationHeader) {
            const token = authorizationHeader.split('Bearer ')[1];
            console.log('Bearer Token:', token);
            setUserState({ isLogged: true });
            navigate('/')
            // Vous pouvez stocker ou utiliser ce token comme nécessaire

          }    
          setUsername('');
          setEmail('');
          setPassword('');
        } else {
          console.error('L\'adresse e-mail que vous avez fournie est déjà associée à un compte. Veuillez vous connecter ou utiliser une autre adresse e-mail.');
          setError('L\'adresse e-mail que vous avez fournie est déjà associée à un compte. Veuillez vous connecter ou utiliser une autre adresse e-mail.');
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
        setError('Erreur de connexion au serveur. Veuillez vérifier votre connexion Internet.');
      }
    };

    return (

        <div className='box py-4 mt-5'>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            <label htmlFor="username">Nom d'utilisateur :</label>
                <div className='inputBox mb-3'>
                    <input
                        type="text"
                        minLength={3}
                        maxLength={25}
                        aria-describedby="champs username"
                        id="username"
                        placeholder='Username'
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <label htmlFor="email">Email :</label>
                <div className='inputBox mb-3'>
                    <input
                        type="email"
                        minLength={3}
                        maxLength={30}
                        aria-describedby="champs email"
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
                        minLength={8}
                        maxLength={50}
                        aria-describedby="champs password"
                        id="password"
                        placeholder='Mot de passe'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <span id='toggleBtn' onClick={handlePasswordHide}></span>
                </div>
                <div className='validation'>
                  <ul className='validation_list'>
                    <li id='lower'>Besoin d'une minuscule</li>
                    <li id='upper'>Besoin d'une majuscule</li>
                    <li id='number'>Besoin d'un chiffres</li>
                    <li id='special'>Besoin d'un caractére spécial</li>
                    <li id='length'>8 caractére minimum</li>
                  </ul>
                </div>
                <button type="submit" aria-label="S'inscrire" disabled={!isPasswordValid} className='btn btn-primary mt-3'>S'inscrire</button>
            </form>
        </div>
    );
}

export default Registrer;