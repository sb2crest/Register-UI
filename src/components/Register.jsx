import React, { useState, useEffect } from 'react';
import '../styles/Register.scss';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img-1.jpg'; 

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordConditionsMet, setPasswordConditionsMet] = useState({
        minLength: false,
        hasNumber: false,
        hasLowercase: false,
        hasUppercase: false,
        hasSpecialChar: false
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        const checkPasswordConditions = (value) => {
            const conditionsMet = {
                minLength: value.length >= 8,
                hasNumber: /\d/.test(value),
                hasLowercase: /[a-z]/.test(value),
                hasUppercase: /[A-Z]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
            };

            if (!(conditionsMet.hasNumber && conditionsMet.hasLowercase && conditionsMet.hasUppercase && conditionsMet.hasSpecialChar)) {
                conditionsMet.minLength = false;
            }

            setPasswordConditionsMet(conditionsMet);

            let strength = 0;
            if (conditionsMet.minLength) strength++;
            if (conditionsMet.hasNumber) strength++;
            if (conditionsMet.hasLowercase) strength++;
            if (conditionsMet.hasUppercase) strength++;
            if (conditionsMet.hasSpecialChar) strength++;

            let message = "";
            if (value.length > 0) { 
                if (strength === 5) {
                    message = "Strong";
                } else if (strength >= 3) {
                    message = "Medium";
                } else if (strength === 2) {
                    message = "Weak";
                } else {
                    message = "Too Weak";
                }
            }

            setPasswordStrength(strength);
            setPasswordMessage(message);
        };

        checkPasswordConditions(formData.password);
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setIsAgreed(checked);
        } else {
            if (name === 'phone' && value.length > 10) {
                return; // Stop updating the state if phone number exceeds 10 digits
            }
            setFormData({
                ...formData,
                [name]: value
            });
            validateField(name, value);
        }
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'firstname':
                if (!value) {
                    newErrors.firstname = "Name is required";
                } else if (!/^[A-Za-z]+$/.test(value)) {
                    newErrors.firstname = "Name should contain only letters";
                } else {
                    delete newErrors.firstname;
                }
                break;
            case 'phone':
                if (!value) {
                    newErrors.phone = "Phone number is required";
                } else if (!/^[6-9]\d{9}$/.test(value)) {
                    newErrors.phone = "Phone number must be 10 digits starting with 6, 7, 8, or 9";
                } else {
                    delete newErrors.phone;
                }
                break;
            case 'email':
                if (value && !/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Email address is invalid";
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    newErrors.password = "Password is required";
                } else {
                    delete newErrors.password;
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0 || !isAgreed) {
            setErrors(newErrors);
            if (!isAgreed) {
                alert("You must agree to the terms and conditions.");
            }
        } else {
            // Display the success popup
            alert("Registration successful!");

            // Navigate to the home page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validate = () => {
        let newErrors = {};

        // Validate each field
        for (const [name, value] of Object.entries(formData)) {
            validateField(name, value);
        }

        return newErrors;
    };

    const isButtonDisabled = Object.keys(errors).length > 0 ||
        formData.password !== formData.confirmPassword ||
        !isAgreed ||
        !Object.values(formData).every(value => value.trim() !== '') ||
        !passwordConditionsMet.minLength ||
        !passwordConditionsMet.hasNumber ||
        !passwordConditionsMet.hasLowercase ||
        !passwordConditionsMet.hasUppercase ||
        !passwordConditionsMet.hasSpecialChar;

    return (
        <div className='container' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h3>REGISTER</h3>
            <form className='form-data' onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder='Name' 
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    {errors.firstname && <span className="error">{errors.firstname}</span>}
                </label>
                <label>
                    Phone Number:
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder='Phone Number'
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={formData.phone.length >= 10}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </label>
                <label>
                    Email Id:
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Email Id'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>
                
                <label>
                    Password:
                    <div className="password-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {showPassword ? (
                            <FaEye
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <FaEyeSlash
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </label>

                <div className="password-strength">
                    <div className="strength-meter">
                        <div className={`strength-bar ${passwordStrength >= 1 ? 'too-weak' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength >= 2 ? 'weak' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength >= 3 ? 'medium' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength === 5 ? 'strong' : ''}`}></div>
                    </div>
                    {formData.password.length > 0 && (
                        <span className={`strength-message strength-${passwordStrength}`}>
                            {passwordMessage}
                        </span>
                    )}
                </div>

                <div className="password-conditions">
                    <p>Your password must have:</p>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={passwordConditionsMet.minLength}
                            readOnly
                        />
                        At least 8 characters
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={passwordConditionsMet.hasNumber}
                            readOnly
                        />
                        At least one number
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={passwordConditionsMet.hasLowercase}
                            readOnly
                        />
                        At least one lowercase letter
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={passwordConditionsMet.hasUppercase}
                            readOnly
                        />
                        At least one uppercase letter
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={passwordConditionsMet.hasSpecialChar}
                            readOnly
                        />
                        At least one special character
                    </label>
                </div>

                <label>
                    Confirm Password:
                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {showConfirmPassword ? (
                            <FaEye
                                className="eye-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        ) : (
                            <FaEyeSlash
                                className="eye-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        )}
                    </div>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </label>

                <label className="terms-conditions">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={isAgreed}
                        onChange={handleChange}
                    />
                    I agree to the <a href="/terms-and-conditions">terms and conditions</a>
                </label>

                <div className="buttons">
                    <button type="button" className='cancel-button' onClick={() => navigate('/')}>Cancel</button>
                    <button 
                        type="submit" 
                        className={`register-button ${!isButtonDisabled ? 'enabled' : ''}`}
                        disabled={isButtonDisabled} 
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
