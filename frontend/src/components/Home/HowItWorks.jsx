import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
       <div className="howitworks">
        <div className="container">
          <h3>How JobQuest Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
               Create your account on JobQuest now, and start applying for
               all the different jobs present on the platform.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
              Find a Job related to your skills, get a hands on
                experience and build your career with JobQuest.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Find a Job related to your skills, get a hands on
                experience and build your career with JobQuest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorks
