let amusementRides = [
    {
        id: 0,
        name: "ride1",
        price: 2
    },
    {
        id: 1,
        name: "ride2",
        price: 5
    },
    {
        id: 2,
        name: "ride3",
        price: 10
    },
]

function doublePrices(rides){
    // for (let i = 0 ; i< rides.length ; i++)
    // {
    //     rides[i].price *= 2;
    // }
    rides.forEach((element,index) => { element.price *= 2  })

    return rides
}


myArray = [2,1,3,4]

let sortedArray = myArray.sort((a,b) => {return b-a})
console.log(sortedArray)

let filteredArray = sortedArray.filter((element,index) => {return index <2})
console.log(filteredArray)