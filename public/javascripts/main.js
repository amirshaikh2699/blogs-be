
function createBlog(blog) {
    let div0 = document.createElement("div");
    let img = document.createElement("img");
    let div1 = document.createElement("div");
    let h5 = document.createElement("h5");
    let p0 = document.createElement("p");
    let p1 = document.createElement("p");

    div0.className = "card mb-3";
    img.className = "card-img-to";
    div1.className = "card-body";
    h5.className = "card-title";
    p0.className = "card-text";
    p1.className = "card-text";

    h5.innerHTML = blog.title;
    img.src = blog.profileImg;
    p0.innerHTML = blog.content;

    // content
    // name
    // country
    // createdAt
}
