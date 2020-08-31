import React, { useState } from 'react';
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider,
  IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSelect,
  IonSelectOption, IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import './Tab1.css';
import {useBarCodeScanner} from '../hooks/Barcode';
import { PouchDBFunctions } from '../components/pouch';

const Tab1: React.FC = () => {
  const [patientType, setpatientType] = useState<string>('IP');
  const [name, setName] = useState<string>('none');
  const [diagnosis, setDiagnosis] = useState<string>('none');
  const [procedure, setProcedure] = useState<string>('none');
  const [amount, setAmount] = useState<number>(0);
  const [methodOfPayment, setMethodOfPayment] = useState<string>("cash");
  const [paymentDone, setPaymentDone] = useState<string>("Not Paid");
  const {barcode, BarcodeScan} = useBarCodeScanner();
  const [ward, setWard] = useState<string>('none');
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Enter Patient Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form>
            <IonList lines="full" class="ion-no-margin">
              <IonItem>
                <IonLabel position="floating">Name of patient</IonLabel>
                <IonInput placeholder="Name" onIonChange={e => setName(e.detail.value!)}></IonInput>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <IonButton onClick={() => BarcodeScan()}>Scan UHID Barcode</IonButton>
              </IonItem>
              <IonLabel>{barcode}</IonLabel>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="stacked">Diagnosis</IonLabel>
                <IonInput placeholder="Diagnosis" onIonChange={e => setDiagnosis(e.detail.value!)}></IonInput>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="fixed">Type</IonLabel>
              </IonItem>
              <IonRadioGroup value={patientType} onIonChange={e => {setpatientType(e.detail.value)}}>
                <IonItem>
                  <IonLabel>IP</IonLabel>
                  <IonRadio mode="ios" slot="start" value="IP"></IonRadio>
                </IonItem>
                <IonItem>
                  <IonLabel>OP</IonLabel>
                  <IonRadio mode="ios" slot="start" value="OP"></IonRadio>
                </IonItem>
              </IonRadioGroup>
              <IonItem>
                <IonLabel position="stacked">Ward</IonLabel>
                <IonInput placeholder="Ward" value={ward} onIonChange={e => {
                    setWard(e.detail.value!)
                    }}></IonInput>
            </IonItem>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="stacked">Procedure</IonLabel>
                <IonTextarea placeholder="Procedure..." rows={5} cols={33} onIonChange={e => setProcedure(e.detail.value!)}></IonTextarea>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="fixed">Amount</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Rs</IonLabel>
                <IonInput placeholder="Amount" type="number" onIonChange={e => setAmount(parseInt(e.detail.value!))}></IonInput>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="fixed">Payment</IonLabel>
              </IonItem>
              <IonRadioGroup value={methodOfPayment} onIonChange={e => setMethodOfPayment(e.detail.value!)}>
                <IonItem>
                  <IonLabel>Credit</IonLabel>
                  <IonRadio mode="ios" slot="start" value="Credit"></IonRadio>
                </IonItem>
                <IonItem>
                  <IonLabel>Cash</IonLabel>
                  <IonRadio mode="ios" slot="start" value="Cash"></IonRadio>
                </IonItem>
              </IonRadioGroup>
              <IonItemDivider />
              <IonItem>
                <IonLabel position="floating">Has Amount been paid</IonLabel>
                <IonSelect onIonChange={e => setPaymentDone(e.detail.value!)}>
                  <IonSelectOption value="Paid">Paid</IonSelectOption>
                  <IonSelectOption value="Not Paid">Not Paid</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          </form>
          <IonButton expand="block" fill="outline" size="large" class="button" onClick={
            async () => {
              const pouchDb = new PouchDBFunctions();
              var response = await pouchDb.store(name, barcode!, diagnosis, patientType, ward, procedure, amount, methodOfPayment, paymentDone);
              console.log(response);
              setName("");
              setpatientType("IP");
              setDiagnosis("");
              setProcedure("");
              setAmount(0);
              setMethodOfPayment("cash");
              setPaymentDone("Not Paid");
              setWard("");
            }
          }>Submit</IonButton>
        </IonContent>
      </IonPage>
    );
  };

  export default Tab1;
