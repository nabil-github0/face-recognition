import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onButtonSubmit, onKeySubmit, clarifaiApiError}) => {
	return (
		<div>
			<div>
			<p className="f4 f3-m f3-l" style={{textAlign:"center"}}>
				{"This Magic Brain will detect faces in your picture. Give it a try!"}
			</p>
			<div style={{display:"flex", justifyContent:"center"}}>
			<div className="pa4 br3 imageLinkButton shadow-5">
				<input id="inputField" type="text" className="f5 f4-m f4-l pa2 w-60 w-70-m w-70-l center" onChange={onInputChange} onKeyDown={onKeySubmit}/>
				<button className="w-40 grow w-30-m w-30-l f5 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
			</div>
			</div>
		</div>
			<p className="f6 red db">{clarifaiApiError}</p>
		</div>
		)
}

export default ImageLinkForm;