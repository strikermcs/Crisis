<template>
     <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Редактировать</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field" >
              <select ref="select" v-model="current">
                <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
                >{{c.title}}</option>
              </select>
              <label>Выберите категорию</label>
            </div>

         <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="name">Название</label>
              <span 
              v-if="$v.title.$dirty && !$v.title.required"
              
              class="helper-text invalid">Введите название категории</span>
            </div>



           <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model="limit"
                  :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
              >
              <label for="limit">Лимит</label>
              <span 
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid">Минимальный лимит не должен 
              быть меньше {{$v.limit.$params.minValue.min}} грн.</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      
      </div>
</template>


<script>
import  {required, minValue} from 'vuelidate/lib/validators'


export default {
  props:{
    categories:{
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  
    validations:{
        title: {required},
        limit: {minValue: minValue(1)}
    },
    watch:{
      current(catId){     
          const{title, limit} = this.categories.find(c => c.id === catId)
          this.title = title
          this.limit = limit
      }
    },
    created(){
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    },
   
  mounted(){
     M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed(){
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  methods:{
      async submitHandler(){ 
          if(this.$v.$invalid){
          this.$v.$touch()
          return
           
       }
        try{
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          }  
          await this.$store.dispatch('updateCategory',categoryData)
          this.$message('Категория успешно обновлена')
          this.$emit('updated', categoryData)
        }catch(e){}

      }
  }
}
</script>