import { Organization } from '@/interfaces/Organization';
import { firestore } from '@/config/firebase';
import { collection, getDocs, addDoc, setDoc } from 'firebase/firestore';

export class OrganizationServices {
  private readonly organizationCollectionRef = collection(
    firestore,
    'organizations',
  );

  async getOrganization(): Promise<Organization[]> {
    const organizations: Organization[] = [];

    try {
      const organizationSnapshot = await getDocs(
        this.organizationCollectionRef,
      );
      for (const organizationDoc of organizationSnapshot.docs) {
        const organizationData = organizationDoc.data() as Organization;
        organizations.push(organizationData);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(organizations);
    return organizations;
  }

  async createOrganization(organization: string): Promise<Organization> {
    //Generate id
    const organizationDoc = await addDoc(this.organizationCollectionRef, {
      name: organization,
    });
    await setDoc(organizationDoc, { id: organizationDoc.id }, { merge: true });
    return { id: organizationDoc.id, name: organization };
  }
}
