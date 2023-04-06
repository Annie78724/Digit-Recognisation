import React, { useState } from "react";

export default function ImageInput()
{
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
     const handleSubmit=(e)=>{
        e.preventDefault();
     }

    return <form onSubmit={handleSubmit} className="form">
        <label>Upload an image of single digit</label>
        <input type="file" onChange={handleChange} accept="image/*" capture/>
        <img src={file} className="input-image-display"/>
        <button type="submit" className="btn btn-lg btn-danger">Recognise</button>
    </form>
}