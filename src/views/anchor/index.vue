<template>
    <div ref="container" class="container">
        <div class="wrapper">
            <div class="section"
                 style="height:500px;width:100%"
                 v-for="(item, index) in list"
                 :key="index"
                 :style="{'height':index==0?'1000px':'500px'}">
                <div style="width:100%;height:100%;font-size:30px;text-align:center;font-weight:bold;color:#fff;"
                     :style="{'background':item.backgroundcolor}">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div id="nac" style="height:500px;"></div>
        <nav style="position:fixed;right:30px;top:300px;">
            <a class="nav1" v-for="(item, index) in navList"
               :key="index"
               @click="jump(index)"
               :class="index === currentIndex? 'active' : ''">{{item}}</a>
        </nav>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                scrollTop: 0,
                currentIndex: 0,
                timerId: null,
                list: [{
                    name: "第一条",
                    backgroundcolor: "#90B2A3"
                }, {
                    name: "第二条",
                    backgroundcolor: "#A593B2"
                }, {
                    name: "第三条",
                    backgroundcolor: "#A7B293"
                }, {
                    name: "第四条",
                    backgroundcolor: "#0F2798"
                }, {
                    name: "第五条",
                    backgroundcolor: "gray"
                }],
                navList: [1, 2, 3, 4, 5]
            }
        },

        methods: {
            dataScroll() {
                let {scrollTop} = this.$refs.container
                this.scrollTop = scrollTop
            },
            jump(index) {
                let jump = document.getElementsByClassName('section')
                // 获取需要滚动的距离
                let total = jump[index].offsetTop
                let {scrollTop} = this.$refs.container
                let distance = 50    // 每次移动的距离
                let direction = 1   // 向下为正  向上为负
                if (scrollTop > total) {
                    direction *= -1
                }
                let timerId = this.timerId = setInterval(() => {
                    if (scrollTop !== total) {
                        this.$refs.container.scrollTop += distance * direction
                    }
                    if (direction === 1 && this.$refs.container.scrollTop >= total) {
                        clearInterval(timerId)
                    }
                    if (direction === -1 && this.$refs.container.scrollTop <= total) {
                        clearInterval(timerId)
                    }
                }, 10)
            },
            loadScroll() {
                let sections = document.getElementsByClassName('section')
                for (let i = sections.length - 1; i >= 0; i--) {
                    if (this.scrollTop >= sections[i].offsetTop - 20) {
                        this.currentIndex = i
                        break
                    }
                }
            }
        },
        watch: {
            scrollTop() {
                this.loadScroll()
            }
        },
        mounted() {
            this.$refs.container.addEventListener('scroll', this.dataScroll)
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .container {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }

    .nav1 {
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #eee;
        margin: 10px 0;
    }

    .active {
        color: #fff;
        background: red;
    }
</style>
