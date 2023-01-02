<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { TrafficInfo } from '@/api/cm/types'
import { trafficOfDay } from '@/api/cm'

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'id',
    label: '基站号'
  },
  {
    field: 'dataPerHour',
    prop: 'dataPerHour',
    sortable: true,
    label: '日均流量'
  }
]

const loading = ref(true)

let tableDataList = ref<TrafficInfo[]>([])

const getTableList = async () => {
  trafficOfDay()
    .then((res: any) => {
      tableDataList.value = res.data
    })
    .finally(() => {
      loading.value = false
    })
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap>
    <Table :border="true" :columns="columns" :data="tableDataList" :loading="loading">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
