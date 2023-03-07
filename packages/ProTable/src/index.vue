<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-02-28 17:56:26
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-03-07 15:56:32
 * @FilePath: /pro-components/packages/ProTable/index.vue
 * @Description: 超级表格
-->
<template>
  <div class="pro-table">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" v-for="(item, index) in options.tool" :key="index">
        <!-- v-hasPermi="item.permission" -->
        <el-button :type="item.type" plain :icon="item.icon" size="mini" @click="handleTools(item.name, $event)">
          {{ item.name }}
        </el-button>
      </el-col>
    </el-row>
    <!-- v-loading="options.loading" -->
    <el-table
      :data="options.data"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- 是否有多选 -->
      <el-table-column
        v-if="options.isSelection"
        :selectable="options.selectable"
        type="selection"
        width="50"
        align="center"
      />
      <!-- 是否需要序号 -->
      <el-table-column v-if="options.isIndex" type="index" label="序号" width="50" align="center" />
      <template v-for="item in options.cols">
        <!-- 图片、自定义文字、翻译字典 -->
        <el-table-column v-if="item.isSlot" :key="item.prop" v-bind="item" :width="item.width" align="center">
          <template slot-scope="scope">
            <slot :name="item.prop" :scope="scope.row" />
          </template>
        </el-table-column>
        <!-- 适用大部分 -->
        <el-table-column v-if="!item.isSlot" :key="item.prop" v-bind="item" :width="item.width" align="center" />
      </template>
      <el-table-column
        v-if="options.isOperation"
        :width="options.operation.width"
        :label="options.operation.label"
        align="center"
      >
        <!-- UI统一一排放3个，4个以上出现更多 -->
        <template slot-scope="scope">
          <!-- 三个一排的情况，去掉隐藏的按钮后的长度 -->
          <!-- v-permission="item.permission" -->
          <el-button
            v-for="item in options.operation.data"
            :key="item.label"
            v-bind="item"
            :type="item.type"
            size="mini"
            @click="handleOperation(scope.$index, scope.row, item.label)"
          >
            {{ item.label }}
          </el-button>
          <!-- <span class="el-dropdown-link">
            <i class="el-icon-d-arrow-right el-icon--right"></i>
            更多
          </span>
          <el-dropdown v-for="(item, index) in options.operation.data" :key="index" size="mini">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="handleResetPwd"
                icon="el-icon-key"
                v-if="options.operation.data.length > 2"
                @click="handleOperation(scope.$index, scope.row, item.label)"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-dropdown v-for="(item, index) in options.operation.data" :key="index" size="mini">
            <span class="el-dropdown-link">
              <i class="el-icon-d-arrow-right el-icon--right"></i>
              更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="handleResetPwd"
                icon="el-icon-key"
                v-if="options.operation.data.length > 2"
                @click="handleOperation(scope.$index, scope.row, item.label)"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProTable',
  props: {
    // options: Array
  },
  data() {
    return {
      options: {
        tool: [
          {
            name: '新增', // 按钮名称
            type: 'primary', // 使用element自带按钮类型
            permission: ['water:station:add'], // 权限点
            icon: 'el-icon-plus' // 使用 element 自带 icon
          },
          {
            name: '删除',
            type: 'danger',
            permission: ['water:station:add'],
            icon: 'el-icon-delete' // 使用 element 自带 icon
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            status: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            status: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            status: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            status: '上海市普陀区金沙江路 1516 弄'
          }
        ], // 表格数据
        cols: [
          {
            isSlot: true,
            label: '日期',
            prop: 'prop1',
            width: '180'
          },
          {
            isSlot: false,
            label: '状态',
            prop: 'status'
          }
        ], // 表格的列数据
        isSelection: true, // 表格有多选时设置
        selectable(val) {
          // 禁用部分行多选
          if (val.isVideoStatus === 1) {
            return false
          } else {
            return true
          }
        },
        isIndex: true, // 列表序号
        loading: true, // loading
        pageData: {
          total: 0, // 总条数
          pageSize: 10, // 每页数量
          pageNum: 1, // 页码
          pageSizes: [5, 10, 15, 20] // 每页数量
        },
        isOperation: true, // 表格有操作列时设置
        operation: {
          // 表格有操作列时设置
          label: '操作', // 列名
          width: '350', // 根据实际情况给宽度
          data: [
            {
              label: '冻结', // 操作名称
              permission: '', // 权限点
              type: 'info' // 按钮类型
            },
            {
              label: '冻结1', // 操作名称
              permission: '', // 权限点
              type: 'danger' // 按钮类型
            },
            {
              label: '冻结2', // 操作名称
              permission: '', // 权限点
              type: 'primary' // 按钮类型
            },
            {
              label: '冻结3', // 操作名称
              permission: '', // 权限点
              type: 'info' // 按钮类型
            }
          ]
        }
      }
    }
  },
  methods: {
    /**
     * @description: 工具栏点击事件
     * @param {*} name 按钮名称
     * @param {*} e 事件对象
     * @return {*}
     */
    handleTools(name, e) {
      this.$emit('tool', name, e)
    },
    /**
     * @description: 当某一行被点击时会触发该事件
     * @param {*} row 行数据
     * @param {*} column
     * @param {*} event
     * @return {*}
     */
    handleRowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    /**
     * @description: 当选择项发生变化时会触发该事件
     * @return {*}
     */
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    /**
     * @description: 表格操作栏事件
     * @param {*} index 索引
     * @param {*} row 行数据
     * @param {*} label 操作名称
     * @return {*}
     */
    handleOperation(index, row, label) {
      console.log(index, row, label)
    }
  }
}
</script>

<style scoped></style>
