// hoc/withAuth.js
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";

export default function withAuth(Component) {
  return function WrappedComponent(props) {
    const router = useRouter();
    
    // Извлеките JWT из нужного места
    const token = /* получите ваш JWT здесь */;

    // Проверьте валидность токена
    const isValidToken = token && jwtDecode(token) /* добавьте вашу логику проверки здесь */;

    if (!isValidToken) {
      // Если токен недействителен или отсутствует, перенаправьте на страницу входа
      router.replace('/sign-in');
      return null;
    }

    return <Component {...props} />;
  };
}
