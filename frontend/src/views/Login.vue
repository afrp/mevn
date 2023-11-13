<template>
    <div class="container-fit">
        <div class="login__box intro">
            <v-img class="login__intro-img" src="@/assets/login-dashboard.png" />
            <div class="login__footer-text">
                © Copyright {{ new Date().getFullYear() }}. All Right Reserved.
            </div>
        </div>
        <div class="login__box form">            
            <div class="login__form-wrap">
                <h3 class="title-md">Login to your Account</h3>
                <p class="subtitle-md">Hi, welcome back! Select method to login</p>
                <div class="btn-wrap">
                    <v-btn
                        class="btn"
                        color="#FFFFFF"
                        size="small"
                        variant="flat"
                    >
                        <div>
                            <v-img height="24" width="24" src="@/assets/logo-google.svg" />
                            <span>Google</span>
                        </div>                            
                    </v-btn>
                    <v-btn
                        class="btn"
                        color="#FFFFFF"
                        size="small"
                        variant="flat"
                    >
                        <div>
                            <v-img height="24" width="24" src="@/assets/logo-linkedin.svg" />
                            <span>linked in</span>
                        </div>                            
                    </v-btn>
                </div>
                <div class="form-spacer">
                    <div class="line"></div>
                    <div class="text">Or continue with email</div>
                    <div class="line"></div>
                </div>
                <div class="input-wrap">
                    <label for="inputEmail" class="title-sm">Email</label>
                    <input id="inputEmail" v-model="email" type="text" class="form-control" placeholder="e.g john.doe@mail.com">
                </div>
                <div class="input-wrap">
                    <label for="inputPassword" class="title-sm">Password</label>
                    <input id="inputPassword" v-model="password" :type="showPass ? 'text':'password'" class="form-control password" placeholder="Insert Password">
                    <v-icon
                        color="blue-grey-darken-1"
                        :icon="showPass ? 'mdi-eye-off': 'mdi-eye'"
                        class="icon-input"
                        @click="showPass = !showPass"
                    ></v-icon>
                </div>
                <div class="d-flex justify-space-between align-center" style="margin-top: -10px;">
                    <v-checkbox v-model="checkbox" style="min-height: unset;">
                        <template v-slot:label>
                            <span class="checkbox-label">Remember me</span>
                        </template>
                    </v-checkbox>
                    <div class="text-forgot-password">Forgot Password?</div>
                </div>
                <v-alert
                    v-model="alert"
                    density="compact"
                    type="warning"        
                    :text="alertText"
                ></v-alert>   
                <v-btn
                    class="btn-primary"
                    color="#EC4B5A"
                    size="small"
                    variant="flat"
                    @click="submitLogin"
                >
                    Login                 
                </v-btn>
            </div>
            <div class="login__footer-text dark">
                <span>Privacy Policy</span> • <span>Terms & Condition</span>
            </div>
        </div>
    </div>    
</template>
  
<script >
import axios from 'axios'
export default {
    name: 'LoginPage',
    components:{
        
    },
    data() {  
        return {
            email:'',
            password: '',
            checkbox: false,
            showPass: false,
            alert: false,
            alertText: 'Please check your email or password',
        }
    },
    methods:{
        submitLogin(){
            // const data =  JSON.parse(localStorage.getItem('loginData'));
            // if (data.email !== this.email || data.password !== this.password){
            //     this.alert = true;
            // } else {
            //     this.$router.push('/');
            //     this.alert = false;
            // }
            const user = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:8000/login', user)
                .then(res => {
                    //if successfull
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/');
                    }
                }, err => {
                    console.log(err.response);
                    this.alert = true;
                })
                }
    }
}

</script>

<style lang="scss" scoped>
.login__box{
    display: flex;
    min-height: 100vh;
    position: relative;
    &.form{
        width: 640px;    
        padding: 175px 69px 0;  
        flex-direction: column;  
        gap: 61px;
    }
    &.intro{
        flex-grow: 1;
        background-image: url('/img/background/Mask Group 1.png');
        background-size: cover;
        background-color: #0796E5;       
        overflow: auto;         
    }
}
.login__intro-img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1117px;
    height: auto;
}
.login__footer-text{
    color: #FFFFFF;
    font: normal normal normal 20px/24px "Open Sans";
    margin: auto auto 40px;
    &.dark{
        color: #5B6591;
    }
    span{
        cursor: pointer;
    }
}
.login__form-icon{
    width: 200px;
    height: 68px;
    max-height: 68px;        
}

.login__form-wrap{
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
}
.btn-wrap{
    display: flex;
    width: 100%;
    padding: 16px 0;
    justify-content: space-between;
    .btn{
        width: 239px;
        min-height: 56px;        
        border: 1px solid #888FB0;
        border-radius: 8px;
        div{
            display: flex;
            gap: 16px;
        }
        span{
            font: normal normal bold 20px/22px 'Open Sans';
            min-width: 167px;
            text-transform: capitalize;
            color: #132662;
        }
    }
}

.form-spacer{
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    .line{
        flex-grow: 1;
        height: 1px;
        background: #888FB0;
    }
    .text{
        font: normal normal medium 14px/18px 'Open Sans';
    }
}
.text-forgot-password{
    font: normal normal bold 20px/28px 'Open Sans';
    letter-spacing: 0px;
    color: #0796E5;
    cursor: pointer;
}
.box-footer-form{
    display: flex;
    flex-direction: row;
}
@media only screen and (max-width: 1023px) {
    .login__box{   
        &.form{
            width: 100%;
            gap: 31px;
            padding: 40px 12px 0;  
            max-width: 425px;
            margin: 0 auto;
        } 
        &.intro{
            display: none;
        }
    }
    .login__form-icon{
        width: 120px;
        height: 40px;
        max-height: 40px;        
    }
    .btn-wrap{
        flex-direction: column;        
        padding: 16px 0 0;
        justify-content: unset;
        gap: 16px;
        .btn{
            width: 100%;
            min-height: 44px;
            div{
                width: 100%;
            }
            span{
                font: normal normal bold 16px/22px 'Open Sans';
                min-width: calc(425px - 88px);                
            }
        }
    }
    .login__form-wrap{
        gap: 16px;
    }
    .text-forgot-password{
        font: normal normal bold 14px/18px 'Open Sans';        
    }
    .login__footer-text{        
        font: normal normal normal 14px/18px "Open Sans";
    }
}

@media only screen and (max-width: 425px) {    
    .btn-wrap{
        .btn{
            span{
                min-width: calc(100vw - 88px);                
            }
        }
    }
}
</style>
  