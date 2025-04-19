import { CardTitle } from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { ScrollArea } from '@/components/ui/scrollarea.tsx';

type securityRequestForm = {
    roomNum: string;
    numOfGuards: number;
    securityType: string;
    comments: string;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    employeeName: string;
}

const ReturnSecurityRequest = (props: securityRequestForm) => {
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
                        <Label htmlFor="securityType">Security Type</Label>
                        <p>{props.securityType}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="numOfGuards">Number of Guards Requested</Label>
                        <p>{props.numOfGuards}</p>
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

export default ReturnSecurityRequest;
