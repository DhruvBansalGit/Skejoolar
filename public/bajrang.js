/* Perfect */
console.log("bajrang");
todayDate = () => {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

/* Perfect */
addNote = () => {
    let title = document.getElementById('noteTitle').value;
    let description = document.getElementById('noteDescp').value;
    let date = document.getElementById('noteDate').value;
    if (date.length == 0) { date = todayDate() }
    let status = "pending";


    if (title.length == 0) {
        document.getElementById('emptyField').style.display = 'block';
    }

    else {
        let data;

        if (localStorage.getItem('bajrang') == null) {
            data = []
        }
        else {
            data = JSON.parse(localStorage.getItem('bajrang'))
        }

        data.push({ "title": title, "description": description, "date": date, "status": status })


        data = JSON.stringify(data);
        localStorage.setItem('bajrang', data);
        document.getElementById('success').style.display = 'block';

        document.getElementById('noteTitle').value = '';
        document.getElementById('noteDescp').value = '';
        document.getElementById('noteDate').value = '';

        showNotes();
    }
}

/* Perfect */
showNotes = () => {
    let notes = localStorage.getItem('bajrang');

    let html = "";
    if (notes != null) {
        /* 2 is the length of the string value in key notes*/
        if (notes.length != 2) {
            data = JSON.parse(notes);

            data.forEach(item => {
                if (item['status'] == 'pending' && (new Date(todayDate()) > new Date(item['date']))) {
                    html += `
                    <div class="card my-2 mx-auto border-danger text-danger" style="width: 18rem;background:#ffcccc;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <h6 class="card-title">${item["date"]}</h6>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn btn-outline-success my-2" onClick="toDone(${data.indexOf(item)})">Set as done</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            })

            data.forEach(item => {
                if (item['status'] == 'pending' && (new Date(todayDate()) <= new Date(item['date']))) {
                    html += `
                    <div class="card my-2 mx-auto border-primary text-primary" style="width: 18rem;background:#ccccff;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <h6 class="card-title">${item["date"]}</h6>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn btn-outline-success my-2" onClick="toDone(${data.indexOf(item)})">Set as done</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            })

            data.forEach(item => {
                if (item['status'] == 'done') {
                    html += `
                    <div class="card my-2 mx-auto border-success text-success" style="width: 18rem;background:#ccffcc;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <h6 class="card-title">${item["date"]}</h6>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn btn-outline-danger my-2" onClick="toPending(${data.indexOf(item)})">Set as pending</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            })
        }

        else {
            html = '<h5 class="card-title text-center">No saved notes yet..!!</h5>'
        }
        document.getElementById('savedNotes').innerHTML = html;
    }
    else {
        html = '<h5 class="card-title text-center">No saved notes yet..!!</h5>'
    }
    document.getElementById('savedNotes').innerHTML = html;
}

/* Perfect */
deleteNotes = (id) => {
    let data = JSON.parse(localStorage.getItem('bajrang'));
    data.splice(id, 1);
    data = JSON.stringify(data);
    localStorage.setItem('bajrang', data);
    location = window.location;
}

/* Perfect */
editNote = (id) => {
    let title = document.getElementById('noteTitle').value;
    let description = document.getElementById('noteDescp').value;
    let date = document.getElementById('noteDate').value;
    if (date.length == 0) { let d = new Date(); date = d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate(); }
    let status = "pending";

    if (title.length == 0) {
        document.getElementById('emptyField').style.display = 'block';
    }
    else {
        let data = JSON.parse(localStorage.getItem('bajrang'));

        data[id] = { "title": title, "description": description, "date": date, "status": status };
        data = JSON.stringify(data);
        localStorage.setItem('bajrang', data);

        window.location = location;
    }
}

/* Perfect */
editButton = (id) => {
    document.querySelector('h1').innerText = "Editor..!!"
    document.getElementById('btn-container').innerHTML = `
        <button class="btn btn-primary my-4" style="margin: auto;width:45%;" id="addButton" onclick="editNote(${id})">Edit</button>
        <button class="btn btn-primary my-4" style="margin: auto;width:45%;" id="addButton" onclick="editCancel()">Cancel</button>
    `
    let data = JSON.parse(localStorage.getItem('bajrang'));
    document.getElementById('noteTitle').value = data[id]["title"];
    document.getElementById('noteDescp').value = data[id]["description"];
    document.getElementById('noteDate').value = data[id]["date"];

    document.documentElement.scrollTop = 0;
}

/* Perfect */
editCancel = () => {
    location = window.location;
}

/* Perfect */
toPending = (id) => {
    let data = JSON.parse(localStorage.getItem('bajrang'));
    data[id]["status"] = "pending";
    data = JSON.stringify(data);
    localStorage.setItem('bajrang', data);
    showNotes();
}

/* Perfect */
toDone = (id) => {
    let data = JSON.parse(localStorage.getItem('bajrang'));
    data[id]["status"] = "done";
    data = JSON.stringify(data);
    localStorage.setItem('bajrang', data);
    showNotes();
}

/* Perfect */
darkLight = () => {
    let theme = document.getElementById('dark-light').checked;
    if (theme == true) {
        var bColor = "#222";
        var hLabel = "#fff";
        var input = "#222";
        var card = "#333";
        var dropdown = "#111";
        var stheme = "dark"
    }
    else {
        var bColor = "#fff"
        var hLabel = "#000";
        var input = "#e6e6e6";
        var card = "#fff";
        var dropdown = "#fff";
        var stheme = "light";
    }
    document.querySelector("body").style.background = bColor;

    document.querySelectorAll("h1").forEach(element => {
        element.style.color = hLabel;
    });

    document.querySelectorAll("label").forEach(element => {
        element.style.color = hLabel;
    });

    document.getElementById("search").style.background = input;
    document.getElementById("noteTitle").style.background = input;
    document.getElementById("noteDate").style.background = input;
    document.getElementById("docPassword").style.background = input;

    document.getElementById("search").style.color = hLabel;
    document.getElementById("noteTitle").style.color = hLabel;
    document.getElementById("noteDate").style.color = hLabel;
    document.getElementById("docPassword").style.color = hLabel;

    document.querySelector("hr").style.background = hLabel;

    document.querySelector("textarea").style.background = input;
    document.querySelector("textarea").style.color = hLabel;

    document.querySelector(".card").style.background = card;
    document.getElementById("modal").style.background = card;

    document.querySelectorAll(".dropdown-menu").forEach(element => {
        element.style.background = dropdown;
    });

    localStorage.setItem('theme', stheme);
}

addPassword = () => {
    let pass = document.getElementById('docPassword').value
    if (pass.length != 0) {
        let encode = []
        for (let i = 0; i < pass.length; i++) {
            encode.push(pass.charCodeAt(i))
        }

        localStorage.setItem('password', encode)
        pass = ''
        document.getElementById('modal').style.display = 'none'
    }
}

securityCheck = () => {
    if (document.getElementById('securityCheck').checked == true) {
            document.getElementById('modal').style.display = 'block'
            window.scrollTo(0, document.body.scrollHeight);
    }

    if (document.getElementById('securityCheck').checked == false) {
        document.getElementById('modal').style.display = 'none';
        localStorage.setItem('password', null);
    }
}

addPasswordClose = () => {
    document.getElementById('securityCheck').checked = false;
    document.getElementById('modal').style.display = 'none';
}

/* Perfect */
searchNotes = () => {
    let query = document.getElementById('search').value.toLowerCase();
    let title = document.querySelectorAll('.card-title');

    let match = [];
    let nonmatch = [];

    title.forEach(element => {
        if (element.innerText.toLowerCase().indexOf(query) > -1) { match.push(element) } else { nonmatch.push(element) };
    });

    nonmatch.forEach(element => {
        element.parentElement.parentElement.style.display = "none"
    });

    match.forEach(element => {
        element.parentElement.parentElement.style.display = "block"
    });
}

/* Perfect */
initialRun = () => {
    let theme = localStorage.getItem('theme');
    if (theme == null) { theme = "light"; localStorage.setItem('theme', 'light') };
    if (theme == "dark") { document.getElementById("dark-light").checked = true };
    darkLight();

    if (localStorage.getItem('password') != null && localStorage.getItem('password') != 'null'){document.getElementById("securityCheck").checked = true}

    document.getElementById("dark-light").addEventListener("input", darkLight);
    document.getElementById("securityCheck").addEventListener("input", securityCheck);

    showNotes();

    document.getElementById('search').addEventListener('input', searchNotes);

    document.getElementById('noteTitle').addEventListener('input', () => {
        document.getElementById('emptyField').style.display = 'none';
        document.getElementById('success').style.display = 'none';
    })

    date = document.getElementById('noteDate')
    minimum = todayDate()

    date.value = minimum
    date.setAttribute("min", minimum);

}

enterYourPassword = () => {
    prevHtml = document.documentElement.innerHTML

    let pagehtml = `
    <!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Make your to-do list here..!!">
    <meta name="keywords" content="todo, list, reminder, bajrang">
    <meta name="author" content="Chirag">
    <link href="icon.ico" rel="shortcut icon" type="image/x-icon">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <title>To Dos</title>
</head>

<body style="background:#121212;">

<div class="card" id='modal' style="background: rgb(51, 51, 51);width:90%; margin:auto; margin-top:100px;">
    <div class="card-body" style="position: relative;">
        <h1 class="card-title text-center" style="color: rgb(255, 255, 255);">Enter Password</h1>
        <hr>

        <label for="" class="form-label" style="color: rgb(255, 255, 255);">Password</label>
        <input type="password" class="form-control" id="docPassword"
        style="background: rgb(34, 34, 34); border: none; color: rgb(255, 255, 255);">

        <div class="alert alert-danger my-2" role="alert" id="danger" style="display: none;">
            Wrong password..!!
        </div>

        <button class="btn btn-primary my-4" id="checkYourPassword" style="width:100%;" onclick="checkYourPassword()">Confirm</button>
    </div>
</div>
</body>
    `

    document.documentElement.innerHTML = pagehtml
}

checkYourPassword = () => {
    let inpass = document.getElementById('docPassword').value

    pass = localStorage.getItem('password')

    encode = [];

    for (let i = 0; i < inpass.length; i++){
        encode.push(inpass.charCodeAt(i))
    }

    if (pass == encode){
        document.documentElement.innerHTML = prevHtml;
        initialRun()
    }
    else{
        document.getElementById('danger').style.display = 'block';
    }
}

if (localStorage.getItem('password') != null && localStorage.getItem('password') != 'null'){
    enterYourPassword()
}
else{
initialRun();
}