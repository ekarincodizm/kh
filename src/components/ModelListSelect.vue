<script>
  /* wrap basic component */
  import ModelSelect from './ModelSelect.vue'
  
  export default {
    render: function (createElement) {
      return createElement(ModelSelect, {
        props: {
          options: this.options,
          value: this.innerValue,
          isError: this.isError,
          placeholder: this.placeholder
        },
        on: {
          input: this.onInput
        }
      })
    },
    props: {
      model: {
        type: Object
      },
      list: {
        type: Array
      },
      optionValue: {
        type: String
      },
      optionText: {
        type: String
      },
      customText: {
        type: Function
      },
      value: {
        type: [String, Object]
      },
      isError: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    computed: {
      options () {
        return this.list.map(e => {
          return { value: e[this.optionValue], text: this.buildText(e) }
        })
      },
      innerValue () {
        if (typeof this.value === 'object') {
          return { value: this.value[this.optionValue], text: this.buildText(this.value) }
        } else if (typeof this.value === 'string') {
          return this.value
        }
      }
    },
    methods: {
      buildText (e) {
        if (e[this.optionValue]) {
          if (this.customText) {
            return this.customText(e)
          } else {
            return e[this.optionText]
          }
        } else {
          return ''
        }
      },
      onInput (option) {
        console.log('onInput',option)
        window.opt = option;
        if (typeof option === 'object') {
          const item = this.list.find(e => {
            return e[this.optionValue] === option.value
          })
          console.log('--onInput--child1--',option,this);
          if(option.name == undefined && option.text == undefined ){
            console.log('----empty object-------')
          } else {
            this.$emit('input', item,this.model,this)
          }
        } else if (typeof option === 'string') {
          console.log('--onInput--child2--',option,this);
          this.$emit('input',option,this.model,this)
        }
      }
    },
    components: {
      ModelSelect
    },
    created() {
      console.log('created--',this,this.model)
    }
  }
</script>
<style type="text/css" media="screen">
  * {
    font-size:14px !important;
   }  
</style>
