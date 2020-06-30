const Blog = require("../models/blog");

module.exports.create = (req, res) => {
    let { title, content, name, profileImg, country } = req.body.blog;
    let blog = new Blog({
        title: title,
        content: content,
        name: name,
        profileImg: profileImg,
        country: country,
    });
    blog.save().then(dbRes => {
        res.send({ sucess: true, data: { comment: "Blog " + title + " created with ID " + dbRes._id } });
    }).catch(err => {
        res.send({ sucess: false, data: { reason: err } });
    })
};

module.exports.read = (req, res) => {
    let { name } = req.body;
    let params = { name: name ? name : null };
    Blog.find(params).then(dbRes => {
        res.send({ sucess: true, data: { blogs: dbRes, comment: "Blogs" } });
    }).catch(err => {
        res.send({ sucess: false, data: { reason: err } });
    })
}

module.exports.update = (req, res) => {
    let { title, content, name, profileImg, country } = req.body.blog;
    let updates = {
        title: title,
        content: content,
        name: name,
        profileImg: profileImg,
        country: country,
    }
    Blog.findOne({ _id: id }).then(dbRes => {
        updates.title = title ? title : dbRes.title;
        updates.content = content ? content : dbRes.content;
        updates.name = name ? name : dbRes.name;
        updates.profileImg = profileImg ? profileImg : dbRes.profileImg;
        updates.country = country ? country : dbRes.country;
        Blog.updateOne({ _id: id }, { $set: updates }).then(dbRes => {
            res.send({ sucess: true, data: { comment: "Blog Updated with Id " + dbRes._id + " Successfully" } });
        }).catch(err => {
            res.send({ sucess: false, data: { reason: err } });
        });
    });
}

module.exports.delete = (req, res) => {
    let { id } = req.body;
    Blog.deleteOne({ _id: id }, { justOne: true }).then(() => {
        res.send({ sucess: true, data: { comment: "Blog Deleted Successfully" } });
    }).catch(err => {
        res.send({ sucess: false, data: { reason: err } });
    })
};

