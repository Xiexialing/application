<template>
    <el-drawer
            title="发布服务"
            id="serviceFormDrawer"
            :visible.sync="isShow"
            direction="rtl">
        <div class="inline">
            <h1 class="subtitle">信息导航</h1>
            <div class="navigation-wrapper">
                <Navigation :activeIndex="activeIndex"
                            @clickEvent="onActiveClick"/>
            </div>
        </div>
        <div class="scroll-container" ref="container">
            <div class="section">
                <div class="section-item">
                    <h1 class="subtitle">基本信息</h1>
                    <BaseInfoForm/>
                </div>
                <div class="section-item">
                    <h1 class="subtitle">仓库镜像</h1>
                    <ServiceFormDrawerChildMirrorForm/>
                </div>
                <div class="section-item">
                    <h1 class="subtitle">网络信息（非必填项）</h1>
                    <NetInfoForm/>
                </div>
                <div class="section-item">
                    <h1 class="subtitle">通用配置（非必填项）</h1>
                    <div class="generic-config-wrapper">
                        <ServiceFormDrawerChildGenericConfig/>
                    </div>
                </div>
                <div class="section-item">
                    <h1 class="subtitle">个性化配置（非必填项）</h1>
                    <ServiceFormDrawerChildPersonalConfig/>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import Navigation from './subComponents/ServiceFormDrawerChildNavigation'
    import BaseInfoForm from './subComponents/ServiceFormDrawerChildBaseInfoForm'
    import ServiceFormDrawerChildMirrorForm from './subComponents/ServiceFormDrawerChildMirrorForm'
    import NetInfoForm from './subComponents/ServiceFormDrawerChildNetInfoForm'
    import ServiceFormDrawerChildGenericConfig from './ServiceFormDrawerChildGenericConfig'
    import ServiceFormDrawerChildPersonalConfig from './ServiceFormDrawerChildPersonalConfig'

    export default {
        name: "ApplicationFormDrawer",
        props: ['drawer'],
        data() {
            return {
                isShow: false,
                scrollTop: 0,     // 滚动条scrollTop
                activeIndex: 0,   // 当前激活的step索引
                timerId: null,
                loading: false
            }
        },
        methods: {
            onScrollEventListener() {
                let {scrollTop} = this.$refs.container
                this.scrollTop = scrollTop
            },
            /**
             * 点击导航
             * @param index
             */
            onActiveClick(index) {
                this.activeIndex = index
                let jump = document.getElementsByClassName('section-item')
                // 获取需要滚动的距离
                let total = jump[index].offsetTop
                let {scrollTop} = this.$refs.container
                let distance = 20    // 每次移动的距离
                let direction = 1   // 向下为正  向上为负
                if (scrollTop > total) {
                    direction *= -1
                }
                let timerId = this.timerId = setInterval(() => {
                    if (direction === 1) {
                        if (scrollTop <= total) {
                            this.$refs.container.scrollTop += distance * direction
                        }
                        if (this.$refs.container.scrollTop >= total) {
                            clearInterval(timerId)
                        }
                    }
                    if (direction === -1) {
                        if (scrollTop >= total) {
                            this.$refs.container.scrollTop += distance * direction
                        }
                        if (this.$refs.container.scrollTop <= total) {
                            clearInterval(timerId)
                        }
                    }
                }, 10)
            },
            loadScroll() {
                let sections = document.getElementsByClassName('section-item')
                for (let i = sections.length - 1; i >= 0; i--) {
                    if (this.scrollTop >= sections[i].offsetTop - 120) {
                        this.activeIndex = i
                        break
                    }
                }
            },
            onConfirm() {

            },
            onCancel() {

            },
            onToggle() {
                let {isShow} = this
                this.isShow = !isShow
                if (!isShow) {   // 显示
                    this.$nextTick(() => {
                        this.$refs.container.addEventListener('scroll', this.onScrollEventListener)
                    })
                } else {       // 隐藏  清除绑定的事件和定时器
                    this.$refs.container.removeEventListener('scroll', this.onScrollEventListener)
                    let {timerId} = this
                    if (timerId) {
                        clearInterval(timerId)
                        this.timerId = null
                    }
                }
            }
        },
        watch: {
            scrollTop() {
                this.loadScroll()
            }
        },
        components: {
            Navigation,
            BaseInfoForm,
            NetInfoForm,
            ServiceFormDrawerChildGenericConfig,
            ServiceFormDrawerChildPersonalConfig,
            ServiceFormDrawerChildMirrorForm
        }
    }
</script>

<style lang="less">
    #serviceFormDrawer {
        /*::-webkit-scrollbar {*/
        /*    display: none*/
        /*}*/

        .subtitle {
            margin: 20px;
            padding-left: 10px;
            line-height: 1;
            font-size: 16px;
            border-left: 2px solid #409eff;
            font-weight: normal;
        }

        .el-drawer {
            width: 800px !important;
        }

        .el-drawer__header {
            margin-bottom: 12px;
        }

        .el-drawer__body {
            position: relative;
            height: 100%;
            padding-top: 57px;

            .inline {
                position: absolute;
                top: 0;
                display: flex;
                width: 100%;

                .navigation-wrapper {
                    padding-right: 20px;
                    flex: 1;
                }
            }

            .scroll-container {
                height: 100%;
                padding-bottom: 240px;
                overflow-y: auto;
            }

            .el-form {
                padding-right: 20px;

                .el-select {
                    width: 100%;
                }

                .el-form-item {
                    margin-bottom: 12px;
                }
            }

            .generic-config-wrapper {
                padding: 0 15px 0 30px;
            }

            .heading {
                line-height: 1;
                margin-top: 0;
                padding-left: 10px;
                font-size: 12px;
                color: #3a8ee6;
                font-weight: bold;
                border-left: 2px solid #3a8ee6;
            }
        }
    }
</style>
