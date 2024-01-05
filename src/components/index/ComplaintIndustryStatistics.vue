<template>
    <div>
        <el-card class="box-card">
            <el-form label-width="100px" style="padding-top: 10px;">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="统计时间">
                            <el-select v-model="timeSelect" class="m-2" placeholder="Select">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="自定义时间">
                            <el-date-picker v-model="timeSelect2" type="daterange" unlink-panels range-separator="-"
                                start-placeholder="开始日期" end-placeholder="结束日期" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-divider />
            <div id="chart" style="width: 100%;height: 650px"></div>
        </el-card>
    </div>
</template>
·
<script setup>
import * as echarts from 'echarts';

const timeSelect = ref('')
const timeSelect2 = ref('')

const options = [
    {
        value: 'day',
        label: '当天',
    },
    {
        value: 'week',
        label: '本周',
    },
    {
        value: 'month',
        label: '本月',
    }
]

onMounted(() => {
    var Chart = echarts.init(document.getElementById('chart'));
    // 绘制图表

    Chart.setOption({
        title: {
            text: '投诉行业统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '投诉记录',
                type: 'pie',
                radius: [20, 140],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: '他' },
                    { value: 300, name: 't2' },
                    { value: 300, name: 't3' },
                    { value: 300, name: 't4' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });

    window.addEventListener('resize', function () {
        Chart.resize();
    });
})
</script>

<style lang="scss" scoped></style>