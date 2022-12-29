<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { SiteInfo } from '@/api/cm/types'

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'id',
    label: '基站号'
  },
  {
    field: 'lng',
    label: '经度'
  },
  {
    field: 'lat',
    label: '维度'
  }
]

const loading = ref(true)

let tableDataList = ref<SiteInfo[]>([])

const getTableList = async () => {
  tableDataList.value = [
    { id: '1dfiafasjgdhfa', lng: 111.11, lat: 22.22 },
    { id: 'hdfasfjasfwery', lng: 111.12, lat: 22.23 }
  ]
  loading.value = false
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap title="基站信息">
    <Table :columns="columns" :data="tableDataList" :loading="loading">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
