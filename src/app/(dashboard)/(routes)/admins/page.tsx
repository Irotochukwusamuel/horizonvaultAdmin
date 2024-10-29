import { getAdminUsers } from '@/services/user';
import Body from '@/app/(dashboard)/(routes)/admins/components/body';

export default async function Page() {
  // const admins = await getAdminUsers()
  return <Body data={[]} />
}
