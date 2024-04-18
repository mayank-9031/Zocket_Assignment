import React, { useState, useRef } from "react";

const App = () => {
  const [textData, setTextData] = useState({
    caption: "",
    cta: "",
  });
  const [bgColor, setBgColor] = useState("rose-400");
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const handleChange = (e) => {
    setTextData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleColorChange = (e) => {
    setBgColor(e.target.value);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // Store the image data in the state
        drawImageOnCanvas(event.target.result); // Draw the image
      };
      reader.readAsDataURL(file);
    }
  };
  const drawImageOnCanvas = (imageData) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fit the image onto the canvas, maintaining aspect ratio
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = imageData;
  };
  return (
    <div className="flex w-full h-[95%] bg-gray-200">
      <div className="w-[45%] h-full flex flex-col justify-center items-center">
        <div
          className={` relative w-[80%] h-[75%] flex flex-col items-center justify-center`}
          style={{ backgroundColor: bgColor }}
        >
          <canvas
            ref={canvasRef}
            className="bg-gray-200 absolute top-[9%] left-[9%] imageUpload"
            height={1080}
            width={1080}
            style={{ height: 400, width: 400 }}
          ></canvas>
          <p className="text-left text-black break-words w-[25ch] absolute bottom-[20%] left-[12%] font-medium">
            {textData.caption}
          </p>
          <p
            className="text-left break-words absolute bottom-[22%] right-[13%] py-[4px] px-[8px] rounded bg-white font-semibold"
            style={{ color: bgColor }}
          >
            {textData.cta}
          </p>
        </div>
      </div>
      <div className="w-[55%] h-full bg-white">
        <div className="flex flex-col items-center m-12">
          <h1 className="font-bold text-xl">Ad customization</h1>
          <p className="text-gray-400">
            Customize your ad and get the template accordingly
          </p>
          <div className="text-center my-8">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
          </div>

          <form className="w-full text-center">
            <fieldset className=" flex flex-col border-t-2">
              <legend className="text-gray-400 p-2">Edit contents</legend>
              <input
                type="text"
                className="border-2 py-2 px-4 rounded-md mt-6 font-normal focus:border-0 text-xl"
                onChange={handleChange}
                name="caption"
              />
              <input
                type="text"
                className="border-2 py-2 px-4 rounded-md mt-6 font-normal focus:border-0 text-xl"
                onChange={handleChange}
                name="cta"
              />
              <div className="text-left text-gray-400 mt-6 mb-2 text-sm">
                Choose your color
              </div>
              <input
                type="color"
                name="bgColor"
                id="bgColor"
                className="rounded-[50%]"
                onChange={handleColorChange}
                value={bgColor}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
