import React, {FormEvent} from 'react';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState, useEffect} from "react";
import {API_ROUTES} from "common/src/constants.ts";
import apiClient from "@/lib/axios";
import {ScrollArea} from "@/components/ui/scrollarea.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Employee} from "@/routes/AllServiceRequests.tsx";

type Post = {
    title: string;
    content: string;
    email: string;
    posterId?: number;
}

type ForumPostPopupProps = {
    trigger?: React.ReactNode;
    onUpdate?: () => void;
};

const ForumPostPopup: React.FC<ForumPostPopupProps> = ({trigger, onUpdate}) => {

    const [form, setForm] = useState<Post>({
        title: '',
        content: '',
        email: '',
    });

    const { user } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const [employeeData, setEmployeeData] = useState<Employee | null>(null);

    useEffect(() => {
        // For demo: try to get employee data but don't require it
        if (user?.email) {
            apiClient.get(`/api/employee/user/${user.email}`)
                .then((res) => {
                    const emp = res.data;
                    setEmployeeData(emp);
                    setForm((form) => ({
                        ...form,
                        posterId: emp.employeeId,
                        email: user.email || ""
                    }));
                })
                .catch((err) => {
                    // Not an error - employee will be auto-created on post submission
                    console.log('No existing employee found, will create demo employee on post');
                    setForm((form) => ({
                        ...form,
                        email: user.email || ""
                    }));
                });
        }
    }, [user]);


    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Ensure we have posterId before submitting
        if (!form.posterId && employeeData) {
            setForm((prev) => ({
                ...prev,
                posterId: employeeData.employeeId
            }));
        }

        // Prepare the data to send - use posterId directly (backend will handle it)
        const postData = {
            title: form.title,
            content: form.content,
            // For demo: fall back to a generic email if none is provided
            email: form.email || user?.email || "demo@demo.local",
            posterId: form.posterId || employeeData?.employeeId
        };

        apiClient
            .post(API_ROUTES.FORUM + "/post", postData)
            .then(() => {
                // Reset form
                setForm({
                    title: '',
                    content: '',
                    email: user?.email || '',
                    posterId: employeeData?.employeeId
                });
                if (onUpdate) {
                    onUpdate();
                }
                setOpen(false);
            })
            .catch((err) => {
                console.error("Error submitting forum post:", err);
                alert("Failed to create post. Please try again.");
            });
    };

    return (
        <>
            <ScrollArea className="max-h-[95vh] w-115 overflow-y-auto">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        {trigger ? trigger : (
                            <Button variant="outline">+ Make a Post</Button>
                        )}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        </DialogHeader>
                            <div className="flex flex-col items-center gap-4 bg-white">
                                <div className="bg-[#0077b6]/90 text-white rounded-3xl px-6 py-4 max-w-5xl w-full mx-auto shadow-lg border-2 border-black mb-4">
                                    <h2 className="text-4xl font-bold text-center">
                                        Make a Forum Post
                                    </h2>
                                </div>
                                <form onSubmit={onSubmit}>
                                    {user ? (
                                        <div>
                                            <Label className="pt-4 pb-2" htmlFor="employeeName">
                                                Employee:
                                            </Label>
                                            <div>
                                                {employeeData?.firstName} {employeeData?.lastName}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label className="pt-4 pb-2" htmlFor="email">
                                                Email (optional)
                                            </Label>
                                            <Input
                                                type="text"
                                                id="email"
                                                className="w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <Label className="pt-4 pb-2" htmlFor="title">
                                            Title
                                        </Label>
                                        <Input
                                            required
                                            type="text"
                                            id="title"
                                            className="w-80 h-10 rounded-full border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md"
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label className="pt-4 pb-2" htmlFor="content">
                                            Content
                                        </Label>
                                        <textarea
                                            required
                                            id="content"
                                            className="w-80 h-30 rounded-2xl border-2 border-[#0077b6] bg-white px-4 py-2 transition-all duration-300 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md resize-y"
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    content: e.target.value
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-row justify-center items-center">
                                        <Button type="submit" className="mt-6 w-full rounded-2xl border">
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                    </DialogContent>
                </Dialog>
            </ScrollArea>
        </>
    );
}

export default ForumPostPopup;
