import {useRouter} from 'next/router';
import styles from '../../styles/protocols.module.css';
import Footer from '../../src/components/Footer/Footer';
import { useEffect, useState } from 'react';
import Overlay from '../../src/components/Overlay/Overlay';
import {backendUrl} from '../../config';

const ServiceDetail = ()=>{
    const router = useRouter();
    const [serviceData, setServiceData] = useState({service:"",allow:[],deny:[]});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!router.isReady) return;
        const fetchData = async () => {
            try {
                const {service} = router.query;
                const response = 
                    await fetch(`${backendUrl}/service/${service}`)
                    .then(res=>res.json())
                    .then(res=>res.data)
                setServiceData(response);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    },[router.isReady]);

    if(loading){
        return(
            <Overlay>Loading...</Overlay>
        )
    }

    return(
        <>
        <div className={styles["container"]}>
            <h1>Services catered by {serviceData.service}:</h1>
            <h2>Allowed Services:</h2>
            {serviceData.allow.length>0?
            <ul>
                {serviceData.allow.map(allowed_service=><li key={allowed_service}>{allowed_service}</li>)}
            </ul>
            :<h3>No Allowed serivce on this protocol.</h3>}
            <h2>Denied Services:</h2>
            {serviceData.deny.length>0?
            <ul>
                {serviceData.deny.map(denied_service=><li key={denied_service}>{denied_service}</li>)}
            </ul>
            :<h3>No Denied serivce on this protocol.</h3>}
        </div>
        <Footer/>
        </>
    )
}

export default ServiceDetail;