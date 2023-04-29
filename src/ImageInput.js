import React, { useState } from "react";

export default function ImageInput()
{
    const [file, setFile] = useState("");
    const [number,setNumber]=useState("");
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleChange = async(e) => {
        if(e.target.files.length === 0){
            setFile("");
            return;
        }
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFile(base64);
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/", {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({file : file})
            });
            const data = await response.json();
            if(response.status !== 200){
                throw data;
            }else{
                console.log(data.output);
                setNumber("Your Input is "+data.output)
            }
        }catch(err){
            console.log("Error: " + err.message);
        }
    }

    return <>
        <form onSubmit={handleSubmit} className="form">
        <label>Upload an image of single digit</label>
        <input type="file" onChange={handleChange} accept="image/*" capture/>
        <img src={file} className="input-image-display"/>
        <button type="submit" className="btn btn-lg btn-danger">Recognise</button>
    </form>
        <p className="input">{number}</p>
    </>
}