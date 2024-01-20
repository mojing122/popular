<template>
    <div>
        <el-card class="box-card">
            <div style="margin-bottom: 20px">
                <el-button size="large" @click="addTab(editableTabsValue)" type="primary">
                    新增类别
                </el-button>
            </div>
            <el-tabs v-model="editableTabsValue" tab-position="left" type="card" closable @edit="handleTabsEdit">
                <el-tab-pane v-for="item in editableTabs" :key="item.id" :label="item.title" :name="item.id">
                    <div class="edit-pane">
                        <el-input v-model="item.title" placeholder="Please input" style="margin-bottom: 10px;" />
                        <el-input v-model="item.content" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                            placeholder="请输入分类Prompt" />
                        <el-button @click="upDatePrompt()" type="primary" :icon="Check"
                            class="check-button">更新Prompt</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    Check
} from '@element-plus/icons-vue'
import { get, post } from '@/http';

let tabIndex = 8
const editableTabsValue = ref('8')


const addTab = (targetName: string) => {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: '新类别',
        id: newTabName,
        content: '',
    })
    editableTabsValue.value = newTabName
}

const editableTabs = ref([])

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

get('/heiMaoSub/getPrompt', (message) => {
    editableTabs.value = message;
    editableTabsValue.value = message[0].id;
    tabIndex = message.length;
})

const upDatePrompt = () => {
    let promptList = editableTabs.value.map(item => ({ ...item, id: undefined }));
    post('/heiMaoSub/prompt', {
        promptList: promptList
    }, (message) => {
        ElMessage.success("更新成功")
    })
}
</script>

<style scoped>
.edit-pane {
    height: 65vh;

}

.check-button {
    float: right;
    margin-top: 20px;
}
</style>