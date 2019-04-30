/*
NOTE: You will need to add and modify code in this file to complete this project.
I have defined a few functions and variables to help guide you but that doesn't mean no other variables or functions are necessary.
If you think you have a better / different way to do things, you are free to do so :)
*/

const monsterNames = [
  'Bigfoot',
  'Centaur',
  'Cerberus',
  'Chimera',
  'Ghost',
  'Goblin',
  'Golem',
  'Manticore',
  'Medusa',
  'Minotaur',
  'Ogre',
  'Vampire',
  'Wendigo',
  'Werewolf',
];



const RARITY_LIST = ['Common', 'Unusual', 'Rare', 'Epic'];
const GAME_STEPS = ['SETUP_PLAYER', 'SETUP_BOARD', 'GAME_START'];
let gameStep = 0;
let board = []; // The board holds all the game entities. It is a 2D array.


// Potion item
const potion = {
    name: 'potion',
    value: 5,
    rarity: 0,
    use: function(target){
      target.hp += 25;
    }
}

// Bomb item
const bomb = {
  name: 'bomb',
  value: 7,
  rarity: 0,
  use: function(target){
    target.hp -= 50;
  }
}

const items = [potion, bomb]; // Array of item objects. These will be used to clone new items with the appropriate properties.

const monsters = []; // Array of monsters
const allItems = []; // All items currently in play
var monsterCounter = 0;

var player = {
  position: {
    rows: 0,
    columns: 0,
  },
  level: 1,
  items: [],
  skills: [],
  attack: 10,
  speed: 2000,
  hp: 100,
  gold: 0,
  exp: 0,
  type: 'player',
  levelUp: function(){
    if(this.exp >= this.level*10){
      print('Leveling up!', 'green');
      this.exp -= this.level*10;
      this.level += 1;
      this.speed = 4000/this.level;
      this.hp = this.level*100;
      this.attack = this.level*10;
    }
    else{
      print('Not enough exp to level up');
    }
  }

}; // The player object

// Utility function to print messages with different colors. Usage: print('hello', 'red');
function print(arg, color) {
  if (typeof arg === 'object') console.log(arg);
  else console.log('%c' + arg, `color: ${color};`);
}

// Prints all attributes of the current player 
function printPlayer(){
  print(player);
}

// Prints a blue string with the indicated number of dashes on each side of the string. Usage: printSectionTitle('hi', 1) // -hi-
// We set a default value for the count to be 20 (i.e. 20 dashes '-')
function printSectionTitle(title, count = 20) {
  var left = '';
  var right = '';

  // For loop creates dashes on each side of the title as high as the counter   
  for(var i = 0; i < count; i++){
    left+= '-';
    right+= '-';
  }
  print((left +title +right), 'blue');
}

// Sets the name property for the player and prints a message to notice the user of the change
function setName(name) {
  player.name = name;
  print('Your name has been set to ' +name);
  print(player.name);
  
}

// Returns a new object with the same keys and values as the input object
function clone(entity) {
  const temp = entity;
  return temp;

}

// returns true or false to indicate whether 2 different objects have the same keys and values
function assertEquality(original, clone) {
  var outcome = true;

  if(Object.keys(original).length == Object.keys(clone).length){
    for(var i = 0; i < Object.keys(original).length; i++){
      if(Object.keys(original)[i] != Object.keys(clone)[i]){
       outcome = false;
      }
    }

  }
  if(Object.values(original).length == Object.values(clone).length){
    for(var i = 0; i < Object.values(original).length; i++){
      if(Object.values(original)[i] != Object.values(clone)[i]){
       outcome = false;
      }
    }

  }
  return outcome;
}

// Uses a player item (note: this consumes the item, need to remove it after use)
// itemName is a string. target is an entity (typically player)
function useItem(itemName, target) {
  if(itemName == 'potion'){
    if(player.items.includes(potion)){
      print('Using potion...');
      potion.use(player);
      print('HP is now ' +player.hp);
    }
    else{
      print('No potions to use.');
    }
  }
  else if(itemName == 'bomb'){
    if(player.items.includes(bomb)){
      print('Using bomb...');
      bomb.use(target);
      print('Bomb used, target HP is now ' +target.hp);
    }
    else{
      print('No bombs to use.');
    }
  }
  else{
    print('Invalid item for use');
  }
}

// Uses a player skill (note: skill is not consumable, it's useable infinitely besides the cooldown wait time)
// skillName is a string. target is an entity (typically monster).
function useSkill(skillName, target) {

}

// Updates the value of 'board' by creating the rows and columns
// First and last rows are walls
// First and last columns are walls
// All the other entities are grass entities
function createBoard(rows, columns) {
  //Not needed, board creates on initialization
}

// Updates the board by setting the entity at the entity position
// An entity has a position property, each board cell is an object with an entity property holding a reference to the entity at that position
// When a player is on a board cell, the board cell keeps the current entity property (e.g. monster entity at that position) and may need to have an additional property to know the player is there too.
function updateBoard(entity) {
  //Not needed, board updates on creation of entities
}

// Sets the position property of the player object to be in the middle of the board
// You may need to use Math methods such as Math.floor()
function placePlayer() {
  board[player.position.rows][player.position.columns] = "P";
}

// Creates the board and places player
function initBoard(rows, columns) {
  print(rows);
  print(columns);
  for(var i = 0; i < rows; i++){
    board.push([]);
    for(var j = 0; j < columns ; j++){
      board[i].push('.');
    }
  }
  for(var i = 0; i < columns ; i++){
    board[0][i] = "#";
  }
  for(var i = 0; i < columns; i++){ 
    board[board.length - 1][i] = "#";
  }
  for(var i = 0; i < rows; i++){
    board[i][0] = "#";
    board[i][columns - 1] = "#"; 
  }

  player.position.rows = Math.floor(rows/2);
  player.position.columns = Math.floor(columns/2);
  printPlayer();
  placePlayer();
}

// Prints the board
function printBoard() {
  row = '';
  for(var i =0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      row += board[i][j];
    }
    print(row);
    row = '';
  }
}

// Creates a monster object with a random name with the specified level, items and position
// The entity properties (e.g. hp, attack, speed) must respect the rules defined in the README
function createMonster(level, items, position) {

  const monster = {
    name: monsterNames[Math.floor(Math.random() * monsterNames.length-1)],
    level : level,
    position: {
      rows: position.rows,
      columns: position.columns,
    },
    items: items,
    number: monsterCounter,
    hp: level*100,
    attack: level*10,
    speed: 6000/level,
    type: 'monster',

  };

  monsterCounter+= 1; // Increment monster counter to keep track of each monsters position in the array

  print(monster);
  board[monster.position.rows][monster.position.columns] = "M";
  monsters.push(monster);
  print(monsters);

}

// Creates a tradesman object with the specified items and position. hp is Infinity
function createTradesman(items, position) {

  const tradesman = {
    name: 'Tradesman',
    hp: Infinity,
    items: items,
    position: {
      rows: position.rows,
      columns: position.columns,
    },
    type: 'tradesman',
  }

  print(tradesman);
  board[tradesman.position.rows][tradesman.position.columns] = "T";
}

// Creates an item entity by cloning one of the item objects and adding a the position and type properties.
function createItem(itemIdx, position) {
  board[position.rows][position.columns] = "I";
  tempItem = items[itemIdx];
  tempItem.position = position;
  allItems.push(tempItem);


}

// Creates a dungeon entity at the specified position
function createDungeon(position) {
  const dungeon = {
    position: position,
    type: 'dungeon',
  }

  print(dungeon);
  board[dungeon.position.rows][dungeon.position.columns] = "D";
}

// Searches the monsters array for monster with same position as (row, column)
// and returns that monster object index to begin fight
function searchMonsters(row, column){
  for(var i = 0; i < monsters.length; i++){
    if(monsters[i].position.rows == row && monsters[i].position.columns == column){
      return i;
    }
  }

}

// Searches the items array for monster with same position as (row, column)
// and returns that item object index 
function searchItems(row, column){
  for(var i = 0; i < allItems.length; i++){
    if(allItems[i].position.rows == row && allItems[i].position.columns == column){
      print(i);
      return i;
    }
  }
}

// Function for monster to attack player
function monsterAttack(monsterIdx){

  // Players hp goes down by current monsters attack
  player.hp -= monsters[monsterIdx].attack;
  // If player dead, end game and stop fighting
  if(player.hp <= 0){
    print('You have died, enter restart() to restart the game', 'red');
    clearInterval(matk);
    clearInterval(patk);
    return;
  }
  if(!assertEquality(player.position, monsters[monsterIdx].position)){
    clearInterval(patk);
    clearInterval(matk);
    return;
  }
  print(player.name +' hit! ', 'red');
  print(player.hp +' left', 'red');

}

// Function to restart the game, refresh window
function restart(){
  location.reload();
}

// Buy a potion from tradesmen, check if enough gold and act accordingly
function buyPotion(){
  if(player.gold >= 5){
    print('You have bought a potion for 5 gold coins. You now have ' +player.gold +' gold left.');
    player.gold -= 5;
  }
  else{
    print('You do not have enough gold to buy a potion.');
  }
}

// Buy a bomb from tradesmen, check if enough gold and act accordingly
function buyBomb(){
  if(player.gold >= 7){
    print('You have bought a bomb for 7 gold coins. You now have ' +player.gold +' gold left.');
    player.gold -= 7;
  }
  else{
    print('You do not have enough gold to buy a bomb.');
  }
}

// Sell potion to tradesman, check if you have potion in items inventory
// and sell if you do
function sellPotion(){
  
    if(player.items.includes(potion)){
      print('You have sold a potion for 5 coins, which have been credited to your gold count.');
      var tempIndex = player.items.indexOf(potion);
      player.items.splice(tempIndex, 1);
      player.gold += 5;
      print(player.items);
    }
    else{
      print('You have no potions to sell.')
    }
  
}

// Sell bomb to tradesman, check if you have bomb in items inventory
// and sell if you do
function sellBomb(){
  
  if(player.items.includes(bomb)){
    print('You have sold a bomb for 7 coins, which have been credited to your gold count.');
    var tempIndex = player.items.indexOf(bomb);
    player.items.splice(tempIndex, 1);
    player.gold += 7;
    print(player.items);
  }
  else{
    print('You have no bomb to sell.')
  }

}

// Encounter a tradesman
function encounterTradesman(){
  print('You have encountered a tradesman. You may buy items(potion, bomb) or sell items for their value.')
  print('Enter buyPotion() and buyBomb() to buy these items, or sellPotion() and sellBomb() to sell them.');
}

// Function for player to attack monster
function playerAttack(monsterIdx){

  monsters[monsterIdx].hp -= player.attack;
  // If monster dead, grant exp and steal all of his items
  if(monsters[monsterIdx].hp < 0){
    print('You have killed ' +monsters[monsterIdx].name +' ' +monsters[monsterIdx].level*2 +' experience points have been granted, and you now have their items.', 'green');
    player.exp += monsters[monsterIdx].level*2;
    for(var i = 0; i < monsters[monsterIdx].items.length; i++){
      player.items.push(monsters[monsterIdx].items[i]);
    }
    printPlayer();
    clearInterval(patk);
    clearInterval(matk);
    return;
  }
  if(!assertEquality(player.position, monsters[monsterIdx].position)){
    clearInterval(patk);
    clearInterval(matk);
    return;
  }
  print(monsters[monsterIdx].name +' hit! ', 'orange');
  print(monsters[monsterIdx].hp +' left', 'orange');

}

// Global player attack and monster attack vars to set and clear intervals
var matk;
var patk;

// Moves the player in the specified direction
// You will need to handle encounters with other entities e.g. fight with monster
function move(direction) {
  switch (direction) {
    // Player moves up
    case 'U':
      // Encounter a wall, try again
      if(board[player.position.rows - 1][player.position.columns] == '#'){
        print("You ran into a wall, try again!");
      }
      // Encounter a monster
      else if(board[player.position.rows - 1][player.position.columns] == 'M'){
        let monsterRow = player.position.rows - 1;
        let monsterColumn = player.position.columns;
        // Search all monsters in play for the one at this position
        var index = searchMonsters(monsterRow, monsterColumn);
        // Move the player onto monster
        board[player.position.rows - 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows - 1;
        print('You are now fighting ' +monsters[index].name);
          // Fight
          matk = setInterval(function(){ monsterAttack(index); }, monsters[index].speed);
          patk = setInterval(function(){ playerAttack(index); }, player.speed);

      }
      // Player moves to dungeon
      else if(board[player.position.rows - 1][player.position.columns] == 'D'){
        if(player.items.includes('key')){
          print('You have made it into the dungeon and won the game! Enter restart() to play again.', 'green');
        }
        else{
          print('You do not have the key to enter the dungeon. Rumour has it a monster is holding it.', 'pink');
        }
      }
      // Player moves to grass
      else if(board[player.position.rows - 1][player.position.columns] == '.'){
        board[player.position.rows - 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows - 1;
      }
      // Player encounters tradesman
      else if(board[player.position.rows - 1][player.position.columns] == 'T'){
        board[player.position.rows - 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows - 1;
        encounterTradesman();
      }
      // Encounter Item
      else if(board[player.position.rows - 1][player.position.columns] == 'I'){
        print('Item encountered. You have picked it up and it is now in your inventory');
        var ind = searchItems(player.position.rows - 1, player.position.columns);
        player.items.push(allItems[ind]);
        board[player.position.rows - 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows - 1;
      }
      break;
    // Player moves down
    case 'D':
      if(board[player.position.rows + 1][player.position.columns] == '#'){
        print("You ran into a wall, try again!");
      }
        // Encounter a monster
        else if(board[player.position.rows + 1][player.position.columns] == 'M'){
          let monsterRow = player.position.rows + 1;
          let monsterColumn = player.position.columns;
          var index = searchMonsters(monsterRow, monsterColumn);
          // Move the player onto monster
          board[player.position.rows + 1][player.position.columns] = "P";
          board[player.position.rows][player.position.columns] = ".";
          player.position.rows = player.position.rows + 1;
          print('You are now fighting ' +monsters[index].name);
            // Fight
            matk = setInterval(function(){ monsterAttack(index); }, monsters[index].speed);
            patk = setInterval(function(){ playerAttack(index); }, player.speed);
  
        }
        // Player moves to dungeon
        else if(board[player.position.rows + 1][player.position.columns] == 'D'){
          if(player.items.includes('key')){
            print('You have made it into the dungeon and won the game! Enter restart() to play again.', 'green');
          }
          else{
            print('You do not have the key to enter the dungeon. Rumour has it a monster is holding it.', 'pink');
          }
        }
      // Player moves to grass
      else if(board[player.position.rows + 1][player.position.columns] == '.'){
      board[player.position.rows + 1][player.position.columns] = "P";
      board[player.position.rows][player.position.columns] = ".";
      player.position.rows = player.position.rows + 1;
      }
      // Player encounters tradesman
      else if(board[player.position.rows + 1][player.position.columns] == 'T'){
        board[player.position.rows + 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows + 1;
        encounterTradesman();
      }
      // Encounter Item
      else if(board[player.position.rows + 1][player.position.columns] == 'I'){
        print('Item encountered. You have picked it up and it is now in your inventory');
        var ind = searchItems(player.position.rows + 1, player.position.columns);
        player.items.push(allItems[ind]);
        board[player.position.rows + 1][player.position.columns] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.rows = player.position.rows + 1;
      }
      break;
    // Player moves left
    case 'L':
      if(board[player.position.rows][player.position.columns - 1] == '#'){
        print("You ran into a wall, try again!");
      }
        // Encounter a monster
        else if(board[player.position.rows][player.position.columns - 1] == 'M'){
          let monsterRow = player.position.rows;
          let monsterColumn = player.position.columns - 1;
          var index = searchMonsters(monsterRow, monsterColumn);
          // Move the player onto monster
          board[player.position.rows][player.position.columns - 1] = "P";
          board[player.position.rows][player.position.columns] = ".";
          player.position.columns = player.position.columns - 1;
          print('You are now fighting ' +monsters[index].name);
            // Fight
            matk = setInterval(function(){ monsterAttack(index); }, monsters[index].speed);
            patk = setInterval(function(){ playerAttack(index); }, player.speed);
  
        }
        // Player moves to dungeon
        else if(board[player.position.rows][player.position.columns - 1] == 'D'){
          if(player.items.includes('key')){
            print('You have made it into the dungeon and won the game! Enter restart() to play again.', 'green');
          }
          else{
            print('You do not have the key to enter the dungeon. Rumour has it a monster is holding it.', 'pink');
          }
        }
      // Move onto grass
      else if(board[player.position.rows][player.position.columns - 1] == '.'){
      board[player.position.rows][player.position.columns - 1] = "P";
      board[player.position.rows][player.position.columns] = ".";
      player.position.columns = player.position.columns - 1;
      }
      // Player encounters tradesman
      else if(board[player.position.rows][player.position.columns - 1] == 'T'){
        board[player.position.rows][player.position.columns - 1] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.columns = player.position.columns - 1;
        encounterTradesman();
      }
      // Encounter Item
      else if(board[player.position.rows][player.position.columns - 1] == 'I'){
        print('Item encountered. You have picked it up and it is now in your inventory');
        var ind = searchItems(player.position.rows, player.position.columns - 1);
        player.items.push(allItems[ind]);
        board[player.position.rows ][player.position.columns - 1] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.columns = player.position.columns - 1;
      }
      break;
    case 'R':
      if(board[player.position.rows][player.position.columns + 1] == '#'){
        print("You ran into a wall, try again!");
      }
        // Encounter a monster
        else if(board[player.position.rows][player.position.columns + 1] == 'M'){
          let monsterRow = player.position.rows;
          let monsterColumn = player.position.columns + 1;
          var index = searchMonsters(monsterRow, monsterColumn);
          // Move the player onto monster
          board[player.position.rows][player.position.columns + 1] = "P";
          board[player.position.rows][player.position.columns] = ".";
          player.position.columns = player.position.columns + 1;
          print('You are now fighting ' +monsters[index].name);
            // Fight
            matk = setInterval(function(){ monsterAttack(index); }, monsters[index].speed);
            patk = setInterval(function(){ playerAttack(index); }, player.speed);
  
        }
        // Player moves to dungeon
        else if(board[player.position.rows][player.position.columns + 1] == 'D'){
          if(player.items.includes('key')){
            print('You have made it into the dungeon and won the game! Enter restart() to play again.', 'green');
          }
          else{
            print('You do not have the key to enter the dungeon. Rumour has it a monster is holding it.', 'pink');
          }
        }
      // Move onto grass
      else if(board[player.position.rows][player.position.columns + 1] == '.'){
      board[player.position.rows][player.position.columns + 1] = "P";
      board[player.position.rows][player.position.columns] = ".";
      player.position.columns = player.position.columns + 1;
      }
      // Player encounters tradesman
      else if(board[player.position.rows][player.position.columns + 1] == 'T'){
        board[player.position.rows][player.position.columns + 1] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.columns = player.position.columns + 1;
        encounterTradesman();
      }
      // Encounter Item
      else if(board[player.position.rows][player.position.columns + 1] == 'I'){
        print('Item encountered. You have picked it up and it is now in your inventory');
        var ind = searchItems(player.position.rows, player.position.columns + 1);
        player.items.push(allItems[ind]);
        board[player.position.rows][player.position.columns + 1] = "P";
        board[player.position.rows][player.position.columns] = ".";
        player.position.columns = player.position.columns + 1;
      }
      break;
  }
  printBoard();
}


function setupPlayer() {
  printSectionTitle('SETUP PLAYER');
  print("Please enter your name using the setName function. Usage: setName('Bob')");
  print("Once you're done, go to the next step with next()");
}

function setupBoard() {
  printSectionTitle('SETUP BOARD');
  print('Please create a board using initBoard(rows, columns)');
  print(
    'Setup monsters, items and more using createMonster(attr), createItem(itemIdx, pos), createTradesman(items, pos), createDungeon(pos), updateBoard(entity)'
  );
  print("Once you're done, go to the next step with next()");
}

function startGame() {
  printSectionTitle('START GAME');
  print('Hello ' + player.name);
  print("You are ready to start your adventure. Use move('U' | 'D' | 'L' | 'R') to get going.");
  printBoard();
}

function gameOver() {
  printSectionTitle('GAME OVER');
}

function next() {
  gameStep++;
  run();
}

function run() {
  switch (GAME_STEPS[gameStep]) {
    case 'SETUP_PLAYER':
      setupPlayer();
      break;
    case 'SETUP_BOARD':
      setupBoard();
      break;
    case 'GAME_START':
      startGame();
      break;
  }
}

print('Welcome to the game!', 'gold');
print('Follow the instructions to setup your game and start playing');

run();




/* setName(‘test’)
next()
initBoard(7,19)
printBoard()
createMonster(1, [clone(items[0]), clone(items[1])], {rows: 3, columns: 10})
createMonster(1, [clone(items[0])], {rows: 3, columns: 8})
createTradesman(items.map((item) => clone(item)), {rows: 2, columns:8})
createItem(0, {rows: 4, columns: 4})
createDungeon({rows: 2, columns: 2})
next()
**** (for key)createMonster(1,[clone(items[0]),clone(items[1]), 'key'],{rows:5, columns:4})
*/ 