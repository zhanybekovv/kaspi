import React, { useContext, createContext } from 'react';
import { observable, action, makeObservable } from 'mobx'

import MainPage from './components/MainPage'
import { Structure } from './props'
 
import structure from './structure.json'
import employees from './employees.json'

import './App.css';

type DivisionId = {
  selectedDivisionId: string;
}

const divisionId = observable({
  selectedDivisionId: '0',
});


export const DivisionIdContext = createContext<DivisionId>(null as any)


class Store {
  employees:any[];
  divisions = new Map<string, Structure>();
  
  constructor(){
    makeObservable(this, {
      employees: observable,
      divisions: observable,
      addNewEmployee: action,
      editEmployee: action
    })
    this.employees = employees;
    this.getMapped(structure as any)
  }
  
  getMapped = (divisions: Structure[]) => {
    divisions && divisions.map((struct, index) => {
      this.divisions.set(struct.id, struct)
      if (struct.subdivisions) {
        this.getMapped(struct.subdivisions);
      }
    })
  }
  getEmployeesByDivision = (id: string) => {
    return (
      this.employees.filter(empl => {
       return empl.divisionId == id
      })
    )
  }

  getEmployeeById = (id: number) => {
    return (
      this.employees.find(empl => empl.id === id).name
    )
  }

  addNewEmployee(name: string, divisionId: string) {
    this.employees.push({id: Math.round(Math.random()*1000), name, divisionId})
  }

  editEmployee(name: string, id: number) {
    this.employees.forEach((employee) => {
      if(employee.id === id){
        employee.name = name
      }
    })
  }

  getEmployees = () => {
    return this.employees.map(empl => empl.id)
  }

  getDivisions = () => {
    return Array.from(this.divisions.keys())
  }

  search(name: string){
    if(!name || name.length === 0){
      return this.getDivisions()
    }
    return this.getDivisions().filter(divs => this.getDivision(divs)?.name.includes(name) )
  }

  // filter  = (query: string, divisions: Structure[]): SubdivisionFilterModel[] => {
  //   const result: SubdivisionFilterModel[] = [];
  
  //   divisions && divisions.forEach((struct, index) => {
  //     const subdiv = this.filter(query, struct.subdivisions);
  //     if ((subdiv && subdiv.length > 0) || struct.name.includes(query)) {
  //       result.push({
  //         id: struct.id,
  //         name: struct.name,
  //         subdivisions: subdiv,
  //       })
  //     }
  //   })
  //   return result;
  // }

  getDivision = (id: string) => {
    return this.divisions.get(id);
  }

}

const store = new Store();

const StoreContext = createContext<Store>(null as any);

const App = () => {

  return (
    <StoreContext.Provider value={store}>
      <DivisionIdContext.Provider value={divisionId}>
        <MainPage />
      </DivisionIdContext.Provider>
    </StoreContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(StoreContext)
}
export default App;
