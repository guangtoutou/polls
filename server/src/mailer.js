import nodemailer from 'nodemailer';

function setup() {
  return {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '87c15882945934',
      pass: '5b610a3d3963ef'
    }
  };
}
export const sendConfirmationEmail = user => {
  let transporter = nodemailer.createTransport(setup());

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: `Hello ${user.username} ${user.generateConfirmationURL()} world?`, // plain text body
    html: `<b>Hello ${
      user.username
    }, Welcome to Bookworm. Please <a href='${user.generateConfirmationURL()}'>activate your account</a>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

export const sendResetPasswordEmail = user => {
  let transporter = nodemailer.createTransport(setup());

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Reset Password', // Subject line
    text: `Hello ${user.username} ${user.generateResetPasswordURL()} world?`, // plain text body
    html: `<b>Hello ${
      user.username
    }, Welcome to Bookworm. Please <a href='${user.generateResetPasswordURL()}'>reset your password</a>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};
