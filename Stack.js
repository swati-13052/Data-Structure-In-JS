let stack;

function Stack() {
    let items = [];
    let top = 0;

    //Push an item in the Stack
    this.push = function (element) {
        items[top++] = element
    }

    //Pop an item from the Stack
    this.pop = function () {
        return items[--top];
    }

    //Peek top item from the Stack
    this.peak = function () {
        return items[top - 1];
    }

    //Is Stack empty
    this.isEmpty = function () {
        return top === 0;
    }

    //Clear the Stack
    this.clear = function () {
        top = 0;
    }

    //Size of the Stack
    this.size = function () {
        return top;
    }

    //Print Stack
    this.print = function () {
        let topIterator = top - 1;
        let str = "";
        while (topIterator >= 0) {
            str = `${str} ${items[topIterator--]}`;
        }
        return str;
    }
}

//Reverse stack using Recursion
stack = new Stack();
stack.push(3); stack.push(2); stack.push(1);

let reverseStack = (stack) => {
    if (!stack.isEmpty()) {
        let currentIndexVal = stack.pop();
        reverseStack(stack);
        insertAtTheBottom(stack, currentIndexVal);
    }
}

let insertAtTheBottom = (stack, value) => {
    if (stack.isEmpty()) {
        stack.push(value);
    } else {
        let x = stack.pop();
        insertAtTheBottom(stack, value);
        stack.push(x);
    }
}
console.log("Stack before reversing", stack.print());
reverseStack(stack);
console.log("Stack after reversing", stack.print());
console.log("===================================");

//Sort Stack
stack = new Stack();
stack.push(4); stack.push(19); stack.push(15);

let sortStack = (stack) => {
    if(!stack.isEmpty()){
        let poppedElement = stack.pop();
        sortStack(stack);
        insertSorted(stack, poppedElement);
    }
}

let insertSorted = (stack, value) => {
    if(stack.isEmpty() || value > stack.peak()){
        stack.push(value);
    } else {
        let poppedElement = stack.pop();
        insertSorted(stack, value);
        stack.push(poppedElement);
    }
}

console.log("Stack Before Sorting ", stack.print());
sortStack(stack);
console.log("stack after sorting", stack.print());
console.log("=====================");

//Delete middle element of Stack
stack = new Stack();
stack.push(1); stack.push(2); stack.push(3); stack.push(4);

let deleteMiddleElement = (stack, stackSize, currentIndex) => {
    if(stack.isEmpty()){
        return;
    }
    let poppedElement = stack.pop();
    deleteMiddleElement(stack, stackSize, currentIndex + 1);
    if(currentIndex !== parseInt(stackSize/2)){
        stack.push(poppedElement);
    }
    return stack;
}
console.log("Stack before deleting middle element", stack.print());
deleteMiddleElement(stack, stack.size(), 0);
console.log("Stack after deleting middle element", stack.print());
console.log("==================================================")

//Implement Queue using stacks
function Queue(){
    //Stack1 for pushing Queue Items
    let stack1 = new Stack();
    //Stack2 for popping Queue Items
    let stack2 = new Stack();

    this.push = function(element){
        stack1.push(element);
    }

    this.pop = function(){
        stack2.clear();
        while(!stack1.isEmpty()){
            let temp = stack1.pop();
            stack2.push(temp);
        } 
        !stack2.isEmpty() &&  stack2.pop();
        let peaked = stack2.peak();
        while(!stack2.isEmpty()){
            let temp = stack2.pop();
            stack1.push(temp);
        } 
        return peaked;
    }

    this.print = function(){
        stack2.clear();
        while(!stack1.isEmpty()){
            stack2.push(stack1.pop());
        }
        let str = stack2.print();;
        while(!stack2.isEmpty()){
            stack1.push(stack2.pop());
        }
        return str;
    }
}

let queue = new Queue();
queue.push(21); queue.push(22); queue.push(23);
console.log("Queue before popping", queue.print());
queue.pop();queue.pop();
console.log("Queue after popping twice", queue.print());
queue.push(25)
console.log("Queue after pushing once", queue.print());
console.log("=========================================");

//Next Greater Element
stack = new Stack();
function nextGreaterElement(arr) {
    let  arrLen = arr.length -1, nge = [];
    stack.push(0);
    for(let i=1; i <= arrLen; i++){
        while(!stack.isEmpty() && arr[i] > arr[stack.peak()]){
            nge[stack.peak()] = arr[i];
            stack.pop();
        }
        stack.push(i);
    }
    while(!stack.isEmpty()){
        nge[stack.peak()] = -1;
        stack.pop();
    }
    console.log("Next Greater Element in given array is", nge)
}

let arr = [23, 12, 16, 28, 31,33,9];
console.log("Given Array is", arr);
nextGreaterElement(arr);
console.log("===================================");


//Reverse individual words
stack = new Stack();

function reverseWordsInString(str){
    let i = 0, reverseStr = ""; 
    while(i < str.length){
        if(str[i] !== " "){
            stack.push(str[i]);
        } else {
            while(!stack.isEmpty()){
                let poppedChar = stack.pop();
                reverseStr = `${reverseStr}${poppedChar}`;
            }
            reverseStr = `${reverseStr} `;
        }
        i++;
    }
    while(!stack.isEmpty()){
        let poppedChar = stack.pop();
        reverseStr = `${reverseStr}${poppedChar}`;
    }
    console.log("Reversed String word vise is" ,reverseStr);
}
console.log("String is Hello World");
reverseWordsInString("Hello World");
console.log("=============================================");


//Delete array elements which are smaller than next or become smaller
stack = new Stack();

function deleteSmallerElements(arr, k){
    stack.push(arr[0]);
    let count = 0, i =1;
    let resultedArray = []
    for(i ;i < arr.length && count < k; i++){
        while(!stack.isEmpty() && arr[i] > stack.peak()){
            stack.pop();
            count++;
        }
        stack.push(arr[i]);
    }
    while(!stack.isEmpty()){
        resultedArray.push(stack.pop());
    }
    while(i < arr.length){
        resultedArray.push(arr[i]);
        i++;
    }
    return resultedArray;
}
let arrayToOperate = [23, 45, 11, 77, 18]
console.log("Array before deleting", arrayToOperate)
arrayToOperate = deleteSmallerElements(arrayToOperate, 3);
console.log("Array after deleting", arrayToOperate);
console.log("=========================================");