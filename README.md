# Image Compression Application

This application allows users to upload an image, which is then compressed to ensure the file size is under 500 KB. The application uses `sharp` to resize and adjust the image quality dynamically until the size requirement is met.

## Features

- Upload an image file through an HTTP POST request.
- Automatically compresses the image to ensure the file size is below 500 KB.
- Dynamically adjusts image quality and dimensions to achieve the desired size.
- Compressed image is saved in the `uploads/` directory with a modified name.
- Original uploaded image is automatically deleted after compression.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [sharp](https://sharp.pixelplumbing.com/) (installed via npm)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    node index.js
    ```

2. The server will run on `http://localhost:3000`.

3. To upload an image for compression, send a POST request to `http://localhost:3000/upload` with the image file attached as form-data under the key `image`.

4. After the upload and processing, the server will return a JSON response with details about the original and compressed image sizes, as well as the path to the compressed image.

### Example CURL Request

```bash
curl -X POST -F 'image=@/path/to/your/image.jpg' http://localhost:3000/upload
