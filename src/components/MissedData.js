import MissedDataTable from './MissedDataTable'
const MissedData = ({ tutorJsonData, transformedData, combinedAndSortedData }) => {
    let tutorDetailsFromFirstExcel = [];
    let tutorDetailsFromSecondExcel = [];
    let tutorDetailsFromCombinedExcel = [];
    let missingTutorDetailsFromCombinedExcel = [];
    let headings = [];
    
    if (tutorJsonData && transformedData && combinedAndSortedData) {
        

        // Ensure tutorDetailsFromFirstExcel is an array
        tutorDetailsFromFirstExcel = Object.keys(tutorJsonData).map(key => key.split(':')[0].trim());
        

        // Ensure tutorDetailsFromSecondExcel is an array
        tutorDetailsFromSecondExcel = transformedData.map(item => item.tutorID);
        

        // Ensure tutorDetailsFromCombinedExcel is an array
        tutorDetailsFromCombinedExcel = combinedAndSortedData.map(obj => Object.keys(obj)[0]);
        

        // Ensure missingTutorDetailsFromCombinedExcel is an array
        missingTutorDetailsFromCombinedExcel = [...new Set([...tutorDetailsFromFirstExcel])].filter(item => !tutorDetailsFromCombinedExcel.includes(item));
        

        // Log headings
        headings = ['tutorDetailsFromFirstExcel', 'tutorDetailsFromSecondExcel', 'tutorDetailsFromCombinedExcel', 'missingTutorDetailsFromCombinedExcel'];
        

    }
    else {
    }
    return (
        <div>
            {tutorDetailsFromFirstExcel && tutorDetailsFromSecondExcel
                && missingTutorDetailsFromCombinedExcel && (
                    <MissedDataTable
                        tutorDetailsFromFirstExcel={tutorDetailsFromFirstExcel}
                        tutorDetailsFromSecondExcel={tutorDetailsFromSecondExcel}
                        tutorDetailsFromCombinedExcel={tutorDetailsFromCombinedExcel}
                        missingTutorDetailsFromCombinedExcel={missingTutorDetailsFromCombinedExcel}
                        headings={headings}
                    />
                )}

        </div>
    )
}

export default MissedData