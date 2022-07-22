<template>
    <div class="container">
        <div class="row">
			<div class="col-lg-3 d-none d-lg-block bg-login-image"></div>
			<div class="col-lg-6">
				<div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form class="account-form" v-on:submit.prevent="">
                        <div class="form-group">
                            <input type="input" class="form-control form-control-user" 
                                id="userName" placeholder="Name" v-model="user.name" />
                        </div>
						<div class="form-group" v-bind:style="{ color: invalidNameColor, display: invalidNameDisplay }">
							{{invalidNameValue}}
						</div>
                        <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <input type="password" class="form-control form-control-user"
                                    id="userPassword" placeholder="Password" v-model="user.password" />
                            </div>
                            <div class="col-sm-6">
                                <input type="password" class="form-control form-control-user"
                                    id="userRepeatPassword" placeholder="Repeat Password" v-model="repeatPassword" />
                            </div>
                        </div>
						<div class="form-group" v-bind:style="{ color: invalidPasswordColor, display: invalidPasswordDisplay }">
							{{invalidPasswordValue}}
						</div>
						<div class="form-group" 
							style="text-align:center"
							v-bind:style="{ color: networkErrorColor, display: networkErrorDisplay }">
							Error : Network Connection Error!
						</div>
                        <button class="btn btn-primary btn-user btn-block" v-on:click="register()">
                            Register
                        </button>
                    </form>
				</div>
			</div>
			<div class="col-lg-3 d-none d-lg-block bg-login-image"></div>
		</div>
    </div>
</template>
<script>
    var {SERVER_BASE_URL} = require('../env.js');

    export default{
        data(){
            return{
				user:{
					name: '',
					password: ''
				},
                repeatPassword: '',
				networkErrorColor: 'red',
				networkErrorDisplay: 'none',
				invalidNameColor: 'red',
				invalidNameDisplay: 'none',
				invalidNameValue: 'Invalid Name.',
				invalidPasswordColor: 'red',
				invalidPasswordDisplay: 'none',
				invalidPasswordValue: 'Invalid Password.'
            }
        },

        created: function(){
        },

        methods: {
			register()
			{
				this.networkErrorDisplay = 'none';
				this.invalidNameDisplay = 'none';
				this.invalidPasswordDisplay = 'none';

				if (this.user.name.length < 3)
				{
					this.invalidNameDisplay = 'block';
					this.invalidNameValue = 'Invalid Name.';
					window.document.getElementById("userName").focus();
					return;
				}
				if (this.user.password.length < 6)
				{
					this.invalidPasswordDisplay = 'block';
					this.invalidPasswordValue = 'Invalid Password.';
					window.document.getElementById("userPassword").focus();
					return;
				}
				if (this.user.password != this.repeatPassword)
				{
					this.invalidPasswordDisplay = 'block';
					this.invalidPasswordValue = 'Confirm Password.';
					window.document.getElementById("userRepeatPassword").focus();
					return;
				}

				let uri = SERVER_BASE_URL + '/user/register';
                this.axios.post(uri, this.user)
				.then(response => {
					// console.log(response);
				
					let login_type = response.data["type"];
					if (login_type == "0") {
						// in case 'register success' 
						this.$router.push({name: 'Login'});
					} else if (login_type == "-1") {
						// in case 'duplicated name'
						this.invalidNameDisplay = 'block';
						this.invalidNameValue = 'Duplicated Name.';
						window.document.getElementById("userName").focus();
                    }
				})
				.catch(() => {
					this.networkErrorDisplay = 'block';
				});
			}
        }
    }
</script>
