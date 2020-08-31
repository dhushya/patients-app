import {useState} from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useBarCodeScanner () {
    const [barcode, setBarCode] = useState<string>("none");

    const BarcodeScan = async () => {
        try {
            const Barcode = (await BarcodeScanner.scan()).text;
        setBarCode(Barcode);
        } catch (e) {
            setBarCode(e);
        }
        
    };
    return {
        barcode,
        BarcodeScan
    };
}