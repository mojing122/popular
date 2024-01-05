<template>
    <div>
        <el-card class="box-card" style="height: 650px;">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template #title>
                        <p class="title">默认模版</p>
                    </template>
                    <div>
                        上半年，全市消保委系统共受理消费者投诉{value}件（含先行和解{value}件），同比增长{value}。其中，{value}家联网单位共计处理消费者投诉{value}件（含先行和解{value}件），占投诉总量的{value}，
                        平均请求办结率为{value}，平均处理时长{value}天。上半年，新增{value}家联网单位,其中，黄浦区{value}家、长宁区{value}家、普陀区{value}家、闵行区{value}家、松江区{value}家、杨浦区{value}家……
                    </div>
                    <div style="width: 100%; padding:20px 0px;"><el-button style="float: right;" type="primary"
                            @click="dialogVisible = true">生成专报</el-button></div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template #title>
                        <p class="title">模版2</p>
                    </template>
                    <div>
                        上半年，全市消保委系统共受理消费者投诉{value}件（含先行和解{value}件），同比增长{value}。其中，{value}家联网单位共计处理消费者投诉{value}件（含先行和解{value}件），占投诉总量的{value}，
                        平均请求办结率为{value}，平均处理时长{value}天。上半年，新增{value}家联网单位,其中，黄浦区{value}家、长宁区{value}家、普陀区{value}家、闵行区{value}家、松江区{value}家、杨浦区{value}家……
                    </div>
                    <div style="width: 100%; padding:20px 0px;"><el-button style="float: right;"
                            type="primary">生成专报</el-button></div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template #title>
                        <p class="title">模版3</p>
                    </template>
                    <div>
                        上半年，全市消保委系统共受理消费者投诉{value}件（含先行和解{value}件），同比增长{value}。其中，{value}家联网单位共计处理消费者投诉{value}件（含先行和解{value}件），占投诉总量的{value}，
                        平均请求办结率为{value}，平均处理时长{value}天。上半年，新增{value}家联网单位,其中，黄浦区{value}家、长宁区{value}家、普陀区{value}家、闵行区{value}家、松江区{value}家、杨浦区{value}家……
                    </div>
                    <div style="width: 100%; padding:20px 0px;"><el-button style="float: right;"
                            type="primary">生成专报</el-button></div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template #title>
                        <p class="title">模版4</p>
                    </template>
                    <div>
                        上半年，全市消保委系统共受理消费者投诉{value}件（含先行和解{value}件），同比增长{value}。其中，{value}家联网单位共计处理消费者投诉{value}件（含先行和解{value}件），占投诉总量的{value}，
                        平均请求办结率为{value}，平均处理时长{value}天。上半年，新增{value}家联网单位,其中，黄浦区{value}家、长宁区{value}家、普陀区{value}家、闵行区{value}家、松江区{value}家、杨浦区{value}家……
                    </div>
                    <div style="width: 100%; padding:20px 0px;"><el-button style="float: right;"
                            type="primary">生成专报</el-button></div>
                </el-collapse-item>
            </el-collapse>
        </el-card>

        <el-dialog v-model="dialogVisible" :destroy-on-close=true title="确认专报内容" width="80%" :before-close="handleClose">
            <span><el-form :model="form" label-width="60px">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 15, maxRows: 20 }" />
                    </el-form-item>
                </el-form></span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        打印
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const activeName = ref('1')

const dialogVisible = ref(false)

const form = reactive({
    title: '',
    date: '',
    desc: '上半年，全市消保委系统共受理消费者投诉255037件（含先行和解16098件），同比增长69.8%。其中，406家联网单位共计处理消费者投诉145943件（含先行和解16098件），占投诉总量的57.2%，平均请求办结率为96.1%，平均处理时长11.16天。上半年，新增29家联网单位,其中，黄浦区7家、长宁区5家、普陀区4家、闵行区4家、松江区4家、杨浦区3家、静安区1家、嘉定区1家。\n一、基本概况\n消费者投诉受理量居前五位的依次为：长宁（75251件）、浦东（32210件）、杨浦（25057件）、静安（14988件）、闵行（14812件）等区消保委。崇明、杨浦、长宁、徐汇、黄浦等区消保委受理投诉量增幅明显，同比分别增长4.5倍、1.8倍、1.1倍、97.6% 和93.0%。从涉及的区域看，所辖联网单位投诉量超8000件的区消保委有4家，分别是长宁（67854件）、杨浦（20695件）、浦东（8640件）、静安（8155件）等区消保委；杨浦、徐汇、普陀、长宁等区消保委所辖联网单位投诉量增幅明显，同比分别增长2.4倍、1.9倍、1.4倍和1.1倍。（详见附件1）。\n（一）投诉量。\n从联网单位的投诉量看，超2000件的联网单位共有16家，其中拼多多（50855件）、抖音（12535件）、携程（10252件）、苹果电脑（5975件）、得物（4499件）分列前五位；投诉量在1000件至2000件的联网单位有11家；投诉量在500件至1000件的联网单位有21家；投诉量在100件至500件的联网单位有69家，100件以下的有213家。从投诉量增长情况来看，联网单位投诉量在200件以上且同比增幅居前20位的有：票牛网（15.6倍）、摩天轮（12.5倍）、永乐电器（11.5倍）、国美电器（8.2倍）、怪兽充电（4.2倍）、心动网络（3.2倍）、小红书（3.2倍）、真快乐（2.3倍）、一兆韦德（2.2倍）、淘票票（2.1倍）、携程（1.8倍）、威尔士（1.4倍）、华住酒店（1.2倍）、日上免税行（1.1倍）、拼多多（1.1倍）、洋码头（1.1倍）、同程（1.1倍）、途虎（1.0倍）、美团点评（92.1 %）、花千树（84.7 %）。（详见附件2）\n（二）\n请求办结率。永乐电器、国美电器、洋码头、进念装饰、静珈文化、乐金电子等15家联网单位请求办结率在80 % 以下，相关单位应予以关注（详见附件3）。（三）平均处理时长。302家联网单位平均处理时长均在20天内。长虹电器、泰康人寿、太平洋房屋、平安信用卡、齐家网、文峰等28家联网单位平均处理时长超过20天（详见附件4）。二、投诉主要特点（一）网购促销活动不断，商品质量、服务品质待提升拼多多、抖音、得物、盒马、京东、小红书等15家联网电商企业共计处理投诉74775件，占联网单位投诉处理总量的51.2 %。“短视频”“直播带货”“小程序”引发的网购纠纷日益增多，消费者投诉问题主要有：一是因变质、破损、开裂等质量问题导致商品无法正常使用；二是夸大宣传、货不对板等，如以“爆品补贴”“工厂放漏”营造低价、甩卖氛围等诱导消费者购买，但实际收到的商品粗制滥造；三是退换货不及时、在线客服无人回应等售后服务问题影响消费者购物体验。（二）旅游投诉增量明显，民宿、露营等成为诉求热点携程、蒜芽、去哪儿、同程等8家旅游服务平台共计处理投诉15733件；上航、东航、春秋、吉祥等4家航空公司共计处理投诉1297件；华住、和美等2家酒店集团共计处理投诉524件，相关投诉同比增长1.2倍。消费者投诉涉及自由行、跟团游、定制游等方面，问题主要有：一是擅自变更旅游项目、游览时间等；二是行程安排不合理，导游服务不佳等；三是预订酒店因订单取消、房价上调等原因无法正常入住。此外，亲子民宿、野外露营等休闲旅游快速发展，以其不同于传统酒店、宾馆的住宿方式受到年轻人欢迎，设施设备欠缺、卫生清洁不佳、交通停车不便等方面成为消费者投诉的热点。（三）文娱消费需求强劲，演唱会票务问题多'
})

const handleClose = (done) => {
    var instance = ElMessageBox({
        title: '退出',
        message: "确定退出专报生成吗?",
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    });
    instance.then(function () {
        done();
    }).catch(function () {
        // catch error  
    });
}
</script>

<style scoped>
.title {
    font-size: 22px;
    font-weight: 600;
}
</style>