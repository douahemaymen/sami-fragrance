// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
    cloudName: 'dsuzrrti9',
    apiKey: '761258129216488',
    apiSecret: 'WJHlTrXb2fVXIhdgaSARwOP2d-U',
    uploadPreset: 'sami-fragrance', // Vous devrez créer ceci dans Cloudinary
};

// Upload URL for client-side uploads
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

// Helper function to upload image to Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
