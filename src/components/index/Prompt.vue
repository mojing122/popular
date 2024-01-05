<template>
    <div>
        <el-card class="box-card">
            <div style="margin-bottom: 20px">
                <el-button size="large" @click="addTab(editableTabsValue)" type="primary">
                    新增类别
                </el-button>
            </div>
            <el-tabs v-model="editableTabsValue" tab-position="left" type="card" closable @edit="handleTabsEdit">
                <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    <div class="edit-pane">
                        <el-input v-model="item.content" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                            placeholder="Please input" />
                        <el-button type="primary" :icon="Check" class="check-button">更新Prompt</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import {
    Check
} from '@element-plus/icons-vue'

let tabIndex = 2
const editableTabsValue = ref('2')


const addTab = (targetName: string) => {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
}

const editableTabs = ref([
    {
        title: '二选一',
        name: '1',
        content: '限制了消费者的选择权，迫使他们只能在几个预设的选项中做出选择，而不给予更多的权利或自主权。',
    },
    {
        title: '药械',
        name: '2',
        content: '药品或者医疗器械相关的产品的质量、效果、合法性等出现问题都属于药械投诉。',
    },
    {
        title: '化妆品',
        name: '3',
        content: '化妆品相关的产品存在质量问题都属于该类别。常见的化妆品包括彩妆产品，护肤品，个人护理品，美发产品，香水及香体产品等。',
    },
    {
        title: '虚假宣传',
        name: '4',
        content: '指商家夸大产品效果或特性，本身的特性与宣传内容不符，使消费者对商品性能产生误解或误导。',
    },
    {
        title: '假货',
        name: '5',
        content: '仅针对高仿、以假充真情况，即包装、品牌一样的非正品的投诉。',
    },
    {
        title: '骑手',
        name: '6',
        content: '消费者针对外卖、跑腿等骑手进行投诉。',
    },
    {
        title: '食品安全',
        name: '7',
        content: '与食品质量、过期食品、卫生问题或配送过程中的食品保存等有关。',
    },
    {
        title: '质量问题',
        name: '8',
        content: '指商品本身存在质量缺陷，比如材料问题、制造缺陷或工艺不良，影响了商品的功能或使用寿命。',
    },
])

const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
            title: '新类别',
            name: newTabName,
            content: '输入新Prompt',
        })
        editableTabsValue.value = newTabName
    } else if (action === 'remove') {
        var instance = ElMessageBox({
            title: '确认删除',
            message: "确定要删除该分类吗?",
            showCancelButton: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        });
        instance.then(function () {
            const tabs = editableTabs.value
            let activeName = editableTabsValue.value
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }

            editableTabsValue.value = activeName
            editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
        }).catch(function () {
            // catch error  
        });

    }
}
</script>

<style scoped>
.edit-pane {
    height: 80vh;

}

.check-button {
    float: right;
    margin-top: 20px;
}
</style>