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
            text: '投诉对象分析',
            left: 'center'
        },
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 58212, '鞋帽'],
                [57.1, 78254, '书包'],
                [74.4, 41032, '中央空调'],
                [50.1, 12755, '电脑式微波炉'],
                [89.7, 20145, '电暖器'],
                [68.1, 79146, '绞肉机'],
                [19.6, 91852, '钻石玻璃'],
                [10.6, 101852, '宠物用品'],
                [32.7, 20112, '成人座椅']
            ]
        },
        tooltip: {
            trigger: 'item'
        },
        grid: { containLabel: true },
        yAxis: { name: 'amount' },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0, // 设置标签不省略  
                rotate: 45, // 标签倾斜45度  
                formatter: function (value) {
                    if (value.length > 5) { // 如果标签长度超过 5 个字符，则截取前 5 个字符显示
                        return value.substring(0, 5) + '...';
                    } else {
                        return value;
                    }
                }
            },
        },
        visualMap: {
            orient: 'vertical',
            right: 0,
            top: 0,
            min: 10,
            max: 100,
            text: ['100', '0'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to Y axis.
                    y: 'amount',
                    // Map the "product" column to X axis
                    x: 'product'
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