const tesseract = require("tesseract.js");
const User = require("../model/user");
const fs = require('fs');
const Jimp = require('jimp');
const axios = require('axios'); 

let debug = true;
exports.recognize = async (req, res) => {
  const { image } = req.body;
    const response = await axios({
      url: image, 
      responseType: 'arraybuffer'
    })
    const imageBuffer = Buffer.from(response.data, 'binary');
    // Sử dụng Jimp để xử lý ảnh
    const jimpImage = await Jimp.read(imageBuffer);
    jimpImage.invert().contrast(0.2).greyscale();
    // Lấy lại buffer sau khi xử lý
    const processedBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
    
    var textRender = await tesseract.recognize(
      processedBuffer, // Dữ liệu ảnh dưới dạng Base64
      "vie", // Ngôn ngữ (Vietnamese)
      {
        logger: (info) => console.log(info)
      } // Logger để in thông tin
    );
    res.send({
      status: true,
      text: textRender.data.text,
    });
  try {
    
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null,
      });
    }
  }
};
