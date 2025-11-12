import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        try {
            const res = await api.post('/register', data);
            Swal.fire('Success', res.data.message || 'Registered successfully', 'success');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Registration failed', 'error');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    <h3 className="card-title mb-4 text-center">Register</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('name')}
                            placeholder="Name"
                            className={`form-control mb-2 ${errors.name ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.name?.message}</div>

                        <input
                            {...register('email')}
                            placeholder="Email"
                            className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>

                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Password"
                            className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>

                        <button className="btn btn-primary w-100 mt-2" type="submit">Register</button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
