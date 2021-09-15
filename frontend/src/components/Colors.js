import requestApi from "../api/colorApi";
import React, { useState } from 'react';

function Colors() {
    const [imageBase64Data, setImageBase64Data] = useState('');
    const [message, setMessage] = useState('Press button to load image.');
    const [disableButton, setDisableButton] = useState(false);

    const handleClick = () => {
        setImageBase64Data('');
        setMessage('Image loading, please wait...');
        setDisableButton(true);

        requestApi.get('/images').then((res) => {
            setImageBase64Data(res.data.data);
            setMessage('Loading completed.');
            setDisableButton(false);
        });
    }

    return (
        <div className="container">
            {imageBase64Data ? 
                <>
                    <p>{message}</p>
                    <button onClick={handleClick} disabled={disableButton}>Load Image</button>
                    <p><img src={`data:image/png;base64,${imageBase64Data}`} className="color_image" alt="unique colors" /></p>
                </> :
                <>
                    <p>{message}</p>
                    <button onClick={handleClick} disabled={disableButton}>Load Image</button>
                </>
            }
        </div>
    )
}

export default Colors;