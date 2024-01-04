<template>
    <div>
        <el-card class="box-card" style="height: 550px;">
            <div id="chart" style="width: 100%;height: 550px"></div>
        </el-card>
    </div>
</template>
·
<script setup>
import * as echarts from 'echarts';

onMounted(() => {
    var Chart = echarts.init(document.getElementById('chart'));
    // 绘制图表

    Chart.setOption({
        title: {
            text: '投诉问题统计',
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