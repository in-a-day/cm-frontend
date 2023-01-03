<script setup lang="ts">
import { Form } from '@/components/Form'
import { reactive, ref, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { ElButton, FormRules } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
import { cmRegister } from '@/api/login'
import { UserType } from '@/api/login/types'

const emit = defineEmits(['to-login'])

const { register, elFormRef, methods } = useForm()

const { t } = useI18n()

const { required } = useValidator()

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: t('login.passwordPlaceholder')
    }
  },
  // {
  //   field: 'check_password',
  //   label: t('login.checkPassword'),
  //   value: '',
  //   component: 'InputPassword',
  //   colProps: {
  //     span: 24
  //   },
  //   componentProps: {
  //     style: {
  //       width: '100%'
  //     },
  //     strength: true,
  //     placeholder: t('login.passwordPlaceholder')
  //   }
  // },
  // {
  //   field: 'code',
  //   label: t('login.code'),
  //   colProps: {
  //     span: 24
  //   }
  // },
  {
    field: 'register',
    colProps: {
      span: 24
    }
  }
])

const rules: FormRules = {
  username: [required()],
  password: [required()]
}

const toLogin = () => {
  emit('to-login')
}

const loading = ref(false)

const loginRegister = async () => {
  // 此处调用注册接口
  const formRef = unref(elFormRef)
  formRef?.validate(async (valid) => {
    const { getFormData } = methods
    const formData = await getFormData<UserType>()
    if (valid) {
      try {
        await cmRegister(formData).then((res: any) => {
          console.log(res)
          if (res.data.code === 200) {
            toLogin()
          } else {
            // 打印错误信息
          }
        })
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.register') }}</h2>
    </template>

    <template #register>
      <div class="w-[100%]">
        <ElButton type="primary" class="w-[100%]" :loading="loading" @click="loginRegister">
          {{ t('login.register') }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toLogin">
          {{ t('login.hasUser') }}
        </ElButton>
      </div>
    </template>
  </Form>
</template>
