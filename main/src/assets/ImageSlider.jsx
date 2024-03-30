import _default from "@mui/material/styles/identifier";
import SimpleImageSlider from "react-simple-image-slider";
import './Image.css'
const images = [
  { url: "src/images/earth.jpg"},
  { url: "src/images/flood.jpg" },
  { url: "src/images/tsunami.jpg" },
  { url: "src/images/hurricane.jpg" },
  { url: "src/images/suhaill.jpg" },
  { url: "src/images/noel.jpg" },
  { url: "src/images/jaison.jpg" },
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