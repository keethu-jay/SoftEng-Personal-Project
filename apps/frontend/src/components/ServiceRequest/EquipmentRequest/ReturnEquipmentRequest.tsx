import { CardTitle } from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { ScrollArea } from '@/components/ui/scrollarea.tsx';

type equipmentRequestForm = {
    medicalDevice: string;
    signature: string;
    quantity: number;
    comments: string;
    roomNum: string;
    startDateTime: string;
    endDateTime: string;
    requestStatus: string;
    priority: string;
    employeeRequestedById: number;
    departmentUnderId: number;
    employeeName: string;
}

const ReturnEquipmentRequest = (props: equipmentRequestForm) => {
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
                        <Label htmlFor="medicalDevice">Medical Device</Label>
                        <p>{props.medicalDevice}</p>
                    </div>

                    <div className="my-5">
                        <Label htmlFor="quantity">Quantity</Label>
                        <p>{props.quantity}</p>
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
                        <Label htmlFor="signature">Signature</Label>
                        <p>{props.signature}</p>
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

export default ReturnEquipmentRequest;