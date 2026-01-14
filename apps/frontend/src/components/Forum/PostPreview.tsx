import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
export type PostPreviewProps = {
    postId: string;
    title: string;
    content: string;
    createdAt: string;
    email: string;
    replies: ReplyProps[];
};
type ReplyProps = {
    replyId: string,
    content: string,
    createdAt: string,
    email: string,
    postId: number,
}


const PostPreview: React.FC<PostPreviewProps> = ({ postId, title, content, createdAt, email, replies }) => {
    const navigate = useNavigate();
    const redirectHandler = () => {
        console.log("Redirecting to post", postId);
        const postIdString = postId.toString();
        navigate('/detailed-post/'+postIdString);
    }
    return (
        <div className="border-2 border-[#0077b6] shadow-md hover:shadow-lg transition-shadow p-6 bg-white rounded-xl cursor-pointer group"
             onClick={redirectHandler}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                {/* Left side: title, meta, content */}
                <div className="flex-1 space-y-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#03045e] group-hover:text-[#0077b6] transition-colors">
                        {title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                            <span className="font-medium">By:</span> {email}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 line-clamp-2">{content}</p>
                </div>

                {/* Right side: replies count */}
                <div className="flex-shrink-0 sm:text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#90e0ef]/20 rounded-lg border border-[#0077b6]/30">
                        <span className="text-sm font-medium text-[#03045e]">
                            {replies.length}
                        </span>
                        <span className="text-xs text-gray-600">
                            {replies.length === 1 ? 'reply' : 'replies'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPreview;
