import React from 'react';
import './Committees.css';

const Committees = () => {
  return (
    <section id="committees" className="committees-section">
      <div className="container">
        <h2 className="fade-in-up">Organizing Committee</h2>
        
        <div className="committee-tier glass fade-in-up">
          <h3>Chief Patron</h3>
          <p>Prof. Prem Vrat, Chairman, IIT (ISM) Dhanbad</p>
        </div>

        <div className="committee-grid">
          <div className="committee-card glass fade-in-up delay-1">
            <h3>Patron</h3>
            <p>Prof. Sukumar Misra, Director, IIT (ISM) Dhanbad</p>
          </div>
          
          <div className="committee-card glass fade-in-up delay-2">
            <h3>Co-Patron</h3>
            <p>Prof. Sarat Kumar Das, Dy. Director, IIT(ISM) Dhanbad</p>
          </div>

          <div className="committee-card glass fade-in-up delay-3">
            <h3>Chairman</h3>
            <p>Prof. Aditya Kumar, Head, Chemical Engineering</p>
          </div>
        </div>

        <div className="committee-tier glass fade-in-up">
          <h3>Conveners</h3>
          <p><strong>Convener:</strong> Prof. Paidinaidu Paluri</p>
          <p><strong>Co-Conveners:</strong> Prof. Arunkumar Samanta and Prof. Lutukurthi D N V V Konda</p>
        </div>

        <div className="committee-lists fade-in-up delay-1">
          <div className="committee-list glass">
            <h3>Advisory Committee</h3>
            <ul>
              <li><strong>Shri. Anand Mohan</strong> - Director (Technical / R&D & T, BD), CMPDIL, Ranchi</li>
              <li><strong>Prof. Arvind Rajendran</strong> - University of Alberta, Canada</li>
              <li><strong>Prof. Bishnupada Mandal</strong> - IIT Guwahati</li>
              <li><strong>Shri Dinesh Kumar Gangwal</strong> - Chief - O&M Services, MPL, Dhanbad</li>
              <li><strong>Prof. Goutam Deo</strong> - IIT Kanpur</li>
              <li><strong>Prof. Kishalay Mitra</strong> - IIT Hyderabad</li>
              <li><strong>Dr. (Mrs.) Malti Goel</strong> - President, Climate Change Research Institute, Delhi</li>
              <li><strong>Dr. Pinaki Sarkar</strong> - Senior Scientist, CSIR-CIMFR, Dhanbad</li>
              <li><strong>Dr. Pratik Swarup Dash</strong> - Chief, Sustainability Research Group, R&D, Tata Steel, Jamshedpur</li>
              <li><strong>Prof. Preeti Aghalayam</strong> - IIT Madras</li>
              <li><strong>Prof. Rajender Gupta</strong> - University of Alberta, Canada</li>
              <li><strong>Prof. Sankar Bhattacharya</strong> - Monash University, Australia</li>
              <li><strong>Prof. Sarma V. Pisupati</strong> - The Pennsylvania State University, USA</li>
              <li><strong>Prof. Srinivasakannan Chandrasekar</strong> - Khalifa University, Abu Dhabi, UAE</li>
              <li><strong>Prof. Suddhasatwa Basu</strong> - IIT Delhi</li>
              <li><strong>Dr. Vinay Amte</strong> - Reliance Industries Limited (RIL)</li>
            </ul>
          </div>

          <div className="committee-list glass">
            <h3>Core Committee</h3>
            <ul>
              <li>Prof. Aritra Santra</li>
              <li>Prof. Bidhan Chandra</li>
              <li>Prof. Ejaz Ahmad</li>
              <li>Prof. Khantesh Agrawal</li>
              <li>Prof. Krishna Sandilya Durbha</li>
              <li>Prof. Mahendra N Nandanwar</li>
              <li>Prof. Pantula D Priyanka</li>
              <li>Prof. Sandip Mandal</li>
              <li>Prof. Siddhartha Sengupta</li>
              <li>Prof. Soubhik Kumar Bhaumik</li>
              <li>Prof. Soumyajit Sen Gupta</li>
              <li>Prof. Sourav Sengupta</li>
              <li>Prof. Suman Dutta</li>
              <li>Prof. Suresh Kumar Yatirajula</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Committees;
