const nodemailer = require('nodemailer');
const config = require('../utils/mant');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// Exemplo de envio de e-mail
const mailOptions = {
  from: config.email.from,
  to: user.email,
  subject: 'Recuperação de Senha',
  text: 'Link para recuperação de senha: ...',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Erro ao enviar e-mail:', error);
  } else {
    console.log('E-mail enviado:', info.response);
  }
});
