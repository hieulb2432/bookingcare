require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <hieu.lb2432@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thong tin dat lich kham benh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
      result = `<h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on Bookingcare</p>
      <p>Information to schedule an appointment:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>
      <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
      <div>Sincerely thank!</div>
    `;
    }
    if (dataSend.language === 'vi') {
      result = `<h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
      <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
      <div>Xin chân thành cảm ơn!</div>
    `;
    }
    return result;
  };

  let getBodyHTMLRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
      result = `<h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on Bookingcare</p>
      <p>appointment:</p>
      <div>Sincerely thank!</div>
    `;
    }
    if (dataSend.language === 'vi') {
      result = `<h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
      <p>Thông tin hoa don:</p>
      <div>Xin chân thành cảm ơn!</div>
    `;
    }
    return result;
  }

  let sendAttachment = async (dataSend) => {
    return new Promise(async(resolve, reject) => {
      try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <hieu.lb2432@gmail.com>', // sender address
          to: dataSend.email, // list of receivers
          subject: "Ket qua kham benh", // Subject line
          html: getBodyHTMLRemedy(dataSend), // html body
          attachments: {   // encoded string as an attachment
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: 'base64',
        },
        });
        console.log('check infor send email', info)
        resolve();
      } catch (e) {
        reject(e);
      }
    
    
  })
  }

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}