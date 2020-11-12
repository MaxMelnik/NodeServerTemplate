"use strict";
const nodemailer = require("nodemailer");
const config = require('../config');

async function main(password, email, count=1){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      type: 'OAuth2',
      user: 'sale@sporteducation.online',
      serviceClient: config.client_id, 
      privateKey: config.private_key, 
    }
  });

  try{
    await transporter.verify();

    let msg = `<p>Ваш новый пароль: <b>${password}</b></p>` 

    let info = await transporter.sendMail({
      from: 'Sport Education Online <sale@sporteducation.online>', // sender address
      to: email, // list of receivers
      subject: 'Код подтверждение', // Subject line
      html: msg, // html body
    });

    return `Send password to ${email}`;
  }catch(err){
    if(count<3){
      return await main(password, email, ++count)
    }else{
      throw new Error(`Error send password to ${email}`);
    }
  }
}

module.exports = main;