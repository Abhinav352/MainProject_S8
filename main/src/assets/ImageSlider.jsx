import _default from "@mui/material/styles/identifier";
import SimpleImageSlider from "react-simple-image-slider";
import './css/Image.css'
import { Link } from "react-router-dom";
const images = [
  { url: "src/images/earthq.jpg"},
  { url: "src/images/hurri.png" },
  { url: "src/images/tsu.jpg" },
  { url: "src/images/wild.jpg" },
];


const ImageSlider = () => {

  
  return (
    <Link to="/response" >
    <div className="main">
        <div className="inner">
      <SimpleImageSlider
        width={700} 
        height={450}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      </div>
      <div className="inner2">
      <SimpleImageSlider
        width={400} 
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      </div>
    </div>
    </Link>
  );
}
export default ImageSlider;