import PostPreview from "@/components/Forum/PostPreview.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "common/src/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import ForumPostPopup from "@/components/Forum/ForumPostPopup.tsx";
import {Input} from "@/components/ui/input.tsx";


export type PostPreviewProps = {
    postId: string;
    title: string;
    content: string;
    createdAt: string;
    email: string;
    replies: Array<ReplyProps>;
};

type ReplyProps = {
    replyId: string;
    content: string;
    createdAt: string;
    email: string;
    postId: number;
};

export default function AllPost() {
    const [allPosts, setAllPosts] = useState<PostPreviewProps[]>([]);
    const [currentPost, setCurrentPosts] = useState<PostPreviewProps[]>([]);
    const [batchNumber, setBatchNumber] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const postPerBatch = 3;

    const handleSearch = () => {
        const filtered = allPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCurrentPosts(filtered.slice(0, postPerBatch));
        setBatchNumber(0);
    };
    const [showPopup, setShowPopup] = useState(false);

    const resetSearch = () => {
        setSearchQuery("");
        setCurrentPosts(allPosts.slice(0, postPerBatch));
        setBatchNumber(0);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            resetSearch();
        }
    }, [searchQuery]);

    const toPreviousBatch = () => {
        if (batchNumber > 0) {
            setBatchNumber(batchNumber - 1);
        }
    };

    const toNextBatch = () => {
        if ((batchNumber + 1) * postPerBatch < allPosts.length) {
            setBatchNumber(batchNumber + 1);
        }
    };

    const toThisBatch = (number: number) => {
        setBatchNumber(number);
    };

    useEffect(() => {
        const start = batchNumber * postPerBatch;
        const end = start + postPerBatch;
        setCurrentPosts(allPosts.slice(start, end));
    }, [batchNumber, allPosts]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(API_ROUTES.FORUM + "/newest");
            const rawData = response.data;

            // Handle empty or invalid responses
            if (!rawData || !Array.isArray(rawData)) {
                console.warn('Invalid response format or no posts:', rawData);
                setAllPosts([]);
                setCurrentPosts([]);
                setBatchNumber(0);
                return;
            }

            // Map backend data to frontend format
            const mappedPosts: PostPreviewProps[] = rawData.map((post: any) => ({
                postId: post.postId.toString(),
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                email: post.email || post.poster?.email || 'Unknown',
                replies: (post.replies || []).map((reply: any) => ({
                    replyId: reply.replyId.toString(),
                    content: reply.content,
                    createdAt: reply.createdAt,
                    email: reply.email || reply.replier?.email || 'Unknown',
                    postId: reply.postId
                }))
            }));

            console.log(`Loaded ${mappedPosts.length} forum posts`);
            setAllPosts(mappedPosts);
            setCurrentPosts(mappedPosts.slice(0, postPerBatch));
            setBatchNumber(0);
        } catch (error) {
            console.error("Error fetching forum posts:", error);
            setAllPosts([]);
            setCurrentPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="border-2 border-[#0077b6] rounded-2xl shadow-lg p-6 sm:p-8 bg-white mb-8">
                    {/* Header Section */}
                    <div className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">
                            Help Forum
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Ask questions, share knowledge, and help others in the community
                        </p>
                    </div>

                    {/* Search and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search posts…"
                                className="w-full rounded-lg border-2 border-[#0077b6] bg-white px-4 py-2 focus:border-[#00b4d8] focus:ring-2 focus:ring-[#90e0ef]/50 focus:outline-none shadow-sm hover:shadow-md transition-shadow"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={handleSearch}
                                className="rounded-lg"
                            >
                                Search
                            </Button>

                            <Button
                                onClick={resetSearch}
                                variant="outline"
                                className="rounded-lg"
                            >
                                Reset
                            </Button>

                            <ForumPostPopup
                                onUpdate={fetchData}
                                trigger={
                                    <Button className="rounded-lg">
                                        + Make a Post
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4 mb-8">
                    {loading ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">Loading posts...</p>
                        </div>
                    ) : currentPost.length > 0 ? (
                        currentPost.map((post: PostPreviewProps) => (
                            <div key={post.postId}>
                                <PostPreview {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No posts to show.</p>
                            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or create a new post.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {allPosts.length > 0 && (
                    <div className="flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={toPreviousBatch}
                                        className={batchNumber === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {[...Array(Math.ceil(allPosts.length / postPerBatch))].map((_, idx) => (
                                    <PaginationItem key={idx}>
                                        <PaginationLink
                                            isActive={idx === batchNumber}
                                            onClick={() => toThisBatch(idx)}
                                            className="cursor-pointer"
                                        >
                                            {idx + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={toNextBatch}
                                        className={(batchNumber + 1) * postPerBatch >= allPosts.length ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
