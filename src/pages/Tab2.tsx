import React, { useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { PouchDBFunctions } from '../components/pouch';
import { cloudUploadOutline, syncOutline } from 'ionicons/icons';
import PouchDB from 'pouchdb';

const Tab2: React.FC = () => {
  const [data, setData] = useState<any>([])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton onClick={async () => {
            try {var local = new PouchDBFunctions();
            var datas = await local.getDocs();
            console.log((datas[0].doc! as any).payment);
            var datalist = [];
            for (let entry of datas) {
              console.log(((entry.doc!) as any).name);
              datalist.push(entry.doc);
            }
            setData(datalist);} catch (e) {}
          }}>
            <IonIcon icon={syncOutline}></IonIcon>
          </IonFabButton>
          </IonFab>
        <IonList>
          {
            data.map((person:any, index: number) => (
              <IonGrid key={index}>
              <IonItem>
                Name: {person.name}
              </IonItem>
              <IonItem>
              UHID: {person.UHID}
              </IonItem>
              <IonItem>
              Diagnosis: {person.diagnosis}
              </IonItem>
              <IonItem>
               Type: {person.patient_type}
              </IonItem>
              <IonItem>
                Ward no: {person.ward_no}
              </IonItem>
              <IonItem>
                Procedure: {person.procedure}
              </IonItem>
              <IonItem>
                Rs: {person.amount} is {person.status}
              </IonItem>
              <IonItem>
                Payment type: {person.payment}
              </IonItem>
              <IonItemDivider ></IonItemDivider>
              </IonGrid>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>);
};

export default Tab2;
