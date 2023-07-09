import { useEffect, useState } from 'react';
import Header from '../components/Header'
import NewsBanner from '../components/NewsBanner'
import Footer from '../components/Footer'



const PrivacyPolicy = () => {
  

 

  return (
    
    <div>
      
      <Header />
      <div className="backgroundMaster mt-20 grid-col m-auto relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16 lg:w-4/5 md:w-4/5">
      <div className="space-y-6 p-8">
  <h1 className="text-3xl font-bold text-center mt-6">Privacy Policy</h1>

  <p>At Weflixx, accessible from www.weflixx.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Weflixx and how we use it.</p>

  <h2 className="text-2xl font-semibold">Log Files</h2>

  <p>Weflixx follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

  <h2 className="text-2xl font-semibold">Cookies and Web Beacons</h2>

  <p>Like any other website, Weflixx uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

  <h2 className="text-2xl font-semibold">Privacy Policies</h2>

  <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Weflixx.</p>

  <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Weflixx, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

  <p>Note that Weflixx has no access to or control over these cookies that are used by third-party advertisers.</p>

  <h2 className="text-2xl font-semibold">Third Party Privacy Policies</h2>

  <p>Weflixx's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

  <h2 className="text-2xl font-semibold">Children's Information</h2>

  <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

  <p>Weflixx does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

  <h2 className="text-2xl font-semibold">Online Privacy Policy Only</h2>

  <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Weflixx. This policy is not applicable to any information collected offline or via channels other than this website.</p>

  <h2 className="text-2xl font-semibold">Consent</h2>

  <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
</div>

     
    </div>
    <Footer />
    </div>
    
  );
};

export default PrivacyPolicy;
