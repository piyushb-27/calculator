// theme changing logic

let ctBtn = document.querySelector("#change-theme")
let body = document.querySelector("body")
let currentThemeIndex=0
const themes = ["default-theme","theme-blue", "theme-green", "theme-purple", "theme-red", "theme-orange", "theme-yellow", "theme-cyan", "theme-pink", "theme-teal"];


ctBtn.addEventListener("click", ()=> {
    body.classList.remove(themes[currentThemeIndex])
    currentThemeIndex = (currentThemeIndex + 1) % themes.length; // for wrapping the index around the themes array
    body.classList.add(themes[currentThemeIndex]) 
})