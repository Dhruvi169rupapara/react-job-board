import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchJobById} from "../../redux/slices/jobSlice.js";
import {useParams} from "react-router-dom";

function AdminJobDetails(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const {jobDetails, jobDetailsLoading, jobDetailsError} = useSelector((state) => state.jobs);

    console.log(`Fetching details for job ID: ${id}`);

    useEffect(() => {
        dispatch(fetchJobById(id));
    }, []);

    return(
        <div className={'px-10 py-10'}>
            <h1 className={'!mb-10'}>Admin Job Details</h1>
            <p className={'font-bold mb-2'}>{jobDetails?.title}</p>
            <p className={''}>{jobDetails?.body}</p>
        </div>
    );
}

export default AdminJobDetails;
