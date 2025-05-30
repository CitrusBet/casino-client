import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="main__text">
      <h4 className="pre__title">Lorem Ipsum is simply dummy text</h4>
      <div className="title-block">
        <h1 className="title__main">Lorem Ipsum is simply</h1>
        <p className="title__description">
          <span className="title_text_color">dummy text</span> of the printing
          and typesetting
        </p>
      </div>
      <div className="main__button">
        <button>Open random 🎰</button>
        <a href="#">More details 🃏</a>
      </div>
    </div>
  );
};

export default HeroSection; 