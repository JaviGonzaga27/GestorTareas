import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../../controllers/auth_service';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const user = getCurrentUser();
            if (!user) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;