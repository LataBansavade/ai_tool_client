// src/Test.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from '../Navbar/Navbar';
import './ImageReader.css'


function ImageReader() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log("API KEy---->>>",process.env.REACT_APP_GEMINI_API_KEY)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size < 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
      setMessage('');
    } else {
      setMessage("Please upload a JPG or PNG image less than 1MB.");
      setImagePreview('');
    }
  };

  const callMe = async (base64Image) => {
    setLoading(true);  // Start loading
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const imagePayload = {
      inlineData: {
        data: base64Image.split(',')[1], // Remove data:image/jpeg;base64, part
        mimeType: "image/jpeg",
      },
    };

    try {
      let prompt = inputPrompt;
      const result = await model.generateContent([prompt, imagePayload]);
      setMessage(result.response.text());
    } catch (error) {
      console.error(error);
      setMessage("Error processing the image.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image) {
      callMe(image);
    } else {
      setMessage("Please upload a valid image.");
    }
  };

  return (
    <div className="ImageReader">
      <Navbar/>
      {/* <h1 className='heading'>Image Reader</h1> */}
      <h2 className='heading'>Upload your image and ask anything about it—AI will respond promptly!</h2>
      <form onSubmit={handleSubmit} className='formDiv'>
        <input className='imgInput' type="file" accept="image/jpeg" onChange={handleImageUpload} />
        <input className='promptIn' type='text' placeholder='Enter Prompt' onChange={(e) => setInputPrompt(e.target.value)} />
        <button className='btnSubmit' type="submit">Submit</button>
      </form>
      <div className='img-Ans'>
      {imagePreview && <img className='imgPreview' style={{ width:"40%"}}  src={imagePreview} alt="Uploaded preview"  />}
      
      <div className='ansDiv'>
      {
        loading ? (<div className='loader'>...</div>) :(<div className='ansFromAi'>{message}</div>)
      }
      </div>
      </div>
    </div>
  );
}

export default ImageReader;
