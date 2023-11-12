const tesseract = require('tesseract.js');
const User = require("../model/user");

let debug = true;
exports.recognize = async (req, res) => {
  try {
    const { image } = req.body;
    var textRender = await tesseract.recognize(
        image, // Dữ liệu ảnh dưới dạng Base64
        'vie',        // Ngôn ngữ (Vietnamese)
        { logger: info => console.log(info) } // Logger để in thông tin
    )
    res.send({
      status: true,
      text: textRender.data.text,
    });
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