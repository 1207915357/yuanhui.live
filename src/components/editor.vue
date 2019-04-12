 <template>
        <div id="editor">
            <!-- 编辑 -->
            <mavon-editor style="height: 100%"
                          v-if="!isResolve"
                          v-model="mdCode"
                          @change="markDownChange"
                          @save="markDownSave"
                          :boxShadow="false"
                          @imgAdd="$imgAdd" 
                          @imgDel="$imgDel"
                          ref='md'
            ></mavon-editor>
            <!-- 解析 -->
            <mavon-editor 
                        v-if="isResolve"
                        :value="value"
                        :subfield = "prop.subfield"
                        :defaultOpen = "prop.defaultOpen"
                        :toolbarsFlag = "prop.toolbarsFlag"
                        :editable="prop.editable"
                        :scrollStyle="prop.scrollStyle"
                        :codeStyle="prop.codeStyle"
                        :boxShadow="false"
            ></mavon-editor>
        </div>
    </template>
    <script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        props:{
            isResolve:{
                default:false
            },
            value:String,
        },
    
        components: {
            mavonEditor
        },

        data(){
            return{
                mdCode:"", //markDown源码
                //htmlCode:""  //解析后的html源码
            }
        },
        computed: {
            prop () {
            let data = {
                subfield: false,// 单双栏模式
                defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                editable: false,
                toolbarsFlag: false,
                codeStyle: 'dracula',
                scrollStyle: true
            }
            return data
            }
      },
        methods:{
            markDownChange(md,html){
                // this.htmlCode = html
                this.$emit('getMd',md)
            },
            markDownSave(md,html){

            },

            // markdown图片上传
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                let formdata = new FormData();
                formdata.append('file', $file); 
                this.$api.article.markdownImg(formdata)  //直接传formdata对象 不要包{}
                .then(data =>{    
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    if(data.code === 1){
                        this.$refs.md.$img2Url(pos, data.data.url);
                    }
                })
            },
            // markdown图片删除
            $imgDel(file){
                console.log(file)
            },

        },
        mounted(){

        }
    }
    </script>
    <style lang='less' scoped>
    #editor {
        margin: auto;
        /* width: 80%; */
        height: 100%;
    }
   
    </style>