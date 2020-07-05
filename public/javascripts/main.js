var isHidden = true;
window.onload = function () {
    readBlogs();
}
function createNewBlog(formData) {
    return new Promise((fulfill, reject) => {
        showLoader();
        let body = formData;
        axios
            .post("/blog/create", body, { timeout: 10000 })
            .then((response) => {
                if (response.data.success) {
                    showToast("success", response.data.data.message, 3000);
                    toggleForm();
                    readBlogs();
                }
            }).catch(err => {
                showToast("error", "Failed to get blogs " + err, 3000)
                hideLoader();
            })
    })
}
function readBlogs() {
    return new Promise((fulfill, reject) => {
        showLoader();
        axios
            .get("/blog/read", { timeout: 10000 })
            .then((response) => {
                if (response.data.success) {
                    hideLoader();
                    let blogs = response.data.data.blogs.reverse();
                    document.getElementById("blogContainer").innerHTML = "";
                    blogs
                    if (blogs.length === 0) {
                        document.getElementById("noBlogs").style.display = "block"
                    } else {
                        blogs.forEach(blog => {
                            createBlog(blog);
                        })
                    }
                    fulfill(true)
                }
            }).catch(err => {
                showToast("error", "Failed to get blogs " + err, 3000)
                hideLoader();
            })
    })
}
function updateBlog(formData) {
    return new Promise((fulfill, reject) => {
        showLoader();
        let body = formData;
        axios
            .put("/blog/update", body, { timeout: 10000 })
            .then((response) => {
                if (response.data.success) {
                    showToast("success", response.data.data.message, 3000);
                    readBlogs();
                } else {
                    showToast("warning", response.data.data.message, 3000);
                }
                document.getElementById('closeModal').click();
            }).catch(err => {
                showToast("error", "Failed to get blogs " + err, 3000)
                hideLoader();
            })
    })
}
function deleteBlog(_id) {
    return new Promise((fulfill, reject) => {
        showLoader();
        let body = { _id: _id };
        console.log(body)
        axios
            .post("/blog/delete", body, { timeout: 10000 })
            .then((response) => {
                if (response.data.success) {
                    showToast("success", response.data.data.message, 3000);
                    readBlogs();
                } else {
                    showToast("warning", response.data.data.message, 3000);
                }
                document.getElementById('closeModal').click();
            }).catch(err => {
                showToast("error", "Failed to get blogs " + err, 3000)
                hideLoader();
            })
    })
}
function launchEditBlogModal(blog) {
    let name = blog.name.split(" ");
    let form = document.getElementById("updateForm");
    document.getElementById("editBlogHeader").innerHTML = blog.title;
    form.elements['_id'].value = blog._id;
    form.elements['content'].value = blog.content;
    form.elements['title'].value = blog.title;
    form.elements['firstname'].value = name[0];
    form.elements['lastname'].value = name[1];
    document.getElementById("launchModal").click();
}
function openForm() {
    isHidden = false;
    document.getElementById("createNewForm").reset();
    document.getElementById("showHideBtn").style = "transform:rotate(0);";
    document.getElementById("createNewForm").className = "needs-validation formMain shadow createNewForm extend";
}
function toggleForm() {
    isHidden = !isHidden;
    if (isHidden) {
        document.getElementById("showHideBtn").style = "transform:rotate(180deg);";
        document.getElementById("createNewForm").className = "needs-validation formMain shadow createNewForm";
    } else {
        document.getElementById("createNewForm").reset();
        document.getElementById("showHideBtn").style = "transform:rotate(0);";
        document.getElementById("createNewForm").className = "needs-validation formMain shadow createNewForm extend";
    }
}
function createBlog(blog) {
    let div0 = document.createElement("div");
    let img = document.createElement("img");
    let div1 = document.createElement("div");
    let row = document.createElement("div");
    let col9 = document.createElement("div");
    let col3 = document.createElement("div");
    let footer = document.createElement("div");
    let h5 = document.createElement("h5");
    let p0 = document.createElement("p");
    let p1 = document.createElement("p");
    let name = document.createElement("span");
    let createdOn = document.createElement("span");
    let nameCreatedOnParent = document.createElement("div");
    let editDeleteParent = document.createElement("div");
    let edit = document.createElement("button");
    let Delete = document.createElement("button");
    let editIcon = document.createElement("i");
    let DeleteIcon = document.createElement("i");
    let editText = document.createElement("span");
    let DeleteText = document.createElement("span");

    edit.onclick = function () {
        launchEditBlogModal(blog);
    }
    Delete.onclick = function () {
        deleteBlog(blog._id);
    }
    editIcon.className = "fas fa-pencil-alt mr-2";
    DeleteIcon.className = "far fa-trash-alt mr-2";
    edit.appendChild(editIcon);
    Delete.appendChild(DeleteIcon);
    editText.style = "font-weight: 600"
    DeleteText.style = "font-weight: 600";
    edit.appendChild(editText);
    Delete.appendChild(DeleteText);
    edit.className = "btn btn-outline-warning";
    Delete.className = "btn btn-danger ml-2";
    editText.innerHTML = "Edit";
    DeleteText.innerHTML = "Delete";
    editDeleteParent.appendChild(edit);
    editDeleteParent.appendChild(Delete);
    editDeleteParent.className = "text-right"
    div0.className = "card mb-3 p-2";
    img.className = "card-img-to";
    div1.className = "card-body";
    row.className = "row no-gutters";
    col9.className = "col-9";
    col3.className = "col-3 cardCust";
    h5.className = "card-title";
    p0.className = "card-text";
    p1.className = "card-text";

    h5.innerHTML = blog.title;
    img.src = blog.blogImage;
    p0.innerHTML = blog.content;
    name.innerHTML = "From " + blog.name;
    createdOn.innerHTML = " On " + new Date(blog.createdAt).toLocaleDateString();
    nameCreatedOnParent.className = "text-right";
    col9.appendChild(h5)
    col9.appendChild(p0)
    col9.appendChild(p1)
    nameCreatedOnParent.appendChild(name)
    nameCreatedOnParent.appendChild(createdOn)
    col3.appendChild(editDeleteParent)
    col3.appendChild(nameCreatedOnParent)
    row.appendChild(col9)
    row.appendChild(col3)
    div0.appendChild(row)
    div0.appendChild(row)
    document.getElementById("blogContainer").appendChild(div0);
    // content
    // name
    // country
    // createdAt
}
// Loader functions
function showLoader() {
    // Show loader
    let loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "1";
        setTimeout(() => {
            loader.style.display = "flex";
        }, 300);
    }
}
function hideLoader() {
    // Hide loader
    let loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 300);
    }
}
// Toast function
function showToast(status, message, timeout) {
    var ID = parseInt(Math.random() * 10 * 10 * 10 * 10 * 10),
        customToast = document.createElement("DIV"),
        row = document.createElement("DIV"),
        colAuto = document.createElement("DIV"),
        toastStat = document.createElement("SPAN"),
        i = document.createElement("I"),
        col9 = document.createElement("DIV"),
        col1 = document.createElement("DIV"),
        span = document.createElement("SPAN"),
        strong = document.createElement("STRONG"),
        p = document.createElement("P"),
        button = document.createElement("BUTTON");
    customToast.className = "customToast" + " " + status;
    row.className = "row no-gutters body";
    colAuto.className = "col-auto justCenter pr-2";
    toastStat.className = "toastStat justCenter";
    if (status === "warning") {
        i.className = "fas fa-exclamation";
        strong.innerHTML = "Warning";
    } else if (status === "error") {
        i.className = "fas fa-times";
        strong.innerHTML = "Error";
    } else if (status === "success") {
        i.className = "fas fa-check";
        strong.innerHTML = "Success";
    }
    col9.className = "col p-2";
    p.innerHTML = message;
    col1.className = "col-2 justCenter";
    button.className = "btn times";
    span.innerHTML = "&times;";

    customToast.id = ID;
    button.appendChild(span);
    button.onclick = function (event) {
        closeToast(ID);
    };
    col1.appendChild(button);
    col9.appendChild(strong);
    col9.appendChild(p);
    toastStat.appendChild(i);
    colAuto.appendChild(toastStat);
    row.appendChild(colAuto);
    row.appendChild(col9);
    row.appendChild(col1);
    customToast.appendChild(row);
    document.getElementById("toastParent").appendChild(customToast);
    setTimeout(() => {
        closeToast(ID);
    }, timeout);
}
function closeToast(ID) {
    document.getElementById(ID).style.opacity = "0";
    setTimeout(() => {
        var element = document.getElementById(ID);
        element.parentNode.removeChild(element);
    }, 300);
}
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(event.srcElement.id)
                    if (
                        form.checkValidity() &&
                        event.srcElement.id === "createNewForm"
                    ) {
                        createNewBlog(new FormData(event.srcElement));
                    } else if (
                        form.checkValidity() &&
                        event.srcElement.id === "updateForm"
                    ) {
                        updateBlog(new FormData(event.srcElement))
                    }
                    form.classList.add("was-validated");
                },
                false
            );
        });
    }, false);
})();