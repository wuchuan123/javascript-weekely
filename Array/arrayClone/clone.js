//...
let x = [1, 2, 3, 4];
let y = [...x];

//from
let x = [1, 2, 3, 4];
let y = Array.from(x);

//slice
let x = [1, 2, 3, 4];
let y = x.slice();

//assign
let x = [1, 2, 3, 4];
let y = Object.assign([], x);

//map
let x = [1, 2, 3, 4];
let y = x.map((i) => i);

//filter
let x = [1, 2, 3, 4];
let y = x.filter(() => true);
