import React, { useState } from 'react';
import NavBar from "../components/NavBar"; 
import Footer from "../components/Footer"; 
import AnalyzeRecording from "../assets/AnalyzeRecording.png";
import Userguidesignin from "../assets/SignIn.png";
import Userguidecreateaccount from "../assets/Userguidecreateaccount.png";
import Userguideusagelimit1 from "../assets/Userguideusagelimit1.png";
import Userguideusagelimit2 from  "../assets/Userguideusagelimit2.png";
import UploadExplorer from  "../assets/UploadExplorer.png";
import Userguideupdatepassword from "../assets/ChangePassword.jpg";
import Userguidetsa1 from "../assets/Userguidetsa1.png";
import Userguidetsa2 from "../assets/Userguidetsa2.png";
import Userguidereset1 from "../assets/Userguidereset1.png";
import Userguidereset2 from "../assets/Userguidereset2.png";
import Userguidereset3 from "../assets/Userguidereset3.png";
import Userguidepayment1 from "../assets/Userguidepayment1.png";
import Userguidepayment2 from "../assets/Userguidepayment2.png";
import Userguidefillin from "../assets/Userguidefillin.png";
import Userguideeditprofilemenu from "../assets/Userguideeditprofilemenu.png";
import Userguideeditemployee from "../assets/Userguideeditemployee.png";
import Userguideaddemployee from "../assets/Userguideaddemployee.png";
import Userguideemployeelist from "../assets/Userguideemployeelist.png";
import Userguiderecordinglist from "../assets/Userguiderecordinglist.png";
import Userguide3dotmenu from "../assets/Userguide3dotmenu.png";
import Userguidecsamenu from "../assets/Userguidecsamenu.png";
import Userguidemenubutton from "../assets/Userguidemenubutton.png";
import Userguidecompanyfield from "../assets/Userguidecompanyfield.png";
import Userguideeditprofile from "../assets/Userguideeditprofile.png";
import Userguideemotioncards from "../assets/Userguideemotioncards.png";
import Userguideoverallsentiment from "../assets/Userguideoverallsentiment.png";
import Userguideuploadrecording from "../assets/Userguideuploadrecording.png";
import Userguideassignemployee from "../assets/Userguideassignemployee.png";
import RecordingAnalysis1 from "../assets/RecordingAnalysis1.png";
import UploadRecording from "../assets/UploadRecording.png";
import ExistingEmployee from "../assets/ExistingEmployee.png";
import ExistingEmployee2 from "../assets/ExistingEmployee2.png";
import SplitFileName from "../assets/SplitFileName.png";
import SummaryAnalysisTab from "../assets/SummaryAnalysisTab.png";
import SummaryAnalysis1 from "../assets/SummaryAnalysis1.png";
import ViewAnalysis from "../assets/ViewAnalysis.png";

import ScrollToTopButton from "./ScrollToTopButton";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";
import { Upload } from '../assets';

function UserGuide() {
  const navigate = useNavigate();

  const sectionStyle = {
    marginBottom: "1.5rem",
    padding: "1.5rem",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  
  const [activeTab, setActiveTab] = useState('tab1');

  const tabStyle = 'inline-block p-2 border-b-2 rounded-t-lg cursor-pointer';
  const activeTabStyle = 'border-[#7566BB] text-[#7566BB]';

  const tabContentStyle = 'hidden';
  const activeTabContentStyle = 'block';

  const handleTabClick = (tabId) => {
      setActiveTab(tabId);
  };

  return (
    <>
          <NavBar />
          <div className="p-20">
          <h1 className="text-2xl font-bold mb-4">User Guide</h1>
            <div className="flex items-center justify-center mb-4 mt-4">
              <ul className="flex flex-wrap -mb-px text-lg font-medium text-center">
                <li className="mr-16 border-b-2">
                    <button
                    className={`${tabStyle} ${activeTab === 'tab1' ? activeTabStyle : ''}`}
                    onClick={() => handleTabClick('tab1')}
                    >
                    Setup and Accounts
                    </button>
                </li>
                <li className="mr-16 border-b-2">
                    <button
                    className={`${tabStyle} ${activeTab === 'tab2' ? activeTabStyle : ''}`}
                    onClick={() => handleTabClick('tab2')}
                    >
                    Profile Customization
                    </button>
                </li>
                <li className="mr-16 border-b-2">
                    <button
                    className={`${tabStyle} ${activeTab === 'tab3' ? activeTabStyle : ''}`}
                    onClick={() => handleTabClick('tab3')}
                    >
                    Text Sentiment Analyzer
                    </button>
                </li>
                <li className="border-b-2">
                    <button
                    className={`${tabStyle} ${activeTab === 'tab4' ? activeTabStyle : ''}`}
                    onClick={() => handleTabClick('tab4')}
                    >
                    Customer Service Analyzer
                    </button>
                </li>
              </ul>
          </div>

          <br></br>

          <div>
            {/* Setup and Accounts */}
            <div className={`${activeTab === 'tab1' ? activeTabContentStyle : tabContentStyle}`}>
              <section id="setup-accounts" style={{ ...sectionStyle, maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <h2 className="text-xl font-bold mb-2">Setup and Accounts</h2>
              </div>

              {/* Login */}
              <div className="mb-4">
              <h3 id="login" className="text-md font-semibold mb-2">Login</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <div className="flex items-center">
              <div className="w-2/3">
              <br />
              <p>Enter username and password into given boxes.</p>
              <p>If you do not have an account click on "Sign Up".</p>
              </div>
              <div className="w-1/3">
              <img className="border" src={Userguidesignin} alt="User Guide Design"/>
              </div>
              </div>
              </div>


              {/* Create an account */}
              <div className="mb-4">
              <h3 id="create-account" className="text-md font-semibold mb-2">Create an account</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>
              <p>Firstly, enter your "Full Name, Email, Password, and confirmation" then click Continue.</p>
              <p>Next, enter your "Phone Number, Date of Birth and Gender" then click Continue.</p>
              <div style={{ display: "flex", justifyContent: "space-between" }} className="mt-4">
              <img src={Userguidecreateaccount} alt="User Guide Design" className="border mr-2" style={{ height: '300px', width: '400px' }}/>
              <img src={Userguidefillin} alt="User Guide Design" className="border ml-2" style={{ height: '300px', width: '400px' }}/>
              </div>
              </div>


              {/* Reset password */}
              <div className="mb-4">
              <h3 id="reset-password" className="text-md font-semibold mb-2">Reset password</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>

              <div className="flex items-center">
              <div className="w-2/3">
              <br />
              <p>In the login page, click on the "Forgot Password?" text. After that, enter your email and click the "Send" button.</p>
              </div>
              <div className="w-1/3">
              <img className="border" src={Userguidereset1} alt="User Guide Design" />
              </div>
              </div>

              <div className="flex items-center mt-4">
              <div className="w-2/3">
              <br />
              <p>Next, retrieve the verification code from the email you specified and input the code then click the "Next" button.</p>
              </div>
              <div className="w-1/3">
              <img className="border" src={Userguidereset2} alt="User Guide Design" />
              </div>
              </div>

              <div className="flex items-center mt-4">
              <div className="w-2/3">
              <br />
              <p>Lastly, enter a new password for your account then click the "Next" button and proceed to login using your new password.</p>
              </div>
              <div className="w-1/3">
              <img className="border" src={Userguidereset3} alt="User Guide Design" />
              </div>
              </div>
              </div>
              </section>
            </div>

            {/* Profile Customization */}
            <div className={`${activeTab === 'tab2' ? activeTabContentStyle : tabContentStyle}`}>
              <section id="profile-customization" style={{ ...sectionStyle, maxWidth: "800px", margin: "0 auto" }}>
              
              <div style={{ display: "flex", justifyContent: "center" }}>
              <h2 className="text-xl font-bold mb-2">Profile Customization</h2>
              </div>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ flex: 2, textAlign: "left" }}>
              <p>
              Once logged in, to edit your profile:
              <ol>
              <li>Click on the drop-down icon("v") beside your profile picture.</li>
              <li>Click on "View profile".</li>
              </ol>
              </p>
              </div>
              <div style={{ flex: 1 }}>
              <img src={Userguideeditprofilemenu} alt="User Guide Design" style={{ float: "right" }} />
              </div>
              </div>


              
              <h3 id="edit-profile" className="text-md font-semibold mb-2">Edit Profile</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>Replace any information you wish to change, then click the "Save" button.</p><br></br>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="border" src={Userguideeditprofile} alt="User Guide Design" />
              </div>


              <br></br>
              <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
              <h3 className="text-md font-semibold mb-2">Change Password</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>


              <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 2 }}>
              <p>Enter your "Current Password" followed by "New Password", then click on "Save".</p>
              </div>
              <div style={{ flex: 1 }}>
              <img className="border" src={Userguideupdatepassword} alt="User Guide Design" style={{ float: "right" }} />
              </div>
              </div>
              </div>
              </div>

              <br></br>   
              <h3 id="payment-usage" className="text-md font-semibold mb-2">Payment and Usage</h3>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>
              <p>This page allows you to view your monthly/daily usage and manage payment methods.</p>
              <p>What you can do:</p>
              <ul>
              <li className="ml-4">- Set a monthly usage limit.</li>
              <li className="ml-4">- Edit your payment methods.</li>
              </ul>
              <br></br> 
              <h4 className="text-md font-semibold mb-2">Set Usage Limit</h4>
                
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <p>Click the "Set Limits" text then, enter the new usage limit into the text box and click the "Save" button.</p>
              <img className = "border mb-4" src={Userguideusagelimit1} alt="User Guide Design" style={{ height: '150px', width: '400px' }}/>
              <img className="border" src={Userguideusagelimit2} alt="User Guide Design" style={{ height: '230px', width: '400px' }}/>
              </div>

              <br></br> 
              <h4 className="text-md font-semibold mb-2">Edit Payment Method</h4>
              <p>Click on the "Edit" button to change or add your credit card information.</p>
              <div style={{ display: "flex", justifyContent: "center" }} className="py-4">
              <img className="border" src={Userguidepayment1} alt="User Guide Design" style={{ height: '200px', width: '400px' }}/>
              </div>
              <p>Key in your credit card information and click the "Continue" button.</p>
              <div style={{ display: "flex", justifyContent: "center" }} className="py-4">
              <img className="border" src={Userguidepayment2} alt="User Guide Design" style={{ height: '350px', width: '400px' }}/>
              </div>
              </section>
            </div>

            {/* TEXT SENTIMENT ANALYZER */}
            <div className={`${activeTab === 'tab3' ? activeTabContentStyle : tabContentStyle}`}>
              <section id="text-analyzer" style={{ ...sectionStyle, maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <h2 className="text-xl font-bold mb-2">Text Sentiment Analyzer</h2>
              </div>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>
              <p>
              This tool allows us to analyze any text to see the emotional sentiment of it.
              Users will be able to input text from product reviews, social media comments etc.
              </p>
              <p>At the home page under “Solutions” tab click on “Text Sentiment Analyzer”.</p>
              <br></br>
              <p>To analyze, input a text into the left box, then Click the “Analyze” button.</p>
              <br></br>
              <img src={Userguidetsa1} alt="User Guide Design" />
              <br></br>
              
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br></br>
              <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
              <h4 className="text-md font-semibold mb-2">Analyzed Results</h4>
              <img
              src={Userguidetsa2}
              alt="User Guide Design"
              style={{ width: '100%', height: 'auto' }}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div>
              <h3 className="text-md font-semibold mb-2" style={{ textAlign: 'center' }}>Emotion Cards</h3>
              <img src={Userguideemotioncards} alt="User Guide Design" />
              <div style={{ maxWidth: '300px', textAlign: 'left' }}>
              <p>After the analysis is done, various emotion cards will be displayed based on the text given.</p>
              <p>Click on any card/tab so see the emotion</p>
              </div>
              <br></br>
              </div>

              <div>
              <h3 className="text-md font-semibold mb-2" style={{ textAlign: 'center' }}>Overall Sentiment Analysis</h3>
              <img src={Userguideoverallsentiment} alt="User Guide Design" />
              <div style={{ maxWidth: '300px', textAlign: 'left' }}>
              <p>The overall sentiment will also be displayed with an explanation on whether it is a positive, neutral, or negative sentiment.</p>
              </div>
              </div>
              </div>
              </div>
              </section>
            </div>

            
            {/* CUSTOMER SERVICE ANALYZER */}
            <div className={`${activeTab === 'tab4' ? activeTabContentStyle : tabContentStyle}`}>
              <section id="customer-service" style={{ ...sectionStyle, maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
              <h2 className="text-xl font-bold mb-2">Customer Service Analyzer</h2>
              </div>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />

              <p className='mt-4'>
              <p className="text-sm mb-4">** You need to setup a payment method to use this feature</p>
              This tool allows users to upload recordings of a conversation and with the use of DeepPurple,
              we can translate the recording from Speech to Text and analyze the conversation for meaningful insights.</p>
              <p>Users will also be able to manage/view recordings and employees in said recordings.</p><br></br>
              
              
              <p>At the home page under “Solutions” tab click on “Customer Service Analyzer”.</p>
              
              <br></br>

              <h2 id="first-time" className="text-md font-semibold mb-2">First Time Users</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>
              For users who are using this tool for the first time, “Company’s Industry/Field” input is required
              before users can proceed.
              </p>
              <br></br>
              <p>
              Click on the dropbox and select your “Industry/Field”, then, click the “Next” button.
              Users will also be able to change their industry/field in the future under “Profile Customization {'>'} Edit Profile”.
              </p>
              <img className="mt-4 border" src={Userguidecompanyfield} alt="User Guide Design" style={{ height: '250px', width: '400px' }} />
              
              <br />
              <h2 id="navigation" className="text-md font-semibold mb-2">Navigation</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>The Customer Service Analyzer page includes</p>
              <div className="ml-4">
                <p>- Recording List</p>
                <p>- Employee List</p>
                <p>- Summary Analysis</p>
              </div>

              <div className="flex justify-left items-left">
              <p>Click on this menu Button on the right to expand it.</p>
              <img src={Userguidemenubutton} alt="User Guide Design" style={{ height: '50px', width: '50px' }} />
              </div>
              <img className="border" src={Userguidecsamenu} alt="User Guide Design" style={{ height: '250px', width: '250px' }}/>

              <br></br>
              <h2 id="recording-list" className="text-md font-semibold mb-2">Recording List</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>Uploaded recordings can be viewed from this page</p>
              <p>To perform action on the recordings, click on the 3-dot menu button beside one of the recording.</p><br></br>
              
              <p>Users will be able to perform these 3 actions for the recordings:</p>
              <div className="ml-4">
              <p>- View Analysis</p>
              <p>- Delete</p>
              <p>- Download</p>
              </div>

              <img className="border mt-4" src={Userguiderecordinglist} alt="User Guide Design" />

              <br></br>
              <h2 id="upload-recording" className="text-md font-semibold mb-2">Upload Recording</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>Users have the options to upload recording files or a folder.</p>
              <br></br>

              <p>To start, Click the “Add Recording” button on the “Recording List” page, after that, you will be redirected to the "Add Recording" page.</p>

              <img className="border" src={UploadRecording} alt="User Guide Design" />
              <br></br>
              
              <p>In the "Add Recording" page click the "Upload" button and choose either "Select File" or "Select Folder"</p>

              <img className="border mb-4" src={Userguideuploadrecording} alt="User Guide Design" />
              <p className="mb-4">In a short while, a File explorer menu will pop-up, then, choose either a file or folder depending on your choice then click the “Open” button.</p>
              <img className="border mb-4" src={UploadExplorer} alt="User Guide Design" />

              <h2 id="assign-employee" className="text-md font-semibold mb-2">Assign Employee To Recording</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />

              <p>
              Once a recording has been uploaded successfully, you can assign an employee to the recording.
              Under "Configuration" click on the dropdown menu and select one of the options.
              </p>
              <img className="border mb-4 mt-4" src={Userguideassignemployee} alt="User Guide Design" />

              <p>For option existing employee, a text box will pop-up and you can choose an existing employee</p>
              <img className="border mb-4 mt-4" src={ExistingEmployee} alt="User Guide Design" />
              <img className="border mb-4" src={ExistingEmployee2} alt="User Guide Design" />

              <p>For option split file name, The employee name can be collected automatically by defining the delimiter in the file name.</p>
              <p>For example, if your file name standard is Name_RecordingNo_Date, then you can set the delimiter to "_" and set the column to your choice e.g., Column 2.</p>
              <img className="border mb-4 mt-4" src={SplitFileName} alt="User Guide Design" />

              <br></br>
              <h2 id="employee-list" className="text-md font-semibold mb-2">Analyze recordings</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>
              To analyze your recently uploaded recordings, click on the "Analyze" button and the process will starts.</p>
              <img className="border mt-4" src={AnalyzeRecording} alt="User Guide Design" />

              <br></br>
              <h2 id="employee-list" className="text-md font-semibold mb-2">Employee List</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>
              In this page, you can add employee, view the number of calls handled by each of the employee, and the amount of positive/negative sentiments of each call.</p>
              <div className="flex justify-left items-left">
              <p>To perform an action on one of the employee, click on the 3-dot menu button beside one of the employee.</p>
              <img src={Userguide3dotmenu} alt="User Guide Design" />
              </div>
              
              <p>Users will be able to perform these 3 actions for the employee:</p>
              <div className="ml-4">
                <p>- View Calls Handled</p>
                <p>- Edit Name</p>
                <p>- Delete</p>
              </div>
              
              <img className="border mt-4 mb-4" src={Userguideemployeelist} alt="User Guide Design" />

              <h2 className="text-md font-semibold mb-2">Add Employee</h2>
              <p>
              First, Click the “Add Employee” button, then, the "Add Employee" window will pop-up.
              </p>
              <p>second, Enter the employee name into the text box and click the “Add” button.</p>
              <img className="border mt-4 mb-4" src={Userguideaddemployee} alt="User Guide Design" style={{ height: '200px', width: '250px' }}/>

              <h2 className="text-md font-semibold mb-2">Edit Employee Name</h2>
              <p>
              Click on the 3-dot menu button beside one of the employee, then click the “Edit name” button.
              </p>
              <p>A small pop up window will appear, then, key in the new name inside the box.</p>
              <img className="border mt-4 mb-4" src={Userguideeditemployee} alt="User Guide Design" style={{ height: '200px', width: '350px' }}/>

              <h2 id="recording-analysis" className="text-md font-semibold mb-2">Recording Analysis</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p className="mb-4">To view the result of recording analysis, go to Recording List page and choose the action button of a recording followed by "View analysis"</p>
              <img className="border mt-4 mb-4" src={ViewAnalysis} alt="Recording Analysis 1" />
              <p className="mb-4">The recording analysis page contains all the analysis result(Agent name, Summary, Recording sentiment analysis, etc)</p>

              <div className='mb-4'>
                <img className="border" src={RecordingAnalysis1} alt="Recording Analysis 1" />
              </div>
              {/* NOT DONE TO BELOW*/}

              <h2 id="assign-employee" className="text-md font-semibold mb-2">Summary Analysis</h2>
              <hr style={{ border: "none", height: "2px", backgroundImage: "linear-gradient(to right, #8A2BE2, #A020F0)" }} />
              <br />
              <p>
              To view the summary analysis page, click on the "Summary analysis" tab.
              </p>
              <img src={SummaryAnalysisTab} alt="User Guide Design" style={{ height: '250px', width: '200px' }} className='border mt-4 mb-4'/>

              <p>
              The summary analysis page contains, the summary of every call conducted by each employee in a single dashboard.
              The graph and chart shows statistical comparison gathered from the analysis of recordings based on several criteria.
              </p>
              <div className='border mb-4 mt-4'>
                <img src={SummaryAnalysis1} alt="User Guide Design" />
              </div>
              </section>
            </div>
          </div>
      </div>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default UserGuide;
