import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { cloudUploadOutline, syncCircleOutline } from 'ionicons/icons';
import { PouchDBFunctions } from '../components/pouch';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab vertical="center" horizontal="center">
          <IonFabButton onClick={async () => {
            var functions = new PouchDBFunctions();
            var response = await functions.sync();
            console.log(response);
          }}>
            <IonIcon icon={cloudUploadOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
