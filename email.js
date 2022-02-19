const nodemailer = require('nodemailer');

function enviarEmail(destinatario, asunto, mensaje) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hhhh2222223@gmail.com',
      pass: "hhh111111",
    }
  })

  const options = {
    from: 'hhhh2222223@gmail.com',
    to: destinatario,
    subject: asunto,
    html: mensaje
  }

  transporter.sendMail(options, function() {
    console.log('Correo enviado');
  })
}

module.exports = enviarEmail
