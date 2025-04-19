import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ScrollArea} from "@/components/ui/scrollarea.tsx";
import { Label } from '@/components/ui/label.tsx';

type translatorRequestForm = {
    languageFrom: string;
    languageTo: string;
    roomNum: string;
    startDateTime: string;
    endDateTime: string;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    comments: string;
    employeeName: string;
};

const ReturnTranslatorRequest = (props: translatorRequestForm) => {
    return (
        <ScrollArea>
        <div className="grid  h-100 items-center">
            <div className="">
                <div className="place-content-center">
                    <CardTitle className="text-3xl">Request Summary</CardTitle>
                </div>

                <div>
                    <div className="my-5">
                        <Label htmlFor="employeeId">Requested By</Label>
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
                        <Label htmlFor="languageFrom">Language From</Label>
                        <p>{props.languageFrom}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="languageTo">Language To</Label>
                        <p>{props.languageTo}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="startDateTime">Start Date and Time</Label>
                        <p>{props.startDateTime}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="endDateTime">End Date and Time</Label>
                        <p>{props.endDateTime}</p>
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

export default ReturnTranslatorRequest;
