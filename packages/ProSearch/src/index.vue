<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-03-02 16:54:24
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-03-07 15:57:25
 * @FilePath: /pro-components/packages/ProSearch/index.vue
 * @Description: 超级搜索
-->
<template>
  <div class="filter-container">
    <el-form ref="form" :model="model" :inline="options.isInline" :label-width="options.labelWidth">
      <template v-if="options.input.length">
        <el-form-item :label="item.label" v-for="item in options.input" :key="item.label">
          <el-input v-model="model[item.key]" :placeholder="item.placeholder" />
        </el-form-item>
      </template>

      <template v-if="options.select.length">
        <el-form-item :label="item.label" v-for="item in options.select" :key="item.label">
          <el-select v-model="model[item.key]" :placeholder="item.placeholder">
            <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"> </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="options.datePicker">
        <el-form-item label="时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// options = {
//   isInline: true, // 是否行内显示
//   datePicker: true, // 是否显示日期控件
//   labelWidth: '80px', label 宽度
//   input: [
//     {
//       label: '输入框1', // 提示 label
//       key: 'input1', // 搜索字段 key
//       placeholder: '选输入'
//     },
//     {
//       label: '输入框2',
//       key: 'input2',
//       placeholder: '选输入'
//     }
//   ],
//   select: [
//     {
//       label: '选择器1',
//       key: 'option1',
//       placeholder: '请选择',
//       options: [ // 选择器选项
//         {
//           label: '选项1',
//           value: 'option1'
//         },
//         {
//           label: '选项2',
//           value: 'option2'
//         }
//       ]
//     }
//   ]
// }
export default {
  name: 'FilterPane',
  props: {
    options: Object
  },
  data() {
    return {
      model: {},
      dateRange: []
    }
  },
  watch: {
    /**
     * @description: 处理 form 表单 model
     * @return {*}
     */
    options(value) {
      const inputArr = value.input
      const selectArr = value.select
      if (inputArr.length) inputArr.map((item) => (this.model[item.key] = ''))
      if (selectArr.length) selectArr.map((item) => (this.model[item.key] = ''))
    }
  },
  methods: {
    /**
     * @description: 搜索
     * @return {*}
     */
    handleSearch() {
      const data = { ...this.model }
      // 处理时间
      if (this.options.datePicker && this.dateRange && this.dateRange.length) {
        // eslint-disable-next-line no-extra-semi
        ;[data.startTime, data.endTime] = this.dateRange
      }
      // 处理空字符串
      Object.keys(data).forEach((key) => data[key] === '' && delete data[key])
      this.$emit('search', data)
    },
    /**
     * @description: 重置
     * @return {*}
     */
    handleReset() {
      const data = { ...this.model }
      // 将所有值置为空
      Object.keys(data).forEach((key) => (data[key] = ''))
      this.model = data
      this.dateRange = []
      ;[data.startTime, data.endTime] = ['', '']
      this.$emit('reset', data)
    }
  }
}
</script>

<style scoped></style>
