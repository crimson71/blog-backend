<template>
    <div >
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        :defaultConfig="editorConfig"
        v-model="valueHtml"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, defineEmits, ref, shallowRef, onMounted, defineProps } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 500
  }
})
console.log(props.modelValue)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
// const valueHtml = ref('<p>hello</p>')
const mode = ref('default') // 或 'simple'
const emit = defineEmits(['update:modelValue', 'htmlContent'])
const handleChange = (editor) => {
  emit('update:modelValue', editor.getHtml())
}
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = props.modelValue
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      maxFileSize: 3 * 1024 * 1024,
      server: 'http://127.0.0.1/admin/article/img-load4wangedit',
      customInsert (res, insertFn) {
        insertFn(res.data.url, '', '')
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style>

</style>
