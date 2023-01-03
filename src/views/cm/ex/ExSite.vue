<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { SiteInfo } from '@/api/cm/types'
import { siteWithoutData, downloadSiteWithoutData } from '@/api/cm'

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

let tableDataList = ref<SiteInfo[]>([])

const getTableList = async () => {
  siteWithoutData().then((res: any) => {
    tableDataList.value = res.data
  })
}

const download = () => {
  downloadSiteWithoutData()
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap>
    <el-button type="primary" @click="download">下载</el-button>
    <Table :columns="columns" :data="tableDataList">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
