// PrivacyPolicy.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4">Privacy Policy</h1>
      
      <section className="mb-4">
        <p>
          SN Data Suite ("us", "we", or "our") operates the https://SNDataSuite.com website (the "Service").
        </p>
        <p>
          This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.
        </p>
        <p>
          We will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
        <p>
          We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at https://SNDataSuite.com
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-danger">DO NOT SAVE SENSITIVE DATA USING THE SAVE FUNCTIONALITY</h3>
      </section>

      <section className="mb-4">
        <h2>Open Source Libraries</h2>
        <p>
          SN Data Suite uses of Open-Source Libraries which is not owned by SN Data Suite ("Open-Source Libraries") and any such Libraries may have their own copyright policies. It is the user's responsibility to ensure compliance with same. Please let us know if we have used any of your library which is not following the standard/Copywrite, we will happily start following or remove the code related to that library.
        </p>
      </section>

      <section className="mb-4">
        <h2>Your Saved Links</h2>
        <p>
          If you want to remove your data from our site, please reach us out using our contact page. Please send us the link and details of the data.
        </p>
      </section>

      <section className="mb-4">
        <h2>Log Data</h2>
        <p>
          We collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.
        </p>
      </section>

      <section className="mb-4">
        <h2>Cookies</h2>
        <p>
          Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
        </p>
        <p>
          SN Data Suite websites specifically uses them to enhance user experiences by remembering preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
      </section>

      <section className="mb-4">
        <h2>Security</h2>
        <p>
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
        </p>
        <p>
          Additional security measures on SN Data Suite websites are enabled by CloudFlare. To achieve this CloudFlare, like SN Data Suite websites, collects non-personal information about users whenever they access SN Data Suite websites and/or other sites on the Internet. These logs may include the browser name, the type of computer and technical information about the means of connection to the site, such as the operating system, the Internet service providers utilized and other similar information.
        </p>
      </section>

      <section className="mb-4">
        <h2>Traffic Analytics</h2>
        <p>
          Traffic analysis and monitoring of SN Data Suite websites is provided by Google Analytics and Clicky Web Analytics. This information is used to direct resources, plan maintenance windows and improve usability. Both Google and Clicky use cookies, in addition Google may use the data it collects to contextualize and personalize the ads of its own advertising network.
        </p>
      </section>

      <section className="mb-4">
        <h2>Advertising</h2>
        <p>
          Please visit <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's Advertising Privacy & Terms</a>
        </p>
      </section>

      <section className="mb-4">
        <h2>Changes To This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </section>
    </Container>
  );
};

export default PrivacyPolicy;