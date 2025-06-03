'use client';

import { useEffect } from 'react';
import { UserProfile } from '../UserProfile';
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
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header; 