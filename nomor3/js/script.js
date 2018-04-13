var player1 = "";
var player2 = "";
var throwdice = function() {
  return Math.floor(6 * Math.random()) + 1;
}
function Player(turn) {
  this.roll = 0;
  this.roll2=0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.turn = turn;
  this.playerName;
}

Player.prototype.rollone = function() {
  if (this.roll === 1 || this.roll2 === 1) {
    this.tempscore = 0;
    alert("Maaf " + this.playerName + ", dadu pertama/kedua kamu bernilai 1. Kini giliran kamu sudah selesai.");
  }
  else {
    var hasil = this.roll+this.roll2;
    this.tempscore += hasil;
  }
}

Player.prototype.hold = function() {
  this.totalscore += this.tempscore;
  this.tempscore = 0;
  alert(this.playerName + ", giliranmu sudah selesai, sekarang gerakan mousenya");
}

Player.prototype.winnerCheck = function() {
  if (this.totalscore >= 100) {
    alert(this.playerName + " adalah Pemenangnya");
  }
}

Player.prototype.newGame = function() {
  this.roll = 0;
  this.roll2=0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.playerName = "";
}

// User Interface
$(document).ready(function() {

  $("button#start").click(function(event) {
    player1 = new Player(true);
    player2 = new Player(false);
    $(".player-console").show();
    $(".start-menu").hide();

    var player1Name = $(".player1Name").val();
    $("#player1Name").text(player1Name);

    var player2Name = $(".player2Name").val();
    $("#player2Name").text(player2Name);

    player1.playerName = player1Name;
    player2.playerName = player2Name;

  });

  $("button#player1-roll").click(function(event) {
    player1.roll = throwdice();
    $("#die-roll-1").text(player1.roll);
    document.querySelector('.dice').src = 'gambar/dice-' + player1.roll + '.png';
    player1.roll2 = throwdice();
    $("#die-roll-1-1").text(player1.roll2);
    document.querySelector('.dice2').src = 'gambar/dice-' + player1.roll2 + '.png';
    player1.rollone();
    $("#round-total-1").text(player1.tempscore);
  });

  $("button#player2-roll").click(function(event) {
    var lanjut=player2;
    player2.roll = throwdice();
    $("#die-roll-2").text(player2.roll);
    document.querySelector('.dice').src = 'gambar/dice-' + player2.roll + '.png';
    player2.roll2 = throwdice();
    $("#die-roll-2-2").text(player2.roll2);
    document.querySelector('.dice2').src = 'gambar/dice-' + player2.roll2 + '.png';
    player2.rollone();
    $("#round-total-2").text(player2.tempscore);
  });

  $("button#player1-hold").click(function(event) {
    player1.hold();
    $("#total-score-1").text(player1.totalscore);
    $("#round-total-1").empty();
    $("#die-roll-1").empty();
    $("#die-roll-1-1").empty();
    player1.winnerCheck();
  });

  $("button#player2-hold").click(function(event) {
    player2.hold();
    $("#total-score-2").text(player2.totalscore);
    $("#round-total-2").empty();
    $("#die-roll-2").empty();
    $("#die-roll-2-2").empty();
    player2.winnerCheck();
  });

});