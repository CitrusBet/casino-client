import './Providers.css';

const Providers = () => {
  const providers = [
    { name: "Evolution Gaming", logo: 1 },
    { name: "Pragmatic Play", logo: 2 },
    { name: "Hacksaw", logo: 3 },
    { name: "NoLimitCity", logo: 4 },
    { name: "NetEnt", logo: 5 },
    { name: "BetSoft", logo: 6 }
  ];

  return (
    <div className="providers">
      <h2 className="title_providers">Providers</h2>
      <div className="rows_providers">
        {providers.map((provider, index) => (
          <div key={index} className="card_providers">
            <img
              src={`/assets/logo_providers/logo_providers_${provider.logo}.png`}
              alt="logo_providers"
            />
            <p className="name_providers">{provider.name}</p>
            <a href="#">Open</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers; 