const Rank = ({name, entries}) => {
	return (
		<div>
			<div className="f4 f3-m f3-l white">
				{`${name}, your current entry count is...`}
			</div>
			<div className="f2 f1-m f1-l white">
				{entries}
			</div>
		</div>
		)
}

export default Rank;