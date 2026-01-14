import apiClient from "@/lib/axios";

interface DepartmentRow {
    name: string;
    floorNum: number;
    room: string;
    building: string;
    hospitalId: number;
    graphId: number;
    lat: number;
    lng: number;
}

export async function updateDirectory(){
    //get the file from the input
    const input  = document.getElementById('directory') as HTMLInputElement;
    //null handling
    const file = input.files ? input.files[0] : null;
    if(!file){return;}
    //reading the csv file
    const read = new FileReader();
    read.readAsText(file);
    const departments: DepartmentRow[] = [];
    
    //converting format of data
    await new Promise((resolve, reject) => {
        read.onload = () => {
            try {
                const csv = read.result as string;
                const rows = csv.split(/\r?\n/).filter(row => row.trim() !== '');
                
                if (rows.length < 2) {
                    reject(new Error('CSV file must have at least a header row and one data row'));
                    return;
                }
                
                // Parse header
                const headers = rows[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                
                // Required fields
                const requiredFields = ['name', 'floorNum', 'room', 'building', 'hospitalId', 'graphId', 'lat', 'lng'];
                const missingFields = requiredFields.filter(field => !headers.includes(field));
                
                if (missingFields.length > 0) {
                    reject(new Error(`Missing required fields: ${missingFields.join(', ')}`));
                    return;
                }
                
                // Parse data rows
                for (let i = 1; i < rows.length; i++) {
                    const values = rows[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                    const department: any = {};
                    
                    headers.forEach((header, index) => {
                        const value = values[index];
                        if (value !== undefined && value !== '') {
                            // Convert numeric fields
                            if (['floorNum', 'hospitalId', 'graphId', 'lat', 'lng'].includes(header)) {
                                department[header] = parseFloat(value);
                                if (isNaN(department[header])) {
                                    throw new Error(`Invalid number in row ${i + 1}, column ${header}`);
                                }
                            } else {
                                department[header] = value;
                            }
                        }
                    });
                    
                    // Validate required fields
                    if (!department.name || department.hospitalId === undefined || 
                        department.graphId === undefined || department.lat === undefined || 
                        department.lng === undefined) {
                        throw new Error(`Missing required fields in row ${i + 1}`);
                    }
                    
                    departments.push(department as DepartmentRow);
                }
                
                resolve(departments);
            } catch (error) {
                reject(error);
            }
        };
        read.onerror = () => reject(new Error('Failed to read file'));
    });
    
    //delete previous department data entries
    try {
        await apiClient.delete('/api/department');
        console.log("Department data deleted successfully");
    }catch(err) {
        console.error(err);
    }
    
    //post requests to create all new data entries
    let successCount = 0;
    let errorCount = 0;
    
    for (const department of departments) {
        try {
            await apiClient.post('/api/department', department);
            successCount++;
            console.log(`Department "${department.name}" posted successfully`);
        } catch (error) {
            errorCount++;
            console.error(`Error posting department "${department.name}":`, error);
        }
    }
    
    //clear file input after file info has been used
    input.value = '';
    
    //alert that the database has been updated
    const message = `Successfully imported ${successCount} departments${errorCount > 0 ? `, ${errorCount} errors` : ''}`;
    alert(message);
    return message;
}
