import express from 'express'
import { emailSend, verifyOtp } from '../controllers/otp.js';

const router = express.Router();

router.post('/email-send', emailSend)

router.post('/verify-otp', verifyOtp)

export default router