import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebookF, FaYoutube, FaLinkedin} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"

const Footer = () => {
  const {isAuthorized}  = useContext(Context)

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Team-(Aman/Anuj/Ankit).</div>
      <div>
        
        <Link to={"https://www.linkedin.com/in/aman-jain-122361222/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.linkedin.com/in/anuj-daheriya-06015a121?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.linkedin.com/in/ankit-jambhure-98579a269?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BWGrawqXBRuO7ib9quAYKMQ%3D%3D"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.facebook.com/profile.php?id=100030535123397"} target="_blank">
          <FaFacebookF />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
