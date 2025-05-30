'use client';

import { useEffect } from 'react';
import './Header.css';

const Header = () => {
  useEffect(() => {
    window.openPopup = function(popupId) {
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add("active");
      }
    };

    const langSwitcher = document.querySelector(".lang-switcher");
    const langOptions = document.querySelectorAll(".lang-option");

    if (langSwitcher) {
      langSwitcher.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");
      });

      langOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const lang = this.dataset.lang;
          document.querySelector(".lang-switcher__current span").textContent =
            lang.toUpperCase();
          langSwitcher.classList.remove("active");
        });
      });

      document.addEventListener("click", function (e) {
        if (!e.target.closest(".lang-switcher")) {
          langSwitcher.classList.remove("active");
        }
      });
    }

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("close")) {
        const popup = event.target.closest(".popup");
        if (popup) {
          popup.classList.remove("active");
        }
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup")) {
        event.target.classList.remove("active");
      }
    });
  }, []);

  return (
    <header>
      <div className="header__container">
        <div className="header__search">
          <div className="menu__logo logo">
            <img
              className="logo__image"
              src="/assets/LOGO.png"
              alt="logo"
              width="40"
              height="40"
            />
          </div>
          <button className="button__search">
            <img src="/assets/icons/search.svg" alt="search" />
          </button>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for casinos, games and more..."
          />
        </div>
        <div className="auth-bar">
          <div className="lang-switcher">
            <div className="lang-switcher__current">
              <span>EN</span>
              <img
                src="/assets/icons/arrow.svg"
                alt="arrow"
                className="lang-switcher__arrow"
              />
            </div>

            <ul className="lang-switcher__dropdown">
              <li className="lang-option" data-lang="en">EN</li>
              <li className="lang-option" data-lang="ru">RU</li>
            </ul>
          </div>
          <div className="auth-buttons">
            <button
              className="auth-buttons__item"
              onClick={() => window.openPopup('loginPopup')}
            >
              Login 🎉
            </button>
            <button
              className="auth-buttons__item"
              onClick={() => window.openPopup('signupPopup')}
            >
              Sign up 🚀
            </button>
          </div>
          <div className="popup" id="loginPopup">
            <div className="popup-content">
              <span className="close">&times;</span>
              <h2>Login Form</h2>
              <form id="loginForm">
                <label htmlFor="loginEmail">Email:</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  placeholder="Enter your email"
                  required
                />

                <label htmlFor="loginPassword">Password:</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  placeholder="Enter your password"
                  required
                />

                <button type="submit">Login</button>
              </form>
            </div>
          </div>

          <div className="popup" id="signupPopup">
            <div className="popup-content">
              <span className="close">&times;</span>
              <h2>Sign Up Form</h2>
              <form id="signupForm">
                <label htmlFor="signupEmail">Email:</label>
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  placeholder="Enter your email"
                  required
                />

                <label htmlFor="signupPassword">Password:</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  placeholder="Enter your password"
                  required
                />

                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 