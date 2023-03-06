<template>
  <div id="app">
    <ProTable>
      <div slot="prop1" slot-scope="{ scope }">{{ scope.date }}</div>
    </ProTable>
  </div>
</template>

<script>
import ProTable from './components/ProTable'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: { ProTable },
  methods: {}
}
</script>

<style></style>
