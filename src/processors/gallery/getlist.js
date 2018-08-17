const GalleryItem = require("../../model/gallery-item");
const ProcessorResponse = require("../../lib/classes/processor-response");

const getList = (props, skip, limit, cb) => {
	
	GalleryItem
		.find()
		.sort({
			createdon: -1
		})
		.skip(parseInt(skip, 10))
		.limit(parseInt(limit, 10))
		.exec(cb);
};

const processor = (data, cb) => {

	let props = data.props;
	
	getList(props, props.skip, props.limit, (err, gallery) => {

		if (err) {
			console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error getting gallery items."}, 500));
		}

		return cb (new ProcessorResponse(null, gallery));
	});
};

module.exports = processor;