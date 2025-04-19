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

        if (form.username==="admin" && form.password==="admin") {
            navigate('/directory');
        }

    }

    return (
        <div className="animate-in fade-in zoom-in duration-800">
            <Card>
                <CardHeader className="place-content-center">
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent >
                        <div className="my-5">
                            <Label className= "username my-2">Username</Label>
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

                        <div className="my-5">
                            <Label htmlFor="password" className="my-2">Password</Label>
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


                        <div className="checkbox-container flex items-center mb-4">
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
                            <Label htmlFor="rememberPassword">Remember Credentials</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}