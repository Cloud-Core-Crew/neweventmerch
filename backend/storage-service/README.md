# EventMerch Storage Service

This document provides an overview of the Storage Service within the EventMerch application, which is responsible for handling image uploads to AWS S3.

## Overview

The Storage Service allows users to upload images related to events and merchandise. It utilizes AWS S3 for storage, ensuring that images are securely stored and easily accessible.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd EventMerch/backend/storage-service
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root of the storage-service directory and add the following variables:
   ```
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   S3_BUCKET_NAME=your_bucket_name
   S3_REGION=your_region
   PORT=your_port
   ```

4. **Start the Service**
   To start the storage service, run:
   ```bash
   npm start
   ```

## API Endpoints

### Upload Image
- **Endpoint:** `POST /api/storage/upload`
- **Description:** Uploads an image to S3.
- **Request Body:** Form-data containing the image file.

### Example Request
```bash
curl -X POST http://localhost:YOUR_PORT/api/storage/upload -F "image=@path_to_your_image"
```

## Dependencies
- `express`: Web framework for Node.js.
- `multer`: Middleware for handling `multipart/form-data`, used for uploading files.
- `aws-sdk`: AWS SDK for JavaScript, used to interact with S3.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

# Storage Service

Handles file and image uploads to AWS S3 for EventMerch.

## Endpoints
- `POST /api/storage/upload` — Upload file/image to AWS S3

## Env Variables
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `S3_REGION` — AWS S3 credentials
- `PORT` — Service port