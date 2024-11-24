import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import * as authAction from '@/store/slices/authSlice';
import LoadingScreen from '../loading/loadingScreen';
import { useRouter } from 'next/navigation';

const ReqNoAuth = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isLogin, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(authAction.validate());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && isLogin) {
            router.push('/'); 
        }
    }, [isLoading, isLogin, router]);

    return (
        <React.Fragment>
            {isLoading || isLogin ? <LoadingScreen /> : children}
        </React.Fragment>
    );
};

export default ReqNoAuth;
