var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duongthuychuong@gmail.com',
    pass: 'kgaykwrkiwmseavv'
  }
});


async function sendMail(emailCustomer, fullName) {
    var mailOptions = {
        from: 'duongthuychuong@gmail.com',
        to: emailCustomer,
        subject: 'HÓA ĐƠN LIKE IT GOT IT',
        html: `<p>Thank <b>${fullName}</b> for participating in the experience program. The products on the Website are completely virtual (not real). Therefore, no orders are created and shipped. Have a good day.</p>`
      };
      try {
        const info = await transporter.sendMail(mailOptions)
        return [null, info]
      } catch (error) {
        return [error, null]
      }
    
      
}
module.exports = {
    sendMail
}