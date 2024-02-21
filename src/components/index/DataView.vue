<template>
    <div style="border-radius: 5px;padding-top: 0.1px;">
        <el-card class="box-card">
            <el-row>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="总数" :value=countData.sum />
                    <div class="countdown-footer">投诉总数</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="当日更新" :value=countData.dayly />
                    <div class="countdown-footer">当日投诉数量</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="本周更新" :value=countData.weekly />
                    <div class="countdown-footer">本周投诉数量</div>
                </el-col>
                <el-col :xs="12" :span="6" class="statistic-card">
                    <el-statistic title="本月更新" :value=countData.monthly />
                    <div class="countdown-footer">本月投诉数量</div>
                </el-col>
            </el-row>
        </el-card>

        <el-row>
            <el-col :xs="24" :md="8">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-object" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :md="8">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-problem" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :md="8">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-industry" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-col :xs="24" :md="16">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-trend" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :md="8">
                <el-card class="box-card" style="height: 350px;">
                    <div id="chart-word" style="width: 100%;height: 350px"></div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { get, post } from "@/http";
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import 'echarts-wordcloud';

const countData = ref({
    "sum": 0,
    "dayly": 0,
    "weekly": 0,
    "monthly": 0
});
const todayUpdate = 21;
const weekUpdate = 34;
const monthUpdate = 57;

const getData = () => {
    post('heiMaoSub/total', {}, (message) => {
        countData.value = message
    })

}

const InitChart = (Chart, title) => {
    Chart.setOption({
        title: {
            text: title,
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
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

}

const SetChartData = (Chart, data) => {
    Chart.setOption({
        series: [
            {
                data: data
            }]
    })
}

const RefreshChart = () => {
    // 获取当前日期  
    let now = new Date();
    // 获取7天前的日期
    let sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    // 格式化日期为 yyyy-mm-dd 格式  
    let endDate = now.toISOString().slice(0, 10);
    let startDate = sevenDaysAgo.toISOString().slice(0, 10);

    post('/heiMaoSub/classifyName', {
        startDate: startDate,
        endDate: endDate,
    }, (message) => {
        var ChartObject = echarts.getInstanceByDom(document.getElementById('chart-object'));
        SetChartData(ChartObject, message)

    })

    post('/heiMaoSub/problem-tag/chart', {
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
        var ChartProblem = echarts.getInstanceByDom(document.getElementById('chart-problem'));
        SetChartData(ChartProblem, top10Data)
    })

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
        var ChartIndustry = echarts.getInstanceByDom(document.getElementById('chart-industry'));
        SetChartData(ChartIndustry, top10Data)

    })

    // 刷新趋势图
    post('/heiMaoSub/weeklyData', {
        startDate: startDate,
        endDate: endDate,
    }, (message) => {
        var date = [];
        var value = [];
        for (let i = 0; i < message.length; i++) {
            date.push(message[i].date.substring(5, 10))
            value.push(message[i].value)
        }
        var ChartTrend = echarts.init(document.getElementById('chart-trend'));
        ChartTrend.setOption({
            xAxis: {
                data: date
            },
            series: [
                {
                    data: value,
                }
            ]
        });
    })

    // 刷新词云
    post('/heiMaoSub/wordle', {}, (message) => {
        var ChartWordCloud = echarts.getInstanceByDom(document.getElementById('chart-word'));
        SetChartData(ChartWordCloud, message)

    })

}

const InitTrendChart = (Chart) => {

    Chart.setOption({
        title: {
            text: '数据趋势图'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'line',
                lineStyle: { color: '#a0cfff' },
                areaStyle: { color: 'rgba(160, 207, 255, 0.3)', },
                smooth: true
            }
        ]
    });


}

const InitWordCloud = (Chart) => {
    Chart.setOption(
        {
            title: {
                text: '投诉词云'
            },
            grid: {
                bottom: 120
            },
            backgroundColor: '#fff',
            series: [
                {
                    type: 'wordCloud',
                    sizeRange: [10, 40], // 用来调整字的大小范围
                    rotationRange: [0, 90],// 每个词旋转的角度范围和旋转的步进
                    rotationStep: 90,
                    gridSize: 10, // 用来调整词之间的距离
                    shape: 'pentagon',// shape这个属性虽然可配置，但是在词的数量不太多的时候，效果不明显，它会趋向于画一个椭圆
                    //位置的配置
                    width: '100%',
                    height: '90%',
                    drawOutOfBound: false,// 允许词太大的时候，超出画布的范围
                    layoutAnimation: true,// 布局的时候是否有动画
                    textStyle: {
                        normal: {
                            // 颜色可以用一个函数来返回字符串，这里是随机色
                            color: function () {
                                // Random color
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            },
                            fontFamily: 'sans-serif',
                            fontWeight: '300'
                        }
                    },
                    //data格式是一个数组
                    data: []
                }
            ]

        }
    )

}

onMounted(() => {
    var ChartObject = echarts.init(document.getElementById('chart-object'));
    var ChartProblem = echarts.init(document.getElementById('chart-problem'));
    var ChartIndustry = echarts.init(document.getElementById('chart-industry'));
    var ChartTrend = echarts.init(document.getElementById('chart-trend'));
    var ChartWordCloud = echarts.init(document.getElementById('chart-word'));

    // 绘制图表
    InitChart(ChartObject, "投诉对象统计");
    InitChart(ChartProblem, "投诉问题统计");
    InitChart(ChartIndustry, "投诉行业统计");
    InitTrendChart(ChartTrend);
    InitWordCloud(ChartWordCloud);

    // 刷新统计数据
    getData();

    // 刷新图表
    RefreshChart();

    window.addEventListener('resize', function () {
        ChartObject.resize();
        ChartProblem.resize();
        ChartIndustry.resize();
        ChartTrend.resize();
        ChartWordCloud.resize();
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