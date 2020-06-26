import React from 'react';
import './App.css';

import Header from './header';
import MainStore from './store';
import {observer} from 'mobx-react';
import axios from 'axios';


const Profile = observer(class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password : ""

        }
    }

    getUser = () => {
        axios.get("http://192.168.0.23:3000/user/me", {
            headers: {
                token : MainStore.token
            }
        })
        .then(res=> {
            console.log("geldiler12")
            MainStore.me = res.data
        })
        .catch(err => console.log(err))
    }

    handlePassword = () => {
        let body = {
            email : MainStore.me.email,
            password: this.state.password
        }
        axios.post("http://192.168.0.23:3000/user/changePasswd", body,{
            headers: {
                token : MainStore.token
            }
        })
        .then(res=> {
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    componentWillMount(){
        this.getUser()
    }




    render(){
        return (
            <div>
                <Header/>
                <div class="max-w-sm rounded overflow-hidden shadow-lg" style = {{height: '30vh', margin: 'auto', marginTop: '10%'}}>
                    <div style= {{ textAlign: "center"}}>
                        <div class="px-6 py-4" >
                        <div class="font-bold text-xl mb-2">{MainStore.me.firstname}  Ufuk{MainStore.me.lastname}</div>
                        <p class="text-gray-700 text-base">
                            {MainStore.me.job}
                        </p>
                        <p class="text-gray-700 text-base">
                            {MainStore.me.email}
                        </p>
                        <input style = {{marginTop: 20}} class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="password" placeholder="************" value = {this.state.password} onChange= {(event) => this.setState({password : event.target.value})}/>
                        <button onClick = {()=> {this.handlePassword()}} style = {{marginTop: 20, backgroundColor: 'blue'}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                            Change Password
                        </button>
                        </div>
                    </div>          
                </div>
            </div>
        
        );
    }
})

export default Profile;
