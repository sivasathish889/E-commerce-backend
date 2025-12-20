import mailSender from "nodemailer"

const mailSend =async (mail: string, sub : string, text : string)=>{
    const transport = mailSender.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
    })
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: mail,
        subject: sub,
        text: text,
    }
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = mailSend