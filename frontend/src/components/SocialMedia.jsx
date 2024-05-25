import React, { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { client } from "../client";

const SocialMedia = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const query = '*[_type == "socialMediaLinks"]'

    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setSocialMediaLinks(data[0]);
      }
    });
  }, []);

  return (
    <div className="app__social">
      <div>
        <a href= { socialMediaLinks.github } target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>

      <div>
        <a href={ socialMediaLinks.facebook } target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
      </div>

      <div>
        <a href={ socialMediaLinks.instagram } target="_blank" rel="noopener noreferrer">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
