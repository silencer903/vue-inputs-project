<template>
    <div class="numbers-inputs" >
        <div class="numbers-inputs-row"
                v-for="(inputElement, index) of inputsList" >
            <div class="number-inputs-label">
                {{inputElement.label}}
            </div>
            <div class="number-inputs-values">
                <div class="number-inputs-value"
                     v-show="!inputElement.isEdit"
                     v-on:click="changeInputs({indexShow: index})">
                    <div class="number-inputs-value-number">
                        {{inputElement.inputValue | formatNumber}}
                    </div>
                    <div class="number-inputs-arrow">
                        &lsaquo;
                    </div>
                </div>
                <div class="number-inputs-values-input" v-show="inputElement.isEdit">
                    <input  class="number-input" :ref="'inputElements'" type="number"
                            @focusout="cancelInput({})"
                            @input="inputElement.synchValue ? synchInputsValues($event.target.value) : ''"
                            v-on:keyup.enter="saveInput({indexSave: index})"
                            v-on:keyup.esc="cancelInput({})"
                            v-on:keydown.tab.exact="nextInput({indexShow: index + 1, indexSave: index, event: $event})"
                            v-on:keydown.shift.tab="previousInput({indexShow: index - 1, indexSave: index, event: $event})"
                            v-bind:value="inputsList[index].inputValue">
                    <div v-if="inputElement.helper" class="number-inputs-values-input-helper" v-on:click="executeHelperFunctions({event: $event, indexHelper: index})">
                        {{inputElement.helper.textHelper}}
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "numbers-inputs",
        data(){
            return {
                inputsList: this.$store.getters.getInputsList,
            }
        },
        filters: {
            formatNumber(value) {
                    return parseInt(value).toLocaleString('ru-RU');
                },
        },
        methods:{
            changeInputs: function(data){
                let inputsList = this.$store.getters.getInputsList;
                if(data.hasOwnProperty('event')){
                    data.event.preventDefault();
                }
                if(data.hasOwnProperty('indexSave')){
                    if(data.indexSave !== null ){
                        inputsList[data.indexSave].inputValue = this.$refs.inputElements[data.indexSave].value;
                    }
                }
                if(data.hasOwnProperty('indexShow')){
                    data.indexShow = this.getValidIndex(data.indexShow);
                }

                inputsList.map( (inputElement,ind) =>{
                    inputElement.isEdit = ind == data.indexShow;
                    return inputElement;
                });

                this.saveInputsList(inputsList).then( () => {
                    if(data.indexShow !== undefined){
                        if(inputsList[data.indexShow].isEdit){
                            this.$refs.inputElements[data.indexShow].focus();
                            this.$refs.inputElements[data.indexShow].select();
                        }
                    }
                });
            },

            getValidIndex: function(index){
                let inputsList = this.$store.getters.getInputsList;
                if(index > inputsList.length - 1){
                    return 0;
                }else if (index < 0){
                    return inputsList.length - 1;
                }else {
                    return index;
                }
            },

            cancelInput: function (data){
                this.changeInputs(data);
            },

            saveInput: function (data){
                this.changeInputs(data);
            },

            nextInput: function (data) {
                this.changeInputs(data);
            },

            previousInput: function (data) {
                this.changeInputs(data);
            },

            executeHelperFunctions: function(data) {
                let inputsList = this.$store.getters.getInputsList;
                if(data.hasOwnProperty('indexHelper')){
                    if(inputsList[data.indexHelper].helper.functionHelper !== null && inputsList[data.indexHelper].helper.functionHelper !== undefined){
                        this[inputsList[data.indexHelper].helper.functionHelper](data);
                    }
                }
            },

            getSumInputs: function (data) {
                if(data.hasOwnProperty('indexHelper')){
                    let inputsList = this.$store.getters.getInputsList;
                    let sum = 0;
                    inputsList.map((inputElement) => {
                        if(inputElement.sumTarget === true){
                            sum += parseInt(inputElement.inputValue);
                        }
                        return inputElement;
                    });
                    inputsList[data.indexHelper].inputValue = sum;
                    this.saveInputsList(inputsList);
                    if(inputsList[data.indexHelper].isEdit){
                        this.$refs.inputElements[data.indexHelper].focus();
                        this.$refs.inputElements[data.indexHelper].select();
                    }
                }
            },

            setConstInput: function (data) {
                let inputsList = this.$store.getters.getInputsList;
                if(data.hasOwnProperty('indexHelper')){
                    if(inputsList[data.indexHelper].setConst === true){
                        inputsList[data.indexHelper].inputValue = inputsList[data.indexHelper].setConstValue;
                        if(inputsList[data.indexHelper].synchValue === true){
                            this.synchInputsValues(inputsList[data.indexHelper].setConstValue);
                        }
                    }

                }
                this.saveInputsList(inputsList);
                if(inputsList[data.indexHelper].isEdit){
                    this.$refs.inputElements[data.indexHelper].focus();
                    this.$refs.inputElements[data.indexHelper].select();
                }
            },

            saveInputsList: function(inputsList){
                return this.$store.dispatch('setNewInputsListAsynch',inputsList);
            },

            synchInputsValues: function (value) {
                this.$store.dispatch('setSynchValuesAsynch', value)
            }

        }
    }
</script>

<style scoped lang="scss">
    .numbers-inputs{
        display: flex;
        flex-direction: column;
        align-items: center;

        .numbers-inputs-row{
            display: flex;
            flex-direction: row;
            height: 50px;
            padding: 5px;
            > div{
                margin: 5px;
            }
        }

        .number-inputs-label{
            text-align: center;
            vertical-align: middle;
            line-height: 40px;
        }

        .number-inputs-values{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 169px;

            .number-inputs-value{
                display: flex;
                flex-direction: row;
                cursor: pointer;

                > div:first-child{
                    margin-right: 5px;
                }

                .number-inputs-value-number{
                    text-align: center;
                    vertical-align: middle;
                    line-height: 40px;
                }

                .number-inputs-arrow{
                    transform: rotate(-90deg);
                    height: 15px;
                    margin-top: 12px;
                }
            }
            .number-inputs-value:hover{

                > div{
                    color:lightblue;
                }
            }

            .number-inputs-values-input{
                height: 21px;
                margin-top: 5px;

                > input {
                    height: 26px;
                }

                .number-inputs-values-input-helper{
                    font-size: 10px;
                    text-align: left;
                    color: blue;
                    cursor: pointer;

                }
                .number-inputs-values-input-helper:hover {
                    text-decoration: underline;
                }
            }
        }


    }

    .number-input:not(focus){
        border: none;
    }
</style>