import { useEffect, useState } from 'react';
import Header from '../components/Header'
import NewsBanner from '../components/NewsBanner'
import Footer from '../components/Footer'



const TermsConditions = () => {
  

 

  return (
    
    <div>
      
      <Header />
      <div className="backgroundMaster mt-20 grid-col m-auto relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16 lg:w-4/5 md:w-4/5">
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-5 mt-10">Terms and Conditions</h1>

      <p className="mb-5">This Agreement contains the complete terms and conditions that apply to your participation on our site, Weflixx. If you wish to use the site including its tools and services, please read these terms of use carefully. By accessing this site or using any part of the site or any content or services hereof, you agree to become bound by these terms and conditions. If you do not agree to all the terms and conditions, then you may not access the site or use the content or any services in the site.</p>

      <h2 className="text-2xl font-bold mb-3">Modifications of Terms and Conditions</h2>
      <p className="mb-5">Amendments to this agreement can be made and effected by us from time to time without specific notice to your end. Agreement posted on the Site reflects the latest agreement and you should carefully review the same before you use our site.</p>

      <h2 className="text-2xl font-bold mb-3">Use of the site</h2>
      <p className="mb-5">Weflixx allows you to stream, watch and explore online multimedia content. However, you are prohibited to do the following acts, to wit: (a) use our sites, including its services and or tools if you are not able to form legally binding contracts, are under the age of 18, or are temporarily or indefinitely suspended from using our sites, services, or tools (b) post false, inaccurate, misleading, defamatory, or libelous content; (c) take any action that may damage the rating system.</p>

      <h2 className="text-2xl font-bold mb-3">Registration Information</h2>
      <p className="mb-5">For you to complete the sign-up process on our site, you must provide your full legal name, current address, a valid email address, member name and any other information needed in order to complete the signup process. You must qualify that you are 18 years or older and must be responsible for keeping your password secure and be responsible for all activities and contents that are uploaded under your account. You must not transmit any worms or viruses or any code of a destructive nature.</p>
    </div>

     
    </div>
    <Footer />
    </div>
    
  );
};

export default TermsConditions;
