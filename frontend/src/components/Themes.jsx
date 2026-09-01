import React from 'react';
import './Themes.css';

const Themes = () => {
  const themesList = [
    { title: "Clean Energy Innovation", img: "/assets/Screenshot 2026-08-28 221246.png" },
    { title: "Carbon Capture, Utilization & Storage (CCUS)", img: "/assets/Screenshot 2026-08-28 222420.png" },
    { title: "Green Hydrogen", img: "/assets/Screenshot 2026-08-28 222708.png" },
    { title: "Renewable Energy", img: "/assets/Screenshot 2026-08-28 223030.png" },
    { title: "Energy Storage Systems", img: "/assets/Screenshot 2026-08-28 223155.png" },
    { title: "Materials Science & Nanotechnology", img: "/assets/Screenshot 2026-08-28 233734.png" },
    { title: "Electro, Chemical, Bio & Photo-catalysis", img: "/assets/Screenshot 2026-08-28 234328.png" },
    { title: "Circular Economy", img: "/assets/Screenshot 2026-08-28 234453.png" },
    { title: "Other Relevant Areas", img: "/assets/Screenshot 2026-08-28 234704.png" }
  ];

  return (
    <section id="themes" className="themes-section">
      <div className="container">
        <h2 className="fade-in-up">Major Themes</h2>
        <div className="themes-grid">
          {themesList.map((theme, index) => (
            <div 
              key={index} 
              className={`theme-card glass fade-in-up delay-${(index % 3) + 1}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('${theme.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3>{theme.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Themes;
