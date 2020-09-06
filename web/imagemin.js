const imagemin = require('imagemin');
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
    await imagemin(['images/*.{jpg,png}'], {
        destination: 'public/images',
        plugins: [
            imageminMozJpeg({
                quality: 60
            }),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
})();