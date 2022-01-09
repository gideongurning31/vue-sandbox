const generateRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const MONSTER = {
  minDamage: 5,
  maxDamage: 10
};
const PLAYER = {
  minDamage: 4,
  maxDamage: 8
};

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    };
  },
  watch: {
    playerHealth(value) {
      console.log('PLAYER HEALTH:', value);
    },
    monsterHealth(value) {
      console.log('MONSTER HEALTH:', value);
    }
  },
  methods: {
    basicAttack() {
      this.monsterHealth -= generateRandom(PLAYER.minDamage, PLAYER.maxDamage);
      this.monsterAttack();
    },
    monsterAttack() {
      this.playerHealth -= generateRandom(MONSTER.minDamage, MONSTER.maxDamage);
    }
  }
}).mount('#game');
