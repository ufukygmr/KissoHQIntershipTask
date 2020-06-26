import React from 'react';

import './App.css';
import MainStore from './store'
import {observer} from 'mobx-react';

const Header = observer(class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pageNum : MainStore.pageNum
    }
  }


  handleClick = (num) => {
    if(num === 1){
      MainStore.pageNum = 1; 
    }
    else if(num === 2){
      MainStore.pageNum = 2; 
    }
    else{
      MainStore.pageNum = 0; 
      MainStore.token = "";
      MainStore.users = [];
      MainStore.me = [];
    }
  }




  render(){
    const headerChanger = () => {
      if(MainStore.pageNum === 1){
        return((
          <ul class="flex border-b" style = {{justifyContent: "flex-end"}}>
            <li class="-mb-px mr-1">
              <button onClick= {() =>this.handleClick(1)} class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" >Home</button>
            </li>
            <li class="mr-1">
              <button onClick= {() =>this.handleClick(2)} class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Profile</button>
            </li>
            <li class="mr-3">
              <button onClick= {() =>this.handleClick(0)} class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" >LogOut</button>
            </li>
          </ul>
        ))
      }
      else if (MainStore.pageNum === 2){
        return ((
          <ul class="flex border-b" style = {{justifyContent: "flex-end"}}>
            <li class="mr-1">
              <button onClick= {() =>this.handleClick(1)} class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" >Home</button>
            </li>
            <li class="-mb-px mr-1">
              <button onClick= {() =>this.handleClick(2)} class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">Profile</button>
            </li>
            <li class="mr-3">
              <button onClick= {() =>this.handleClick(0)} class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" >LogOut</button>
            </li>
          </ul>
        ))
      }
    }
    return (
      <div>
        {headerChanger()}
      </div>
      
    );
  }
})

export default Header;
