import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__menu menu">
        <div className="main_menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/layout-pin.svg" alt="layout-pin" />
              </a>
              <p>layout-pin</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/dice-5.svg" alt="dice" />
              </a>
              <p>Dice</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/gift.svg" alt="gift" />
              </a>
              <p>Gift</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/extension-add.svg" alt="extension-add" />
              </a>
              <p>extension-add</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/filters.svg" alt="filters" />
              </a>
              <p>filters</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/boy.svg" alt="boy" />
              </a>
              <p>lorem</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/readme.svg" alt="readme" />
              </a>
              <p>Readme</p>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                <img src="/assets/icons/repost.svg" alt="repost" />
              </a>
              <p>Repost</p>
            </li>
            <li className="menu__item icon_star">
              <a href="#" className="menu__link">
                <img src="/assets/icons/Star.svg" alt="Star" />
              </a>
            </li>
          </ul>
        </div>
        <div className="menu__exit exit_button">
          <img
            className="exit__image"
            src="/assets/icons/log-off.svg"
            alt="exit_button"
          />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 