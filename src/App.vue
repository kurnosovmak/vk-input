<template>
  <div style="margin-bottom: 100px;width: 390px;position: absolute;bottom: 0;right: calc((100% - 390px)/2);">
    <InputWithEmojiPicker @submit-input="submit" />

  </div>
</template>

<script>
import InputWithEmojiPicker from "@/components/InputWithEmojiPicker";
export default {
  components: {InputWithEmojiPicker},
  methods:{
    submit(message){
      alert(message)
    },
  }
}
</script>

<style>
body{
  font-family: 'Source Sans Pro', sans-serif;
}

</style>
