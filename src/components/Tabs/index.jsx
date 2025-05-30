import './Tabs.css';

const Tabs = () => {
  return (
    <div className="tabs">
      <div className="tabs__item">
        <button className="active__tabs__button">All games</button>
      </div>
      <div className="tabs__item">
        <button>New</button>
      </div>
      <div className="tabs__item">
        <button>Our recommendations</button>
      </div>
      <div className="tabs__item">
        <button>Live</button>
      </div>
      <div className="tabs__item">
        <button>Top rated</button>
      </div>
      <div className="tabs__item">
        <button>Slots</button>
      </div>
    </div>
  );
};

export default Tabs; 