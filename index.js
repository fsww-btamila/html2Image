const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const app = express();


const url = require('url');
const nodeHtmlToImage = require('node-html-to-image');
 
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.set('ManiRoute', ""); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
  
  next();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HTML-IMAGE-PDF." });
});

const moment = require("moment");
const fs = require("fs");
app.post("/htmltoimage", (request, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let reqParam = request.body;
  console.log("Welcome.....");
  console.log("reqParam",reqParam);

  var resultObj = {};
  const htmlData = reqParam.htmlData;
  const fileName = reqParam.fname;
  // const type = reqParam.type;

  
  nodeHtmlToImage({
    html: htmlData
  }).then((buffer) => {
    const base64Image = new Buffer.from(buffer).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;
    console.log("----", base64Image);

    var utc = (moment.utc()).valueOf();
    var path = 'tmp/image/';
    var fname = 'fileName' +'_'+utc+'.jpeg';
    var fileLocation = path + fname;

    fs.writeFile(fileLocation, base64Image, 'base64', function(err) {
          if (err) { console.log(err) } else {
          console.log("Image Uploaded successfully..")

          }
    });

    resultObj = {
          'Msg':'Image Jpeg created successfully...',
          'image':dataURI,
          'base64':base64Image

    }
    console.log('The images were created successfully!');
    return res.json(resultObj);
  });

});

const htmlPdfNode = require('html-pdf-node');

 app.post("/htmltopdf", (request, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      let reqParam = request.body;
      console.log("Welcome.....");
      console.log("reqParam",reqParam);

      var resultObj = {};
      const htmlData = reqParam.htmlData;
      const fileName = reqParam.fname;
      // const type = reqParam.type;

      let options = { format: 'A4' };
      // Example of options with args //
      // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

      let file = { content: htmlData };

      htmlPdfNode.generatePdf(file, options).then(pdfBuffer => {
      
        const base64Image = new Buffer.from(pdfBuffer).toString('base64');
        const dataURI = 'data:application/pdf;base64,' + base64Image;

        var utc = (moment.utc()).valueOf();
        var path = 'tmp/pdf/';
        var fname = 'fileName' +'_'+utc+'.pdf';
        var fileLocation = path + fname;

        fs.writeFile(fileLocation, base64Image, 'base64', function(err) {
              if (err) { console.log(err) } else {
              console.log("PDF Uploaded successfully..")

              }
        });

        resultObj = {
              'Msg':'PDF created successfully...',
              'image':dataURI,
              'base64':base64Image

        } 
        return res.json(resultObj);
      });

      

});

<<<<<<< HEAD
 app.post("/img", async (request, res) => {
=======
app.post("/img", async(request, res) => {
>>>>>>> f116dc02cf74905cc9d875ab1fa565346b501dc0
      res.setHeader('Access-Control-Allow-Origin', '*');
      let reqParam = request.body;
      console.log("Welcome.....");
      console.log("reqParam",reqParam);

      var resultObj = {};
      const htmlData = reqParam.htmlData;
      const fileName = reqParam.fname;
      // const type = reqParam.type;

      let options = { format: 'A4' };
      // Example of options with args //
      // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

      let file = { content: htmlData };

      const image = await nodeHtmlToImage({
<<<<<<< HEAD
        html: '<html><body><div>Check out what I just did! #cool நிகழ்வுகள்</div></body></html>'
      });
=======
        html: '<html><body><div>Check out what I just did! #cool தமிழ்நாட்டின் அன்றாட நிகழ்வுகள்</div></body></html>'
      });
 
     
>>>>>>> f116dc02cf74905cc9d875ab1fa565346b501dc0


      const base64Image = new Buffer.from(image).toString('base64');
      const dataURI = 'data:image/jpeg;base64,' + base64Image;

      var utc = (moment.utc()).valueOf();
      var path = 'tmp/pdf/';
      var fname = 'fileName' +'_'+utc+'.jpeg';
      var fileLocation = path + fname;

      fs.writeFile(fileLocation, base64Image, 'base64', function(err) {
            if (err) { console.log(err) } else {
<<<<<<< HEAD
            console.log("PDF Uploaded successfully..")
=======
            console.log("IMAGE Uploaded successfully..")
>>>>>>> f116dc02cf74905cc9d875ab1fa565346b501dc0

            }
      });

      resultObj = {
            'Msg':'PDF created successfully...',
            'image':dataURI,
            'base64':base64Image

      } 
      return res.json(resultObj);
<<<<<<< HEAD

      
});
=======
});

>>>>>>> f116dc02cf74905cc9d875ab1fa565346b501dc0
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
