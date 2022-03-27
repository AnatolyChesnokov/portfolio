import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Header,
  Loader,
  Navigation,
  Social,
  Email,
  Footer,
} from "../../../src/components";
import { StyledContent } from "./styled";

const Layout = ({ children, location }) => {
  const isHome = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll("a"));
    if (allLinks.length > 0) {
      allLinks.forEach((link) => {
        if (link.host !== window.location.host) {
          link.setAttribute("rel", "noopener noreferrer");
          link.setAttribute("target", "_blank");
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  const handle = () => setIsLoading(false);

  return (
    <div id="root">
      <Header />
      <div id="root">
        <a className="skip-to-content" href="#content">
          Skip to Content
        </a>

        {isLoading && isHome ? (
          <Loader finishLoading={handle} />
        ) : (
          <StyledContent>
            <Navigation isHome={isHome} />
            <Social isHome={isHome} />
            <Email isHome={isHome} />

            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        )}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
