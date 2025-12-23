onmessage = function(e) {
    const imageDataUrl = e.data;
    const img2 = new Image();
    img2.src = imageDataUrl;
    img2.onload = function() {
        const canvas = new OffscreenCanvas(img2.width, img2.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img2, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          
            const r = data[i];     // Red
            const g = data[i + 1]; // Green
            const b = data[i + 2]; // Blue
            
            const grey = 0.299 * r + 0.587 * g + 0.114 * b;
            data[i] = data[i + 1] = data[i + 2] = grey; 
        };
        ctx.putImageData(imageData, 0, 0);
        postMessage(canvas.convertToDATAURL());
    };
};
