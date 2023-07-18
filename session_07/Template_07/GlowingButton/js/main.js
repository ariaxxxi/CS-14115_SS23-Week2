//TODO

let button = document.getElementById('login-button')

button.addEventListener('mouseover',(event) =>{
    console.log(event);
}
)
// button.addEventListener('click', (event) =>{
//     button.style.backgroundColor= 'pink'
//     button.style.boxShadow = '0 0 50px pink'
//     button.innerHTML = "Hello"
// })
//evenName: 'click', 'mouseover', 'mouseout','scroll'
let colorArray=['pink','blue','purple','lightgreen']
let index= 0
function onButtonClick(){
    button.style.backgroundColor= colorArray[index]
    button.style.boxShadow = '0 0 50px pink'
    button.innerHTML = "Hello"
    index ++
    if (index == 4)
    {
        index =0
    }
}