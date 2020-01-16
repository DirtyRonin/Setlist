import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { HashTable, task, column, dndList, initialData } from './static/initial-data';

export interface IAppState extends dndList {}

export class App extends React.Component<{}, IAppState> {

  readonly state: IAppState
  constructor(){
    super({});

    this.state = initialData
  }

  render () {
    return (<div></div>
      
    );
  }
} 

