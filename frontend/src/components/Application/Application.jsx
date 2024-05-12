import React, { useContext, useState,useEffect } from 'react'
import { Context } from "../../main"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Application = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [resume, setResume] = useState(null)
  const [jobTitle, setJobTitle] = useState("")
  const [companyName, setCompanyName] = useState("")

  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate();

  //function to get the jobtitle and company name in the received application
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then(res => {
        setJobTitle(res.data.job.title);
        setCompanyName(res.data.job.companyName);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, []);
  

  //function to handle the file input
  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  }

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    formData.append("jobTitle",jobTitle);
    formData.append("companyName",companyName);

    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Phone:", phone);
    // console.log("Address:", address);
    // console.log("Cover Letter:", coverLetter);
    // console.log("Resume:", resume);
    // console.log("Job ID:", id);
    // console.log("Job Title:", jobTitle);
    // console.log("Company Name:", companyName);

    

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      setJobTitle("");
      setCompanyName("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(!isAuthorized || (user && user.role === "Employer")){
    navigateTo("/");
  }
  return (
    <>
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png, .webp"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Title of the Job:
            </label>
            <input 
            type="text" 
            name="jobTitle" 
            value={jobTitle} 
            
            style={{ width: "100%" }}
            />
          </div>
          <div>
          <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Company Name:
            </label>
            <input type="text" name="companyName" value={companyName} style={{ width: "100%" }}/>
          </div>  
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
     
    </>
  )
}

export default Application
