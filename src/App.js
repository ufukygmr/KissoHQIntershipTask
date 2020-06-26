import React from 'react';
import './App.css';

import Auth from './authPage';
import MainStore from './store';
import {observer} from 'mobx-react';
import Home from './home';
import Profile from './profile'
const App = observer(class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      obj : {
        firstname : "Ufuk",
        lastname : "Yagmur",
        job: "Software Engineer Intern",
        email : "uyagmur123@gmail.com",
        password : "ufo",
        editable: false
      }

    }
  }




  render(){
    const renderPages = () => {
      if(MainStore.pageNum === 0){
        return (
          <Auth/>
        )
      }
      else if (MainStore.pageNum === 1){
        return (
          <Home/>
        )
      }
      else{
        return ( 
          <Profile/>
        )
      }
    }
    return (
      <div>
        {renderPages()}
      </div>
      
    );
  }
})

export default App;
