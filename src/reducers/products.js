var initialState = [
    {
        id : 1,
        name : "Iphone 6 ",
        price : 400 ,
        status : true
    },
    {
        id : 2,
        name : "Iphone 6 s Plus",
        price : 800 ,
        status : true 
    },
    {
        id : 3,
        name : "Iphone 12 ",
        price : 900 ,
        status : false 
    },
    {
        id : 4,
        name : "Iphone xsmax ",
        price : 4000 ,
        status : true 
    },
    {
        id : 5,
        name : "Iphone 6 s",
        price : 1000 ,
        status : true 
    },
] ; 

const products = (state = initialState , action) => {
    switch(action.type){
        default: return [...state]
    }
};

export default products;