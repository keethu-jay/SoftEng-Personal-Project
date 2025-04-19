import axios from "axios";

export async function updateDirectory(){
    //get the file from the input
    const input  = document.getElementById('directory') as HTMLInputElement;
    //null handling
    const file = input.files ? input.files[0] : null;
    if(!file){return;}
    //reading the csv file
    const read = new FileReader();
    read.readAsText(file);
    const csvData: string[][] = [];
    let attributes: string[] = [];
    //converting format of data
    await new Promise((resolve) => {
        read.onload = () => {
            const csv = read.result as string;
            console.log(csv);
            const rows = csv.split('\r');
            console.log(rows);
            attributes = rows[0].split(',');
            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(/,(?=\d|"|null)/);
                csvData.push(columns);
            }
            console.log(csvData);
            for (let i = 0; i < csvData.length; i++) {
                for (let j = 0; j < csvData[i].length; j++) {
                    if(csvData[i][j] === null|| csvData[i][j] === undefined){

                    }else {
                        csvData[i][j] = '"' + attributes[j] + '": ' + csvData[i][j];
                    }
                }
            }
            resolve(csvData);
        }
    });
    //delete previous department data entries
    try {
        await axios.delete('/api/department');
        console.log("Department data deleted successfully");
    }catch(err) {
        console.error(err);
    }
    //post requests to create all new data entries
    for (let i = 0; i < csvData.length; i++) {
        try {
            await axios.post('/api/department', JSON.parse('{' + csvData[i].join(', ') + '}'));
            console.log("Department data posted successfully");
        } catch (error) {
            console.error("Error posting department data:", error);
        }

    }
    //clear file input after file info has been used
    input.value = '';
    //alert that the database has been updated
    return(alert("Successfully updated department data"));
}
