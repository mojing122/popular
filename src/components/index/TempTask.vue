<template>
    <div>
        <el-card class="box-card">
            <el-tabs type="border-card" v-model="activeTab">
                <el-tab-pane label="配置Prompt" name="first">
                    <div style="margin-bottom: 20px">
                        <el-button size="large" @click="addTab(editableTabsValue)" type="primary">
                            新增类别
                        </el-button>
                    </div>
                    <el-tabs v-model="editableTabsValue" tab-position="left" type="card" closable @edit="handleTabsEdit">
                        <el-tab-pane v-for="item in editableTabs" :key="item.id" :label="item.title" :name="item.id">
                            <div class="edit-pane">
                                <el-input v-model="item.title" placeholder="Please input" style="margin-bottom: 10px;" />
                                <el-switch v-model="item.level" active-text="是否属于某一个具体行业，产品" style="margin-bottom: 10px;" />
                                <el-input v-model="item.content" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                                    placeholder="请输入分类Prompt" />
                                <el-button type="primary" :icon="Check" class="check-button"
                                    @click="activeTab = 'second'">确认Prompt</el-button>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </el-tab-pane>
                <el-tab-pane label="选择时间" name="second">
                    <el-form label-width="100px" style="padding-top: 60px;">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="统计时间">
                                    <el-select v-model="timeSelect" value-key="id" class="m-2" placeholder="Select">
                                        <el-option v-for="item in options" :key="item.id" :label="item.label"
                                            :value="item" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <el-form-item label="统计范围">
                                    <el-date-picker :disabled="timeSelect.id != 3" v-model="timeSelect.time"
                                        type="daterange" unlink-panels range-separator="-" start-placeholder="开始日期"
                                        end-placeholder="结束日期" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div style="text-align: center; padding-top: 40px;">
                        <el-button type="primary" size="large" @click="createtask()">
                            创建任务
                        </el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-card class="box-card">
            <h2>
                临时任务记录
            </h2>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="id" label="任务ID" width="200" />
                <el-table-column prop="startTime" label="开始时间" width="180" />
                <el-table-column prop="endTime" label="截止时间" width="180" />
                <el-table-column prop="status" label="状态" width="120">
                    <template #default="scoped">
                        <el-tag v-if="scoped.row.status == 2" class="ml-2" type="success">已完成</el-tag>
                        <el-tag v-if="scoped.row.status == 0" class="ml-2" type="danger">未执行</el-tag>
                        <el-tag v-if="scoped.row.status == 1" class="ml-2" type="warning">处理中</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scoped">
                        <el-button link type="primary"><a
                                :href="downloadPath + '/file/temp-result-file/' + scoped.row.id + '.csv'"
                                v-if="(scoped.row.status == 2)">下载</a></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="sizes,prev, pager, next, total" :total="total" :page-sizes="[5, 10, 15, 20]"
                @size-change="updateTable" @current-change="updateTable" style="float: right; margin: 20px;" />

        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import type { TabPaneName } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { get, post, postWithOutCheck } from "@/http";

import {
    Check,
    Refresh
} from '@element-plus/icons-vue'

const con = getCurrentInstance();
const downloadPath = con.appContext.config.globalProperties.$downloadPath;

let tabIndex = 8
const editableTabsValue = ref('8')
const activeTab = ref("first")

const addTab = (targetName: string) => {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: '新类别',
        id: newTabName,
        content: '',
    })
    editableTabsValue.value = newTabName
}

const editableTabs = ref([
    {}
])

const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(5)

get('/heiMaoSub/getPrompt', (message) => {
    editableTabs.value = message.map(prompt => ({
        id: prompt.id,
        title: prompt.title,
        content: prompt.content,
        level: (prompt.level == 2)
    }));
    editableTabsValue.value = message[0].id;
    tabIndex = message.length;
})

post('/heiMaoSub/task/all', {
    current: 1,
    size: pageSize.value
}, (message) => {
    tableData.value = message.tasks.map(task => ({
        id: String(task.id),
        status: task.status,
        startTime: task.startTime,
        endTime: task.endTime
    }))
    total.value = message.total
})

const updateTable = () => {
    post('/heiMaoSub/task/all', {
        current: currentPage.value,
        size: pageSize.value
    }, (message) => {
        console.log(message)
        tableData.value = message.tasks.map(task => ({
            id: String(task.id),
            status: task.status,
            startTime: task.startTime,
            endTime: task.endTime
        }))
        total.value = message.total
        console.log(tableData.value)
    })
}

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
                    if (tab.id === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.id
                        }
                    }
                })
            }

            editableTabsValue.value = activeName
            editableTabs.value = tabs.filter((tab) => tab.id !== targetName)
        }).catch(function () {
            // catch error  
        });

    }
}

/**
 * 计算过去一段时间的起始和结束时间
 * @param day 间隔天数
 */
const clacDate = (day: number) => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
    return [start, end]
}

/**
 * 格式化日期   YYYY-mm-dd
 * @param date 
 */
const formatDate = (date: { toISOString: () => string | any[]; getMonth: () => number; getDate: () => string; }) => {
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

const createtask = () => {
    const startTime = formatDate(timeSelect.value.time[0]);
    const endTime = formatDate(timeSelect.value.time[1]);
    const prompts = editableTabs.value;
    const promptList = [];
    prompts.forEach((prompt: any) => {
        let promptItem = {
            'content': prompt.content,
            'endTime': endTime,
            'startTime': startTime,
            'title': prompt.title,
            'level': (prompt.level ? 2 : 1)
        }

        promptList.push(promptItem);
    })
    // 弹窗确认
    ElMessageBox.confirm(
        '时间范围：' + startTime + ' ~ ' + endTime,
        '确认任务',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 创建任务
            postWithOutCheck('/heiMaoSub/temporary-prompt', {
                'temporaryPromptList': promptList,
                'endTime': endTime,
                'startTime': startTime,
            }, (message) => {
                ElMessage.success("创建任务成功");
                updateTable();
            });
        })
        .catch(() => {
        })

}

</script>

<style scoped>
.edit-pane {
    height: 20vh;

}

.check-button {
    float: right;
    margin-top: 20px;
}
</style>