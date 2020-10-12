<template>
  <div class="app-container">

<!--    查询操作-->
    <div class="filter-container">
      <el-input v-model="listQuery.deliveryId" clearable class="filter-item" style="width: 160px" placeholder="请输入配送员ID" />
      <el-select v-model="listQuery.todayStatus" style="width: 160px" class="filter-item" placeholder="请选择">
        <el-option v-for="item in todayStatus" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

<!--    查询结果-->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row >
      <el-table-column align="center" label="配送员ID" prop="id" />

      <el-table-column align="center" property="picUrl" label="用户头像">
        <template slot-scope="scope">
          <img v-if="scope.row.user.avatar" :src="scope.row.user.avatar" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" prop="user.nickname" />

      <el-table-column align="center" label="联系方式" prop="user.mobile" />

      <el-table-column align="center" label="今日状态" prop="todayStatus" >
        <template slot-scope="scope">
          <el-tag>{{scope.row.todayStatus | todayStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作状态" prop="workStatus" >
        <template slot-scope="scope">
          <el-tag>{{scope.row.workStatus | workStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="配送类型" prop="workType" >
        <template slot-scope="scope">
          <el-tag>{{scope.row.workType | workTypeFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCheckDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

<!--    配送员详情对话框-->
    <el-dialog :visible.sync="deliveryDialogVisible" title="配送员详情" width="800">
      <section ref="print">
        <el-form :data="deliveryDetail" label-position="left">

          <el-form-item label="配送员ID">
            <span>{{ deliveryDetail.staffVO.id }}</span>
          </el-form-item>
          <el-form-item label="名字">
            <span>{{ deliveryDetail.staffVO.user.nickname }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ deliveryDetail.staffVO.user.mobile }}</span>
          </el-form-item>
          <el-form-item label="今日状态">
            <el-tag>{{ deliveryDetail.staffVO.todayStatus| todayStatusFilter  }}</el-tag>
          </el-form-item>
          <el-form-item label="工作状态">
            <el-tag>{{ deliveryDetail.staffVO.workStatus|  workStatusFilter  }}</el-tag>
          </el-form-item>
          <el-form-item label="配送类型">
            <el-tag>{{ deliveryDetail.staffVO.workType| workTypeFilter  }}</el-tag>
          </el-form-item>
          <el-form-item label="工作时间表">
            <el-table :data="deliveryDetail.workTimes" border fit highlight-current-row>
              <el-table-column align="center" label="编号" prop="id" />
              <el-table-column align="center" label="开始工作时间" prop="workStart" />
              <el-table-column align="center" label="结束工作时间" prop="workEnd" />
              <el-table-column align="center" label="工作时间(分钟)" prop="workTime" />
            </el-table>
          </el-form-item>
          <el-form-item label="今日工作时间（分）">
            <span>{{ deliveryDetail.performance.todayWorkSumMinute }}</span>
          </el-form-item>
          <el-form-item label="今日商品订单配送次数">
            <span>{{ deliveryDetail.performance.todayGoodsDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="今日外卖订单配送次数">
            <span>{{ deliveryDetail.performance.todayMenuDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="今日快递订单配送次数">
            <span>{{ deliveryDetail.performance.todayExpressDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="今日配送总数">
            <span>{{ deliveryDetail.performance.todayWorkDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="本月工作时间">
            <span>{{ deliveryDetail.performance.monthWorkSumMinute }}</span>
          </el-form-item>
          <el-form-item label="本月最长工作时间">
            <span>{{ deliveryDetail.performance.monthWorkMax }}</span>
          </el-form-item>
          <el-form-item label="本月最短工作时间">
            <span>{{ deliveryDetail.performance.monthWorkMin }}</span>
          </el-form-item>
          <el-form-item label="本月商品订单配送次数">
            <span>{{ deliveryDetail.performance.monthGoodsDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="本月外卖订单配送次数">
            <span>{{ deliveryDetail.performance.monthMenuDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="本月快递订单配送次数">
            <span>{{ deliveryDetail.performance.monthExpressDeliveriesSum }}</span>
          </el-form-item>
          <el-form-item label="本月配送总次数">
            <span>{{ deliveryDetail.performance.monthWorkDeliveriesSum }}</span>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deliveryDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handlePrint">打 印</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getDeliveryDetail, getDeliveryList } from "@/api/delivery";
import Pagination from '@/components/Pagination';
import checkPermission from "@/utils/permission";

const todayStatus = [
  {
    label: '休息',
    value: 0
  },
  {
    label: '工作',
    value: 1
  }
];

const todayStatusMap = {
  0: '休息',
  1: '工作'
}

const workTypeMap = {
  0: '步行',
  1: '骑行'
}

const workStatusMap = {
  0: '未工作',
  1: '工作中，未配送',
  2: '配送中'
}

export default {
  name: "delivery",
  components: { Pagination },
  filters: {
    todayStatusFilter(status) {
      return todayStatusMap[status]
    },
    workTypeFilter(type) {
      return workTypeMap[type]
    },
    workStatusFilter(status) {
      return workStatusMap[status]
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        deliveryId: '',
        todayStatus: '',
        sort: 'add_time',
        order: ''
      },
      listLoading: true,
      deliveryDetail: {
        performance: {},
        staffVO: {
          user: {}
        },
        workTimes: []
      },
      deliveryDialogVisible: false,
      todayStatus
    }
  },
  created() {
    this.getList();
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true;
      getDeliveryList(this.listQuery).then(res => {
        this.list = res.data.data.staffList;
        this.total = res.data.data.total;
        this.listLoading = false;
      }).catch(() => {
        this.list = [];
        this.total = 0;
        this.listLoading = false;
      })
    },
    handleCheckDetail (row) {
      getDeliveryDetail(row.id).then(res => {
        this.deliveryDetail = res.data.data
      }).then(err => {
        this.$message({
          message: err.data.errmsg,
          type: "error"
        })
      })
      this.deliveryDialogVisible = true
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handlePrint() {
      this.$print(this.$refs.print)
      this.deliveryDialogVisible = false
    }


  }

}
</script>

<style scoped>

</style>
