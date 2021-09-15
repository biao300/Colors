function createBitmapFile(bytes, width, height) {
    const fileSize = bytes.length + 14 + 40;

    let nBytes = new Uint8Array(fileSize);
    if (!width || !height) {
        return nBytes;
    }

    //top
    nBytes[0] = 0x42;//2Bytes, "BM"
    nBytes[1] = 0x4D;
    
    nBytes[2] = fileSize % 256;//4Bytes, BMP file size
    nBytes[3] = fileSize / 256 % 256;
    nBytes[4] = fileSize / 256 / 256 % 256;
    nBytes[5] = fileSize / 256 / 256 /256 % 256;
    
    nBytes[6] = 0;//2Bytes, reserved as 0
    nBytes[7] = 0;
    
    nBytes[8] = 0;//2Bytes, reserved as 0
    nBytes[9] = 0;
    
    nBytes[10] = 0x36; //4Bytes
    nBytes[11] = 0;
    nBytes[12] = 0;
    nBytes[13] = 0;
    
    nBytes[14] = 0x28; //4Bytes
    nBytes[15] = 0;
    nBytes[16] = 0;
    nBytes[17] = 0; 
    nBytes[18] = width % 256; //4Bytes width
    nBytes[19] = width / 256 % 256;
    nBytes[20] = width / 256 / 256 % 256;
    nBytes[21] = width / 256 / 256 /256 % 256; 
    
    nBytes[22] = height % 256; //4Bytes height
    nBytes[23] = height / 256 % 256;
    nBytes[24] = height / 256 / 256 % 256;
    nBytes[25] = height / 256 / 256 /256 % 256; 
    nBytes[26] = 0x01;//
    nBytes[27] = 0x00; 
    nBytes[28] = 0x18;// pixel bits
    nBytes[29] = 0x00; 
    nBytes[30] = 0x00;// 0: no compress, 1: RLE8, 2: RLE4
    nBytes[31] = 0x00; 
    nBytes[32] = 0x00;
    nBytes[33] = 0x00; 
    nBytes[34] = parseInt( width * height * 3) % 256;//RGB content size
    nBytes[35] = parseInt(( width * height * 3) / 256) % 256;
    nBytes[36] = parseInt(( width * height * 3) / 256 / 256) % 256;
    nBytes[37] = parseInt(( width * height * 3) / 256 / 256 /256) % 256;  
    nBytes[38] = 0x60;//4 Bytes
    nBytes[39] = 0x00; 
    nBytes[40] = 0x00;
    nBytes[41] = 0x00; 
    nBytes[42] = 0x60;//4 Bytes
    nBytes[43] = 0x00; 
    nBytes[44] = 0x00;
    nBytes[45] = 0x00; 
    nBytes[46] = 0x00;//4 Bytes
    nBytes[47] = 0x00; 
    nBytes[48] = 0x00;
    nBytes[49] = 0x00;
    nBytes[50] = 0x00;//4 Bytes
    nBytes[51] = 0x00; 
    nBytes[52] = 0x00;
    nBytes[53] = 0x00;

    let a = 0 ;
    for(let i = 0 ; i < height  ; i ++){
        for(let j = 0 ; j < width * 3 ; j ++ ){
            nBytes[54 + a] = bytes[bytes.length - (width * 3 * i) - (width * 3 - j)];
            a ++;
        }
    }

    return nBytes;
}

function createImageWithUniqueColors() {
    let r = g = b = 8;
    let max = 256;

    let imageData = [];
    let index = 0;
    while (r < max - 1 || g < max - 1 || b < max - 1) {
        console.log(`[${index}] ${r}, ${g}, ${b}`);
        imageData.push(r,g,b);
        index ++;
        r += 8;
        if (r === max) {
            r = max - 1;
        } else if (r > max) {
            r = 8;
            g += 8;
            if (g === max) {
                g = max - 1;
            } else if (g > max) {
                g = 8;
                b += 8;
                if (b === max) {
                    b = max - 1;
                }
            }
        }
    }
    // last 255,255,255
    imageData.push(r,g,b);

    return imageData;
}

function getBitmapData(req, res) {
    let data = createImageWithUniqueColors();
    let bmpFile = createBitmapFile(data, 128, 256);

    if (bmpFile.length === 0) {
        return res.status(404).json({message: "failed"});
    }

    const imgData = Buffer.from(bmpFile).toString('base64');

    return res.status(200).json({
        message:'success',
        data: imgData
    });
}

module.exports = {
    getBitmapData
};