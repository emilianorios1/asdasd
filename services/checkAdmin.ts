import { getSession } from '@auth0/nextjs-auth0';
import { jwtDecode } from 'jwt-decode';

export default async function checkAdmin() {
  const session = await getSession();
  if (session){
    const decoded = jwtDecode(session.accessToken!) as {permissions: string}
    return decoded.permissions.includes('admin')
  }
  else {
    return false
  }
}