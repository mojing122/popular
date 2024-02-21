<template>
    <div>
        <el-card class="box-card">
            <el-form label-width="100px" style="padding-top: 10px;">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="统计时间">
                            <el-select v-model="timeSelect" value-key="id" class="m-2" placeholder="Select">
                                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="2">
                        <el-button type="primary" plain :icon="Refresh" @click="getData(timeSelect.time)">刷新数据</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-divider />
            <div id="chart" style="width: 100%;height: 400px"></div>
            <div id="chart2" style="width: 100%;height: 400px"></div>
        </el-card>
    </div>
</template>
·
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'
import {
    Refresh
} from '@element-plus/icons-vue'

import { get, post } from "@/http";

/**
 * 计算过去一段时间的起始和结束时间
 * @param day 间隔天数
 */
const clacDate = (day) => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
    return [start, end]
}

/**
 * 格式化日期   YYYY-mm-dd
 * @param date 
 */
const formatDate = (date) => {
    let year = date.toISOString().slice(0, 4);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate
}

type Option = {
    id: number
    label: string
    time: Date[]
}
const timeSelect = ref<Option>({
    id: 1,
    label: "一周以内",
    time: clacDate(7)
})

const options = ref([
    {
        id: 1,
        label: '一周以内',
        time: clacDate(7)
    },
    {
        id: 2,
        label: '一个月内',
        time: clacDate(31)
    },
])

/**
 * 请求一段时间内的统计数据
 * @param time [起始时间，结束时间]
 */
const getData = (time) => {
    const startDate = formatDate(time[0]);
    const endDate = formatDate(time[1]);
    let day = 0;
    if (timeSelect.value.id == 1) {
        day = 1
    } else if (timeSelect.value.id == 2) {
        day = 7
    } else {
        day = 31
    }

    let startDatePastD = new Date(time[0].getTime() - day * 24 * 3600 * 1000);
    const startDatePast = formatDate(startDatePastD);
    let endDatePastD = new Date(time[1].getTime() - day * 24 * 3600 * 1000);
    const endDatePast = formatDate(endDatePastD);

    post('/heiMaoSub/problem-tag/bar', {
        startDate: startDate,
        endDate: endDate,
        startDatePast: startDatePast,
        endDatePast: endDatePast,
    }, (message) => {
        const positiveKeys = Object.keys(message).filter(key => message[key] >= 0.1);
        const negativeKeys = Object.keys(message).filter(key => message[key] <= -0.1);
        const positiveValues = positiveKeys.map(key => message[key]);
        const negativeValues = negativeKeys.map(key => message[key]);
        var Chart = echarts.getInstanceByDom(document.getElementById('chart'));
        Chart.setOption({
            xAxis: {
                data: positiveKeys,
            },
            series: [
                {
                    data: positiveValues
                }]
        })
        var Chart2 = echarts.getInstanceByDom(document.getElementById('chart2'));
        Chart2.setOption({
            xAxis: {
                data: negativeKeys,
            },
            series: [
                {
                    data: negativeValues
                }]
        })
    })

}

onMounted(() => {
    var Chart = echarts.init(document.getElementById('chart'));
    var Chart2 = echarts.init(document.getElementById('chart2'));
    // 绘制图表

    Chart.setOption({
        title: {
            text: '投诉问题风险分析(涨幅)',
            left: 'center'
        },
        yAxis: {
            max: 'dataMax'
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0, // 设置标签不省略  
                formatter: function (value) {
                    if (value.length > 5) { // 如果标签长度超过 5 个字符，则截取前 5 个字符显示
                        return value.substring(0, 5) + '...';
                    } else {
                        return value;
                    }
                }
            },
            data: ['unkonwn'],
            inverse: false,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 7 // only the largest 8 bars will be displayed
        },
        series: [
            {
                realtimeSort: true,
                name: 'X',
                type: 'bar',
                data: [0],
                label: {
                    show: true,
                    position: 'top',
                    valueAnimation: true
                },
                itemStyle: {
                    normal: {
                        color: '#F56C6C'  // 这里设置柱状图的颜色为红色  
                    }
                }
            }
        ],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'

    });

    Chart2.setOption({
        title: {
            text: '投诉问题风险分析(降幅)',
            left: 'center'
        },
        yAxis: {
            min: 'dataMin'
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0, // 设置标签不省略  
                formatter: function (value) {
                    if (value.length > 5) { // 如果标签长度超过 5 个字符，则截取前 5 个字符显示
                        return value.substring(0, 5) + '...';
                    } else {
                        return value;
                    }
                }
            },
            data: ['unkonwn'],
            inverse: false,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 7 // only the largest 8 bars will be displayed
        },
        series: [
            {
                realtimeSort: true,
                name: 'X',
                type: 'bar',
                data: [0],
                label: {
                    show: true,
                    position: 'top',
                    valueAnimation: true
                }
            }
        ],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'

    });

    getData(timeSelect.value.time);

    window.addEventListener('resize', function () {
        Chart.resize();
    });
})
</script>

<style lang="scss" scoped></style>