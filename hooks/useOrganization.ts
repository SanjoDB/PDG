import { useQuery } from '@tanstack/react-query';
import { OrganizationServices } from '@/services/organizations.service';
import { data } from 'autoprefixer';
import { Organization } from '@/interfaces/Organization';

export const useOrganization = () => {
  const organizationService = new OrganizationServices();

  const createOrganization = async (
    organization: string,
  ): Promise<Organization> => {
    return await organizationService.createOrganization(organization);
  };

  const organizationAll = useQuery({
    queryKey: ['levels'],
    queryFn: () => organizationService.getOrganization(),
  });

  return {
    createOrganization,
    data: organizationAll.data !== undefined ? organizationAll.data : [],
  };
};
