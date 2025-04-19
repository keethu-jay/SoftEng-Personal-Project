import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

type loginForm = {
    username: string;
    password: string;
    rememberCredentials: boolean;
};

export default function Login() {
    const navigate = useNavigate();
    const lsusername = localStorage.getItem("username") || '';
    const lspassword = localStorage.getItem("password") || '';

    const [form, setForm] = useState<loginForm>({
        username: lsusername,
        password: lspassword,
        rememberCredentials: false,
    });



    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(form);

        if (form.rememberCredentials) {
            localStorage.setItem("username", form.username);
            localStorage.setItem("password", form.password);
        }
        else {
            localStorage.setItem("username", "");
            localStorage.setItem("password", "");
        }

        if (form.username.endsWith('@brighamandwomens.org')) {
            navigate('/servicerequest');
        } else {
            navigate('/map');
        }
    }

    return (
        <div className="">
            <div className="">
                <CardHeader className="place-content-center">
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <form className="" onSubmit={onSubmit}>
                    <div>
                        <Label className="pt-3 pb-2" htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            value={form.username}
                            onChange={(e) => setForm({
                                ...form,
                                username: e.target.value
                            })}
                        />
                    </div>
                    <div>
                        <Label className="pt-3 pb-2" htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={(e) => setForm({
                                ...form,
                                password: e.target.value
                            })}
                        />
                    </div>
                    <div className="pt-3 pb-2 checkbox-container flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="rememberPassword"
                                checked={form.rememberCredentials}
                                onChange={() => setForm({
                                    ...form,
                                    rememberCredentials: !form.rememberCredentials
                                })}
                                className="mr-2"
                            />
                            <Label htmlFor="pt-3 pb-2 rememberPassword">Remember Credentials</Label>
                    </div>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </div>
        </div>
    );
}