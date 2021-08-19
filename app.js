var express = require("express");
var path = require("path");
var QRCode = require("qrcode");
const os = require("os");
var app = express();

app.get("/qr-code.png", function(req, res) {
  const payload = req.query.payload;
  console.log(payload);

  // Randomize this with user-id & timestamp
  const fileName = path.join(os.tmpdir(), "qrimage.png");
  QRCode.toFile(
    fileName,
    payload,
    {
      errorCorrectionLevel: "L",
      type: "png"
    },
    error => {
      if (error) {
        throw error;
      }
      res.sendFile(fileName);
    }
  );
});

module.exports = app;
