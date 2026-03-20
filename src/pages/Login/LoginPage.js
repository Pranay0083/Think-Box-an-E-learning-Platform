import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed, Library } from 'lucide-react';
import { login, register } from '../../services/api';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!document.querySelector("#password:focus") && !document.querySelector("#password:user-invalid")) {
        const eyes = document.getElementsByClassName('eye');
        for (let eye of eyes) {
          const x = eye.getBoundingClientRect().left + 10;
          const y = eye.getBoundingClientRect().top + 10;
          const rad = Math.atan2(event.pageX - x, event.pageY - y);
          const rot = (rad * (180 / Math.PI) * -1) + 180;
          eye.style.transform = `rotate(${rot}deg)`;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMail = (mail) => {
    setEmail(mail);
  }

  const handleFocusPassword = () => {
    document.getElementById('face').style.transform = 'translateX(30px)';
    const eyes = document.getElementsByClassName('eye');
    for (let eye of eyes) {
      eye.style.transform = `rotate(100deg)`;
    }
  };

  const handleFocusOutPassword = () => {
    document.getElementById('face').style.transform = 'translateX(0)';
    const eyes = document.getElementsByClassName('eye');
    for (let eye of eyes) {
      eye.style.transform = `rotate(215deg)`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      email,
      password,
      ...(isLoginForm
        ? {}
        : {
          name,
          role: isInstructor ? "teacher" : "student"
        })
    };
    try {
      const response = isLoginForm ? await login(userData) : await register(userData);
      const { token } = response.data;

      if (rememberMe) {
        localStorage.setItem('userID', response.data.userId);
        localStorage.setItem('isLogin', "true");
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('userID', response.data.userId);
        sessionStorage.setItem('isLogin', "true");
        sessionStorage.setItem('authToken', token);
      }
      setLoading(false);
      if (isLoginForm) {
        navigate(-1)
      }
      setIsLoginForm(true)
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err)
    }
  };

  function LoginForm() {
    return (
      <section className="form">
        <div className="logo">
          <Library />
        </div>
        <h1 className="form__title">Log in to your Account</h1>
        <p className="form__description">Welcome back! Please, enter your information</p>

        <form onSubmit={(e) => { handleSubmit(e) }}>
          <label className="form-control__label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => { handleMail(e.target.value) }}
            placeholder="Email"
          />

          <label className="form-control__label">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              minLength="4"
              id="password"
              onFocus={handleFocusPassword}
              onBlur={handleFocusOutPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {showPassword ? <EyeClosed onClick={togglePasswordVisibility} /> : <Eye onClick={togglePasswordVisibility} />}
          </div>
          <div className="password__settings">
            <label className="password__settings__remember">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span className="custom__checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              Remember me
            </label>
            <Link to="#">Forgot Password?</Link>
          </div>
          {error && <p className='errowhilesomething'>{error.response.data.message}</p>}
          <button
            type="submit"
            className="form__submit"
            id="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="form__footer">
          Don't have an account?<br />
          <Link to="#" onClick={() => setIsLoginForm(false)}>Create an account</Link>
        </p>
      </section>
    );
  }

  function SignupForm() {
    return (
      <section className="form">
        <div className="logo">
          <Library />
        </div>
        <h1 className="form__title">Create an Account</h1>
        <p className="form__description">Welcome! Please, enter your information to sign up</p>

        <form onSubmit={handleSubmit}>
          <label className="form-control__label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <label className="form-control__label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <label className="form-control__label">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              minLength="4"
              id="password"
              onFocus={handleFocusPassword}
              onBlur={handleFocusOutPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {showPassword ? <EyeClosed onClick={togglePasswordVisibility} /> : <Eye onClick={togglePasswordVisibility} />}
          </div>
          <div className="password__settings">
            <label className="password__settings__remember">
              <input type="checkbox" checked={isInstructor} onClick={() => setIsInstructor(!isInstructor)} />
              <span className="custom__checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              Sign up as Instructor
            </label>

            <Link to="#">Forgot Password?</Link>
          </div>
          {error && <p>{error.response.data.message}</p>}
          <button
            type="submit"
            className="form__submit"
            id="submit-signup"
          >
            Sign Up
          </button>
        </form>

        <p className="form__footer">
          Already have an account?<br />
          <Link to="#" onClick={() => setIsLoginForm(true)}>Log in to your Account</Link>
        </p>
      </section>
    );
  }

  return (
    <main className="login-page">
      {isLoginForm ? LoginForm() : SignupForm()}

      <section className="form__animation">
        <div id="ball">
          <div className="ball">
            <div id="face">
              <div className="ball__eyes">
                <div className="eye_wrap"><span className="eye"></span></div>
                <div className="eye_wrap"><span className="eye"></span></div>
              </div>
              <div className="ball__mouth"></div>
            </div>
          </div>
        </div>
        <div className="ball__shadow"></div>
      </section>
    </main>
  );
};

export default LoginPage;
