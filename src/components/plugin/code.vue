<style lang="less">
  @import "../../../node_modules/codemirror/lib/codemirror.css";
  @import "../../../node_modules/codemirror/theme/elegant.css";
  .sl-code-wrapper{
    border: 1px solid #eceded;
    .CodeMirror-code{
      line-height: 1.5;
    }
    &.sl-readonly{
      .CodeMirror{
        height: auto !important;
      }
    }
    .CodeMirror-line span{
      font-size: 16px;
    }
  }
</style>

<template>
  <div class="sl-code-wrapper" :class="{ 'sl-readonly': readOnly }">
    <codemirror v-model="code" :options="codeOptions"></codemirror>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/go/go';
  import 'codemirror/mode/dockerfile/dockerfile';
  import 'codemirror/mode/markdown/markdown';
  import 'codemirror/mode/python/python';

  export default {
    name: 'sl-code',
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        required: true
      },
      mode: {
        type: String,
        default: 'text/javascript'
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val){
        this.code = val;
      },
      code(val){
        this.$emit('input', val);
      },
      mode(val){
        this.codeOptions.mode = val;
      }
    },
    data(){
      return {
        code: this.value || '',
        codeOptions: {
          readOnly: this.readOnly ? 'nocursor' : false,
          mode: this.mode,
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 4,
          theme: "elegant"
//          styleActiveLine: true,
        },
      }
    }
  }

</script>
