<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-02-28 17:56:26
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-03-06 18:05:27
 * @FilePath: /pro-components/src/components/ProTable/index.vue
 * @Description: 超级表格
-->
<template>
  <div class="pro-table">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" v-for="(item, index) in options.tool" :key="index">
        <!-- v-hasPermi="item.permission" -->
        <el-button :type="item.type" plain :icon="item.icon" size="mini" @click="item.handleTools(item.name, $event)">
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
        <!-- 表格的列展示 特殊情况处理 比如要输入框 显示图片 自己定义 -->
        <el-table-column v-if="item.isTemplate" :key="item.prop" :label="item.label">
          <template slot-scope="scope">
            <slot :name="item.prop" :scope="scope.row" />
          </template>
        </el-table-column>
        <!-- 大部分适用 -->
        <el-table-column
          v-if="!item.isImagePopover && !item.isTemplate && !item.isSpecial && !item.isIcon"
          :key="item.prop"
          v-bind="item.isCodeTableFormatter ? Object.assign({ formatter: item.isCodeTableFormatter }, item) : item"
          align="center"
          show-overflow-tooltip
        />
      </template>
      <!-- <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column> -->
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
            icon: 'el-icon-plus', // 使用 element 自带 icon
            handleTools: this.handleAdd // 自定义事件
          },
          {
            name: '删除',
            type: 'danger',
            permission: ['water:station:add'],
            icon: 'el-icon-delete', // 使用 element 自带 icon
            handleTools: this.handleAdd
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ], // 表格数据
        cols: [
          {
            isTemplate: true,
            label: '日期',
            prop: 'prop1'
          }
        ], // 表格的列数据
        isSelection: true, // 表格有多选时设置
        selectable: function (val) {
          // 禁用部分行多选
          if (val.isVideoStatus === 1) {
            return false
          } else {
            return true
          }
        },
        isOperation: true, // 表格有操作列时设置
        isIndex: true, // 列表序号
        loading: true, // loading
        pageData: {
          total: 0, // 总条数
          pageSize: 10, // 每页数量
          pageNum: 1, // 页码
          pageSizes: [5, 10, 15, 20] // 每页数量
        },
        operation: {
          // 表格有操作列时设置
          label: '操作', // 列名
          width: '350', // 根据实际情况给宽度
          data: [
            {
              label: '冻结', // 操作名称
              permission: '', // 权限点
              type: 'info', // 按钮类型
              handleClick: function () {} // 自定义事件
            }
          ]
        }
      }
    }
  },
  methods: {
    handleAdd(name, e) {
      this.$emit('tool', name, e)
    },
    /**
     * @description: 当某一行被点击时会触发该事件
     * @param {*} row
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
    }
  }
}
</script>

<style scoped></style>
