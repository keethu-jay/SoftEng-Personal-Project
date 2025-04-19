import '../styles/styles.css';
import React from 'react';
import {CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";


/*States
Waiting Approval
Approved
Denied
 */

interface RequestStatusProps {
    status: string;
}

const RequestStatus = ({status}: RequestStatusProps)=>  {
    const StatusStyle = (status: string) => {
        if (status === 'approved') {
            return {color: 'green'};
        }
        else if (status === 'rejected') {
            return {color: 'red'};
        }
        else {
            return {color: 'gray'};
        }
    }
    return (
        <div>
            <Label>Status:</Label>
            {(!(status === 'approved') && !(status === 'rejected')) &&
                <p>Waiting for approval</p>
            }

            {((status === 'approved') || (status === 'rejected')) &&
                <p style = {StatusStyle (status)}> {status}</p>
            }

            {status === 'rejected' && (
                <p>Check fields to ensure the proper data was entered</p>
            )}
        </div>
    )
}

export default RequestStatus;
