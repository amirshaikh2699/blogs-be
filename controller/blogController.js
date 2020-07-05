const Blog = require("../models/blog");

module.exports.create = (req, res) => {
    let { title, content, firstname, lastname, blogimage } = req.body;
    let blog = new Blog({
        title: title,
        content: content,
        name: firstname + " " + lastname,
        blogimage: blogimage,
        country: "india",
    });
    blog.save().then(dbRes => {
        res.send({ success: true, data: { message: "Blog " + title + " created with ID " + dbRes._id } });
    }).catch(err => {
        res.send({ success: false, data: { reason: err } });
    })
};

module.exports.read = (req, res) => {
    Blog.find().then(dbRes => {
        res.send({ success: true, data: { blogs: dbRes, comment: "Blogs" } });
    }).catch(err => {
        res.send({ success: false, data: { reason: err } });
    })
}

module.exports.update = (req, res) => {
    let { _id, title, content, firstname, lastname, blogimage } = req.body;
    let updates = {
        title: title,
        content: content,
        name: firstname + " " + lastname,
        blogimage: blogimage,
    }
    Blog.findOne({ _id: _id }).then(dbRes => {
        updates.title = title ? title : dbRes.title;
        updates.content = content ? content : dbRes.content;
        updates.name = (firstname && lastname) ? (firstname + " " + lastname) : dbRes.name;
        updates.blogimage = blogimage ? blogimage : dbRes.blogimage;
        Blog.updateOne({ _id: _id }, { $set: updates }).then(dbRes => {
            if (dbRes.nModified != 0) {
                res.send({ success: true, data: { message: "Blog Updated Successfully" } });
            } else {
                res.send({ success: false, data: { message: "Not updated" } });
            }
        }).catch(err => {
            res.send({ success: false, data: { reason: err } });
        });
    });
}

module.exports.delete = (req, res) => {
    let { _id } = req.body;
    console.log(req.body)
    Blog.deleteOne({ _id: _id }, { justOne: true }).then((dbRes) => {
        console.log(dbRes)
        if(dbRes.deletedCount===1){
            res.send({ success: true, data: { message: "Blog Deleted Successfully" } });
        } else {
            res.send({ success: false, data: { message: "failed to delete" } });
        }
    }).catch(err => {
        res.send({ success: false, data: { reason: err } });
    })
};

