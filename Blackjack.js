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
//generate next card
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

function printDealer(hand) {
    console.log("Dealer showing " + hand[0]);//show first card
}
//format print statement
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
function compChoice(hand) {
    var bool=true;
    while(bool){
        //deal next card
        console.log("Dealer's Hand: " + formatHand(hand));
        if(calcUpper(hand)<17 || calcLower(hand) == 7) {
            //hit on soft 17
            hand.push(nextcard());
            if(calcLower(hand)>21){
                console.log(formatHand(hand));
                console.log('\nDealer bust. You win!');
                break;
            }
            continue;
        }
        else {
            //stand
            bool=false;
            console.log("Dealer's total is " + calcUpper(hand) + '\n');
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
    
    each(collection,function(x) {
         start= predicate(x,start);
    })
    return start;
}
//calculate total value of hands
function calcUpper(hand) {
    var aceCount = 0;
    var sum = 0;
    //assume all Aces are worth 11
    for (var i = 0; i < hand.length; i++) {
        if (hand[i] == 'Ace') {
            aceCount++;
            sum += 11;
        } else {
            sum += hand[i];
        }
    }
    //subtract 10 for each ace until sum less than 21
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }
    //returns highest possible number less than 21
    return sum;
}
//all Aces equals 1, calculate lowest possible value of hand
function calcLower(hand) {
    return reduce(hand, function(curr, total) {
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
   
    var myHand=[myCard1,mycard2];//your hand
    var compHand=[compcard1,compcard2];//dealer hand
    console.log("Your hand: " + formatHand(myHand));
    printDealer(compHand);//show dealers first card
    
    //if both players blackjack
    if(isBlackjack(compHand)&&isBlackjack(myHand)){
        console.log("Dealer's Hand: " + formatHand(compHand));
        console.log("Your hand: " + formatHand(myHand));
        console.log('\nPush.')
        return;
    }
    //check computer blackjack
    if (isBlackjack(compHand)) {
        formatHand(compHand);
        console.log('\nBlackjack. Dealer wins.');
        return;
    }
    //check player blackjack
    if(isBlackjack(myHand)){
        formatHand(myHand);
        console.log('\nBlackjack. You win.');
        return;
    }
    //call player choice
    var choice= playerChoice(myHand);
    //if player busts-end game
    if(choice===false){
        return;
    }
    //call dealer choice
    compChoice(compHand);
    
    //same hand
    if(calcUpper(myHand)===calcUpper(compHand)){
        console.log('Push.');
        return;
    }
    //determine winner
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

//player logic
function playerChoice(hand) {
    var bool=true;
    
    while(bool) {
        //hit 
        var ask=prompt('Type: hit or stay');
        if(ask==='hit'){
            hand.push(nextcard());
            console.log("Your hand: " + formatHand(hand));
            if (calcUpper(hand)===21){
                break;
            }
            
            if (calcLower(hand)>21){
                console.log('\nBusted. You lose.');
                return false;
                
            }
        }//stay
        else{
            break;
        }
    }
    console.log("Your total is " + calcUpper(hand) + '\n');
}
