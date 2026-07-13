var emojis = ["🐶","🐱","🦊","🐸","🦁","🐧","🦋","🦄"]

var deck = []
var index = 0
while(index < emojis.length)
{
  deck.push(emojis[index])
  deck.push(emojis[index])
  index += 1
}
console.log(deck)
shuffle(deck) 
console.log(deck) 

var grid = document.getElementById("grid")

grid.innerHTML = ""

var tempIndex = 0 
while(tempIndex < deck.length) 
{
  var cardElement = document.createElement("div")
  cardElement.className = "card"
  cardElement.dataset.emoji = deck[tempIndex]
  cardElement.addEventListener("click", onCardClick)
  grid.appendChild(cardElement)
  tempIndex += 1
}
/*
Card = {
  className: For css properties / Designing,
  dataset: {
    emoji: "🐶"
    },
  classList: {
    "flipped",  //when a card is flipped
    "matched"   //when matched with another box
  }
  eventListener: function(onCardClick)
}
*/


var flipped = []
var locked = false

matched = 0
moves = 0

document.getElementById("moves").textContent = moves
document.getElementById("pairs").textContent = matched





function onCardClick(e)
{
  var card =e.currentTarget
  console.log("On click function")
  if(locked)
    return
  if(card.classList.contains("flipped")) 
    return
  if(card.classList.contains("matched")) 
    return
  card.classList.add("flipped")
  flipped.push(card)
  card.textContent = card.dataset.emoji
  console.log(flipped)
  if(flipped.length == 2)
  {
    console.log("flipped 2")
    locked = true
    moves++
    document.getElementById("moves").textContent = moves  //frontend update
    console.log("Check if matching or not")
    checkMatched()
  }
}

function checkMatched()
{
  var card1 = flipped[0]
  var card2 = flipped[1]
  
  if(card1.dataset.emoji === card2.dataset.emoji)
  {
      card1.classList.add("matched")
      card2.classList.add("matched")
      card1.classList.remove("flipped")
      card2.classList.remove("flipped")
      flipped = []
      locked = false
      matched++
      document.getElementById("pairs").textContent = matched
      if(matched == 8)
        showWin()
  }
  else
  {
    setTimeout(function(){
      card1.classList.remove("flipped")
      card1.textContent = ""
      card2.classList.remove("flipped")
      card2.textContent = ""
      flipped = []
      locked = false
    }, 1000)//milli-seconds
  }
}

function shuffle(arr)
{
  index = arr.length
  while(index > 0)
    {
      var tempIndex = Math.floor(Math.random() * index)
      index -= 1
      var temp = arr[index]
      arr[index] = arr[tempIndex]
      arr[tempIndex] = temp
    }
}

function showWin()
{
  var ratings = getRatings(moves)
  var message = "You have won in "+moves+" moves!" +ratings
  document.getElementById("message").textContent = message
}
function getRatings(moves)
{
  if(moves <= 12)
  {
    return "Perfect Memory!!!"
  }
  else if(moves <= 18)
  {
    return "Great Job!!"
  }
  else if(moves <= 24)
  {
    return "Good Efforts!"
  }
  else
    return "Keep Practicing!"
}

/* Game planning---------
1. Track all box opens in a variable and update it in moves           //done
2. divide the boxes open into pairs and update it in moves            //done
3. whenever opening the grid, I have to check if 2 are open or not    //done
4. If 2 are opened, check if both are same or not                     //done
5. if same, mark them as green and keep them open forever             //done
6. if not same, close both boxes                                      //done
7. Track how many pairs are matched in a variable and update it in pairs  //done
8. Show Win when all the boxes are matched              
9. If user clicks on new game, reset the game and start again.
*/