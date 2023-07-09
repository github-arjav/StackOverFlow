import React, { useRef } from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import "./ChatBot.css";



const configuration = new Configuration({
  organization: "org-0F0sruWUXkcZSJeoFYNI2wv5",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const ChatBot = () => {


  const emailRef = useRef()

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [inputFeild, setInputFeild] = useState({
    otpcode: ''
  });

  const inputHandler= (e) => {
    setInputFeild({ ...inputFeild, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!isOtpSent) {
      try {
        let url = 'https://stack-overflow-ce16.onrender.com/otp/email-send'
        let options = {
          method: 'POST',
          url:url,
          data:{email:emailRef.current.value}
        }
        let response = await axios(options)
        let record = response.data
        toast.success('Check your email')
        setIsOtpSent(true)
      } catch (error) {
        toast.error('Invalid Email')
      }
    } else{
      let url = 'https://stack-overflow-ce16.onrender.com/otp/verify-otp'
      let options = {
        method: 'POST',
        url:url,
        data: {email: emailRef.current.value, otpcode: inputFeild.otpcode}
      }
      try {
        let response = await axios(options)
        setIsVerified(true)
      } catch (error) {
        toast.error('Incorrect OTP')
      }
    }
  }

  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are ProgrammingGPT. You help with solving programming related doubts.",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Chatbot">
      {isVerified ? (
        <>
          <h1 className="h1">
            Programming<span className="span">GPT</span>
          </h1>
          <section>
            {chats && chats.length
              ? chats.map((chat, index) => (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : "assistant"}
                  >
                    <span className="key">
                      {chat.role === "user" ? "U" : "A"}
                    </span>
                    <span className="key">:</span>
                    <span className="response">{chat.content}</span>
                  </p>
                ))
              : ""}
          </section>

          <div className={isTyping ? "typing" : "hide"}>
            <p>
              <i>{isTyping ? "Typing" : ""}</i>
            </p>
          </div>

          <form className="doubt-form" onSubmit={(e) => chat(e, message)}>
            <input
              className="doubt"
              type="text"
              name="message"
              value={message}
              placeholder="Type a message and hit enter"
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </>
      ) : (
        <div className="main-container">
          <div className="form-container">
          <h2>
            Welcome to{" "}
            <b>
              Programming<span>GPT</span>
            </b>
          </h2>
          <p>To use ProgrammingGPT, first verify your email address</p>
          <form className="verification-form" onSubmit={handleSubmit}>
            <ToastContainer/>
            <label htmlFor="email">
              <input
                ref={emailRef}
                className="otp-input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your registered email address..."
              />
            </label>
            {isOtpSent && (
              <label htmlFor="otp">
                <input
                  className="otp-input otp-input-2"
                  type="text"
                  name="otpcode"
                  id="otp"
                  placeholder="Enter the OTP"
                  maxLength='4'
                  value={inputFeild.otpcode}
                  onChange={inputHandler}
                />
              </label>
            )}
            <br/>
            <input
              type="submit"
              value={isOtpSent ? "Submit" : "Send OTP"}
              className="otp-btn"
            />
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
