<template>
  <div class="root">
    <h1>{{name}}</h1>
    <div id="example-5">
      <select v-model="name">
        <option disabled value="">请选择</option>
        <option>新建时间轴</option>
        <option :key="name" v-for="(item,name) in all">{{name}}</option>
      </select>
    </div>
    <el-button @click="start()" type="primary">开始</el-button>
    <button @click="stop()">停止</button>
    <button @click="change(1)">+1</button>
    <button @click="change(0.5)">+0.5</button>
    <button @click="change(-0.5)">-0.5</button>
    <button @click="change(-1)">-1</button>
    <br><span>{{ timing |  toTimeString }}</span><br>
    <label><textarea id="timeLine" name="" rows="20" v-model="timeLineStr">
    </textarea></label>
    <br>
    <button @click="save">保存</button>
  </div>
</template>

<script>

export default {
  name: 'EditTimeLine',
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

</style>
