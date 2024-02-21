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
                            <el-date-picker :disabled="timeSelect.id != 3" v-model="timeSelect.time" type="daterange"
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
    {
        id: 3,
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

    post('/heiMaoSub/industry-tag/chart', {
        startDate: startDate,
        endDate: endDate,
    }, (message) => {
        var formattedData = [];
        for (var key in message) {
            if (message.hasOwnProperty(key)) {
                formattedData.push({
                    "name": key,
                    "value": message[key]
                });
            }
        }
        formattedData.sort(function (a, b) {
            return b.value - a.value;
        });

        // 只取前10个数据项    
        var top10Data = formattedData.slice(0, 10);
        var Chart = echarts.getInstanceByDom(document.getElementById('chart'));
        Chart.setOption({
            series: [
                {
                    data: top10Data
                }]
        })

    })

}

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
                radius: '50%',
                data: [
                    {
                        "value": 0,
                        "name": "unknown"
                    }
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

    getData(timeSelect.value.time);

    window.addEventListener('resize', function () {
        Chart.resize();
    });
})
</script>

<style scoped></style>