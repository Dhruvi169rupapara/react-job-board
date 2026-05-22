import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth} from "../context/AuthContext.jsx";

const schema = yup
    .object({
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(6).required('Password is required'),
    });

const defaultValues = {
    email: '',
    password: '',
    isAdmin: false
}

function Login() {
    const { login } = useAuth();

    const { handleSubmit, control, reset, formState: { errors,isDirty }, } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log('data----------', data);

        const userData = {
            ...data,
            role: data.isAdmin ? 'admin' : 'user'
        };

        login(userData);
    }

    return (
        <div className={'min-h-screen bg-blue-50 flex items-center justify-center'}>
            <div className={'max-w-[500px] w-full p-4 border rounded-xl shadow-sm bg-white'}>
                <h5 className={'text-center mb-8'}>Sign In</h5>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...field} />
                            }
                        />
                        <p className={'text-sm text-red-600'}>{errors.email?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) =>
                                <input type="password" className="form-control" id="exampleInputPassword1" {...field} />
                            }
                        />
                        <p className={'text-sm text-red-600'}>{errors.password?.message}</p>
                    </div>
                    <div className="form-check mb-3">
                        <Controller
                            name="isAdmin"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isAdmin"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <label
                            htmlFor="isAdmin"
                            className="form-check-label"
                        >
                            Is Admin
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
