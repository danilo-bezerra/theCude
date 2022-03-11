let database = []
let feed = []

let currentUser = localStorage.getItem("currentUser")

/* CODIGO RELACIONADO AO LOGIN E CADASTRO DE USUARIOS */

function validateLogin(user, pass) {
    if (database.length === 0) {
        return alert('BANCO DE DADOS VAZIO\nCadastre-se e tente novamente')
    } else {
        for (let i = 0; i < database.length; i++) {
            if (database[i].username === user && database[i].password === pass) {
                return true
            }
        }
        return alert("Usario e/ou senha incorretos\nTente novamente ou cadastre-se")
    }
}

function logIn() {
    updateDatabase()
    let usernameDigited = document.getElementById("username").value
    let passwordDigited = document.getElementById("password").value
    if (validateLogin(usernameDigited, passwordDigited)) {
        localStorage.setItem("currentUser", usernameDigited)
        location = 'feed.html'
    }
}

function availableUser(user) {
    for (let i = 0; i < database.length; i++) {
        if (database[i].username === user || user[0] == ' ') {
            return false
        }
    }
    return true
}

function signUp() {
    let usernameDigited = document.getElementById("username").value
    let passwordDigited = document.getElementById("password").value

    updateDatabase()

    if (availableUser(usernameDigited) && usernameDigited.length > 0) {
        database.push(
            {
                username: usernameDigited,
                password: passwordDigited
            }
        )
        saveDatabase()
        alert("Cadastro efetuado com sucesso")
        location = 'index.html'
    } else {
        alert("Usuario já cadastrado ou invalido")
    }
}

function saveDatabase() {
    localStorage.setItem("db", JSON.stringify(database))
    updateDatabase()
}

function updateDatabase() {
    let saveData = JSON.parse(localStorage.getItem("db"))
    if (saveData != null) {
        database = saveData
    }
}

function showPassoword() {
    let passwordInput = document.getElementById("password")
    if (passwordInput.type == "password") {
        passwordInput.type = "text"
    } else {
        passwordInput.type = "password"
    }
}

/* CODIGO RELACIONADO AO FEED E CRIAÇÃO DE POSTS */

function feedHasbeenLoaded(){
    if (currentUser) {
        document.getElementById("usernameText").innerText = currentUser
        updateStoredFeed()
    } else {
        location = "index.html"
    }
}

function showFeedContent() {
    let feedBox = document.querySelector(".feed")

    if (feed.length > 0) {
        feedBox.innerHTML = ''
        for (let i = feed.length - 1; i >= 0; i--) {
            feedBox.innerHTML += `
            <div class="post">
            <h2>${feed[i].username}</h2>
            <p>${feed[i].postText}</p>
            </div>`
        }
    }
}

function newPost() {
    let postContentDiv = document.querySelector("#postContent")
    let postContent = document.querySelector("#postContent").value

    if (postContent.length > 0 && postContent[0] !== ' ') {
        feed.push(
            {
                username: currentUser,
                postText: postContent
            }
        )
        postContentDiv.value = ''
        saveStoredFeed()
    }
    
}

function saveStoredFeed() {
    localStorage.setItem('feedContent', JSON.stringify(feed))
    updateStoredFeed()
}

function updateStoredFeed() {
    lastFeedSaved = JSON.parse((localStorage.getItem("feedContent")))

    if (lastFeedSaved !== null) {
        feed = lastFeedSaved
        showFeedContent()
    }
}