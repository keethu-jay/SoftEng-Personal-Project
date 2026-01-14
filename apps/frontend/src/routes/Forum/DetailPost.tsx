import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ForumReplyPopup from "@/components/Forum/ForumReplyPopup.tsx";
import { API_ROUTES } from 'common/src/constants.ts';
import apiClient from '@/lib/axios';
import { ArrowLeft } from "lucide-react"; // optional: for an icon

export type Employee = {
    firstName: string;
    lastName: string;
};

export type Post = {
    postId: string;
    title: string;
    content: string;
    createdAt: string;
    poster: Employee | null;
    email: string | null;
    replies: Reply[];
};

export type Reply = {
    content: string;
    createdAt: string;
    replier: Employee;
};

export default function DetailPost() {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post>();
    const params = useParams();

    useEffect(() => {
        const postId = params.postId;
        if (!postId) return;
        apiClient.get(API_ROUTES.FORUM + '/post/' + postId).then(res => {
            const p = res.data as Post;
            setPost(p);
        });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {post ? (
                <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center text-[#03045e] hover:text-[#0077b6] font-medium transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Return to Forum
                    </button>

                    {/* Main Post */}
                    <div className="border-2 border-[#0077b6] rounded-2xl shadow-lg bg-white p-6 sm:p-8 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#03045e] mb-4">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">
                                <span className="font-medium">Posted by:</span> {post.poster ? `${post.poster.firstName} ${post.poster.lastName}` : post.email}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</div>
                    </div>

                    {/* Reply Form */}
                    <div className="border-2 border-[#0077b6] rounded-2xl shadow-md bg-white p-6 mb-6">
                        <h2 className="text-xl font-semibold text-[#03045e] mb-4">Add a Reply</h2>
                        <ForumReplyPopup
                            ID={post.postId}
                            onReplySubmit={() => {
                                apiClient.get(API_ROUTES.FORUM + '/post/' + post.postId).then(res => {
                                    const p = res.data as Post;
                                    setPost(p);
                                });
                            }}
                        />
                    </div>

                    {/* Replies Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#03045e] mb-4">
                            Replies ({post.replies?.length || 0})
                        </h2>
                        {post.replies && post.replies.length > 0 ? (
                            <div className="space-y-4">
                                {post.replies.map((reply, index) => (
                                    <div key={index} className="border-2 border-[#0077b6] rounded-xl shadow-sm bg-white p-5 hover:shadow-md transition-shadow">
                                        <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                                            <div className="text-sm font-semibold text-[#03045e]">
                                                {reply.replier?.firstName
                                                    ? `${reply.replier.firstName} ${reply.replier.lastName}`
                                                    : 'Anonymous'}
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <div className="text-xs text-gray-500">
                                                {new Date(reply.createdAt).toLocaleDateString()} at {new Date(reply.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">{reply.content}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-500">No replies yet. Be the first to reply!</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="text-lg font-semibold text-[#03045e] mb-2">Loading...</div>
                        <div className="text-sm text-gray-500">Please wait while we fetch the post</div>
                    </div>
                </div>
            )}
        </div>
    );
}
