<template>
  <div class="keyboard">
    <div class="white" @click="e => this.play(e, 'C', baseKeyIndex * 12 + 0)"></div>
    <div class="black c-sharp" @click="e => this.play(e, 'Db', baseKeyIndex * 12 + 1)"></div>
    <div class="white" @click="e => this.play(e, 'D', baseKeyIndex * 12 + 2)"></div>
    <div class="black d-sharp" @click="e => this.play(e, 'Eb', baseKeyIndex * 12 + 3)"></div>
    <div class="white" @click="e => this.play(e, 'E', baseKeyIndex * 12 + 4)"></div>
    <div class="white" @click="e => this.play(e, 'F', baseKeyIndex * 12 + 5)"></div>
    <div class="black f-sharp" @click="e => this.play(e, 'Gb', baseKeyIndex * 12 + 6)"></div>
    <div class="white" @click="e => this.play(e, 'G', baseKeyIndex * 12 + 7)"></div>
    <div class="black g-sharp" @click="e => this.play(e, 'Ab', baseKeyIndex * 12 + 8)"></div>
    <div class="white" @click="e => this.play(e, 'A', baseKeyIndex * 12 + 9)"></div>
    <div class="black a-sharp" @click="e => this.play(e, 'Bb', baseKeyIndex * 12 + 10)"></div>
    <div class="white" @click="e => this.play(e, 'B', baseKeyIndex * 12 + 11)"></div>
    <div class="white" @click="e => this.play(e, 'C', (baseKeyIndex + 1) * 12 + 0)"></div>
  </div>
</template>

<script>
export default {
  name: 'KeyBoard',
  props: {
    msg: String,
    player: Object
  },
  data() {
    return {
      baseKeyIndex: 4,
    }
  },
  // mounted() {

  // },
  methods: {
    play(e, noteName, pitch) {
      this.$emit('sheetPressed', pitch)
    }
  }
}
</script>

<style scoped>
.keyboard {
  margin:0 auto;
  max-width: 880px;
  position: relative;
}
.white,
.black {
  float: left;
}

.white {
  height: 300px;
  width: 12%;
  border: 2px solid black;
  display: inline-block;
  cursor: pointer;
}

.black {
  height: 200px;
  width: 5%;
  border: 2px solid #000000;
  background-color: #000000;
  display: inline-block;
  cursor: pointer;
  z-index: 10;
  /* left: 15px;
  margin-left: -30px; */
  position: absolute;
}

.white:active,
.white.Active {
  background-color: #e0e0e0;
}

.black:active,
.black.Active {
  background-color: #404040;
}

.c-sharp {
  left:10%;
}

.d-sharp {
  left:22.5%;
}

.f-sharp  {
  left:47%;
}

.g-sharp  {
  left:59.5%;
}

.a-sharp  {
  left:72%;
}

</style>