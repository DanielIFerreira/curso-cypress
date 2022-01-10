it('nada agora', () => {
    
});

// function soma(a, b) {
//     return a + b;
// }

// console.log(soma(1, 4));

// const soma = function (a, b) {
//     return a + b;
// }

// const soma = (a, b) =>{
//     return a + b;
// }
//const soma = (a, b) => a + b;

//Quando tiver um paramentro posso tirar os parenteses
const soma = a => 5+ 5;

console.log(soma(1, 4))

it('a function test....', function() {
    console.log('Function', this)
});

it('an arrow test....', () => {
    console.log('Function', this)
});