<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" style="width: 160px" class="filter-item" placeholder="请选择">
        <el-option v-for="item in typeMap" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 160px;" placeholder="请输入用户ID" />
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 160px;" placeholder="请输入用户名" />
      <el-input v-model="listQuery.mergeId" clearable class="filter-item" style="width: 160px;" placeholder="请输入合单ID" />
      <el-input v-model="listQuery.orderSn" clearable class="filter-item" style="width: 160px;" placeholder="请输入订单编号" />
      <el-date-picker v-model="listQuery.timeArray" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
      <el-select v-model="listQuery.orderStatusArray" multiple style="width: 200px" class="filter-item" placeholder="请选择订单状态">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
<!--    已合单信息-->
    <div class="merge_title">已合单列表</div>
    <el-table v-loading="listLoading" :data="mergeList" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.splitOrder">
            <el-table-column align="center" label="订单编号" prop="orderSn" />
            <el-table-column align="center" label="用户ID" prop="orderId" />
            <el-table-column align="center" label="用户留言" prop="message" />
            <el-table-column align="center" label="收货人" prop="consignee" />
            <el-table-column align="center" label="收货电话" prop="mobile" />
            <el-table-column align="center" label="收货楼栋" prop="building" />
            <el-table-column align="center" label="收货地址" prop="address" />
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn" />

      <el-table-column align="center" label="用户ID" prop="userId" />

      <el-table-column align="center" label="收货人" prop="consignee" />

      <el-table-column align="center" label="订单总价" prop="allPrice" />

      <el-table-column align="center" label="订单状态" prop="release">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.release | releaseFilter }}</el-tag>
        </template>
      </el-table-column>

<!--      <el-table-column align="center" label="订单金额" prop="orderPrice" />-->

<!--      <el-table-column align="center" label="支付金额" prop="actualPrice" />-->

<!--      <el-table-column align="center" label="支付时间" prop="payTime" />-->

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/order/release']" type="primary" size="mini" @click="handleRelease(scope.row)">{{scope.row.release === 0 ? '发布' : '已发布'}}</el-button>
          <el-button v-permission="['POST /admin/order/']" type="primary" size="mini" @click="handleForceOrderOpen(scope.row)">派单</el-button>
          <el-button v-permission="['POST /admin/order/delete']" type="danger" size="mini" @click="handleOpenDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    未合单信息-->
    <div class="merge_title_not merge_title" style="display: flex; align-items: center">
      <div style="margin-right: 10px">未合单列表</div>
      <el-button type="primary" @click="handleOpenMerge">合单</el-button>
    </div>
    <el-table v-loading="listLoading" :data="unMergeList" element-loading-text="正在查询中。。。" @selection-change="handleSelectionChange" border fit highlight-current-row>

      <el-table-column width="50" type="selection"></el-table-column>

      <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn" />

      <el-table-column align="center" label="用户ID" prop="userId" />

      <el-table-column align="center" label="用户名" prop="consignee" />

      <el-table-column align="center" width="100" label="楼栋" prop="building" />

      <el-table-column align="center" label="详细地址" prop="address" />

      <el-table-column align="center" label="订单状态" prop="orderStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品价格" prop="goodsPrice" />

      <el-table-column align="center" label="支付时间" prop="payTime" />

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/order/detailSplitOrder']" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
<!--          <el-button v-permission="['POST /admin/order/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
<!--          <el-button v-if="scope.row.orderStatus==201" v-permission="['POST /admin/order/ship']" type="primary" size="mini" @click="handleShip(scope.row)">发货</el-button>-->
<!--          <el-button v-if="scope.row.orderStatus==202||scope.row.orderStatus==204" v-permission="['POST /admin/order/refund']" type="primary" size="mini" @click="handleRefund(scope.row)">退款</el-button>-->
        </template>
      </el-table-column>
    </el-table>

<!--    合单对话框-->
    <el-dialog title="合并订单" :visible.sync="mergeDialogVisible">
      <el-form :model="mergeForm" style="width: 400px">
        <el-form-item label="合单留言" :label-width="formLabelWidth">
          <el-input v-model="mergeForm.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否发布" :label-width="formLabelWidth">
          <el-radio v-model="mergeForm.release" label='0'>不发布</el-radio>
          <el-radio v-model="mergeForm.release" label='1'>发布</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mergeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMerge" :loading="mergeLoading">确 定</el-button>
      </div>
    </el-dialog>
<!--    强制派单对话框-->
    <el-dialog title="派单" :visible.sync="forceOrderDialogVisible">
      <el-select v-model="forceSelect" style="width: 160px" class="filter-item" placeholder="请选择">
        <el-option v-for="item in staffList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="forceOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleForceOrder" :loading="forceOrderLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">

      <section ref="print">
        <el-form :data="orderDetail" label-position="left">
          <el-form-item label="商城名称">
            <span>{{ orderDetail.brandVo.name }}</span>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-tag>{{ orderDetail.orderSplit.orderStatus | orderStatusFilter }}</el-tag>
          </el-form-item>
          <el-form-item label="用户留言">
            <span>{{ orderDetail.orderSplit.message }}</span>
          </el-form-item>
          <el-form-item label="收货信息">
            <span>（收货人）{{ orderDetail.orderSplit.consignee }}</span>
            <span>（手机号）{{ orderDetail.orderSplit.mobile }}</span>
            <span>（楼栋号）{{ orderDetail.orderSplit.building }}</span>
            <span>（地址）{{ orderDetail.orderSplit.address }}</span>
          </el-form-item>
          <el-form-item label="商品信息">
            <el-table :data="orderDetail.orderGoods" border fit highlight-current-row>
              <el-table-column align="center" label="商品名称" prop="goodsName" />
              <el-table-column align="center" label="商品编号" prop="goodsSn" />
              <el-table-column align="center" label="货品规格" prop="specifications" />
              <el-table-column align="center" label="货品价格" prop="price" />
              <el-table-column align="center" label="货品数量" prop="number" />
              <el-table-column align="center" label="货品图片" prop="picUrl">
                <template slot-scope="scope">
                  <img :src="scope.row.picUrl" width="40">
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="printOrder">打 印</el-button>
      </span>
    </el-dialog>

    <!-- 发货对话框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="发货">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="快递公司" prop="shipChannel">
          <el-select v-model="shipForm.shipChannel" placeholder="请选择">
            <el-option v-for="item in channels" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="快递编号" prop="shipSn">
          <el-input v-model="shipForm.shipSn" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog :visible.sync="refundDialogVisible" title="退款">
      <el-form ref="refundForm" :model="refundForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="refundForm.refundMoney" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRefund">确定</el-button>
      </div>
    </el-dialog>

<!--    删除合单对话框-->
    <el-dialog width="30%" :visible.sync="deleteDialogVisible" title="请确认">
      <span>确认删除该合单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button :loading="deleteLoading" type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style lang="scss" scoped>
.merge_title{
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 20px;
  color: #3A3A3A;
}

.merge_title_not{
  padding-top: 20px;
}
</style>

<script>
import { refundOrder, shipOrder } from '@/api/order';
import { forceOrder, checkAllStaff } from "@/api/delivery";
import { listMergeOrder, mergeOrder, detailOrder, releaseOrder, deleteOrder } from "@/api/mergeOrder"
import checkPermission from '@/utils/permission' // 权限判断函数

const statusMap = {
  101: '未付款',
  102: '用户取消',
  103: '系统取消',
  201: '已付款',
  202: '申请退款',
  203: '已退款',
  301: '已发货',
  401: '用户收货',
  402: '系统收货'
}

const typeMap = [
  {
    value: 0,
    label: '商品'
  },
  {
    value: 1,
    label: '外卖'
  },
  {
    value: 2,
    label: '快递'
  },
]

const releaseMap = {
  0: '未发布',
  1: '已发布'
}

export default {
  name: 'Order',
  filters: {
    orderStatusFilter(status) {
      return statusMap[status]
    },
    releaseFilter(status) {
      return releaseMap[status]
    }
  },
  data() {
    return {
      mergeList: [],
      unMergeList: [],
      orderIds: [],
      staffList: [],
      listLoading: true,
      mergeLoading: false,
      forceOrderLoading: false,
      deleteArgs: {},
      forceArgs: {},
      forceSelect: '',
      listQuery: {
        page: 1,
        limit: 20,
        userId: '',
        mergeId: '',
        orderSn: '',
        brandId: '',
        name: '',
        mobile: '',
        build: '',
        orderStatusArray: [],
        type: 0,
        sort: 'add_time',
        order: 'desc',
      },
      deleteLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const endTime = new Date()
            const startTime = new Date()
            startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [startTime, endTime])
          }
        },
          {
          text: '最近一个月',
          onClick(picker) {
            const endTime = new Date()
            const startTime = new Date()
            startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [startTime, endTime])
          }
        },
          {
          text: '最近三个月',
          onClick(picker) {
            const endTime = new Date()
            const startTime = new Date()
            startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [startTime, endTime])
          }
        }]
      },
      statusMap,
      typeMap,
      formLabelWidth: '120px',
      orderDialogVisible: false,
      deleteDialogVisible: false,
      forceOrderDialogVisible: false,
      orderDetail: {
        brandVo: {},
        orderSplit: {},
        orderGoods: []
      },
      shipForm: {
        orderId: undefined,
        shipChannel: undefined,
        shipSn: undefined
      },
      mergeForm: {
        message: '',
        release: '0'
      },
      shipDialogVisible: false,
      refundForm: {
        orderId: undefined,
        refundMoney: undefined
      },
      refundDialogVisible: false,
      downloadLoading: false,
      channels: [],
      mergeDialogVisible: false
    }
  },
  created() {
    this.getList();
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      if (this.listQuery.timeArray && this.listQuery.timeArray.length === 2) {
        this.listQuery.startTime = this.listQuery.timeArray[0]
        this.listQuery.endTime = this.listQuery.timeArray[1]
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      // if(this.listQuery.orderId){
      //   detailOrder(this.listQuery.orderId).then(response => {
      //     this.list = [];
      //     if(response.data.data.order){
      //       this.list.push(response.data.data.order);
      //       this.total = 1;
      //       this.listLoading = false
      //     }
      //   }).catch(() => {
      //     this.list = []
      //     this.total = 0
      //     this.listLoading = false
      //   })
      // }else{
        listMergeOrder(this.listQuery).then(response => {
          this.mergeList = response.data.data.mergeList
          this.unMergeList = response.data.data.unMergeList
          this.listLoading = false
        }).catch(() => {
          this.mergeList = []
          this.unMergeList = []
          this.listLoading = false
        })
      // }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      detailOrder(row.id).then(response => {
        this.orderDetail = response.data.data
      })
      this.orderDialogVisible = true
    },
    handleShip(row) {
      this.shipForm.orderId = row.id
      this.shipForm.shipChannel = row.shipChannel
      this.shipForm.shipSn = row.shipSn

      this.shipDialogVisible = true
      this.$nextTick(() => {
        this.$refs['shipForm'].clearValidate()
      })
    },
    confirmShip() {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          shipOrder(this.shipForm).then(() => {
            this.shipDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认发货成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    handleOpenDelete(row){
      this.deleteArgs = row;
      this.deleteDialogVisible = true;
    },
    handleDelete() {
      this.deleteLoading = true;
      deleteOrder({
        mergeId: this.deleteArgs.id,
        type: this.listQuery.type
      }).then(() => {
        this.deleteLoading = false;
        this.$message({
          message: '合单删除成功',
          type: 'success'
        });
        this.deleteDialogVisible = false
        this.getList()
      }).catch(response => {
        this.deleteLoading = false;
        this.$message({
          type: 'error',
          message: response.data.errmsg
        })
      })
    },
    handleRefund(row) {
      this.refundForm.orderId = row.id
      this.refundForm.refundMoney = row.actualPrice

      this.refundDialogVisible = true
      this.$nextTick(() => {
        this.$refs['refundForm'].clearValidate()
      })
    },
    confirmRefund() {
      this.$refs['refundForm'].validate((valid) => {
        if (valid) {
          refundOrder(this.refundForm).then(() => {
            this.refundDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认退款成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '收货人', '收货联系电话', '收货地址']
        const filterVal = ['id', 'orderSn', 'userId', 'orderStatus', 'consignee', 'mobile', 'address']
        excel.export_json_to_excel2(tHeader, this.mergeList, filterVal, '订单信息')
        this.downloadLoading = false
      })
    },
    printOrder() {
      this.$print(this.$refs.print)
      this.orderDialogVisible = false
    },

    handleSelectionChange(val) {
      const orderArr = val.map((e) => {
        return e.orderId
      })
      this.orderIds = orderArr
    },
    handleOpenMerge () {
      if(this.orderIds.length < 2){
        this.$message({
          message: '至少要选择两个订单哦～',
          type: 'warning'
        });
      } else {
        this.mergeDialogVisible = true
      }
    },
    handleMerge () {
      const { release, message } = this.mergeForm;
      const data = {
        type: parseInt(this.listQuery.type),
        message,
        release: parseInt(release),
        orderIds: this.orderIds
      }
      this.mergeLoading = true;
      mergeOrder(data).then(response => {
        this.mergeLoading = false;
        if (response.data.errno === 0) {
          this.getList();
          this.mergeDialogVisible = false;
          this.$message({
            message: '合单成功!',
            type: 'success'
          });
        } else {
          this.$message({
            message: response.data.errmsg,
            type: 'error'
          });
        }
      }).catch ((e) => {
        this.mergeLoading = false;
        this.$message({
          message: e.data.errmsg,
          type: 'error'
        });
      })
    },
    handleRelease (args) {
      const data = { mergeId: args.id };
      args.release === 0 &&
        releaseOrder(data).then(res => {
          if(res.data.errno){
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            this.getList()
          }
        }).catch(err => {
          this.$message({
            message: err.data.errmsg,
            type: 'error'
          });
        })
      },
    handleForceOrderOpen (row) {
      this.forceArgs = row;
      if(row.release === 0){
        this.$message({
          message: '要先发布才可以指定派送哦！'
        })
      } else {
          checkAllStaff().then(res => {
            this.staffList = Object.keys(res.data.data).map(key => {
              return {label: res.data.data[key], value: key }
            })
            this.forceOrderDialogVisible = true;
          }).catch(err => {
            this.$message({
              message: err.data.errmsg,
              type: 'error'
            })
          })
      }
    },
    handleForceOrder () {
      this.forceOrderLoading = true;
      const data = {
        mergeId: this.forceArgs.id,
        deliveryId: this.forceSelect
      }
      forceOrder(data).then(() => {
        this.forceOrderDialogVisible = false;
        this.forceOrderLoading = false;
        this.$message({
          message: '派单成功！',
          type: 'success'
        })
      }).catch(err => {
        this.forceOrderLoading = false;
        this.$message({
          message: err.data.errmsg,
          type: 'success'
        })
      })
    }
    }
}
</script>
