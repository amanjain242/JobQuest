import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { isAuthorized, user } = useContext(Context)
  const [applications, setApplications] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");


  const navigateTo = useNavigate()

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get("http://localhost:4000/api/v1/application/employer/getall", { withCredentials: true })
          .then((res) => {
            setApplications(res.data.applications);
          })
      } else {
        axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", { withCredentials: true })
          .then((res) => {
            setApplications(res.data.applications);
          })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [isAuthorized])

  if (!isAuthorized) {
    navigateTo("/login")
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <>
      <section className="applications page">
        {
          user && user.role === "Job Seeker" ? (
            <div className="container">
              <h1>My Applications</h1>
              {
                applications.map(element => {
                  return <JobSeekerCard element={element} key={element._id} deleteApplication={deleteApplication}
                    openModal={openModal} />
                })
              }
            </div>
          ) : (
            <div className="container">
              <h3>Applications from Job Seekers</h3>
              {
                applications.map(element => {
                  return <EmployerCard element={element} key={element._id}
                    openModal={openModal} />
                })
              }
            </div>
          )
        }
        {
          modalOpen && (
            <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
          )
        }
      </section>
    </>
  )
}

export default MyApplications

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          <p>
            <span>Job Role:</span> {element.jobTitle}
          </p>
          <p>
            <span>Company Name:</span> {element.companyName}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const [buttonText, setButtonText] = useState('Approve this application');
  const [isApproved, setIsApproved] = useState(false);


  const handleApproveClick = async () => {
    try {
      const response = await axios.post('http://localhost:4000/send-email', {
        to: element.email,
        subject: `Application Status Update for the role of ${element.jobTitle} in ${element.companyName}`,
        text: `Dear ${element.name},\n\n` +
          'Congratulations! Your application has been approved for the next round of the recruitment process.\n' +
          'You will be sent the link for the online test soon.\n\n' +
          'Best regards,\n' +
          element.companyName, // Email body,

      });
      if (response.status === 200) {
        // Show a success message to the user
        // console.log(response.json)
        toast.success('Email sent successfully');
        setIsApproved(true)
      } else {
        // Show an error message to the user
        toast.error('Failed to send email');
      }
    } catch (error) {
      console.log('Error sending email dont know why:', error);
    }
  };


  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
          <p>
            <span>Job Role:</span> {element.jobTitle}
          </p>
          <p>
            <span>Company Name:</span> {element.companyName}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className='btn_area' ><button onClick={handleApproveClick} disabled={isApproved}>
    {isApproved ? 'Approved for next round' : 'Approve this application'}</button></div>
      </div>
    </>
  );
};
