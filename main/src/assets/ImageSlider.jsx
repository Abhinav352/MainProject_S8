import _default from "@mui/material/styles/identifier";
import SimpleImageSlider from "react-simple-image-slider";
import './Image.css'
const images = [
  { url: "src/images/earthq.jpg"},
  { url: "src/images/hurri.png" },
  { url: "src/images/tsu.jpg" },
  { url: "src/images/wild.jpg" },
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