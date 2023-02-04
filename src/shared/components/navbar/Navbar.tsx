import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { AuthHttpService } from '../../http/AuthHttpService';


const LINKS: {to: string, text: string, auth?: boolean}[] = [
  {to: '/', text: 'Home',},
  {to: '/login', text: 'Login', auth: false,},
  {to: '/registration', text: 'Registration', auth: false,},
  {to: '/post_editor', text: 'Post editor', auth: true,},
];


export function Navbar() {
  const location = useLocation();
  const [pathname, setPathname] = useState('');
  const {isAuth, setIsAuth} = useContext(AuthContext);

  function logout() {
    AuthHttpService.logout();
    setIsAuth(false);
  }
  
  useMemo(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              LINKS
                .filter(link => {
                  if (link.auth === undefined) return true;
                  if (link.auth === false) return isAuth === false;
                  return isAuth === true;
                })
                .map(link => {
                  return <li key={link.to} className="nav-item">
                  <Link 
                    className={classNames('nav-link', {active: pathname === link.to})} 
                    to={link.to}
                  >{link.text}</Link>
                </li>
                })
            }
            {
              isAuth && <li className="nav-item">
              <a 
                className={classNames('nav-link')} 
                href="/"
                onClick={(e => {
                  e.preventDefault();
                  logout();
                })}
              >Logout</a>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
