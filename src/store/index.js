import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputsList: [
      {
        inputValue:0,
        label: "Контролл 1",
        isEdit:false,
        helper:{
          textHelper: "Сумма",
          functionHelper: "getSumInputs"
        }
      },
      {
        inputValue:0,
        label: "Контролл 2",
        isEdit:false,
        synchValue: true,
        sumTarget: true,
        setConst: true,
        setConstValue: 1000,
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
    setNewInputsListAsynch: (context, inputsList) => {
      return context.commit('setNewInputsList', {
        inputsList:inputsList
      });
    },
    setSynchValuesAsynch: (context,synchInputsValue) => {
      return context.commit('setSynchValues', {
        synchInputsValue:synchInputsValue
      });
    },
  },
  modules: {
  }
})
