<template>
    <el-alert v-if="isShow" type="warning" show-icon class="alert">
        <span slot="title">提示说明：</span>
        <slot>
            <div>
                <span>应用创建后无法更改名称</span>
                <el-tooltip placement="right">
                    <span class="active-text"><i class="b-ion-ios-information-outline"></i> 更多</span>
                    <div slot="content">
                        <p>部署类型为通用，应用类型为通用时：<br>
                            如开启资源配额，则说明该应用既可以物理部署又可以容器部署。<br>反之，则只能物理部署。</p>
                        <p>部署类型为容器时：
                            <br>资源配额必须开启，该应用只能容器部署。</p>
                        <p>应用类型为Spring Cloud或Dubbo时：<br>
                            注册中心必填，应用和发布的服务加入了治理功能。
                        </p>ApplicationFormDrawerChildWarning.vue
                    </div>
                </el-tooltip>
            </div>
        </slot>
    </el-alert>
</template>

<script>
    export default {
        name: "ApplicationFormDrawerWarning",
        props: {
            isShow: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="less">
    .alert{
        margin-bottom: 10px;
        .active-text{
            color: #46abf1 !important;
            cursor: pointer;
        }
    }
</style>
