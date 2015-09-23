//generated random number 1-52
function deal(min, max) {
    return Math.floor(Math.random() * 52 + 1);
}

// Deal out our first hand by declaring variables card1 and card2
//value of cards
function getValue(card) {
    if(card%13===0|| card%13>10) {
        return 10;
    }
    
    else if(card%13===1) {
        return 'Ace';
    }
    else {
    
    return card%13;
    }
}
//hit
function nextcard() {
    return getValue(deal());
}

//check if blackjack
function isBlackjack(hand) {
    if (contains(hand,10) && contains(hand,'Ace')) {
        return true;
    }
    return false;
}

function printDealer(compHand) {
    console.log("Dealer showing " + compHand[0]);//show first card
}

function formatHand(hand) {
    var upper = calcUpper(hand);
    var lower = calcLower(hand);
    
    var str='[' + hand.join(', ')
    str+=']: ' + upper;
    if (lower != upper) {
        str += "/" + lower;
    }
    return str;
}

//computer logic
function compChoice(compHand) {
    var bool=true;
    while(bool){
        console.log("Dealer's Hand: " + formatHand(compHand));
        if(calcUpper(compHand)<17 || calcLower(compHand) == 7) {
            //hit on soft 17
            compHand.push(nextcard());
            if(calcLower(compHand)>21){
                console.log(formatHand(compHand));
                console.log('\nDealer bust. You win!');
                break;
            }
            continue;
        }
        else {
            //stand
            bool=false;
            console.log("Dealer's total is " + calcUpper(compHand) + '\n');
        }
            
    }
        
}

function each(collection,action) {
    if (Array.isArray(collection)) {
        for (var i=0;i<collection.length;i++) {
            action(collection[i]);
            
        }
    }
    else {
        for (var prop in collection) {
            action(collection[prop]);
            
        }
    }
}
function contains(collection,target) {
    var bool=false;
    each(collection, function(x) {
        if(x===target) {
            bool=true;
        }
    });
    return bool;
}

function reduce(collection,predicate,start) {
    var start=0;
    each(collection,function(x) {
         start= predicate(x,start);
    })
    return start;
}

function calcUpper(collection) {
    var aceCount = 0;
    var sum = 0;
    for (var i = 0; i < collection.length; i++) {
        if (collection[i] == 'Ace') {
            aceCount++;
            sum += 11;
        } else {
            sum += collection[i];
        }
    }
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }
    return sum;
}

function calcLower(collection) {
    return reduce(collection, function(curr, total) {
        if (curr == 'Ace') {
            return total + 1;
        } else {
            return total + curr;
        }
    }, 0)
}

function main() {
    //deal hands
    var myCard1=nextcard();
    var compcard1= nextcard();
    var mycard2=nextcard();
    var compcard2= nextcard();
   
    var myHand=[myCard1,mycard2];
    var compHand=[compcard1,compcard2];//dealer hand
    console.log("Your hand: " + formatHand(myHand));
    printDealer(compHand);
    
    if(isBlackjack(compHand)&&isBlackjack(myHand)){
        console.log("Dealer's Hand: " + formatHand(compHand));
        console.log("Your hand: " + formatHand(myHand));
        console.log('Push.')
        return;
    }
    
    if (isBlackjack(compHand)) {
        formatHand(compHand);
        console.log('\nBlackjack. Dealer wins.');
        return;
    }
    
    if(isBlackjack(myHand)){
        formatHand(myHand);
        console.log('\nBlackjack. You win.');
        return;
    }
    
    var choice= playerChoice(myHand);
    if(choice===false){
        return;
    }
    
    compChoice(compHand);
    if(calcUpper(myHand)===calcUpper(compHand)){
        console.log('\nPush.');
        return;
    }
    if(calcUpper(myHand)>calcUpper(compHand)&& calcUpper(myHand)<=21){
        console.log('You Win!');
        return;
        
    }
    
    else if(calcUpper(compHand)<=21&& calcUpper(compHand)>calcUpper(myHand)){
        console.log('You Lose.');
        return;
    }
    
}

main();


function playerChoice(collection) {
    var bool=true;
    
    while(bool) {
        var ask=prompt('Type: hit or stay');
        if(ask==='hit'){
            collection.push(nextcard());
            console.log("Your hand: " + formatHand(collection));
            if (calcUpper(collection)===21){
                break;
            }
            
            if (calcLower(collection)>21){
                console.log('\nBusted. You lose.');
                return false;
                
            }
        
        }
    
        
        else{
            
            
            
            break;
        }
    }
    console.log("Your total is " + calcUpper(collection) + '\n');
}