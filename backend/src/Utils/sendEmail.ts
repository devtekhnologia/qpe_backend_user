import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const otpCache: { [email: string]: { otp: string; expirationTime: number } } = {};

// Utility function to send an email using Mailtrap SMTP
// const sendMailtrapEmail = async (
//   to: string, 
//   subject: string, 
//   text: string, 
//   html: string
// ): Promise<void> => {
//   try {
//     // Create a transporter using Mailtrap SMTP credentials
//     const transporter: Transporter = nodemailer.createTransport({
//       host: process.env.MAILTRAP_HOST,       // Mailtrap SMTP host
//       port: parseInt(process.env.MAILTRAP_PORT || '587'),  // Mailtrap SMTP port
//       auth: {
//         user: process.env.MAILTRAP_USER,   // Mailtrap username
//         pass: process.env.MAILTRAP_PASS,   // Mailtrap password
//       },
//     });

//     // Setup email options
//     const mailOptions: SendMailOptions = {
//       from: process.env.FROM_EMAIL,     // Sender email (can be any email)
//       to: to,                           // Recipient email
//       subject: subject,                 // Subject of the email
//       text: text,                       // Plain text body
//       html: html,                       // HTML body (optional)
//     };

//     // Send the email using Mailtrap
//     await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending Email:', error);
//     throw new Error('Failed to send Email');
//   }
// };

// Utility function to send an email using Gmail SMTP
const sendGmailEmail = async (
  to: string, 
  subject: string, 
  text: string, 
  html: string
): Promise<void> => {
  try {
    // Create a transporter using Gmail's SMTP credentials
    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',   // Gmail SMTP service
      auth: {
        user: process.env.GMAIL_USER,     // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password (not regular Gmail password)
      },
    });

    // Setup email options
    const mailOptions: SendMailOptions = {
      from: process.env.FROM_EMAIL,     // Sender email (your Gmail address)
      to: to,                           // Recipient email
      subject: subject,                 // Subject of the email
      text: text,                       // Plain text body
      html: html,                       // HTML body (optional)
    };

    // Send the email using Gmail
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending Email:', error);
    throw new Error('Failed to send Email');
  }
};

const storeOtpInMemory = (email: string, otp: string, expiryInMs: number = 600000): void => {
  otpCache[email] = { otp, expirationTime: Date.now() + expiryInMs };
  console.log(`OTP stored for ${email}:`, otpCache[email]);
};

const checkOtpInMemory = (email: string): string | null => {
  const otpData = otpCache[email];

  // Check if OTP exists and if it has not expired
  if (otpData && Date.now() <= otpData.expirationTime) {
    return otpData.otp;  // Return OTP if it's valid
  }

  // If OTP is expired or doesn't exist, delete it from the cache and return null
  delete otpCache[email];
  return null;
};

// Function to send the otp on email
const sendOtpToEmail = async (email: string, otp: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Export both Mailtrap and Gmail email sending functions
export { sendGmailEmail, sendOtpToEmail, storeOtpInMemory, checkOtpInMemory, otpCache };

// sendMailtrapEmail