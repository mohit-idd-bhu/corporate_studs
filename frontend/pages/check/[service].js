import {useRouter} from 'next/router';
import styles from '../../styles/protocols.module.css';
import Footer from '../../src/components/Footer/Footer';
import { useEffect, useState } from 'react';
import Overlay from '../../src/components/Overlay/Overlay';

const ServiceDetail = ()=>{
    const router = useRouter();
    const {service} = router.query;
    const [serviceData, setServiceData] = useState({service:"",allow:[],deny:[]});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/service/${service}`);
              setData(response.data);
              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
        };
        fetchData();
    },[]);

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