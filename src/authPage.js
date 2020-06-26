import React from 'react';

import './App.css';

import MainStore from './store';
import {observer} from 'mobx-react';
// import { useAlert } from 'react-alert'
import axios from 'axios';


const Auth  = observer(class Auth extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email : "", 
      passwd : "",
      job: "", 
      firstName: "",
      lastName: "", 
      passwdAgain: "",
      logIn: false 
    }
  }

  handlesignUp = () => {
    if(this.state.passwdAgain !== this.state.passwd){
      console.log("Passwords Does Not Match")
    }
    else {
      let newUser = {
        firstname :  this.state.firstName,
        lastname : this.state.lastName,
        email : this.state.email,
        job: this.state.job,
        password : this.state.passwd
      }
      console.log(newUser)
      axios.post("http://192.168.0.23:3000/user/signup", newUser)
      .then(res=> {
        MainStore.token = res.data.token
        MainStore.pageNum= 1
      })
      .catch(err => console.log(err))
    }
   
  }

  handleLogin = () => {
    let newUser = {
      email : this.state.email,
      password : this.state.passwd
    }
    console.log(newUser)
    axios.post("http://192.168.0.23:3000/user/login", newUser)
    .then(res=> {
      MainStore.token = res.data.token
      MainStore.pageNum = 1;
    })
    .catch(err => console.log(err))
   
  }

  handleLog = (num) => {
    if(num){
      this.setState({logIn: true})
    }
    else{
      this.setState({logIn: false})
    }
  }


  render(){
    const loginComp = () => {
      return ((
        <div class="w-full max-w-xs" style = {{margin: 'auto', marginTop: '10%'}}>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => this.handleLog(1)} >
            Log In
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style = {{float: 'right'}} onClick = {() => this.handleLog(0)}>
            Sign Up
          </button>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
            <div class="mb-4 " style = {{margin: 'auto'}}>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Email 
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"onChange ={(event) => this.setState({email: event.target.value})} value ={this.state.email}/>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value = {this.state.passwd} onChange ={(event) => this.setState({passwd: event.target.value})}/>
              <p class="text-red-500 text-xs italic">Please enter your password.</p>
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick = {() => this.handleLogin()}>
                Sign In
              </button>
              <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      ))
    }
    const signComp = () => {
      return ((
        <div >
          <div class="w-full max-w-xs" style = {{margin: 'auto', marginTop: '5%'}}>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => this.handleLog(1)} >
              Log In
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style = {{float: 'right'}} onClick = {() => this.handleLog(0)}>
              Sign Up
            </button>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  First Name
                </label>
                <input required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Ufuk"onChange ={(event) => this.setState({firstName: event.target.value})} value ={this.state.firstName}/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Last Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Yagmur"onChange ={(event) => this.setState({lastName: event.target.value})} value ={this.state.lastName}/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="job">
                  Job
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="job" type="text" placeholder="Full Stack Developer" onChange ={(event) => this.setState({job: event.target.value})} value ={this.state.job}/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="test@test.com"onChange ={(event) => this.setState({email: event.target.value})} value ={this.state.email}/>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input required class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value = {this.state.passwd} onChange ={(event) => this.setState({passwd: event.target.value})}/>
                <p class="text-red-500 text-xs italic">Please enter your password.</p>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password Again
                </label>
                <input required class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value = {this.state.passwdAgain} onChange ={(event) => this.setState({passwdAgain: event.target.value})}/>
                <p class="text-red-500 text-xs italic">Please enter your password.</p>
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick = {()=> this.handlesignUp()}>
                  Sign Up
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      ))
    }
    const handleSign = () => {
      if(this.state.logIn){
        return loginComp();
      }
      else {
        return signComp();
      }
    }
    return (
      <div style = {{margin: 'auto', width : document.body.innerWidth}} >
        <div style = {{margin: 'auto'}}>
          
        </div>
        {handleSign()}
      </div>
      
    );
  }
})

export default Auth;
