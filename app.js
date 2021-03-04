function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
        this.monsterScore++;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
        this.playerScore++;
      }
    },
  },

  computed: {
    playerHealthStyles() {
      if (this.playerhealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    monsterHealthStyles() {
      if (this.monsterhealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    disableSpecialAttacks() {
      return this.currentRound % 3 !== 0;
    },
    disableHealButton() {
      return this.currentRound % 2 !== 0;
    },
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 6);
      this.monsterHealth -= attackValue;
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessages("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 20);
      this.monsterHealth -= attackValue;
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessages("player", "heal", healValue);
      this.attackPlayer();
    },
    restartGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0);
      this.winner = null;
      this.logMessages = [];
    },
    surrenderToMonster() {
      this.winner = "monster";
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
