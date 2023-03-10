import React, { Component } from 'react';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            formSubmitted: false,
            formErrors: {},
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.validateForm() === true) {
            this.setState({ formSubmitted: true });
            console.log('Вас було успішно зареєстровано');
        } else {
            console.error('Щось пішло не так');
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleBlur = (event) => {
        const { name, value } = event.target;
        const formErrors = { ...this.state.formErrors };
        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 2 ? "Ім'я не може бути коротше 2 символів" : '';
                break;
            case 'email':
                formErrors.email = value.length === 0 ? 'Вкажіть email' : !this.handleEmail(value) ? 'Вкажіть коректний email' : '';
                break
            case 'password':
                formErrors.password = value.length < 8 ? 'Пароль закороткий' : '';
                break
            case 'passwordConfirm':
                formErrors.passwordConfirm = value !== this.state.password ? 'Підтвердження паролю не пройшло успішно, перевірте правильність паролю' : '';
                break;
        }
        this.setState({ formErrors })
    };

    handleFocus = (event) => {
        this.setState({ formSubmitted: false })
        const formErrors = { ...this.state.formErrors };
        const { name } = event.target;
        delete formErrors[name];
        this.setState({ formErrors });
    };

    validateForm = () => {
        const formErrors = { ...this.state.formErrors };
        const state = {...this.state}
        const errors = Object.values(formErrors).every((item) => item.length === 0);
        const states = Object.values(state).every((item) => item !== '');

        if (errors === true && states === true) {
            return true;
        } else {
            return false;
        }
    };

    handleEmail = (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
       }

    // handleEmail = (value) => {
    //     const EMAIL_REGEXP =
    //       /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //     return EMAIL_REGEXP.test(value);
    //   };

    render() {

        const { firstName, email, password, passwordConfirm, formErrors } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Form</h1>
                    <div className="input-div name-div">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id='firstName'
                            type="text" 
                            name='firstName'
                            placeholder='Enter your name'
                            value={firstName}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur} 
                        />
                        {formErrors.firstName && <span>{formErrors.firstName}</span>}
                    </div>
                    <div className="input-div email-div">
                        <label htmlFor="email">Email</label>
                        <input 
                            id='email'
                            type="text" 
                            name='email'
                            placeholder='Enter yoour email'
                            value={email}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur} 
                        />
                        {formErrors.email && <span>{formErrors.email}</span>}
                    </div>
                    <div className="input-div pass-div">
                        <label htmlFor="password">Password</label>
                        <input 
                            id='password'
                            type="password" 
                            name='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur} 
                        />
                        {formErrors.password && <span>{formErrors.password}</span>}
                    </div>
                    <div className="input-div pass-conf-div">
                        <label htmlFor="passwordConfirm">Password</label>
                        <input 
                            id='passwordConfirm'
                            type="password" 
                            name='passwordConfirm'
                            placeholder='Repeat your password'
                            value={passwordConfirm}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur} 
                        />
                        {formErrors.passwordConfirm && <span>{formErrors.passwordConfirm}</span>}
                    </div>
                    <button type='submit'>
                        Реєстрація
                    </button>
                    {this.state.formSubmitted && <div className="success"><p>Вас було успішно зареєстровано</p></div> }
                </form>
            </div>
        );
    }
}

export default Form;