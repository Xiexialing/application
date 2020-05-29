<template>
    <div id="resources">
        <el-form size="small" label-width="40px" @keydown.native.enter.prevent>
            <template v-if="!customMode">
                <el-form-item label="CPU">
                    <el-select v-model="form.maxCpu" :transfer="true">
                        <el-option v-for="item in CPUList"
                                   :value="item.value"
                                   :key="item.value"
                                   :label="item.name"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="内存">
                    <el-select v-model="form.maxMem" :transfer="true">
                        <el-option v-for="item in memList"
                                   :value="item.value"
                                   :key="item.value"
                                   :label="item.name"/>
                    </el-select>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="CPU">
                    <div class="inline-wrapper">
                        <div class="slider-wrapper">
                            <el-slider v-model="form.maxCpu2"
                                       :step="1"
                                       :min="1"
                                       :max="10000"
                                       :precision="0"
                                       show-input/>
                        </div>
                        <div class="select-wrapper">
                            <el-select v-model="form.maxCpuUnit" :transfer="true">
                                <el-option value="m" label="微核"/>
                                <el-option value="c" label="核"/>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="内存">
                    <div class="inline-wrapper">
                        <div class="slider-wrapper">
                            <el-slider v-model="form.maxMem2"
                                       :step="1"
                                       :min="1"
                                       :max="10000"
                                       show-input/>
                        </div>
                        <div class="select-wrapper">
                            <el-select v-model="form.maxMemUnit"
                                       :transfer="true">
                                <el-option value="M" label="M"/>
                                <el-option value="G" label="G"/>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
            </template>
            <el-form-item label="GPU">
                <el-input v-model="form.maxGPU"
                          placeholder="请输入正整数"
                          @input="onNumberInput($event, 'maxGPU')"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="customMode" @click="onToggle">重置</el-button>
                <el-button type="primary" v-else @click="onToggle">自定义</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "GenericConfigChildPort",
        data() {
            return {
                customMode: false,  // 自定义模式
                form: {
                    maxCpu: '200m',
                    maxCpu2: 200,
                    maxCpuUnit: 'm',
                    maxMem: '256M',
                    maxMem2: 256,
                    maxMemUnit: 'M',
                    maxGPU: ''
                },
                CPUList: [
                    {name: "200微核", value: "200m"},
                    {name: "400微核", value: "400m"},
                    {name: "600微核", value: "600m"},
                    {name: "800微核", value: "800m"},
                    {name: "1核", value: "1"},
                    {name: "2核", value: "2"},
                    {name: "4核", value: "4"}
                ],
                memList: [
                    {name: "256M", value: "256M"},
                    {name: "512M", value: "512M"},
                    {name: "1G", value: "1G"},
                    {name: "2G", value: "2G"},
                    {name: "4G", value: "4G"},
                    {name: "8G", value: "8G"},
                    {name: "16G", value: "16G"},
                    {name: "32G", value: "32G"},
                    {name: "64G", value: "64G"}
                ]
            }
        },
        methods: {
            onNumberInput(value, type) {
                value = parseInt(value) || 0
                this.form[type] = value
            },
            /**
             *模式切换
             */
            onToggle() {
                this.customMode = !this.customMode
            }
        }
    }
</script>

<style scoped lang="less">
    #resources {
        .inline-wrapper {
            display: flex;

            .slider-wrapper {
                flex: 1;
                margin-right: 30px;
            }
            .select-wrapper{
                width: 100px;
            }
        }
    }
</style>
