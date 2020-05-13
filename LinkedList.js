let head = null, head1 = null, head2 = null;
//Function to create a LL Node
function linkedListNode(value) {
    return {
        value: value,
        next: null
    }
}

//Function to append a node in LL
function createLinkedList(head, node){
    if(head === null) {
        return node;
    } else {
        let iterator = head;
        while(iterator && iterator.next){
            iterator = iterator.next;
        };
        iterator.next = node;
        return head;
    }
};

//Creating LL
function createLL(head, ...args) {
    args.forEach(arg => {
        head = createLinkedList(head, linkedListNode(arg));
    })
    return head;
}

//Print LL
function printLL(head) {
    let iterator = head;
    let str = ""
    while(iterator){
        str = `${str} ${iterator.value}`
        iterator = iterator.next;
    }
    return str;
}

//Rearrange LL such that L0 -> Ln -> L1 -> Ln-1 -> L3..
head = createLL(null, 1,2,3,4, 5,6);

function rearrangeLL(head){
    let arr = [], iterator = head, i=0, length=0;
    while(iterator){
        length++;
        iterator = iterator.next;
    }
    iterator = head;
    while(iterator){
        let index = (i*2)%length;
        arr[ arr[index] ? index+1 : index] = iterator.value;
        iterator = iterator.next;
        i++;
    }
    iterator = head;
    arr.forEach(item =>{
        iterator.value = item;
        iterator = iterator.next;
    })
    return head;
}

console.log("Linked Before Rearranging", printLL(head));
head = rearrangeLL(head);
console.log("Linked After Rearranging", printLL(head));
console.log("================================")

//Sum of two LL
head1 = createLL(null, 1, 2, 3);
head2 = createLL(null, 3, 4, 5);
function sumOfTwoLL(head1, head2){
    head1 = reverseLL(head1);
    head2 = reverseLL(head2);
    let head3 = null, carry = 0;
    while(head1 && head2) {
        let sum = head1.value + head2.value;
        head3 = createLinkedList(head3, linkedListNode((sum + carry)%10));
        carry = parseInt(sum/10);
        head1 = head1.next; head2= head2.next;
    }
    while(head1){
        head3=createLinkedList(head3, linkedListNode((head1.value+carry)%10));
        carry = parseInt(head1.value/10);
        head1 = head1.next;
    }
    while(head2){
        head3=createLinkedList(head3, linkedListNode((head2.value+carry)%10));
        carry = parseInt(head2.value/10);
        head2 = head2.next;
    }
    if(carry){
        head3=createLinkedList(head3, linkedListNode((carry)%10));
    }
    return reverseLL(head3);
}

console.log("Linked List 1", printLL(head1));
console.log("Linked List 2", printLL(head2));
head3 = sumOfTwoLL(head1, head2);
console.log("Sum of two Linked list", printLL(head3));
console.log("====================================")

//Rotate LL K times
head = createLL(null, 1,2,3,4,5);
function rotateLLByKNodes(head, k) {
    let count = 0, iterator = head;
    while(count < k-1 && iterator && iterator.next) {
        iterator = iterator.next;
        count++;
    }
    let iterator1 = iterator;
    while(iterator1 && iterator1.next){
        iterator1 = iterator1.next;
    };
    
    iterator1.next = head;
    head = iterator.next;
    iterator.next = null;
    return head
}
console.log("Linked List before Rotation", printLL(head));
head = rotateLLByKNodes(head, 4);
console.log("Rotate Linked List", printLL(head), " 4 Times");
console.log("==========================");

//Delete Alternate Nodes
head = createLL(null, 1,2,3,4,5);
function deleteAlternateNodes(head){
    let iterator = head;
    while(iterator && iterator.next){
        iterator.next = iterator.next.next;
        iterator = iterator.next;
    }
    return head;
}

console.log("Linked List Before Deleting Alternate Node", printLL(head));
head = deleteAlternateNodes(head);
console.log("Linked List After Deleting Alternate Node", printLL(head));
console.log("============================================");

//Reverse a Linked List in groups of given size
head = createLL(null, 1,2,3,4,5,6);
function reverseLLInGroupOfK(head, count){
    let prev = null, current = head, next =null, k = 0;
    while(current && k < count){
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        k++;
    }

    if(next) {
        head.next = reverseLLInGroupOfK(next, count);
    }
    return prev;
}

console.log("Linked Before Reversing", printLL(head));
head = reverseLLInGroupOfK(head, 3);
console.log("Linked after Reversing in group of 3", printLL(head));
console.log("=========================================")

//Merge two sorted linked lists such that merged list is in reverse order
head1 = createLL(null, 1,2,3,4,5,6);
head2 = createLL(null, 3,4,5,6,7,8);
function appendNodeAtFront(head, value){
    let newNode = linkedListNode(value);
    newNode.next = head;
    head = newNode;
    return head
}

function mergeInReverseOrder(head1, head2){
    let iterator1 = head1, iterator2 = head2, head3 = null;
    while(iterator2 && iterator1){
        if(iterator1.value === iterator2.value){
           head3 = appendNodeAtFront(head3, iterator2.value);
           iterator2 = iterator2.next;
           iterator1 = iterator1.next;
        } else if(iterator1.value < iterator2.value){
            head3 = appendNodeAtFront(head3, iterator1.value);
           iterator1 = iterator1.next;
        } else{
            head3 = appendNodeAtFront(head3, iterator2.value);
           iterator2 = iterator2.next;
        }
    }
    while(iterator2){
        head3 = appendNodeAtFront(head3, iterator2.value);
        iterator2 = iterator2.next;
    }
    while(iterator1){
        head3 = appendNodeAtFront(head3, iterator1.value);
        iterator1 = iterator1.next;
    }
    return head3;
}
console.log("Linked List 1", printLL(head1));
console.log("Linked List 2", printLL(head2));
head3 = mergeInReverseOrder(head1, head2);
console.log("Linked List After merging 1 and 2 in reverse Order", printLL(head3));
console.log("===============================");

//Reverse a LinkedList
head = createLL(null, 1,2,3,4,5,6,7);
function reverseLL(head){
    let previous = null, current = head, next= null;
    while(current){
        next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }
    return previous;
}

console.log("Linked List before reversing", printLL(head));
head = reverseLL(head);
console.log("Linked List after reversing", printLL(head));
console.log("==========================================")

//Intersection of two sorted LL
head1 = createLL(null, 1, 3,5,6,7,8,9);
head2 = createLL(null, 5,8,9, 10, 11, 12);

function intersectionOfLLs(head1, head2){
    let iterator1 = head1, iterator2 = head2, head3 = null;
    while(iterator1 && iterator2){
        if(iterator1.value === iterator2.value){
            head3 = createLinkedList(head3, linkedListNode(iterator2.value));
            iterator1 = iterator1.next;
            iterator2 = iterator2.next;
        } else if(iterator1.value < iterator2.value){
            iterator1 = iterator1.next;
        } else {
            iterator2 = iterator2.next;
        }
    }
    return head3;
}
console.log("Linked List 1", printLL(head1));
console.log("Linked List 2", printLL(head2));
head3 = intersectionOfLLs(head1, head2);
console.log("Intersection of Linked List 1 and 2", printLL(head3));
console.log("======================================");

//Remove duplicate from sorted Linked List
head = createLL(null, 2,3,3,4,5,5,6,7,7,8,8,8);
function removeDuplicateFromSorted(head){
    let iterator = head;
    while(iterator && iterator.next){
        let iterator1 = iterator;
        while(iterator1.next && iterator1.value === iterator1.next.value){
            iterator1 = iterator1.next;
        }
        iterator.next = iterator1.next;
        iterator = iterator.next;
    }
    return head
}
console.log("Linked List with Duplicates", printLL(head));
head = removeDuplicateFromSorted(head);
console.log("Linked List after removing Duplicates", printLL(head));
console.log("===================================");

//Check if LL is Palindrome
head = createLL(null, 1,2,3,5,1);
function checkIfStringPalindrome(head, endHead){
    if(endHead === null){
        return { isValueEqual: true, valueOfHead: head};
    }
    let isp = checkIfStringPalindrome(head, endHead.next);
    if(!isp.isValueEqual){
        return isp;
    }
    let isValueEqual = isp.valueOfHead.value === endHead.value;
    head = isp.valueOfHead.next;
    return { isValueEqual: isValueEqual, valueOfHead: head };
}

console.log("Linked list is " , printLL(head));
const isLLPalindrome = checkIfStringPalindrome(head, head.next);
console.log(isLLPalindrome.isValueEqual ? "Linked list is palindrome" : "Linked list is not palindrome");
console.log("======================================");

//Length of Loop in LL
head = createLL(null, 1,2,3,4,5,6);
head.next.next.next = head.next; //Condition to create loop in LL

function lengthofLoopInLL(head){
    let tortoise = head, hare= head;
    while(tortoise) {
        hare = hare.next;
        tortoise = tortoise.next.next;
        if(tortoise === hare){
            let diffBtwTHCount = 1;
            while(tortoise.next !== hare){
                diffBtwTHCount++;
                tortoise = tortoise.next;
            }
            console.log("Length of loop in LL is ",diffBtwTHCount);
            return;
        }
    }
    console.log("Loop not found");
}

// console.log("Linked List is ", printLL(head));
lengthofLoopInLL(head);
console.log("================================");

//Find Loop in LL
head = createLL(null, 1,2,3,4,5,6);
head.next.next.next.next = head.next;

function detectLoopInLL(head){
    let tortoise = head, hare = head;
    while(tortoise && tortoise.next){
        tortoise = tortoise.next.next;
        hare = hare.next;
        if(hare === tortoise){
            console.log("Loop Found");
            return;
        }
    }
    console.log("Loop Not found");
}

detectLoopInLL(head);
console.log("================================");

//Print Middle of a LL
head = createLL(null, 1,2,3,4,5,6,7);
function printMiddle(head){
    let tortoise = head, hare = head;
    while(tortoise && tortoise.next){
        tortoise = tortoise.next.next;
        hare = hare.next;
    }
    
    console.log("Middle value is ", hare.value);
}
console.log("Linked List is", printLL(head));
printMiddle(head);
console.log("===========================");


//Get nthNode from End in a LL
head = createLL(null, 1,2,3,4,5,5);
function getNthNodeFromEnd(head, n) {
    let requiredNode = n;
    if (n === 0) {
        console.log("Node does not exists");
        return;
    } else {
        let iterator1 = head;
        let iterator2 = head;
        while (n-- && iterator1) {
            if(n !== 0 && (!iterator1 || !iterator1.next )) {
                console.log("Node does not exists");
                return;
            }
            iterator1 = iterator1.next;
        }
        while (iterator1) {
            iterator1 = iterator1.next;
            iterator2 = iterator2.next;
        }
        console.log(`${requiredNode} node from end is`, iterator2.value);
    }
}
console.log("Linked List is ", printLL(head));
getNthNodeFromEnd(head, 2);
console.log("===============================");


//Write a function to get Nth node in a Linked List
head = createLL(null, 1,2,3,4,5,6,7,8,9);
function getNthNode(head, requiredNode){
    if( requiredNode === 1 ){
        return head.value;
    }
    if( head.next === null || requiredNode === 0){
        return "Given node does not exists";
    }
    return getNthNode(head.next, requiredNode-1 );
}

console.log("Linked List is ", printLL(head));
console.log("5th node in LL is", getNthNode(head,5));
console.log("=============================");

//Search an element in a Linked List(Recursive)
head = createLL(null, 1,2,3,4,5,6,7,8,9);

function searchElementInLL(head, value) {
    if( head.value === value){
        return `${value} Exists in the LL`;
    } 
    if( head.next === null){
        return "Value does not exists";
    }
    return searchElementInLL(head.next, value);
}

console.log("Linked List is ", printLL(head));
let valueString = searchElementInLL(head,17);
console.log(valueString);
console.log("==================================");

//Length of Linked list
head = createLL(null, 1,2,3,4,5);
function linkedListLength(head) {
    let count = 0;
    let iterator = head;
    while(iterator){
        count++;
        iterator = iterator.next;
    };
    return count;
}
console.log("Linked List is ", printLL(head));
console.log("Length of Linked List", linkedListLength(head));
console.log("============================")

//Delete Linked list one by one node
head = createLL(null, 1,2,3,4,5);

function deleteLinkedList(head) {
    while(head){
        head = head.next;
    }
    return head;
} 

console.log("Linked List is ", printLL(head));
head = deleteLinkedList(head);
console.log("Linked List after deleting node one by one is ", printLL(head));
console.log("=======================");
