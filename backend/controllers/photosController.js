const db = require("../models");

module.exports = {
	add: function(req, res) {
		db.User.findOne({email: req.body.email})
			.then(user => {
				var photo = {
					image: req.body.image,
      				fileType: req.body.fileType,
      				location: req.body.location,
      				user: user.id
				};
				db.Photo.create(photo)
					.then(createdPhoto => {
						db.User
							.findOneAndUpdate({email:req.body.email},{$push:{photos: createdPhoto.id}})
							.then(updatedUser => res.json(updatedUser))
							.catch(err => {
								if(err) {
									console.log("err adding photo ")
								}
							});
					})
			});
	},
	getWithComments: function(req, res) {
		let photoWithComments = {
			photo: null,
			comments: []
		};
		db.Photo.findOne({id: req.id})
			.then(photo =>{
				getAllComments(photo.comments,0,photoWithComments.comments)
			});

	},
	remove: function(req, res) {
		db.Photo.findOne({id:req.body.id}).then(photo =>{
			photo.remove()
		}).then(photo =>{
			photo.comments.forEach(comment =>{
				db.Comment.findOne({id:comment.id}).then(comment=>{
					comment.remove();
				})
			})
			res.json(photo)
		})

	},
	findByLocation: function(req, res) {
		db.Photo.findOne
	},
	findByLocationAndDate: function(req, res) {

	},
	addComment: function(req, res) {

	},
	removeComment: function(req, res) {

	}
};
function getAllComments(ids, index, comments){
	if(index === ids.length){
		return;
	} else{
		db.Comment.findOne({id: ids[index]})
		.then(comment =>{
			comments.push(comment);
			getAllComments(ids,index+1,comments);
		});
	}
}
function removeAllComments(){
	if(index === ids.length){
		return;
	} else{
		db.Comment.findOne({id: ids[index]})
		.then(comment =>{
			comments.push(comment);
			getAllComments(ids,index+1,comments);
		});
	}
}

//function to calculate if a given location is within a given range
function global_dist(st_lat,st_long,f_lat,f_long, range){
    function degrees_to_radians(degrees){
        var pi = Math.PI;
        return degrees * (pi/180);
    }
	const earth_rad = 6371;
    let ch_lat = Math.abs(f_lat - st_lat);
    ch_lat = degrees_to_radians(ch_lat);
    let ch_long = Math.abs(f_long- st_long);
    ch_long = degrees_to_radians(ch_long);
	
	const a = Math.pow(Math.sin(ch_lat/2),2) + 
	(Math.cos(st_lat)*Math.cos(f_lat)*Math.pow(Math.sin(ch_long/2),2));

	const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    const ans = earth_rad * c;
    console.log("location a is ",ans,"km away from location b");
	if (ans <= range){
        console.log(true);
		return true;
	} else {
        console.log(false);
		return false;
	}
}