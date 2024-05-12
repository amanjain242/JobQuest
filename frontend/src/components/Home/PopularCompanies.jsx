import React from 'react'
import { FaMicrosoft, FaApple, FaGoogle, FaLinkedin, FaYoutube, FaAmazon } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Main Cyber Park , Pune",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Near Coluba Hospital, New York",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "8th Street, Opposite to Tony Park, London",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Google",
      location: "Hyderabad, Telangana",
      openPositions: 8,
      icon: <FaGoogle />,
    },
    {
      id: 5,
      title: "LinkedIn",
      location: "Mumbai, Maharashtra",
      openPositions: 10,
      icon: <FaLinkedin />,
    },
    {
      id: 6,
      title: "Youtube",
      location: "Pune, Maharashtra",
      openPositions: 6,
      icon: <FaYoutube />,
    },
    {
      id: 7,
      title: "Amazon",
      location: "Chennai, Tamil Nadu",
      openPositions: 4,
      icon: <FaAmazon />,
    },

  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PopularCompanies
