import mongoose from "mongoose";
import Otp from "../models/otp.js";
import Users from "../models/auth.js";
import nodemailer from 'nodemailer'
export const emailSend = async (req, res) => {
    const data = await Users.findOne({email: req.body.email})
    if(data){
        let otpcode = Math.floor((Math.random()*10000)+1)
        let otpData = new Otp({
            email: req.body.email,
            code: otpcode
        })
        let otpRespose = await otpData.save()
        mailer(req.body.email, otpcode)
        res.status(200).json({message: "Success"})
    } else {
        res.status(404).json({message: "email id not found"})
    }
}

export const verifyOtp = async (req, res) => {
    const data = await Otp.findOne({email:req.body.email, code:req.body.otpcode})
    if(data) {
        res.status(200).json({message: "OTP Verified Succesfully"})
    } else {
        res.status(400).json({mesaage: "OTP incorrect"})
    }
}

const mailer = (email, otpcode) => {
    var transporter = nodemailer.createTransport({
        service:'gmail',
        port: process.env.PORT || 5000,
        secure: false,
        auth: {
            user: 'programming.gpt@gmail.com',
            pass: 'qjgeadnfdtzghetx'
        }
    })

    var mailOptions = {
        from: 'programming.gpt@gmail.com',
        to: email,
        subject: 'OTP for accesing ProgrammingGPT',
        text: `Welcome to ProgrammingGPT, an AI chatbot by StackOVerflow to solve your programming related doubts.
        ${otpcode} is the OTP to access ProgrammingGPT. \n 
        Enjoy your experience \n\n
        Regards: 
         Arjav Jain`
    }

    transporter.sendMail(mailOptions), function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent' + info.response);
        }
    }
}