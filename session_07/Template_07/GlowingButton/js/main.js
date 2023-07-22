
// let button = document.getElementById("login-button")

// button.addEventListener('click',(event)=>{
//     button.style.backgroundColor = 'pink'
//     button.style.boxShadow = 'pink'
// })
let colorArray=['lightcoral','pink','lightsalmon','lightgreen']
let index = 0
function onClick(event){
    let target = event.target;
    target.style.backgroundColor = colorArray[index]
    target.style.boxShadow = colorArray[index]

    index++

    if(index === 4)
    {
        index = 0
    }
}

// button.addEventListener('mouseover',(event)=>{
//     button.style.backgroundColor = 'green'
//     button.style.boxShadow = 'green'
// })
// button.addEventListener('mouseout',(event)=>{
//     button.style.backgroundColor = 'green'
//     button.style.boxShadow = 'green'
// })