function getRandomValue(min,max) {
 return Math.floor(Math.random()* (max - min) + min);
}

const app = Vue.createApp({
 data() {
    return {
        playerhealth: 100,
        monsterhealth: 100,
        currentRound: 0,
        winner: null,
        logMessages: []
    };
 },
 computed: {
  monsterBarStyles() {
    if(this.monsterhealth <= 0)
    { return { width: '0%'};

    }
   return {
       width: this.monsterhealth + '%'
   };

  },

  playerBarStyles() {
      if(this.playerhealth <= 0)
      { return { width: '0%'};

      }
   return {
       width: this.playerhealth + '%'} ;
  },
  specialAttack() {
      return this.currentRound % 3 !== 0;
  }

 },
 watch:{
     playerhealth(value) {
     if (value <= 0 && this.monsterhealth <= 0) {
     this.winner = 'draw';
     } else if (value <= 0) {
     this.winner = 'monster';
     }
     },

     monsterhealth(value) {
        if (value <= 0 && this.playerhealth <= 0) {
            this.winner = 'draw';

        } else if (value <= 0) {
            this.winner = 'player';
        }

     }
 },


 methods: {
     surrender() {
     this.winner = 'monster';
    },


     startGame() {
      this.playerhealth = 100;
      this.monsterhealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
     },

     attackMonster() {
       this.currentRound++;
       const attackValue =  getRandomValue(5,12);
       this.monsterhealth -= attackValue;
       this.addLogMessage('player', 'attack', attackValue);
       this.attackPlayer();
     },
     attackPlayer () {
        const attackValue =  getRandomValue(8,15);
        this.playerhealth -= attackValue;
        this.addLogMessage('monster', 'attack', attackValue);
     },
     specialAttackMonster() {
        this.currentRound++;
        const attackValue =  getRandomValue(10,25);
        this.monsterhealth -= attackValue;
        this.addLogMessage('player', 'attack', attackValue);
        this.attackPlayer();
     },

     healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8,20);
      if (this.playerhealth + healValue > 100) {
        this.playerhealth = 100;
      } else { 
          this.playerhealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();

     },
     addLogMessage(who, what, value) {
      this.logMessages.unshift({
          actionBy: who,
          actionType: what,
          actionValue: value
      });

     }

 }
  
});
app.mount('#game');