const brevo = require('@getbrevo/brevo');

const sendMail = async (receiver_email, receiver_name, subject, content) => {

  let apiInstance = new brevo.TransactionalEmailsApi();

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `<html><body><h1>${subject}</h1>${content}</body></html>`;
  sendSmtpEmail.sender = { "name": `${process.env.SENDER_NAME}`, "email": process.env.SENDER_EMAIL };
  sendSmtpEmail.to = [
    { "email": `${receiver_email}`, "name": `${receiver_name}` }
  ];
  sendSmtpEmail.replyTo =  { "email": `${receiver_email}`, "name": `${receiver_name}` };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


try {
  await apiInstance.sendTransacEmail(sendSmtpEmail);
  return;
} catch (error) {
  throw error;
}

}
module.exports = sendMail;