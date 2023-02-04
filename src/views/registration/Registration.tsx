import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { AuthHttpService } from '../../shared/http/AuthHttpService';
import { useForm } from "react-hook-form";
import classNames from 'classnames';


declare let Swal: any;


export function Registration() {
  const navigate = useNavigate();
  const {setIsAuth} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, formState } = useForm({
    mode: 'onBlur'
  });

  function signUp(data: any) {
    if (!formState.isDirty || !!Object.keys(errors).length) return;

    const {login, name} = data
    AuthHttpService.registration({email: login, name})
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
        console.error(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `User ${login} already exists`,
        });
      });
  }

  return (
    <div className="bg-light d-flex flex-column justify-content-center align-items-center full-page">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="text-center">Registration</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <form 
            className="col-12 col-sm-6"
            onSubmit={handleSubmit(signUp)}
          >
            <div className="row">

              <div className="col-12 mb-3">
                <div className="form-group">
                  <label 
                    htmlFor="login"
                    className={
                      classNames({
                        'text-danger': formState.touchedFields.login && errors.login, 
                        'text-success': formState.touchedFields.login && !errors.login
                      })
                    } 
                  >Login</label>
                  <input 
                    type="text" 
                    className={
                      classNames('form-control', {
                        'border-danger': formState.touchedFields.login && errors.login, 
                        'border-success': formState.touchedFields.login && !errors.login
                      })
                    } 
                    id="login" 
                    placeholder='example@mail.com' 
                    {...register("login", {required: {value: true, message: 'Login is required'}, pattern: {value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Incorrect email'}})}
                  />
                  {errors.login && <span className="text-danger">{errors.login.message as string}</span>}
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="form-group">
                  <label 
                    htmlFor="name"
                    className={
                      classNames({
                        'text-danger': formState.touchedFields.name && errors.name, 
                        'text-success': formState.touchedFields.name && !errors.name
                      })
                    } 
                  >Name</label>
                  <input 
                    type="text" 
                    className={
                      classNames('form-control', {
                        'border-danger': formState.touchedFields.name && errors.name, 
                        'border-success': formState.touchedFields.name && !errors.name
                      })
                    } 
                    id="name" 
                    placeholder='Adam Bush' 
                    {...register("name", {required: {value: true, message: 'Field is required'}, minLength: {value: 5, message: 'Min name length is 5'}})}
                  />
                  {errors.name && <span className="text-danger">{errors.name.message as string}</span>}
                </div>
              </div>

              <div className="col-12">
                <button 
                  type='submit'
                  className="btn btn-primary w-100"
                  disabled={!formState.isDirty || !!Object.keys(errors).length}
                >Login</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
