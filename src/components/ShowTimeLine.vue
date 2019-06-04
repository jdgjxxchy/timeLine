<template>
  <div class="root">
    <h1>{{name}}</h1>
    <div id="example-5">
      <select v-model="name">
        <option disabled value="">请选择</option>
        <option :key="name" v-for="(item,name) in all">{{name}}</option>
      </select>
    </div>
    <label>语音提前<input type="text" v-model="delay"></label><span>间隔小于语音延迟的不会报时</span><br>
    <span>{{ timing | toInt }}</span><br>
    <el-button type="primary" @click="start()">开始</el-button>
    <button @click="stop()">停止</button>
    <button @click="change(1)">+1</button>
    <button @click="change(0.5)">+0.5</button>
    <button @click="change(-0.5)">-0.5</button>
    <button @click="change(-1)">-1</button>
    <div class="timeLine">
      <ul>
        <li :key="item.timing" v-for="(item, index) in realTip">
          <span class="tips">{{ item.timing | toTimeString( item.tip ) }}</span>
          <span class="countDown" v-if="index < 2">
            <span class="countDownBar"
                  :style="{width: (item.timing-timing)/(item.timing-startTime[index]) * 100 + 'px'}"></span>
            <span>{{ item.timing-timing | toInt }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'readTimeLine',
  data () {
    return {
      timeLine: [
        {
          timing: 2,
          tip: '开爆发'
        },
        {
          timing: 4,
          tip: '躲圈'
        },
        {
          timing: 6,
          tip: '绕背'
        },
        {
          timing: 8.4,
          tip: '火牢花语'
        },
        {
          timing: 13,
          tip: '扶摇'
        },
        {
          timing: 21,
          tip: '聂云走'
        }
      ],
      timer: null,
      timing: 0,
      realTip: [],
      speechSU: {},
      delay: 0.8,
      startTime: [0, 0],
      all: {},
      name: ''
    }
  },
  methods: {
    start () {
      this.reset()
      this.timer = setInterval(
        () => {
          this.timing += 0.1
          if (this.realTip.length === 0) {
            return this.reset()
          }
          if (Math.abs(this.timing - this.realTip[0].timing + parseFloat(this.delay)) < 0.01) {
            this.speak(this.realTip[0].tip)
          }
          if (Math.abs(this.timing - this.realTip[0].timing) < 0.01) {
            this.startTime.shift()
            this.startTime.push(this.realTip[0].timing)
            this.realTip.shift()
          }
        }, 100
      )
    },
    stop: function () {
      this.reset()
    },
    change: function (val) {
      this.timing += val
      this.realTip = this.filterArray()
    },
    filterArray () {
      return this.timeLine && this.timeLine.filter(item => item.timing > this.timing)
    },
    reset () {
      this.timing = 0
      clearInterval(this.timer)
      this.timer = null
      this.realTip = this.filterArray()
      this.startTime = [0, 0]
    },
    speak (str) {
      this.speechSU.text = str
      window.speechSynthesis.speak(this.speechSU)
    }
  },
  filters: {
    toInt: function (num) {
      return num.toFixed(1)
    },
    toTimeString: function (num, tip) {
      const secInt = Math.floor(num)
      let minute = Math.floor(secInt / 60).toString().padStart(2, '0')
      let sec = (secInt % 60).toString().padStart(2, '0')
      let mic = ((num - secInt) * 10).toFixed(0).toString()
      return minute + ':' + sec + '.' + mic + ' ' + tip
    }
  },
  watch: {
    name: function (newP, oldP) {
      this.timeLine = this.all[newP]
      this.reset()
      console.log(this.timeLine)
    }
  },
  created () {
    this.reset()
    this.speechSU = new window.SpeechSynthesisUtterance()
    let t = window.localStorage.getItem('timeLine')
    console.log(t)
    if (!t) {
      t = {
        'testing2': [
          {
            timing: 1,
            tip: '测试'
          }
        ]
      }
    } else {
      t = JSON.parse(t)
    }
    this.all = t
  },
  beforeDestroy () {
    this.reset()
  }
}
</script>

<style scoped>
  .root {
    margin-left: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    text-align: left;
  }

  .countDownBar {
    display: inline-block;
    width: 100px;
    background: #66ccff;
    height: 1em;
    transition: all 0.2s;
  }
  .tips {
    /*position: absolute;*/
  }
</style>
