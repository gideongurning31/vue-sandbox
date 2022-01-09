const generateRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const MONSTER = {
  minDamage: 5,
  maxDamage: 10
};
const PLAYER = {
  minDamage: 4,
  maxDamage: 8,
  minSpecAttackDamage: 12,
  maxSpecAttackDamage: 25,
  specialStack: 3
};

Vue.createApp({
  data() {
    return {
      specialStack: 0,
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
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + '%' };
    },
    playerHealthBar() {
      return { width: this.playerHealth + '%' };
    },
    specialAttackEnabled() {
      return this.specialStack === PLAYER.specialStack;
    }
  },
  methods: {
    basicAttack() {
      this.monsterHealth -= generateRandom(PLAYER.minDamage, PLAYER.maxDamage);
      this.monsterAttack();
      if (this.specialStack < PLAYER.specialStack) {
        this.specialStack++;
      }
    },
    specialAttack() {
      this.specialStack = 0;
      this.monsterHealth -= generateRandom(PLAYER.minSpecAttackDamage, PLAYER.maxSpecAttackDamage);
      this.monsterAttack();
    },
    monsterAttack() {
      this.playerHealth -= generateRandom(MONSTER.minDamage, MONSTER.maxDamage);
    }
  }
}).mount('#game');
