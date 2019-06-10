<template>
  <div class="root">
    <h1>{{name}}</h1>
    <div id="example-5">
      <el-select v-model="name" size="mini">
        <el-option disabled value="">请选择</el-option>
        <el-option value="新建时间轴">新建时间轴</el-option>
        <el-option :key="names" v-for="(item,names) in all" :value="names">{{names}}</el-option>
      </el-select>
    </div>
    <el-button @click="start()">开始</el-button>
    <el-button @click="stop()">停止</el-button>
    <br>
    <button @click="change(1)">+1</button>
    <button @click="change(0.5)">+0.5</button>
    <button @click="change(-0.5)">-0.5</button>
    <button @click="change(-1)">-1</button>
    <br><span class="timeNow">{{ timing |  toTimeString }}</span><br>
    <label><textarea id="timeLine" name="" rows="20" v-model="timeLineStr">
    </textarea></label>
    <br>
    <button @click="save">保存</button>
    <button @click="delete1">删除</button>
  </div>
</template>

<script>

import { Button, Select, Option } from 'element-ui'
export default {
  name: 'EditTimeLine',
  components: {
    elButton: Button,
    elSelect: Select,
    elOption: Option
  },
  data () {
    return {
      timing: 0,
      timeLine: [],
      name: '新建时间轴',
      all: {}
    }
  },
  methods: {
    start () {
      this.reset()
      this.timer = setInterval(
        () => {
          this.timing = parseInt(this.timing * 10 + 1) / 10
        }, 100
      )
    },
    stop: function () {
      this.reset()
    },
    change: function (val) {
      this.timing += val
    },
    reset () {
      this.timing = 0
      clearInterval(this.timer)
      this.timer = null
    },
    save () {
      console.log(this.timeLine)
      if (this.name === '新建时间轴') {
        let n = prompt('输入倒计时模板名称')
        if (n) {
          this.name = n
        }
      }
      if (this.name) {
        this.all[this.name] = this.timeLine
        window.localStorage.setItem('timeLine', JSON.stringify(this.all))
      } else {
        alert('名称不能为空')
      }
    },
    delete1 () {
      if (confirm(`确定删除时间轴 ${this.name} 嘛`)) {
        delete this.all[this.name]
        window.localStorage.setItem('timeLine', JSON.stringify(this.all))
      } else {
        alert('SB')
      }
    },
    addTime (e) {
      if (e.code === 'KeyE') {
        this.timeLine.push({
          timing: this.timing,
          tip: '待修改'
        })
      }
    }
  },
  computed: {
    timeLineStr: {
      get: function () {
        let s = ''
        this.timeLine && this.timeLine.forEach(item => {
          s += item.timing + ' ' + item.tip + '\n'
        })
        return s
      },
      set: function (newTimeLine) {
        let a = newTimeLine.split('\n')
        let l = []
        let q
        a.forEach(str => {
          if (str) {
            q = str.split(' ')
            l.push({
              timing: parseFloat(q[0]),
              tip: q[1]
            })
          }
        })
        l.sort(function (a, b) {
          return a.timing - b.timing
        })
        this.timeLine = l
      }
    }
  },
  watch: {
    name: function (newP, oldP) {
      this.timeLine = this.all[newP]
    }
  },
  filters: {
    toTimeString: function (num) {
      let minute = Math.floor(num / 60).toString().padStart(2, '0')
      let sec = (num % 60).toString().padStart(2, '0')
      return minute + ':' + sec
    }
  },
  mounted () {
    document.addEventListener('keyup', this.addTime)
    let t = window.localStorage.getItem('timeLine')
    console.log(t)
    if (!t) {
      t = {
        '测试': [
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
  destroyed () {
    document.removeEventListener('keyup', this.addTime)
  }
}

</script>

<style scoped>
  .timeNow {
    color: #66ccff;
    font-weight: bold;
    font-size: 30px;
  }
</style>
