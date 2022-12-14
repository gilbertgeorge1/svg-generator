const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const captcha = require('svg-captcha');

// Generate the captcha
const word = 'hello';
const captchaOptions = {
  size: 5,
  noise: 2,
  color: true
};
const captchaData = captcha.create(word, captchaOptions);

// Write the captcha to an SVG file
const filePath = './captcha.svg';
fs.writeFileSync(filePath, captchaData.data);

// Load the SVG file
const svgData = fs.readFileSync(filePath, 'utf8');

// Create a canvas to draw on
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Draw the SVG file on the canvas
loadImage(svgData).then((image) => {
  ctx.drawImage(image, 0, 0);

  // Save the canvas as a JPEG file
  const out = fs.createWriteStream('./captcha.jpeg');
  const stream = canvas.createJPEGStream({
    bufsize: 4096,
    quality: 75
  });
  stream.pipe(out);
  out.on('finish', () => {
    console.log('SVG file converted to JPEG successfully!');
  });
});

