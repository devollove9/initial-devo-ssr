<script>
export default {
  name: 'SignIn',
  render () {
    return (
      <div class="SignIn">
        <div class="signup-container">
          <div class="signup-header">
            <h1>Join Now</h1>
            <p class="signup-header-lead">Whatever reason you doing this, do it!</p>
            <ol class="steps">
              <li class="current">
                <svg aria-hidden="true" class="stepicon stepicon-user" height="32" width="24">
                  <font-awesome-icon icon="user" />
                </svg>
                <strong class="step">Step 1:</strong>
                Create personal account
              </li>
              <li>
                <svg class="stepicon stepicon-spinner" height="32" width="24">
                  <font-awesome-icon icon="spinner" spin/>
                </svg>
                <strong class="step">Step 2:</strong>
                Wait for verification
              </li>
              <li>
                <svg class="stepicon stepicon-comment-alt" height="32" width="24">
                  <font-awesome-icon icon="comment-alt"/>
                </svg>
                <strong class="step">Step 3:</strong>
                Leave a comment
              </li>
            </ol>
          </div>
          <div class="signup-main">
            <div class="form-container">
              <form accept-charset="UTF-8" autocomplete="off" class="signup-form" id="signup-form" onSubmit="signUpSubmit">
                <h2 class="h2-l">
                  {this.singupH2Label}
                </h2>
                <div class="form-group compact">
                  <p class="{ 'control': true }">
                    <div class="label-tag"><label>{this.usernameLabel}</label></div>
                    <input class="{'input': true, 'is-danger': errors.has('username') }" name="username" placeHolder="usernameLabel" autocapitallize="off" autofocus="autofocus" size="30" type="text" />
                    <span class="help is-danger">{this.validUsername}</span>
                  </p>
                </div>
                <div class="form-group compact">
                  <div class="label-tag"><label>{this.passwordLabel}</label></div>
                  <input class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeHolder="passwordLabel" autocapitallize="off" autofocus="autofocus" size="30" />
                  <span class="help is-danger">{this.validPassword}</span>
                </div>
                <div class="form-group compact">
                  <div class="label-tag"><label>{this.phoneLabel}</label></div>
                  <input class="{'input': true, 'is-danger': errors.has('phone') }" name="phone" placeHolder="phoneLabel" autocapitallize="off" autofocus="autofocus" size="30" type="text" />
                  <span class="help is-danger">{this.validPhone}</span>
                </div>
                <div class="form-group compact">
                  <div class="g-recaptcha" data-sitekey="6LcTakcUAAAAAAfRa1fV5jc5Q6oPvwFE0I4Ynqg0">
                    <div style="width: 304px; height: 78px;">
                      <div>
                        <iframe src="https://www.google.com/recaptcha/api2/anchor?k=6LcTakcUAAAAAAfRa1fV5jc5Q6oPvwFE0I4Ynqg0&co=aHR0cHM6Ly93d3cudjJleC5jb206NDQz&hl=zh-CN&v=v1518566665321&size=normal&cb=7flrz1b1ryia" width="304" height="78" role="presentation" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
                      </div>
                      <textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid #c1c1c1; margin: 10px 25px; padding: 0px; resize: none;  display: none; "></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-group compact">
                  <span class="agreement">By clicking Continue, you agree to the <a tabindex="1" href="/terms">Terms of Service</a>, and <a tabindex="1" href="/privacy">Privacy Policy.</a></span>
                  <input class="signup-continue submit-bottom" type="submit" value="Create account" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
