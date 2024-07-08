import {useRouter} from 'next/router';
import styles from '../../styles/protocols.module.css';
import Footer from '../../src/components/Footer/Footer';
import { useEffect, useState } from 'react';

const ServiceDetail = ()=>{
    const data = {
        service:"chat_allow",
        allow:['tcp','udp'],
        deny:['ip']
    }
    const router = useRouter();
    const {service} = router.query;
    const [serviceData, setServiceData] = useState({service:"",allow:[],deny:[]});

    useEffect(()=>{
        //Setting API routes using service variable
        setServiceData(data);
    },[])

    const allowed_services = 
    <ul className={styles["centered-list"]}>
        {serviceData.allow.map(allowed_service=><li>{allowed_service}</li>)}
    </ul>

    const denied_services = 
    <ul className={styles["centered-list"]}>
        {serviceData.deny.map(denied_service=><li>{denied_service}</li>)}
    </ul>

    return(
        <>
        <div className={styles["container"]}>
            <h1>Services catered by {serviceData.service}:</h1>
            <h2>Allowed Services:</h2>
            {serviceData.allow.length>0?allowed_services:<h3>No allowed serivce on this protocol.</h3>}
            <h2>Denied Services:</h2>
            {serviceData.deny.length>0?denied_services:<h3>No Denied serivce on this protocol.</h3>}
        </div>
        <Footer/>
        </>
    )
}

export default ServiceDetail;