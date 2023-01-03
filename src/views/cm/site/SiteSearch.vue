<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { sitesByName } from '@/api/cm'
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

let tableDataList = ref<SiteInfo[]>([])
let siteName = ref('')

const search = () => {
  sitesByName(siteName.value).then((res: any) => {
    tableDataList.value = res.data
  })
}

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap>
    基站: <ElInput v-model="siteName" style="width: 300px" />
    <ElButton type="primary" @click="search">搜索</ElButton>
    <Table :columns="columns" :data="tableDataList">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
