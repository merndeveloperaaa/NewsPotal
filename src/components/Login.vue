<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-3 d-none d-lg-block bg-login-image"></div>
			<div class="col-lg-6">
				<div class="p-5">
					<div class="text-center">
						<h1 class="h4 text-gray-900 mb-4">Welcome!</h1>
					</div>
					<form class="account-form" v-on:submit.prevent="">
						<div class="form-group">
							<input type="input" class="form-control form-control-user"
								id="userName" placeholder="Name" v-model="user.name" />
						</div>
						<div class="form-group" v-bind:style="{ color: invalidNameColor, display: invalidNameDisplay }">
							{{invalidNameValue}}
						</div>
						<div class="form-group">
							<input type="password" class="form-control form-control-user"
								id="userPassword" placeholder="Password" v-model="user.password" />
						</div>
						<div class="form-group" v-bind:style="{ color: invalidPasswordColor, display: invalidPasswordDisplay }">
							{{invalidPasswordValue}}
						</div>
						<div class="form-group" 
							style="text-align:center"
							v-bind:style="{ color: networkErrorColor, display: networkErrorDisplay }">
							Error : Network Connection Error!
						</div>
						<button class="btn btn-primary btn-user btn-block" v-on:click="login()">
							Login
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
			login()
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

				let uri = SERVER_BASE_URL + '/user/login';
                this.axios.post(uri, this.user)
				.then(response => {
					// console.log(response);
				
					let login_type = response.data["type"];
					if (login_type == "0") {
						// in case 'login success' 
						// console.log(response.data["userId"])
						sessionStorage.setItem("userId", response.data["userId"]);
						this.$router.push({name: 'List'});
					} else if (login_type == "-1") {
						// in case 'bad password'
						this.invalidPasswordDisplay = 'block';
						this.invalidPasswordValue = 'Bad Password.';
						window.document.getElementById("userPassword").focus();
					} else if (login_type == "-2") {
						// in case 'bad name'
						this.invalidNameDisplay = 'block';
						this.invalidNameValue = 'Unregistered User.';
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
