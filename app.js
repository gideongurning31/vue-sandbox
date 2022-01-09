const generateRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const MONSTER = {
  minDamage: 5,
  maxDamage: 10
};
const PLAYER = {
  minDamage: 4,
  maxDamage: 8,
  specialStack: 3,
  minSpecAttackDamage: 10,
  maxSpecAttackDamage: 15,
  healStack: 2,
  minHealValue: 10,
  maxHealValue: 12
};

Vue.createApp({
  data() {
    return {
      specialStack: 0,
      playerHealth: 100,
      monsterHealth: 100,
      gameState: null,
      battleLog: []
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.playerHealth = 0;
        this.gameState = 'YOU LOST';
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.monsterHealth = 0;
        this.gameState = 'YOU WIN';
      }
    }
  },
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + '%' };
    },
    playerHealthBar() {
      return { width: this.playerHealth + '%' };
    },
    specialAttackEnabled() {
      return this.specialStack === PLAYER.specialStack;
    },
    healEnabled() {
      return this.specialStack === PLAYER.healStack;
    }
  },
  methods: {
    basicAttack() {
      const damage = generateRandom(PLAYER.minDamage, PLAYER.maxDamage);
      this.monsterHealth -= damage;
      this.monsterAttack();
      if (this.specialStack < PLAYER.specialStack) {
        this.specialStack++;
      }

      this.addBattleLog('Player', 'deal damage', damage);
    },
    specialAttack() {
      const damage = generateRandom(PLAYER.minSpecAttackDamage, PLAYER.maxSpecAttackDamage);
      this.specialStack = 0;
      this.monsterHealth -= damage;
      this.monsterAttack();

      this.addBattleLog('Player', 'deal damage with special attack', damage);
    },
    healPlayer() {
      const healValue = generateRandom(PLAYER.minHealValue, PLAYER.maxHealValue);
      if (this.playerHealth + healValue < 100) {
        this.specialStack = 0;
        this.playerHealth += healValue;
        this.monsterAttack();
        this.addBattleLog('Player', 'heals himself', healValue);
      }
    },
    monsterAttack() {
      const damage = generateRandom(MONSTER.minDamage, MONSTER.maxDamage);
      this.playerHealth -= damage;
      this.addBattleLog('Monster', 'deal damage', damage);
    },
    surrender() {
      this.gameState = 'YOU LOST';
    },
    restart() {
      this.specialStack = 0;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameState = null;
      this.battleLog = [];
    },
    addBattleLog(by, action, value) {
      this.battleLog.unshift({ by, action, value });
    }
  }
}).mount('#game');
