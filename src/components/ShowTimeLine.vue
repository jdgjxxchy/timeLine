<template>
  <div class="root">
<!--    <h1>{{name}}</h1>-->
    <div id="example-5">
      <label for=""><el-select v-model="name">
        <el-option disabled value="请选择">请选择</el-option>
        <el-option :key="name" v-for="(item,name) in all" :value="name">{{name}}</el-option>
      </el-select></label>
    </div>
    <label>语音提前<el-input type="text" v-model="delay"/></label><br>
    <span class="timeNow">{{ timing | toTimeString }}</span><br>
    <el-button type="primary" @click="start()">开始</el-button>
    <el-button  @click="stop()">停止</el-button>
    <br>
    <button @click="change(1)">+1</button>
    <button @click="change(0.5)">+0.5</button>
    <button @click="change(-0.5)">-0.5</button>
    <button @click="change(-1)">-1</button>
    <div class="timeLine">
      <ul>
        <li :key="item.timing" v-for="(item, index) in realTip">
          <span class="timing">{{ item.timing | toTimeString }}</span>
          <span class="tips">{{item.tip}}</span>
          <span class="countDown" v-if="index < 2">
            <!--                  :style="{width: (item.timing-timing)/(item.timing-startTime[index]) * 100 + 'px'}">-->
            <span class="countDownBar"
                  :style="timing | createStyle(item.timing, startTime[index], item.color)">
            </span>
            <span>{{ item.timing-timing | toInt }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Button, Select, Option, Input } from 'element-ui'
export default {
  name: 'readTimeLine',
  components: {
    elButton: Button,
    elSelect: Select,
    elOption: Option,
    elInput: Input
  },
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
    toTimeString: function (num) {
      const secInt = Math.floor(num)
      let minute = Math.floor(secInt / 60).toString().padStart(2, '0')
      let sec = (secInt % 60).toString().padStart(2, '0')
      let mic = ((num - secInt) * 10).toFixed(0).toString()
      return minute + ':' + sec + '.' + mic
    },
    createStyle: function (t, it, st, color) {
      return {width: (it - t) / (it - st) * 100 + 'px', background: color}
    }
  },
  watch: {
    name: function (newP, oldP) {
      let colorList = ['#66ccff', '#ff0000', '#006699', '#99CC33', '#FF9933', '#666699', '#FF9999', '#CCCCFF', '#990033']
      let colorIndex = 0
      let colorDic = {}
      this.timeLine = this.all[newP]
      this.reset()
      this.timeLine.forEach(item => {
        if (item.tip in colorDic) {
          item.color = colorDic[item.tip]
        } else {
          item.color = colorDic[item.tip] = colorList[colorIndex]
          colorIndex += 1
        }
      })
      console.log(this.timeLine)
    },
    delay: function (newD) {
      window.localStorage.setItem('delay', newD)
    }
  },
  created () {
    this.reset()
    this.speechSU = new window.SpeechSynthesisUtterance()
    let t = window.localStorage.getItem('timeLine')
    this.delay = window.localStorage.getItem('delay') || 1.5
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
    /*background: #66ccff;*/
    height: 1em;
    transition: all 0.2s;
  }
  .tips {
    /*position: absolute;*/
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .timeNow {
    color: #66ccff;
    font-weight: bold;
    font-size: 30px;
  }
  button {
    margin-top: 10px;
  }
  .el-input {
    width: 100px;
    margin-top: 10px;
  }
</style>
