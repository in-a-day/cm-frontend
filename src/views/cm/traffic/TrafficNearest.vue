<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElTag, ElButton, ElSelect, ElOption } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { allSite, trafficNearest } from '@/api/cm'
import { SiteInfo, TrafficInfo } from '@/api/cm/types'

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'id',
    label: '基站号'
  },
  {
    field: 'dataSum',
    label: '流量'
  }
]

let tableDataList = ref<TrafficInfo[]>([])
let sites = ref<SiteInfo[]>([])
let siteName = ''

const getSites = async () => {
  allSite().then((res: any) => {
    sites.value = res.data
  })
}

const onChange = (siteName: string) => {
  trafficNearest(siteName).then((res: any) => {
    tableDataList.value = res.data
  })
}

getSites()

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap>
    基站:
    <ElSelect v-model="siteName" @change="onChange" style="width: 300px">
      <ElOption v-for="(val, idx) in sites" :key="idx" :value="val.id" />
    </ElSelect>
    <Table style="margin-top: 10px" :border="true" :columns="columns" :data="tableDataList">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
