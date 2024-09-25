const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
    const filePath = req.file.path;
    const { name, ext } = path.parse(req.file.originalname);
    const outputFilePath = path.join(__dirname, `uploads/${name}-resized${ext}`);
    try {
        let image = sharp(filePath);
        let metadata = await image.metadata();
        let buffer = await image.jpeg({ quality: 80 }).toBuffer();
        let quality = 80;
        let resizeFactor = 1; 
        
        // Adjust quality and resize until the image is under 500 KB
        while (buffer.length / 1024 > 500 && (quality > 10 || resizeFactor > 0.5)) {
            if (buffer.length / 1024 > 500 && quality > 10) {
                quality -= 10;
            } else {
                resizeFactor -= 0.1;
            }

            // Calculate new dimensions
            let newWidth = Math.round(metadata.width * resizeFactor);

            buffer = await sharp(filePath)
                .resize({ width: newWidth })
                .jpeg({ quality: quality })
                .toBuffer();
        }

        fs.writeFileSync(outputFilePath, buffer);
        fs.unlinkSync(filePath);

        res.json({
            message: 'Image compressed successfully',
            originalSize: `${(req.file.size / 1024).toFixed(2)} KB`,
            compressedSize: `${(buffer.length / 1024).toFixed(2)} KB`,
            outputFilePath: path.resolve(outputFilePath)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
