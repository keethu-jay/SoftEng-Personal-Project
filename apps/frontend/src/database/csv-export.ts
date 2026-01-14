import apiClient from '@/lib/axios';

interface Department{
    departmentId?: number;
    name: string;
    floorNum: number;
    room: string;
    building: string;
    hospitalId: number;
    graphId: number;
    lat: number;
    lng: number;
}

export async function GetDirectory() {
    //get department data using get request
    const data = (await apiClient.get('/api/department/all')).data;
    
    if (!data || data.length === 0) {
        alert('No department data to export');
        return;
    }
    
    // Define the order of columns for CSV export (excluding departmentId for import compatibility)
    const exportFields = ['name', 'floorNum', 'room', 'building', 'hospitalId', 'graphId', 'lat', 'lng'];
    
    //converting data from JSON format to CSV format
    const colsString = exportFields.join(',');
    const departments = data.map((row: Department) => {
        return exportFields.map((fieldName) => {
            const value = row[fieldName as keyof Department];
            // Stringify all values to handle commas and special characters
            return JSON.stringify(value !== null && value !== undefined ? value : '');
        }).join(',');
    });
    
    //join cols and body, and break into separate lines
    const csv = [colsString, ...departments].join('\r\n');
    
    //creating a "file" for the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=UTF-8" });
    //downloads csv file to users' computer
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `directory.csv`;
    link.click();
    window.URL.revokeObjectURL(link.href);
    console.log('CSV exported successfully');
    return csv;
}

