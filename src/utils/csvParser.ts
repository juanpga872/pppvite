import Papa from 'papaparse';

export function parseCSV(file: File, onComplete: (data: any[]) => void, onError: (error: any) => void): void {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,  // Convertir los valores a los tipos más adecuados automáticamente
        complete: (results) => {
            onComplete(results.data);
        },
        error: (error) => {
            onError(error);
        }
    });
}
