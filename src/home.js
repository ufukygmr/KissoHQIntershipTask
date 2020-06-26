import React from 'react';
import './App.css';

import Header from './header';
import MainStore from './store';
import {observer} from 'mobx-react';
import axios from 'axios';


const Home = observer(class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : "", 
            passwd : "",
            job: "", 
            firstName: "",
            lastName: "", 
        }
    }

    getAll = () => {

        axios.get("http://192.168.0.23:3000/user/all", {
            headers: {
                token : MainStore.token
            }
        })
        .then(res=> {
            console.log("geldiler")
            MainStore.users = res.data.result
        })
        .catch(err => alert("Uups! An error accured while retrieving all users"))
    }

    handleDelete = (email) => {
        let body = {
            email: email
        }
        axios.post("http://192.168.0.23:3000/user/delete", body, {
            headers: {
                token : MainStore.token
            }
        })
        this.getAll()
    }
    handlesignUp = () => {
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
            this.getAll()
        })
        .catch(err => alert("Unable to Create New User"))
       
      }

    componentDidMount(){
        this.getAll()
    }




    render(){
        const UserList = MainStore.users.map(user => {
                return (
                    <div class="max-w-sm rounded overflow-hidden shadow-lg" style = {{height: '30vh', justifyContent: 'center', alignContent: 'center'}}>
                        <div style= {{marginTop: '20%', textAlign: "center"}}>
                            <div class="px-6 py-4" >
                            <div class="font-bold text-xl mb-2">{user.firstname}  {user.lastname}</div>
                            <p class="text-gray-700 text-base">
                                {user.job}
                            </p>
                            <p class="text-gray-700 text-base">
                                {user.email}
                            </p>
                            <button style = {{marginTop: 20, backgroundColor: 'red'}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick = {()=> this.handleDelete(user.email)}>
                                Delete User
                            </button>
                            </div>
                        </div>          
                    </div>
                )
            })
        return (
            <div>
                <Header/>
                <div class="w-full max-w-xs" style = {{float: 'left', marginRight: 20}}>
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
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick = {()=> this.handlesignUp()}>
                            Add New User
                        </button>
                    </div>
                    </form>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    {UserList}
                </div>
            </div>
        
        );
    }
})

export default Home;
