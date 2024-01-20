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
                    <el-col :span="12">
                        <el-form-item label="统计范围">
                            <el-date-picker :disabled="timeSelect.id != 4" v-model="timeSelect.time" type="daterange"
                                unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="2">
                        <el-button type="primary" plain :icon="Refresh" @click="getData(timeSelect.time)">刷新数据</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-divider />
            <div id="chart" style="width: 100%;height: 650px"></div>
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
    id: 2,
    label: "一周以内",
    time: clacDate(7)
})

const options = ref([
    {
        id: 1,
        label: '当日',
        time: clacDate(1)
    },
    {
        id: 2,
        label: '一周以内',
        time: clacDate(7)
    },
    {
        id: 3,
        label: '一个月内',
        time: clacDate(31)
    },
    {
        id: 4,
        label: '自定义',
        time: clacDate(1)
    },
])

/**
 * 请求一段时间内的统计数据
 * @param time [起始时间，结束时间]
 */
const getData = (time) => {
    const startDate = formatDate(time[0]);
    const endDate = formatDate(time[1]);

    post('/heiMaoSub/classifyName', {
        startDate: startDate,
        endDate: endDate,
    }, (message) => {
        const name = []
        const value = []
        message.forEach(element => {
            name.push(element.name)
            value.push(element.value)
        });
        var Chart = echarts.getInstanceByDom(document.getElementById('chart'));
        Chart.setOption({
            xAxis: {
                data: name,
            },
            series: [
                {
                    data: value
                }]
        })

    })

}


onMounted(() => {
    var Chart = echarts.init(document.getElementById('chart'));
    // 绘制图表

    Chart.setOption({
        title: {
            text: '投诉对象分析',
            left: 'center'
        },
        yAxis: {
            max: 'dataMax'
        },
        xAxis: {
            type: 'category',
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