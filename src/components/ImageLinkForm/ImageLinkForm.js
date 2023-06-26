import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className="f3" style={{textAlign:"center"}}>
				{"This Magic Brain will detect faces in your picture. Give it a try!"}
			</p>
			<div style={{display:"flex", justifyContent:"center"}}>
			<div className="pa4 br3 imageLinkButton shadow-5">
				<input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
				<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
			</div>
			</div>
		</div>
		)
}

export default ImageLinkForm;