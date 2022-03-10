let database = [
    {
        username: "xablau",
        password: "12345"
    },
    {
        username: "pingu",
        password: "pingu"
    },
    {
        username: "zeca",
        password: "urubu"
    },
    {
        username: "admin",
        password: "admin"
    }
]

let newsFeed = [
    {
        username: "maninho do sertão",
        timeline: "Catei umas macauba e vou fazer pirão"
    },
    {
        username: "LaGaDa",
        timeline: "lorem ipsun dele los gados en las flores"
    },
    {
        username: "Ancap",
        timeline: "Imposto é roubo"
    }
]

let firstLogin = true
let currentUser = ''
let jaLogou = JSON.parse(localStorage.getItem("jaLogou"))
if (jaLogou === false) {
    firstLogin = false
}

if (firstLogin) {
    localStorage.setItem('feed', JSON.stringify(newsFeed))
    localStorage.setItem('db', JSON.stringify(database))
}

function userValid(username, pass) {
        for (let i = 0; i < database.length; i++) {
            if (database[i].username == username && database[i].password == pass) {
                return true
            }
        }
        return false
}

function userAlreadyExists(user) {
    for (let i = 0; i < database.length; i++) {
        if (database[i].username == user) {
            return true
        }
    }
    return false
}

function login() {
    database = JSON.parse(localStorage.getItem('db'))
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    if (userValid(username, password)) {
        currentUser = username
        localStorage.setItem('user', currentUser)
        localStorage.setItem('jaLogou', false)
        location = 'feed.html'
    } else {
        alert("Usuario e/ou senhas incorretos\nTente novamento ou faça um novo cadastro")
    }
}

function signUp() {
    let user = document.querySelector("#username").value
    let pass = document.querySelector("#password").value
    if (!userAlreadyExists(user) && user[0] != ' ' && user != '') {
        console.log(database)
        database.push(
            {
                username: user,
                password: pass
            }
        )
        localStorage.setItem('db', JSON.stringify(database))
        database = JSON.parse(localStorage.getItem('db'))
        alert("cadastrado com sucesso")
        }
}

function isUserLogged() {
        currentUser = localStorage.getItem('user')
        if (currentUser) {
            return true
        } else {
            return false
        }
}

function renderFeed() {
    if (isUserLogged()) {
        newsFeed = JSON.parse(localStorage.getItem('feed'))
        let feed = document.querySelector(".feed")
        document.querySelector("#nomeUsuario").innerHTML = currentUser
        for (let i = 0; i < newsFeed.length; i++) {
            feed.innerHTML += `
            <div class="post">
            <h2>${newsFeed[i].username}</h2>
            <p>${newsFeed[i].timeline}</p>
            </div>
            `
            console.log(newsFeed)
        }
    } else {
        location = "index.html"
    }
}

function newPost() {
    let writeContentBox = document.querySelector("#postContent")
    let writeContent = document.querySelector("#postContent").value
    if (writeContent && writeContent[0] != ' ') {
        let novoFeed = [{username: currentUser, timeline:  writeContent}]
        document.querySelector(".feed").innerHTML = ''
        newsFeed = novoFeed.concat(newsFeed)
        localStorage.setItem('feed', JSON.stringify(newsFeed))
        renderFeed()
        writeContentBox.value = ''
    } else {

} }



// _____________________

function toLogIn() {
    location = 'index.html'
}

function toSingUp() {
    location = 'cadastro.html'
}

function viewPassowrd() {
    var passowodField = document.getElementById("password");
    if (passowodField.type === "password") {
      passowodField.type = "text";
    } else {
      passowodField.type = "password";
    }
  }