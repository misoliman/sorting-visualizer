
const generator = document.querySelector("#generator");
const range = document.querySelector("#size");
const content = document.querySelector(".content");
const colorButton = document.querySelector("#color")
const stopCode = document.querySelector("#stop")
const speed = document.querySelector("#speed")
const dropdownTrigger = document.querySelector('.dropdown');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownItems = document.querySelectorAll(".dropdown-item")
const selectedAlgo = document.querySelector(".selected-algo")


let selectedAlgorithm

for (let dropdownItem of dropdownItems) {
    dropdownItem.addEventListener("click", function () {
        selectedAlgorithm = algorithms[this.id]
    })
}


let arrayItems;
let abortOp = false
let timeDelay = 500

for (let item of dropdownItems) {
    item.addEventListener("click", () => {
        selectedAlgo.innerText = ""
        selectedAlgo.innerText = item.innerText
    })
}

document.body.addEventListener('click', (event) => {
    if (!dropdownTrigger.contains(event.target) && dropdownTrigger.classList.contains('is-active')) {
        dropdownTrigger.classList.remove('is-active')
    }
});


dropdownTrigger.addEventListener('click', () => {
    dropdownTrigger.classList.toggle('is-active');
});


stopCode.addEventListener("click", () => {
    abortOp = true
})

const disableInput = () => {
    generator.disabled = true
    colorButton.disabled = true
    speed.disabled = true
    range.disabled = true
}

const enableInput = () => {
    generator.disabled = false
    colorButton.disabled = false
    speed.disabled = false
    range.disabled = false
}

const getWidth = (item) => {
    const computedStyle = window.getComputedStyle(item);
    const widthString = computedStyle.getPropertyValue("width");
    const width = parseFloat(widthString);
    return width
}

const getRandom = () => {
    const screenWidth = window.innerWidth;
    const minWidth = screenWidth / 10;
    const maxWidth = screenWidth * .8;
    return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
}

const startApp = () => {
    generator.disabled = true
    colorButton.disabled = true
}




startApp()

generator.addEventListener("click", () => {
    const items = document.querySelectorAll(".item")
    for (let item of items) {
        const randomWidth = getRandom()
        item.style.width = `${randomWidth}px`
        item.style.backgroundColor = "gray"
    }
});

colorButton.addEventListener("click", async () => {
    disableInput()
    const items = document.querySelectorAll(".item")
    const size = items.length;
    if (!selectedAlgorithm) {
        alert("Algorithm must be selected")
        enableInput()
    }
    await selectedAlgorithm(items)
    abortOp = false
    enableInput()
})

range.addEventListener("input", () => {
    generator.disabled = false
    colorButton.disabled = false
    content.innerHTML = "";
    arrayItems = range.value;
    for (let i = 0; i < arrayItems; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("item");
        const randomWidth = getRandom()
        newDiv.style.width = `${randomWidth}px`
        newDiv.id = `${i}`;
        content.appendChild(newDiv);
    }
});

speed.addEventListener("input", () => {
    timeDelay = speed.value
})
