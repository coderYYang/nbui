<template>
  <div id="app">
    <ProTable>
      <div slot="prop1" slot-scope="{ scope }">{{ scope.date }}</div>
    </ProTable>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style></style>
