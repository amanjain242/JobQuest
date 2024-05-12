import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {

  const details = [
    {
      id: 1,
      title: "1250",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "919",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "5,000",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,000",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className='heroSection'>
      <div className="container">
        <div className="title">
          <h1>Find a Job that suits</h1>
          <h1>your interests and skills</h1>
          <p>Look around the verified listing jobs at our platform. Apply to job vacancies availabe there by just doing Sign-Up. Get connect to HR's directly.</p>
          <p>Just Sign-Up and a job will be in your hand.</p>
        </div>
        <div className="image">
          <img src='/heroS.jpg' alt='hero' />
        </div>
      </div>
      <div className="details">
        {
         details.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })
        }
      </div>
    </div>
  )
}

export default HeroSection
