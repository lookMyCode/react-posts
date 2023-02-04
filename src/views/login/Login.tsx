import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { AuthHttpService } from '../../shared/http/AuthHttpService';


declare let Swal: any;


export function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const {setIsAuth} = useContext(AuthContext);

  function signIn() {
    AuthHttpService.login(login)
      .then(user => {
        setIsAuth(true);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/');
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `User ${login} not found`,
        });
      });
  }

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center full-page">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="text-center">Login</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-sm-6">
            <div className="row">

              <div className="col-12 mb-3">
                <div className="form-group">
                  <label htmlFor="login"></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="login" 
                    placeholder='example@mail.com' 
                    value={login}
                    onChange={({target}) => setLogin(target.value)}
                  />
                </div>
              </div>

              <div className="col-12">
                <button 
                  className="btn btn-primary w-100"
                  onClick={signIn}
                >Login</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
