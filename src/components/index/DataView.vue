<template>
    <div style="border-radius: 5px;padding-top: 0.1px;">
        <el-card class="box-card">
            <el-row>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="总数" :value=totalCount />
                    <div class="countdown-footer">投诉总数</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="当日更新" :value=todayUpdate />
                    <div class="countdown-footer">当日投诉数量</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="本周更新" :value=weekUpdate />
                    <div class="countdown-footer">本周投诉数量</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="本月更新" :value=monthUpdate />
                    <div class="countdown-footer">本月投诉数量</div>
                </el-col>
            </el-row>
        </el-card>

        <el-row>
            <el-col :xs="24" :md="12">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-build" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :md="12">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-category" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-card class="box-card" style="height: 350px;">
            <div id="chart-trend" style="width: 100%;height: 350px"></div>
        </el-card>

    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { get, post } from "@/http";
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const totalCount = ref(100);
const todayUpdate = 20;
const weekUpdate = 30;
const monthUpdate = 50;

const getData = () => {
    post('heiMaoSub/total', {}, (message) => {
        totalCount.value = message
    })

}

getData();

onMounted(() => {
    var ChartBuild = echarts.init(document.getElementById('chart-build'));
    var ChartCategory = echarts.init(document.getElementById('chart-category'));
    var ChartTrend = echarts.init(document.getElementById('chart-trend'));
    // 绘制图表

    ChartBuild.setOption({
        title: {
            text: '预留接口'
        },
        tooltip: {},
        xAxis: {
            data: ['三元组导入', '映射式构建', '抽取式构建']
        },
        yAxis: {},
        series: [
            {
                name: '次数',
                type: 'bar',
                data: [150, 230, 224],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.7, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                barWidth: 60,
            }
        ]
    });

    ChartCategory.setOption({
        title: {
            text: '预留接口'
        },
        tooltip: {},
        xAxis: {
            data: ['MySQL', 'CSV', '文本文档']
        },
        yAxis: {},
        series: [
            {
                name: '条数',
                type: 'bar',
                data: [250, 230, 125],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.7, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                barWidth: 60,
            }
        ]
    });

    ChartTrend.setOption({
        title: {
            text: '数据趋势图'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['7月', '8月', '9月', '10月', '11月', '12月', '1月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 564],
                type: 'line',
                lineStyle: { color: '#a0cfff' },
                areaStyle: { color: 'rgba(160, 207, 255, 0.3)', },
                smooth: true
            }
        ]
    });


    window.addEventListener('resize', function () {
        ChartBuild.resize();
        ChartCategory.resize();
        ChartTrend.resize();
    });
})


</script>

<style scoped>
.el-col {
    text-align: center;
}

.countdown-footer {
    margin-top: 8px;
}

.statistic-card {
    padding: 7px;
}
</style>