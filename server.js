const wa = require('@open-wa/wa-automate');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
var whatsappi= null;
app.use(express.urlencoded({
  extended:true
}))
app.get('/',(req,res)=>{
  res.sendFile('public/index.html',{
    root:__dirname
  }) 
});

app.post('/sendMessege', async(req,res)=>{
  var status = 0;
  var message = null;
  var phone = req.body.phone;
  var pesan = req.body.pesan;
  if (phone) {
    // var pesan ='Verifikasi kode register '+Math.floor(Math.random() * 10000);
    await whatsappi.sendText(phone+'@c.us', pesan).then((respon)=>{
      status=1;
      message="Berhasil Dikirim";
    }).catch((err)=>{
      message="Ada Error"+err;
    });  
  }
  res.status(200).json({
    status:status,
    message:message,

  }) 
});

app.post('/sendFileFromUrl', async(req,res)=>{
  var status = 0;
  var message = null;
  var phone = req.body.phone;
  var url = req.body.url;
  var caption = req.body.caption;
  if (phone) {
    // var pesan ='Verifikasi kode register '+Math.floor(Math.random() * 10000);
    await whatsappi.sendFileFromUrl(phone+'@c.us', url, '', caption).then((respon)=>{
      status=1;
      message="Berhasil Dikirim";
    }).catch((err)=>{
      message="Ada Error"+err;
    });  
  }
  res.status(200).json({
    status:status,
    message:message,

  }) 
});
app.post('/sendImage', async(req,res)=>{
  var status = 0;
  var message = null;
  var phone = req.body.phone;
  var url = req.body.url;
  var caption = req.body.caption;
  if (phone) {
    // var pesan ='Verifikasi kode register '+Math.floor(Math.random() * 10000);
    await whatsappi.sendFileFromUrl(phone+'@c.us', url, '', caption).then((respon)=>{
      status=1;
      message="Berhasil Dikirim";
    }).catch((err)=>{
      message="Ada Error"+err;
    });  
  }
  res.status(200).json({
    status:status,
    message:message,

  }) 
});

wa.create().then(client => start(client));
// wa.create({
//   sessionId: "COVID_HELPER",
//   multiDevice: true, //required to enable multiDevice support
//   authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
//   blockCrashLogs: true,
//   disableSpins: true,
//   headless: true,
//   hostNotificationLang: 'PT_BR',
//   logConsole: false,
//   popup: true,
//   qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
// }).then(client => start(client));

function start(client) {
  whatsappi = client;
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });
}

server.listen(8087, console.log('Berhasil Masuk'));
