import _default from "@mui/material/styles/identifier";
import SimpleImageSlider from "react-simple-image-slider";
import './Image.css'
const images = [
  { url: "src/images/Earthquake.jpg"},
  { url: "src/images/Flood.jpg" },
  { url: "src/images/Tsunami.webp" },
  { url: "src/images/Hurricane.jpg" },
];


const ImageSlider = () => {
  return (
    <div className="main">
        <div className="inner">
      <SimpleImageSlider
        width={496} 
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      </div>
      <div className="inner2">
      <SimpleImageSlider
        width={296} 
        height={200}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      </div>
    </div>
  );
}
export default ImageSlider;