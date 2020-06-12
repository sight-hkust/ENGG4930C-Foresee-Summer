import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native"
import { Formik } from "formik";
import { auth } from "../../../../constant/Config";
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password:
        Yup.string()
            .label('Password').required('Required')
            .min(7, 'Password must be at least 7 characters.')
            .max(16, 'The accound system can contain up to 16 characters.'),
    confirmPassword:
        /*  Yup.string().when(
             'password', {
             is: true,
             then: Yup.string()
                 .label('Confirm Password')
                 .required('Required')
                 .test('passwords-match', 'Please make sure your passwords match.',
                     function (value) {
                         console.log(this.parent)
                         return this.parent.password && this.parent.password === value;
                     }),
             otherwise: Yup.string()
                 .label('Confirm Password')
                 .required('Required')
                 .test('passwords-empty', 'Please fill in password.',
                     function () {
                         return this.parent.password;
                     })
         }) */
        Yup.string()
            .label('Confirm Password')
            .required('Required')
            .test('passwords-match', 'Please make sure your passwords match.',
                function (value) {
                    console.log(this.parent)
                    return this.parent.password && this.parent.password === value;
                })
})


function createAccountOnFirebase({ email, password }) {
    auth.createUserWithEmailAndPassword(email, password).catch(error => {
        console.log(error.code, error.message);
    })
}

const FieldWrapper = ({ children, label, formikKey, formikProps, }) => {
    return (
        <View>
            <Text>{label}</Text>
            {children}
            <Text style={{ color: 'red' }}>
                {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
            </Text>
        </View>
    )
}

const StyledInput = ({ label, formikKey, formikProps, ...rest }) => {

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {

    }
    return (
        <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
            <TextInput
                /* style={inputStyles} */
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
        </FieldWrapper>
    )
}


export const PatientRegisterForm = ({ navigation, route }) => {
    return (<Formik
        initialValues={{
            name: '',
            /* lastname: '',
            surname: '', */
            email: '',
            password: '',
            confirmPassword: ''
        }}
        onSubmit={values => createAccountOnFirebase(values)}
        validationSchema={SignupSchema}
    >
        {(formikProps) => (
            <View>
                <StyledInput
                    label="Email"
                    formikKey="email"
                    formikProps={formikProps}
                    placeholder="taimanchan@gmail.com"
                    autoFocus={false}
                />
                <StyledInput
                    label="Password"
                    formikKey="password"
                    formikProps={formikProps}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <StyledInput
                    label="Confirm Password"
                    formikKey="confirmPassword"
                    formikProps={formikProps}
                    placeholder="Password Again"
                    secureTextEntry={true}
                />
                {/* <Text>Last Name</Text>
                <TextInput
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                />
                <Text>Surname</Text>
                <TextInput
                    onChangeText={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    value={values.email}
                /> */}
                {/* <Text>Email</Text>
                <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType={"email-address"}
                />
                <Text>Phone Number</Text>
                <TextInput
                    onChangeText={handleChange('tel')}
                    onBlur={handleBlur('tel')}
                    value={values.tel}
                    keyboardType={"number-pad"}
                />
                <Text>Password</Text>
                <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                />
                <Text>Retype Password</Text>
                <TextInput
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={true}
                /> */}

                <Button onPress={formikProps.handleSubmit} title="Submit" />
            </View>
        )
        }
    </Formik>)
}