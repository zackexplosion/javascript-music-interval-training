<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <!-- <button @click="start" > Play </button> -->

  <img style="width: 8em;cursor: pointer;" src="./assets/play_and_refresh.png" @click="start"/>


  <div style="height: 150px">
    <h2 v-if="started">請跟著彈</h2>
    <h1
      style="height:40px"
    >{{playedNotes.join(' ')}}</h1>
    <!-- <h1 v-show="playedNotes.length <= 0">點擊Play開始或重新播放</h1> -->
    <h1
    style="height:40px"
    class="answer"
    :class="isAnswerCorrect">{{playerPlayedNotes.join(' ')}}</h1>
  </div>
  <Keyboard @sheet-pressed="e => virtualKeyBoardPressed(e)"/>
</template>

<script>
import Keyboard from '@/components/Keyboard.vue'

var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new window.WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');


const NOTES = [
  {
    index: 60,
    name: 'C4'
  },
  {
    index: 62,
    name: 'D4'
  },
  {
    index: 64,
    name: 'E4'
  },
  {
    index: 65,
    name: 'F4'
  },
  {
    index: 67,
    name: 'G4'
  },
  {
    index: 69,
    name: 'A4'
  },
  {
    index: 71,
    name: 'B4'
  },
  {
    index: 72,
    name: 'C5'
  },
]
export default {
  name: 'App',
  components: {
    Keyboard
  },
  data() {
    return {
      started: false,
      playedNotes: [],
      playerPlayedNotes: [],
      isAnswerCorrect: '',
      audioPlayer: undefined
    }
  },
  mounted() {
    var midi = null;  // global MIDIAccess object

    // var outputDevice = null
    var self = this

    // function sendMiddleD() {
    //   var noteOnMessage = [0x90, 62, 0x7f];    // note on, middle C, full velocity
    //   // var output = midiAccess.outputs.get(portID);
    //   outputDevice.send(noteOnMessage); // sends the message.
    //   outputDevice.send( [0x80, 62, 0x7f], window.performance.now() + 500.0 );
    // }

  // function echoMIDIMessage( event ) {
  //   // console.log(event.data)
  //   if (outputDevice) {
  //     outputDevice.send( event.data, window.performance.now() + 500.0 );
  //   }
  // }

    function onMessage(event) {
      // console.log(event)
      // const [channel, number, value] = event.data;
      const [channel, number] = event.data;
      if (channel > 130) { // pressed
        self.handlePlayerInput(number)
      }
    }


    function onMIDISuccess( midiAccess ) {
      console.log( "MIDI ready!", midiAccess );
      midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
      console.log(midi.inputs)
      listInputsAndOutputs(midi)
    }

    function listInputsAndOutputs( midiAccess ) {
      for (let entry of midiAccess.inputs) {
        var input = entry[1];
        console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
          "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
          "' version:'" + input.version + "'" );
          input.onmidimessage = onMessage
      }

      for (let entry of midiAccess.outputs) {
        var output = entry[1];
        console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
          "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
          "' version:'" + output.version + "'" );

        // outputDevice = output
        self.outputDevice = output
      }
    }

    function onMIDIFailure(msg) {
      console.log( "Failed to get MIDI access - " + msg );
    }

    navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
  },
  methods: {
    async start() {
      this.started = true
      this.playedNotes = []
      this.playerPlayedNotes = []
      this.playTest()
    },
    async playTest(count = 2) {
      return new Promise(async(  resolve) => {

        // let notes_to_play = []
        for(let i = 0; i < count; i++ ){
          let index = Math.floor(Math.random()* NOTES.length)
          // notes_to_play.push(NOTES[index])
          // p.push(this.playSound(NOTES[index]))
          let noteToPlay = NOTES[index]
          this.playedNotes.push(noteToPlay.name)
          await this.playSound(noteToPlay.index)
        }
        resolve()
      })
    },
    handlePlayerInput(pitch){
      if (this.playerPlayedNotes.length >= 2) {
        this.playerPlayedNotes = []
      }

      try {
        const note = NOTES.find(_ => _.index === pitch)
        this.playerPlayedNotes.push(note.name)
      } catch (error) {
        // console.log
      }
    },
    virtualKeyBoardPressed(pitch ) {
      pitch += 12
      this.handlePlayerInput(pitch)
      this.playSound(pitch)
    },
    playSound(pitch = 60) {


      return new Promise((resolve) => {
        player.queueWaveTable(audioContext, audioContext.destination, window._tone_0000_JCLive_sf2_file, 0, pitch, 0.75);

        var delay = 500
        // player.queueWaveTable(audioContext, audioContext.destination, window._tone_0000_JCLive_sf2_file, 0, pitch, 0.75);
        // player.queueWaveTable(audioContext, audioContext.destination, _tone_0090_JCLive_sf2_file, 0, pitch, 0.75);
        // if (this.outputDevice) {
        //   var noteOnMessage = [0x90, note, 0x7f];    // note on, middle C, full velocity
        //   // var output = midiAccess.outputs.get(portID);
        //   this.outputDevice.send(noteOnMessage); // sends the message.
        //   this.outputDevice.send( [0x80, note, 0x7f], window.performance.now() + delay );
        // }

        setTimeout(function() {
          resolve()
        }, delay)
      })
    },
    matchTestNotes(){
      this.isAnswerCorrect = ''
      const NEXT_RUN_DELAY = 1000
      // const self = this
      if(this.playedNotes.length < 2 || this.playerPlayedNotes.length < 2) return


      let note1 = false
      let note2 = false


      let n1Index = this.playerPlayedNotes.length - 2
      if (n1Index <= 0) n1Index = 0

      // console.log('n1Index', n1Index)
      if (
        this.playerPlayedNotes.length > 0 &&
        this.playedNotes[0] === this.playerPlayedNotes[n1Index]) {
        note1 = true
      }


      if (
        this.playerPlayedNotes.length > 1 &&
        this.playedNotes[1] === this.playerPlayedNotes[this.playerPlayedNotes.length - 1] ) {
        console.log('note 2 correct')
        note2 = true
      }

      if ( note1 && note2) {
        // delay next run
        this.isAnswerCorrect = 'correct'
        setTimeout(() => {
          this.start()
        }, NEXT_RUN_DELAY)
      }else {
        this.isAnswerCorrect = 'wrong'
      }
      // console.log(this.playedNotes)
      // console.log(v)
    }
  },
  watch: {
    playerPlayedNotes: {
      deep:true,
      handler: function(v) {
        this.matchTestNotes(v)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  padding: 0;
}

</style>

<style scoped>

.answer.wrong {
  color: red;
}

.answer.correct {
  color: green;
}
h1,h2 {
  padding:0;
  margin:0;
}
</style>
