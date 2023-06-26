import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from "./brain.png"

const Logo = () => {
	return (
	      <div className="ma4 mt0">
			<Tilt className="br2 shadow-2">
			  <img src={brain} alt="brain"/>
	    	</Tilt>
		  </div>
		)
}

export default Logo;