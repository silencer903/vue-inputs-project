import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputsList: [
      {
        inputValue:0,
        label: "Контролл 1",
        isEdit:false,//необходим для отображения и сокрытия input
        helper:{ // вспомогательные функции
          textHelper: "Сумма",
          functionHelper: "getSumInputs"
        }
      },
      {
        inputValue:0,
        label: "Контролл 2",
        isEdit:false,
        synchValue: true, // значение синхранизируется с остальными input где synchValue: true,
        sumTarget: true, // суммирование при использовании вспомогательной функции
        setConst: true, // вставка константы при использовании вспомогательной функции
        setConstValue: 1000, // вставляемое значение константы при использовании вспомогательной функции
        helper:{
          textHelper: "Константа",
          functionHelper: "setConstInput"

        }
      },
      {
        inputValue:0,
        label: "Контролл 3",
        synchValue: true,
        sumTarget: true,
        isEdit:false,
      },
    ]
  },
  getters: {
    getInputsList: state => {
      return state.inputsList
    }
  },
  mutations: {
    setNewInputsList: (state, payload) => {
      return state.inputsList = payload.inputsList;
    },
    //синхронизация значении при вводе в input
    setSynchValues: (state, payload) => {
      state.inputsList.map((inputElement) => {
        if(inputElement.synchValue === true){
          inputElement.inputValue = payload.synchInputsValue;
        }
        return inputElement;
      });
    }
  },
  actions: {
    //изменение input'ов в state
    setNewInputsListAsynch: (context, inputsList) => {
      return context.commit('setNewInputsList', {
        inputsList:inputsList
      });
    },
    //изменение синхронных input'ов в state
    setSynchValuesAsynch: (context,synchInputsValue) => {
      return context.commit('setSynchValues', {
        synchInputsValue:synchInputsValue
      });
    },
  },
  modules: {
  }
})
