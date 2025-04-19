import { CardTitle } from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import {ScrollArea} from "@/components/ui/scrollarea.tsx";

interface SanitationRequest {
    roomNum: string;
    type: string;
    status: string;
    comments: string;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    employeeName: string;
}

const ReturnSanitationRequest = (props: SanitationRequest) => {
    return (
        <ScrollArea>
        <div className="grid  h-100 items-center">
            <div className="">
                <div className="place-content-center">
                    <CardTitle className="text-3xl">Request Summary</CardTitle>
                </div>

                <div>
                    <div className="my-5">
                        <Label htmlFor="employeeRequestedById">Employee ID</Label>
                        <p>{props.employeeRequestedById}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="employeeName">Employee Name</Label>
                        <p>{props.employeeName}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="departmentId">Department ID</Label>
                        <p>{props.departmentUnderId}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="roomNum">Room Number</Label>
                        <p>{props.roomNum}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="type">Sanitation Type</Label>
                        <p>{props.type}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="status">Room status</Label>
                        <p>{props.status}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="priority">Priority</Label>
                        <p>{props.priority}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="requestStatus">Request Status</Label>
                        <p>{props.requestStatus}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="comments">Comments</Label>
                        <p>{props.comments}</p>
                    </div>
                </div>
            </div>
        </div>
        </ScrollArea>
    );
};

export default ReturnSanitationRequest;
