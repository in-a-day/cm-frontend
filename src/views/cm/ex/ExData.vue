<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { dataWithoutSiteInfo, downloadDataWithoutSiteInfo } from '@/api/cm'

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'dt',
    label: 'dt'
  },
  {
    field: 'id',
    label: 'id'
  },
  {
    field: 'userlabel',
    label: 'userlabel'
  },
  {
    field: 'cgi',
    label: 'cgi'
  },
  {
    field: 'data1',
    label: 'data1'
  },
  {
    field: 'data2',
    label: 'data2'
  },
  {
    field: 'data3',
    label: 'data3'
  },
  {
    field: 'data4',
    label: 'data4'
  },
  {
    field: 'data5',
    label: 'data5'
  },
  {
    field: 'data6',
    label: 'data6'
  },
  {
    field: 'data7',
    label: 'data7'
  },
  {
    field: 'data8',
    label: 'data8'
  },
  {
    field: 'data9',
    label: 'data9'
  },
  {
    field: 'data10',
    label: 'data10'
  },
  {
    field: 'data11',
    label: 'data11'
  },
  {
    field: 'data12',
    label: 'data12'
  },
  {
    field: 'data13',
    label: 'data13'
  },
  {
    field: 'data14',
    label: 'data14'
  },
  {
    field: 'data15',
    label: 'data15'
  },
  {
    field: 'data16',
    label: 'data16'
  },
  {
    field: 'data17',
    label: 'data17'
  },
  {
    field: 'data18',
    label: 'data18'
  },
  {
    field: 'data19',
    label: 'data19'
  },
  {
    field: 'data20',
    label: 'data20'
  },
  {
    field: 'data21',
    label: 'data21'
  },
  {
    field: 'data22',
    label: 'data22'
  },
  {
    field: 'data23',
    label: 'data23'
  },
  {
    field: 'data24',
    label: 'data24'
  }
]

let tableDataList = ref<any[]>([])

const getTableList = async () => {
  dataWithoutSiteInfo().then((res: any) => {
    tableDataList.value = res.data
  })
}

const download = () => {
  downloadDataWithoutSiteInfo()
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
