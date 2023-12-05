'use client';

import React from 'react';

import {Input} from './input';

const ImageInputCloudinary = ({
  onChange,
}: {
  onChange: (imageUrl: string) => void;
}) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/image_upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url); // Pass the URL to the onChange function
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return <Input type="file" accept="image/*" onChange={handleImageUpload} />;
};

export default ImageInputCloudinary;
